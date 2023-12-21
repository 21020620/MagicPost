import prisma from "../PrismaInstance.js";

const TransactionPointService = {
    
    getAllTransactionPoints: async () => {
        const transactionpoints = await prisma.transactionpoint.findMany();
        return transactionpoints;
    },
    
    getTransactionPoint: async (TransactionPointID) => {
        const transactionpoint = await prisma.transactionpoint.findUnique({
            where: {
                id: TransactionPointID,
            }
        });
        return transactionpoint;
    }
}

export default TransactionPointService;