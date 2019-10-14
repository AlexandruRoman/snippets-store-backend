import { userDal_add } from '../user/dal'
import ROLE_LIST from '../role/list'
import { clientDal_add } from './dal'

interface IClientService_add {
    name: string
    password: string
    email: string
}
export async function clientService_add(data: IClientService_add) {
    const userModel = await userDal_add({
        email: data.email,
        name: data.name,
        password: data.password,
        role: ROLE_LIST.CLIENT
    })
    if (!userModel) return
    return clientDal_add(userModel.id)
}
