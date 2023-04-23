import { NextFunction, Request, Response } from "express"
import CustomRequest from "../interfaces/custom-request";
import ForbiddenError from "../errors/forbidden-error";

const checkRoles = (...roles: Array<number>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const userRoles: Array<number> = (req as CustomRequest).roles;
        const isAuthorized = userRoles.find((role) => roles.includes(role));
        if(!isAuthorized) {
            return next(new ForbiddenError())
        }
        return next();
    }
}

export default checkRoles;