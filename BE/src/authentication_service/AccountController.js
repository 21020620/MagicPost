import prisma from "../PrismaInstance.js";
import { loginSchema, registerSchema } from "./AccountSchema.js";
import { hashPassword, checkPassword } from "./PasswordService.js";
import AccountService from "./AccountService.js";
import AdminService from "../admin_service/AdminService.js";
import CentralPointService from "../centralpoint_service/CentralPointService.js";
import TransactionPointService from "../transactionpoint_service/TransactionPointService.js";

const accountController = (fastify, options, done) => {
    fastify.post('/login', loginSchema, async (req, reply) => {
        const { username } = req.body;
        console.log(username);
        const account = await AccountService.getAccountById(username);
        const isPasswordMatched = await checkPassword(req.body.password, account.password);
        if(!account || !isPasswordMatched) throw new Error('Invalid account credentials');
        const token = fastify.jwt.sign({ id: account.username, role: account.role}, {expiresIn: 300000, algorithm: 'HS512'});
        const employee = await AdminService.getEmployeeByEmail(username);
        let workplace = {};
        if(employee !== null) {
            if(!employee.CEmployee) workplace = await TransactionPointService.getTPointFromAccount(username);
            else workplace = await CentralPointService.getCPointFromAccount(username);
        }
        return { token, role: account.role, employee, workplace };
    });

    fastify.post('/register', registerSchema, async (req, reply) => {
        const { username, password, role } = req.body;
        const hashedPassword = await hashPassword(password);
        const account = await prisma.account.create({
            data: {
                username,
                password: hashedPassword,
                role,
            }
        });
        return account;
    });
    done();
}

export default accountController;