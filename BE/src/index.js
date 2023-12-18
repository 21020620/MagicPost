import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import AccountController from "./authentication_service/AccountController.js";
import CentralPointController from "./centralpoint_service/CentralPointController.js";

const fastify = Fastify({
    logger: true,
});

fastify.register(fastifyJwt, { secret: 'My_P3r$0n@l_S3cr3t'});
fastify.register(fastifyCors, { 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.decorateRequest('role', 'default');

fastify.register(AccountController);
fastify.register(CentralPointController, { prefix: '/cpoint' });

try {
    fastify.listen({ port: 8080});
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}