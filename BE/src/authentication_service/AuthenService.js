export const authenticationHandler = (fastify, request, reply) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    fastify.jwt.verify(token, (err, decoded) => {
        if (err) fastify.log.error(err)
        fastify.log.info(`Token verified. Role is ${decoded.role}`)
        request.role = decoded.role;
    });
}
