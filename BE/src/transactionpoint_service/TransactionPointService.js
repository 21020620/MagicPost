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
                name: true,
            }
        });
        return transactionpoints;
    }
}

export default TransactionPointService;