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

    getEmployeeByEmail: async (email) => {
        const employee = await prisma.employee.findUnique({
            where: {
                email,
            }
        });
        return employee;
    },

    getCentralPointManagers: async () => {
        const employees = await prisma.employee.findMany({
            where: {
                role: 'cpointm',
            },
            include: {
                CEmployee: true,
            }
        });
        return employees;
    },

    createEmployee: async (employee) => {
        const lastEmployee = await prisma.employee.findFirst({
            orderBy: {
                companyID: 'desc',
            }
        });
        const newCompanyID = lastEmployee ? parseInt(lastEmployee.companyID) + 1 : 20230000;
        const newEmployee = await prisma.employee.create({
            data: {
                ...employee,
                companyID: newCompanyID.toString(),
            }
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

    createCPoint: async (cpoint) => {
        await prisma.cPoint.create({
            data: cpoint,
        });
    },

    deleteCPoint: async (id) => {
        await prisma.cPoint.delete({
            where: {
                id,
            }
        });
    },
};

export default AdminService;