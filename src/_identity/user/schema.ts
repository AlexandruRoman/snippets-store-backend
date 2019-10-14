import { Schema, Document, Model, model, Types } from 'mongoose'
import { IRole, Role } from '../role/schema'

const role = Role

export interface IUser {
    name: string
    email: string
    password: string
    role: Types.ObjectId | IRole
}

export interface IUserModel extends IUser, Document {}

export let UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    }
})

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema)
