import { Schema, Document, Model, model, Types } from 'mongoose'
import { IUser, User } from '../user/schema'

const user = User

export interface ISeller {
    user: Types.ObjectId | IUser
}

export interface ISellerModel extends ISeller, Document {}

export let SellerSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
})

export const Seller: Model<ISellerModel> = model<ISellerModel>('Seller', SellerSchema)
