import { Schema, Document, Model, model, Types } from 'mongoose'
import { Permission, IPermission } from '../permission/schema'

const permisson = Permission

export interface IRole {
    name: string
    permissions: (Types.ObjectId | IPermission)[]
}

export interface IRoleModel extends IRole, Document {}

export let RoleSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    permissions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Permission',
            required: true
        }
    ]
})

export const Role: Model<IRoleModel> = model<IRoleModel>('Role', RoleSchema)
