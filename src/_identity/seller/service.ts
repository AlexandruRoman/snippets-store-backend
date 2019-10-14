import { userDal_add } from '../user/dal'
import ROLE_LIST from '../role/list'
import { sellerDal_add } from './dal'
import { paymentGateway } from 'src/_finance/braintree/gateway'
import * as braintree from 'braintree'

interface ISellerService_add {
    name: string
    password: string
    email: string
}
export async function sellerService_add(data: ISellerService_add) {
    const userModel = await userDal_add({
        email: data.email,
        name: data.name,
        password: data.password,
        role: ROLE_LIST.SELLER
    })
    if (!userModel) return
    return sellerDal_add(userModel.id)
}
