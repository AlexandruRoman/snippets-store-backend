import { Seller, ISeller } from './schema'
import { Types } from 'mongoose'

export async function sellerDal_add(userId: string) {
    try {
        const sellerModel: ISeller = {
            user: Types.ObjectId(userId)
        }
        const seller = new Seller(sellerModel)
        await seller.validate()
        await seller.save()
    } catch (error) {
        console.log(error)
        throw error
    }
}
