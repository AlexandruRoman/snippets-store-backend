import { Client, IClient } from './schema'
import { Types } from 'mongoose'

export async function clientDal_add(userId: string) {
    try {
        const clientModel: IClient = {
            user: Types.ObjectId(userId)
        }
        const client = new Client(clientModel)
        await client.validate()
        await client.save()
    } catch (error) {
        console.log(error)
        throw error
    }
}
