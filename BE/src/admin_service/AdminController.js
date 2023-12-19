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

    fastify.get('/employees/:companyID', async (req, reply) => {
        const employee = await adminService.getEmployeeById(req.params.companyID);
        reply.status(200).send(employee);
    });

    fastify.post('/employees', async (req, reply) => {
        const newEmployee = await adminService.createEmployee(req.body);
        reply.status(201).send('New employee created: ', newEmployee);
    });

    fastify.put('/employees/:companyID', async (req, reply) => {
        await adminService.updateEmployee(req.params.companyID, req.body);
        reply.status(200).send('Employee updated');
    });

    fastify.delete('/employees/:companyID', async (req, reply) => {
        const deletedEmployee = await adminService.deleteEmployee(req.params.companyID);
        reply.status(200).send('Employee deleted: ', deletedEmployee);
    });

    done();
}

export default AdminController;