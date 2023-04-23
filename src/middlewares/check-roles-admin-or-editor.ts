import { ROLE_ADMIN, ROLE_WORKER } from "../utils/roles";
import checkRoles from "./check-roles";

const checkRolesAdminOrWorker = checkRoles(ROLE_WORKER, ROLE_ADMIN);

export default checkRolesAdminOrWorker;