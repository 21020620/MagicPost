import prisma from '../PrismaInstance.js';

const CentralPointService = {

    getAllCPoints: async () => {
        const cpoints = await prisma.cPoint.findMany();
        return cpoints;
    },

    getCPoint: async (CpointID) => {
        const cpoint = await prisma.cPoint.findUnique({
            where: {
                id: CpointID,
            }
        });
        return cpoint;
    },

    getEmployeesOfCPoint: async (CpointID) => {
        const employees = await prisma.cEmployee.findMany({
            where: {
                cpointId: CpointID,
            },
            include: {
                Employee: true,
            }
        });
        return employees;
    },

    getCentralPointsWithoutManager: async () => {
        const cpoints = await prisma.cPoint.findMany({
            where: {
                employees: {
                    none: {
                        Employee: {
                            role: 'cpointm',
                        }
                    }
                }
            },
            select: {
                id: true,
                name: true,
                address: true,
            }
        });
        return cpoints;
    },

    getCPointFromAccount: async (username) => {
        const employee = await prisma.employee.findUnique({
            where: {
                email: username,
            },
            include: {
                CEmployee: {
                    include: {
                        department: true,
                    },
                },
            },
        });
        return employee && employee.CEmployee ? employee.CEmployee.department : null;
    },
};

export default CentralPointService;