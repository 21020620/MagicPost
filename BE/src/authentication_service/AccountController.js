import prisma from "../PrismaInstance.js";
import { loginSchema, registerSchema } from "./AccountSchema.js";
import { hashPassword, checkPassword } from "./PasswordService.js";

const accountController = (fastify, options, done) => {
    fastify.post('/login', loginSchema, async (req, reply) => {
        const { username } = req.body;
        console.log(username);
        const account = await prisma.account.findUnique({
            where: {
                username: username,
            }
        });
        const isPasswordMatched = await checkPassword(req.body.password, account.password);
        if(!account || !isPasswordMatched) throw new Error('Invalid account credentials');
        const token = fastify.jwt.sign({ id: account.id, role: account.role}, 
            {expiresIn: 300000, algorithm: 'HS512'});

        return { token };
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