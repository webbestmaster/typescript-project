import {FastifyRequest, FastifyReply} from 'fastify';

export function postLogin(request: FastifyRequest<{Body: Record<string, string>}>, reply: FastifyReply) {
    console.log(request.session.get('data'));

    const {body = {}} = request;

    const {login, password} = body;

    if (typeof login !== 'string' || typeof password !== 'string') {
        reply.code(400).send(null);
        return;
    }

    reply.send('hello world');
}
