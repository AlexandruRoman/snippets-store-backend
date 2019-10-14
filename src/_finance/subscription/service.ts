import { Client } from 'src/_identity/client/schema'
import { subscriptionDal_add } from './dal'
import { Types } from 'mongoose'
import { SubscriptionType } from '../subscription-type/schema'
import { balanceDal_add } from '../balance/dal'
import { paymentGateway } from '../braintree/gateway'
import { Subscription } from './schema'
import * as moment from 'moment'

interface ISubscriptionService_add {
    userId: string
    subscriptionTypeId: string
    nonce: string
}
export async function subscriptionService_add(data: ISubscriptionService_add) {
    try {
        const client = await Client.findOne({ user: data.userId })
        if (!client) return

        const subscriptionType = await SubscriptionType.findById(data.subscriptionTypeId)
        if (!subscriptionType) return

        // braintree
        const paymentResponse = await paymentGateway.transaction.sale({
            amount: '' + subscriptionType.price,
            paymentMethodNonce: data.nonce,
            options: {
                submitForSettlement: true
            }
        })

        if (!paymentResponse.success) return

        const startDate = moment().toDate()
        const endDate = moment()
            .add(subscriptionType.days - 1, 'days')
            .endOf('day')
            .toDate()

        const balance = await balanceDal_add({
            amount: subscriptionType.price,
            info: '',
            date: startDate,
            user: Types.ObjectId(data.userId)
        })

        return subscriptionDal_add({
            type: Types.ObjectId(data.subscriptionTypeId),
            client: Types.ObjectId(client.id),
            balance: Types.ObjectId(balance.id),
            startDate,
            endDate
        })
    } catch (error) {
        console.log(error)
    }
}

interface ISubscriptionService_getByClient {
    idUser: string
}
export async function subscriptionService_getByClient(data: ISubscriptionService_getByClient) {
    const client = await Client.findOne({ user: data.idUser })
    if (!client) throw Error('No client found')
    return Subscription.find({ client: client.id }).populate('type')
}
