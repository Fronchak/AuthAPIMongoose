import { Router } from "express";
import resolver from "./controller-adapter";
import genreController from "../controllers/genre-controller";
import checkToken from "../middlewares/check-token";
import checkRolesAdminOrWorker from "../middlewares/check-roles-admin-or-editor";
import checkIdParam from "../middlewares/check-id-param";
import checkRoleAdmin from "../middlewares/check-role-admin";
import genreInputValidator from "../validators/genre/genre-input-validator";
import genreInsertValidator from "../validators/genre/genre-insert-validator";
import checkValidationErrors from "../middlewares/check-validation-errors";
import genreUpdateValidator from "../validators/genre/genre-update-validator";

const genreRoutes = Router();

genreRoutes.post('/', 
    checkToken,
    checkRolesAdminOrWorker,
    genreInputValidator,
    genreInsertValidator,
    checkValidationErrors,
    resolver(genreController.save));
genreRoutes.put('/:id', 
    checkToken,
    checkRolesAdminOrWorker,
    checkIdParam,
    genreInputValidator,
    genreUpdateValidator,
    checkValidationErrors,
    resolver(genreController.update));
genreRoutes.get('/', resolver(genreController.findAll));
genreRoutes.get('/:id', 
    checkToken,
    checkIdParam,
    resolver(genreController.findById));
genreRoutes.delete('/:id',
    checkToken,
    checkRoleAdmin,
    checkIdParam,
    resolver(genreController.deleteById));

export default genreRoutes;