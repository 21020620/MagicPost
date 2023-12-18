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
    }
};

export default CentralPointService;