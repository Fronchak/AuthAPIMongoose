import bcrypt from 'bcrypt';
import RegisterInputDTO from "../dtos/auth/register-input-dto";
import tokenService from './token-service';
import User from '../models/user';
import { ROLE_USER } from '../utils/roles';
import TokenOutputDTO from '../dtos/auth/token-output-dto';
import UnauthorizedEror from '../errors/unauthorized-error';
import LoginInputDTO from '../dtos/auth/login-input-dto';
import RegisterInputAuxDTO from '../dtos/auth/register-input-aux-dto';

class AuthService {

    public async register(registerInputDTO: RegisterInputDTO): Promise<TokenOutputDTO> {
        const password = await bcrypt.hash(registerInputDTO.password, 10);
        const user = new User({ 
            email: registerInputDTO.email,
            password,
            roles: [ROLE_USER]
        });
        await user.save();
        return tokenService.makeToken(registerInputDTO.email, [ROLE_USER]);
    }

    public async registerAux(registerInputDTO: RegisterInputAuxDTO): Promise<TokenOutputDTO> {
        const password = await bcrypt.hash(registerInputDTO.password, 10);
        const user = new User({ 
            email: registerInputDTO.email,
            password,
            roles: registerInputDTO.roles
        });
        await user.save();
        return tokenService.makeToken(registerInputDTO.email, registerInputDTO.roles);
    }

    public async login(loginInputDTO: LoginInputDTO): Promise<TokenOutputDTO> {
        const user = await User.findOne({ email: loginInputDTO.email });
        if(!user) {
            throw new UnauthorizedEror('Email or password invalid');
        }
        const match = await bcrypt.compare(loginInputDTO.password, user.password);
        if(!match) {
            throw new UnauthorizedEror('Email or password invalid'); 
        }
        return tokenService.makeToken(user.email, user.roles);
    }

}

export default new AuthService();