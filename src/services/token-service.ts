import jwt from 'jsonwebtoken';
import TokenOutputDTO from '../dtos/auth/token-output-dto';

class TokenService {

    public makeToken(email: string, roles: Array<Number>): TokenOutputDTO {
        const accessToken = jwt.sign(
            {
                username: email,
                roles
            },
            process.env.ACCESS_TOKEN_SECRET || '123',
            { expiresIn: '1d' }
        );
        return {
            access_token: accessToken
        }
    }
}

export default new TokenService;