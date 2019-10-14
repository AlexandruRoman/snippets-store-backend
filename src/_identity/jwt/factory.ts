import { IJwtData } from './types'
import * as jwt from 'jsonwebtoken'
import { IUserModel } from '../user/schema'
import { IRole } from '../role/schema'
import { roleDal_getRoleWithPermissions } from '../role/dal'
import ROLE_LIST from '../role/list'

export function generateUserToken(user: IUserModel) {
    const role: IRole = {
        name: (user.role as IRole).name,
        permissions: (user.role as IRole).permissions
    }
    const jwtData: IJwtData = {
        user: {
            id: user.id,
            role
        }
    }
    return jwt.sign(jwtData, 'jwt_cheiePrivata')
}

export async function generateGuestToken() {
    const role = await roleDal_getRoleWithPermissions({ name: ROLE_LIST.GUEST })
    if (!role) return
    const jwtData: IJwtData = {
        user: {
            role: {
                name: role.name,
                permissions: role.permissions
            }
        }
    }
    return jwt.sign(jwtData, 'jwt_cheiePrivata')
}
