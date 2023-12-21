import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import pino from "pino";
import AccountController from "./authentication_service/AccountController.js";
import CentralPointController from "./centralpoint_service/CentralPointController.js";
import AdminController from "./admin_service/AdminController.js";
import TransactionPointController from "./transactionpoint_service/TransactionPointController.js";

const logger = pino({
    transport: {
      target: 'pino-pretty'
    },
})

const fastify = Fastify({ logger });

fastify.register(fastifyJwt, { secret: 'My_P3r$0n@l_S3cr3t'});
fastify.register(fastifyCors, { 
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

fastify.decorateRequest('role', 'default');

fastify.register(AccountController);
fastify.register(CentralPointController, { prefix: '/api/cpoint' });
fastify.register(AdminController, { prefix: '/api/admin' });
fastify.register(TransactionPointController, { prefix: '/api/tpoint' });

try {
    fastify.listen({ port: 8080});
} catch (error) {
    fastify.log.error(error);
    process.exit(1);
}