import { authenticationHandler } from "../authentication_service/AuthenService.js";
import orderService from "./OrderService.js";

const TransactionPointController = (fastify, options, done) => {

    fastify.addHook('preHandler', async (request, reply) => {
        authenticationHandler(fastify, request, reply);
        if (!['admin', 'tpointm', 'tpointw', 'cpointm', 'cpointw'].includes(request.role)) {
            reply.code(403).send({ message: 'You are not allowed to access this resource' });
        }
    });

    fastify.get('/orders', async (req, reply) => {
        const orders = await orderService.getAllOrders();
        reply.status(200).send(orders);
    });

    fastify.get('/orders/:id', async (req, reply) => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            reply.code(400).send({ message: 'Invalid id parameter' });
            return;
        }
        const order = await orderService.getOrder(id);
        if (order === null) {
            reply.code(404).send({ message: 'Order not found' });
            return;
        }
        reply.status(200).send(order);
    });

    fastify.post('/orders', async (req, reply) => {
        const order = req.body;
        const newOrder = await orderService.createOrder(order);
        reply.status(201).send(newOrder);
    });
    

    done();
}

export default TransactionPointController;