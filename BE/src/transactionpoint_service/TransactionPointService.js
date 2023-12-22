import prisma from "../PrismaInstance.js";

const TransactionPointService = {
    
    getAllTransactionPoints: async () => {
        const transactionpoints = await prisma.tPoint.findMany();
        return transactionpoints;
    },
    
    getTransactionPoint: async (TransactionPointID) => {
        const transactionpoint = await prisma.tPoint.findUnique({
            where: {
                id: TransactionPointID,
            }
        });
        return transactionpoint;
    },

    getEmployeesOfTransactionPoint: async (TransactionPointID) => {
        const employees = await prisma.tEmployee.findMany({
            where: {
                tpointId: TransactionPointID,
            },
            include: {
                Employee: true,
            }
        });
        return employees;
    },

    getTransactionPointsWithoutManager: async () => {
        const transactionpoints = await prisma.tPoint.findMany({
            where: {
                employees: {
                    none: {
                        Employee: {
                            role: 'tpointm',
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
        return transactionpoints;
    },

    getTPointFromAccount: async (username) => {
        const employee = await prisma.employee.findUnique({
            where: {
                email: username,
            },
            include: {
                TEmployee: {
                    include: {
                        department: true,
                    },
                },
            },
        });
    
        return employee && employee.TEmployee ? employee.TEmployee.department : null;
    },
}

export default TransactionPointService;