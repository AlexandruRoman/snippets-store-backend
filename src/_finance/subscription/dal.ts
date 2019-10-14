import { ISubscription, Subscription } from './schema'

export async function subscriptionDal_add(data: ISubscription) {
    const subscription = new Subscription(data)
    await subscription.validate()
    return subscription.save()
}
