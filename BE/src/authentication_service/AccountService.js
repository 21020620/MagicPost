import prisma from "../PrismaInstance.js";
import { hashPassword } from "./PasswordService.js";

const generatePassword = () => {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var password = "";
    for (var i = 0, n = charset.length; i < 10; ++i) {
        password += charset[Math.floor(Math.random() * n)];
    }
    return password;
}


const AccountService = {
    getAllAccounts: async () => {
        const accounts = await prisma.account.findMany();
        return accounts;
    },

    getAccountById: async (username) => {
        const account = await prisma.account.findUnique({
            where: {
                username,
            }
        });
        return account;
    },

    createAccount: async (account) => {
        // const initialPassword = generatePassword();
        const initialPassword = '123456';
        account.password = await hashPassword(initialPassword);
        const newAccount = await prisma.account.create({
            data: account,
        });
        return {newAccount, initialPassword};
    },

    updateAccount: async (id, account) => {
        const updatedAccount = await prisma.account.update({
            where: {
                id,
            },
            data: account,
        });
        return updatedAccount;
    },

    deleteAccount: async (id) => {
        const deletedAccount = await prisma.account.delete({
            where: {
                id,
            }
        });
        return deletedAccount;
    },

    createCEmployee: async (cEmployee) => {
        await prisma.cEmployee.create({
            data: cEmployee,
        });
    },

    createTEmployee: async (tEmployee) => {
        await prisma.tEmployee.create({
            data: tEmployee,
        });
    }
};

export default AccountService;