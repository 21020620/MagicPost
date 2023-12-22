import { authenticationHandler, getUsernameFromToken } from "../authentication_service/AuthenService.js";
import tpService from "./TransactionPointService.js";

const TransactionPointController = (fastify, options, done) => {

    fastify.addHook('preHandler', async (request, reply) => {
        authenticationHandler(fastify, request, reply);
        if (!['admin', 'tpointm'].includes(request.role)) {
            reply.code(403).send({ message: 'You are not allowed to access this resource' });
        }
    });

    fastify.get('employees/:id', async (req, reply) => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            reply.code(400).send({ message: 'Invalid id parameter' });
            return;
        }
        const employees = await tpService.getEmployeesOfCPoint(id);
        reply.status(200).send(employees);
    });

    fastify.get('/without', async (req, reply) => {
        const cpoints = await tpService.getTransactionPointsWithoutManager();
        reply.status(200).send(cpoints);
    });

    fastify.get('/tpFromAccount', async (req, reply) => {
        const username = getUsernameFromToken(fastify, req);
        const tpoint = await tpService.getTPointFromAccount(username);
        reply.status(200).send(tpoint);
    });

    done();
}

export default TransactionPointController;