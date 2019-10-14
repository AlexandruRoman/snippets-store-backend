import { Types } from 'mongoose'
import { IStaff, Staff } from './schema'

export async function staffDal_add(userId: string) {
    try {
        const staffModel: IStaff = {
            user: Types.ObjectId(userId)
        }
        const staff = new Staff(staffModel)
        await staff.validate()
        return staff.save()
    } catch (error) {
        console.log(error)
        throw error
    }
}
