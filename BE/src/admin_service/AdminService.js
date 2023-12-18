import prisma from "../PrismaInstance.js";

const AdminService = {
    getAllEmployees: async () => {
        const employees = await prisma.employee.findMany();
        return employees;
    },
};

export default AdminService;