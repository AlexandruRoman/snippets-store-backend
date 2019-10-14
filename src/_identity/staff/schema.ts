import { Schema, Document, Model, model, Types } from 'mongoose'
import { IUser, User } from '../user/schema'

const user = User

export interface IStaff {
    user: Types.ObjectId | IUser
}

export interface IStaffModel extends IStaff, Document {}

export let StaffSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
})

export const Staff: Model<IStaffModel> = model<IStaffModel>('Staff', StaffSchema)
