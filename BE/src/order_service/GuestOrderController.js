import orderService from "./OrderService.js";

const guestController = (fastify, options, done) => {

    fastify.get('/find/:id', async (req, reply) => {
        const order = await orderService.getOrderForGuest(req.params.id);
        if (order === null) {
            reply.code(404).send({ message: 'Order not found' });
            return;
        }
        reply.status(200).send(order);
    });


    

    done();
}

export default guestController;