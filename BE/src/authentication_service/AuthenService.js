export const authenticationHandler = (fastify, request, reply) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    fastify.jwt.verify(token, (err, decoded) => {
        if (err) fastify.log.error(err)
        fastify.log.info(`Token verified. Role is ${decoded.role}`)
        request.role = decoded.role;
    });
}

export const getUsernameFromToken = (fastify, request) => {
    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    let username = '';
    fastify.jwt.verify(token, (err, decoded) => {
        if (err) fastify.log.error(err)
        fastify.log.info(`Token verified. Username is ${decoded.id}`)
        username = decoded.id;
    });
    return username;
}
