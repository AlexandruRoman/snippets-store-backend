import { Schema, Document, Model, model, Types } from 'mongoose'
import { IUser, User } from '../user/schema'

const user = User

export interface IClient {
    user: Types.ObjectId | IUser
}

export interface IClientModel extends IClient, Document {}

export let ClientSchema: Schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
})

export const Client: Model<IClientModel> = model<IClientModel>('Client', ClientSchema)
