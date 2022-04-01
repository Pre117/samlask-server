import jwt from 'jsonwebtoken';
import secret from '../secret.js';

const verfiyToken = (ctx) => {
    const { token } = ctx.request.body;

    const result = jwt.verify(token, secret)

    ctx.body = {
        result
    }
}

export default verfiyToken