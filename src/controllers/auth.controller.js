import { UserModel } from "../../models/index.js";
import bcrypt from "bcrypt";
import { signToken } from "../../core/jwtAuth.js";
import { userRoles } from "../../enums/userEnums.js";
import { BadRequestError, BadTokenError, NotFoundError } from "../../utils/CustomErrors.js";

export const Login = async(req, res, next) =>{
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new BadRequestError("Email and password required!");        
        
        const user = await UserModel.findOne({where: { email: email }});
        if (!user) throw new BadRequestError('Login failed, email or password incorrect!');

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) throw new BadRequestError('Login failed, email or password incorrect!');
        
        const token  = signToken(user);
        res.status(200).send({ data: user, token: token});
    } catch (error) {
        return next(error);
    }
}

export const Register = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new BadRequestError("Email and password required!");        
        
        const user = await UserModel.findOne({where: { email: email }});

        if (!user) throw new NotFoundError('Login failed, email or password incorrect!');

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) throw new BadRequestError('Login failed, email or password incorrect!');
        
        if (user.role !== userRoles.ADMIN) throw new BadTokenError('Login failed, email or password incorrect!');

        const token  = signToken(user);
        res.status(200).send({ data: user, token: token});
    } catch (error) {
        return next(error);
    }
}

export const ResetPassword = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) throw new BadRequestError("Email and password required!");        

        const user = await UserModel.findOne({where: { email: email }});
        if (!user) throw new BadRequestError('Login failed, email or password incorrect!');

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) throw new BadRequestError('Login failed, email or password incorrect!');
        
        if (user.role !== userRoles.MENTOR) throw new BadTokenError('Login failed, email or password incorrect!');

        const token  = signToken(user);
        
        res.status(200).send({ data: user, token: token});
    } catch (error) {
        return next(error);
    }
}
