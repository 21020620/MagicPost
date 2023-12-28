/* eslint-disable no-undef */
import Fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCors from "@fastify/cors";
import pino from "pino";
import AccountController from "./authentication_service/AccountController.js";
import CentralPointController from "./centralpoint_service/CentralPointController.js";
import AdminController from "./admin_service/AdminController.js";
import TransactionPointController from "./transactionpoint_service/TransactionPointController.js";
import OrderController from "./order_service/OrderController.js";

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
fastify.register(OrderController, { prefix: '/api/orders' });

async function main() {
    await fastify.listen({
        port: 8080,
        host: '0.0.0.0'
    });
}

["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
        await fastify.close();
        process.exit(0);
    });
});

main();

