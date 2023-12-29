import { authenticationHandler } from "../authentication_service/AuthenService.js";
import orderService from "./OrderService.js";

const orderController = (fastify, options, done) => {

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

    fastify.get('/find/:id', async (req, reply) => {
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

    

    fastify.get('/toTpoint/:id', async (req, reply) => {
        const orders = await orderService.getOrderFromTpoint(parseInt(req.params.id));
        reply.status(200).send(orders);
    });

    fastify.get('/toCpoint/:id', async (req, reply) => {
        const orders = await orderService.getOrderToCpoint(parseInt(req.params.id));
        reply.status(200).send(orders);
    });

    fastify.get('/tpointStats/:id', async (req, reply) => {
        const stats = await orderService.getStatisticsOrderTpoint(parseInt(req.params.id));
        reply.status(200).send(stats);
    });

    fastify.get('/cpointStats/:id', async (req, reply) => {
        const stats = await orderService.getStatisticsOrderCpoint(parseInt(req.params.id));
        reply.status(200).send(stats);
    });

    fastify.put('/', async (req, reply) => {
        const { orderId, orderAction, orderStatus } = req.body;
        try {
            await Promise.all([
                orderService.addActionOrder(orderId, orderAction),
                orderService.updateOrderStatus(orderId, orderStatus)
            ]);
            reply.status(200).send({ message: 'Update order successfully' });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });

    fastify.post('/', async (req, reply) => {
        const { sender, receiver, order, user } = req.body;
        await Promise.all([orderService.upsertCustomer(sender), orderService.upsertCustomer(receiver)]);
        order.senderPhone = sender.phoneNumber;
        order.receiverPhone = receiver.phoneNumber;
        order.id = await orderService.generateUniqueOrderId();
        order.orderActions = [{ creatorID: user.companyID, type: 'CREATE'}];
        const newOrder = await orderService.createOrder(order);
        reply.status(201).send(newOrder);
    });
    

    done();
}

export default orderController;