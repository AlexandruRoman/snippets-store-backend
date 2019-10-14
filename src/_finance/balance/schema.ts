import { Schema, Document, Model, model, Types } from 'mongoose'
import { IUser, User } from 'src/_identity/user/schema'

const user = User

export interface IBalance {
    user: Types.ObjectId | IUser
    date: Date
    amount: number
    info: string
}

export interface IBalanceModel extends IBalance, Document {}

export let BalanceSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    info: {
        type: String
    }
})

export const Balance: Model<IBalanceModel> = model<IBalanceModel>('Balance', BalanceSchema)
