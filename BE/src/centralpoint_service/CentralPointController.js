import { authenticationHandler } from "../authentication_service/AuthenService.js";
import cpService from "./CentralPointService.js";

const centralPointController = (fastify, options, done) => {

    fastify.addHook('preHandler', async (request, reply) => {
        authenticationHandler(fastify, request, reply);
        if (!['admin', 'cpointm'].includes(request.role)) {
            reply.code(403).send({ message: 'You are not allowed to access this resource' });
        }
    });
    

    fastify.get('/:id', async (req, reply) => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            reply.code(400).send({ message: 'Invalid id parameter' });
            return;
        }
        const employees = await cpService.getEmployeesOfCPoint(id);
        reply.status(200).send(employees);
    });


    done();
}

export default centralPointController;