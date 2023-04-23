import { Router } from "express";
import resolver from "./controller-adapter";
import movieController from "../controllers/movie-controller";
import checkIdParam from "../middlewares/check-id-param";
import checkToken from "../middlewares/check-token";
import checkRolesAdminOrWorker from "../middlewares/check-roles-admin-or-editor";
import checkRoleAdmin from "../middlewares/check-role-admin";

const movieRoutes = Router();

movieRoutes.post('/', 
    checkToken,
    checkRolesAdminOrWorker,
    resolver(movieController.save));
movieRoutes.get('/', resolver(movieController.findAll));
movieRoutes.get('/:id', 
    checkToken,
    checkIdParam, 
    resolver(movieController.findById));
movieRoutes.put('/:id', 
    checkToken,
    checkRolesAdminOrWorker,
    checkIdParam, 
    resolver(movieController.update));
movieRoutes.delete('/:id', 
    checkToken,
    checkRoleAdmin,
    checkIdParam, 
    resolver(movieController.deleteById));

export default movieRoutes;