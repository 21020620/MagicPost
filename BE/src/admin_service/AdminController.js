import { authenticationHandler } from "../authentication_service/AuthenService.js";
import adminService from "./AdminService.js";

const AdminController = (fastify, options, done) => {

    fastify.addHook('preHandler', async (request, reply) => {
        authenticationHandler(fastify, request, reply);
        if (request.role !== 'admin') {
            reply.code(403).send({ message: 'You are not allowed to access this resource' });
        }
    });
    

    fastify.get('/employees', async (req, reply) => {
        const employees = await adminService.getAllEmployees();
        reply.status(200).send(employees);
    });
    
    done();
}

export default AdminController;