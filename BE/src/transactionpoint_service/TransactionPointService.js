import prisma from "../PrismaInstance.js";

const TransactionPointService = {
    
    getAllTransactionPoints: async () => {
        const transactionpoints = await prisma.tPoint.findMany({
            include: {
                parentCP: true,
            }
            
        });
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

    getEmployeesOfTPoint: async (TransactionPointID) => {
        const employees = await prisma.tEmployee.findMany({
            where: {
                tpointId: TransactionPointID,
                Employee: {
                    role: {
                        not: 'tpointm',
                    }
                }
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

    deleteTransactionPoint: async (TransactionPointID) => {
        const transactionpoint = await prisma.tPoint.delete({
            where: {
                id: TransactionPointID,
            }
        });
        return transactionpoint;
    }
}

export default TransactionPointService;