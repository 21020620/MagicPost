import prisma from "../PrismaInstance.js";

const AdminService = {
    getAllEmployees: async () => {
        const employees = await prisma.employee.findMany();
        return employees;
    },

    getEmployeeById: async (companyID) => {
        const employee = await prisma.employee.findUnique({
            where: {
                companyID,
            }
        });
        return employee;
    },

    createEmployee: async (employee) => {
        const newEmployee = await prisma.employee.create({
            data: employee,
        });
        return newEmployee;
    },

    updateEmployee: async (companyID, employee) => {
        const updatedEmployee = await prisma.employee.update({
            where: {
                companyID,
            },
            data: employee,
        });
        return updatedEmployee;
    },

    deleteEmployee: async (companyID) => {
        const deletedEmployee = await prisma.employee.delete({
            where: {
                companyID,
            }
        });
        return deletedEmployee;
    },
};

export default AdminService;