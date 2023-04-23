import { ROLE_ADMIN } from "../utils/roles";
import checkRoles from "./check-roles";

const checkRoleAdmin = checkRoles(ROLE_ADMIN);

export default checkRoleAdmin;