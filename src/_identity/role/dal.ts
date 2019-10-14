import { Role } from "./schema";

export function roleDal_getRoleWithPermissions(conditions: any) {
    return Role.findOne(conditions).populate('permissions')
}