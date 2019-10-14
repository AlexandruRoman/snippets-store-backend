import { Schema, Document, Model, model, Types } from 'mongoose'
import { IClient, Client } from 'src/_identity/client/schema'
import { IBalance, Balance } from '../balance/schema'
import { ISubscriptionType, SubscriptionType } from '../subscription-type/schema'

const client = Client
const balance = Balance
const subscriptionType = SubscriptionType

export interface ISubscription {
    client: Types.ObjectId | IClient
    balance: Types.ObjectId | IBalance
    type: Types.ObjectId | ISubscriptionType
    startDate: Date
    endDate: Date
}

export interface ISubscriptionModel extends ISubscription, Document {}

export let SubscriptionSchema: Schema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    balance: {
        type: Schema.Types.ObjectId,
        ref: 'Balance',
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'SubscriptionType',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
})

export const Subscription: Model<ISubscriptionModel> = model<ISubscriptionModel>('Subscription', SubscriptionSchema)
