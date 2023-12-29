import prisma from "../PrismaInstance.js";
import { hashPassword, checkPassword } from "./PasswordService.js";

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
    },

    changePassword: async (username, oldPassword, newPassword) => {
        const account = await prisma.account.findUnique({
            where: {
                username,
            }
        });
        if (!account) {
            return false;
        }
        const isPasswordMatch = await checkPassword(oldPassword, account.password);
        if (!isPasswordMatch) {
            return false;
        }
        const hashedPassword = await hashPassword(newPassword);
        await prisma.account.update({
            where: {
                username,
            },
            data: {
                password: hashedPassword,
            }
        });
        return true;
    },

};

export default AccountService;