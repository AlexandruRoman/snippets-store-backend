import { staffDal_add } from './dal'
import { userDal_add } from '../user/dal'
import ROLE_LIST from '../role/list'

interface IStaffService_add {
    name: string
    password: string
    email: string
}
export async function staffService_add(data: IStaffService_add) {
    const userModel = await userDal_add({
        email: data.email,
        name: data.name,
        password: data.password,
        role: ROLE_LIST.STAFF
    })
    if (!userModel) return
    return staffDal_add(userModel.id)
}
