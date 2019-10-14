import { userDal_add } from './dal'
import { clientDal_add } from '../client/dal'
import ROLE_LIST from '../role/list'
import { sellerDal_add } from '../seller/dal'
import { staffDal_add } from '../staff/dal'

interface IUserService_add {
    role: string
    name: string
    password: string
    email: string
}

export async function userService_add(data: IUserService_add) {
    const userModel = await userDal_add(data)
    if (!userModel) return
    switch (data.role) {
        case ROLE_LIST.CLIENT:
            await clientDal_add(userModel.id)
            break
        case ROLE_LIST.SELLER:
            await sellerDal_add(userModel.id)
            break
        case ROLE_LIST.STAFF:
            await staffDal_add(userModel.id)
            break
        default:
            break
    }
    return userModel
}
