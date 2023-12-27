import prisma from "../PrismaInstance";

const OrderService = {
    getAllOrders: async () => {
        const orders = await prisma.orders.findMany();
        return orders;
    },

    getOrder: async (OrderID) => {
        const order = await prisma.orders.findUnique({
            where: {
                id: OrderID,
            }
        });
        return order;
    },

    getOrdersOfCustomer: async (CustomerID) => {
        const orders = await prisma.orders.findMany({
            where: {
                customerId: CustomerID,
            }
        });
        return orders;
    },

    getOrdersOfEmployee: async (EmployeeID) => {
        const orders = await prisma.orders.findMany({
            where: {
                employeeId: EmployeeID,
            }
        });
        return orders;
    },

    getOrdersOfTransactionPoint: async (TransactionPointID) => {
        const orders = await prisma.orders.findMany({
            where: {
                tpointId: TransactionPointID,
            }
        });
        return orders;
    },


    createOrder: async (Order) => {
        const order = await prisma.orders.create({
            data: Order,
        });
        return order;
    },

    updateOrder: async (OrderID, Order) => {
        const order = await prisma.orders.update({
            where: {
                id: OrderID,
            },
            data: Order,
        });
        return order;
    },

    deleteOrder: async (OrderID) => {
        const order = await prisma.orders.delete({
            where: {
                id: OrderID,
            }
        });
        return order;
    }
};

export default OrderService;