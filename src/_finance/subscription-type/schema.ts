import { Schema, Document, Model, model } from 'mongoose'

export interface ISubscriptionType {
    name: number
    days: number
    price: number
}

export interface ISubscriptionTypeModel extends ISubscriptionType, Document {}

export let SubscriptionTypeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    days: {
        type: Number,
        required: true
    }
})

export const SubscriptionType: Model<ISubscriptionTypeModel> = model<ISubscriptionTypeModel>(
    'SubscriptionType',
    SubscriptionTypeSchema
)
