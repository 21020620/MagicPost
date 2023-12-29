import prisma from "../PrismaInstance.js";

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
            data: {
                ...Order,
                orderActions: {
                    create: Order.orderActions,
                },
            },
            include: {
                orderActions: true,
                sender: true,
                receiver: true,
            },
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
    },

    upsertCustomer: async (customer) => {
        // Generate a unique customerID
        let customerID;
        let existingCustomer;

        do {
            customerID = Math.floor(10000 + Math.random() * 90000).toString();
            existingCustomer = await prisma.customer.findUnique({
                where: {
                    customerID: customerID,
                },
            });
        } while (existingCustomer !== null);

        // Upsert the customer
        const upsertedCustomer = await prisma.customer.upsert({
            where: { phoneNumber: customer.phoneNumber },
            update: { 
                address: customer.address,
                fullName: customer.fullName
            },
            create: {
                customerID: customerID,
                phoneNumber: customer.phoneNumber,
                address: customer.address,
                fullName: customer.fullName
            },
        });

        return upsertedCustomer;
    },

    generateUniqueOrderId: async () => {
        let id;
        let existingOrder;

        do {
            id = 'MP' + Math.floor(10000000 + Math.random() * 90000000) + 'VN';
            existingOrder = await prisma.orders.findUnique({
                where: {
                    id: id,
                },
            });
        } while (existingOrder !== null);

        return id;
    },

    addActionOrder: async (OrderID, OrderAction) => {
        const order = await prisma.orders.update({
            where: {
                id: OrderID,
            },
            data: {
                orderActions: {
                    create: OrderAction,
                },
            },
        });
        return order;
    },

    updateOrderStatus: async (OrderID, OrderStatus) => {
        const order = await prisma.orders.update({
            where: {
                id: OrderID,
            },
            data: {
                orderStatus: OrderStatus,
            },
        });
        return order;
    },

    getOrderFromTpoint: async (TransactionPointID) => {
        const order = await prisma.orders.findMany({
            where: {
                senderTPId: TransactionPointID,
                orderStatus: 'CREATED'
            }
        });
        return order;
    },
};

export default OrderService;