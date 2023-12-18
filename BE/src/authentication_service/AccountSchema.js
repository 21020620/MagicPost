export const loginSchema = {
    body : {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' },
        },
        required: ['username', 'password'],
    },
    response : {
        200: {
            type: 'object',
            properties: {
                token: { type: 'string' },
            },
        },
    },
};

export const registerSchema = {
    body : {
        type: 'object',
        properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            role: { type: 'string' },
        },
        required: ['username', 'password', 'role'],
    },
    response : {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                username: { type: 'string' },
                password: { type: 'string' },
                role: { type: 'string' },
            },
        },
    },
};