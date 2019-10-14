import { Schema, Document, Model, model } from 'mongoose'

export interface IPermission {
    name: string
}

export interface IPermissionModel extends IPermission, Document {}

export let PermissionSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    }
})

export const Permission: Model<IPermissionModel> = model<IPermissionModel>('Permission', PermissionSchema)
