import { Subscription } from '../subscription/schema'
import { SubscriptionType } from '../subscription-type/schema'
import { SnippetImpression } from 'src/_impressions/snippet-impression/schema'
import IMPRESSION_TYPE_LIST from 'src/_impressions/impression-type/list'
import { IImpressionType } from 'src/_impressions/impression-type/schema'
import { ISnippet, ISnippetModel } from 'src/_products/snippet/schema'
import { Seller } from 'src/_identity/seller/schema'
import { balanceDal_add } from '../balance/dal'
import { Types } from 'mongoose'
import { balanceService_getCurrent } from '../balance/service'
import { todayQuery } from 'src/__helpers/mongoose'

export async function paymentService_pay() {
    //cauta subscriptiile finalizate
    const subscriptions = await Subscription.find({ endDate: todayQuery() })
    if (!subscriptions) return
    for (let subscription of subscriptions) {
        const subscriptionType = await SubscriptionType.findById(subscription.type)
        if (!subscriptionType) continue
        const price = subscriptionType.price
        const impressions = await SnippetImpression.find({
            date: { $gte: subscription.startDate, $lte: subscription.endDate }
        })
            .populate('type')
            .populate('snippet')
        if (!impressions) continue
        const viewsNumber = impressions.filter(x => (x.type as IImpressionType).name == IMPRESSION_TYPE_LIST.VIEW)
            .length
        const lovesNumber = impressions.filter(x => (x.type as IImpressionType).name == IMPRESSION_TYPE_LIST.LOVE)
            .length

        const snippets = impressions
            .map(x => x.snippet as ISnippetModel)
            .filter((value, index, self) => self.findIndex(x => x.id == value.id) === index)
        if (!snippets) continue
        for (let snippet of snippets) {
            const isLoved =
                impressions.findIndex(
                    x =>
                        (x.type as IImpressionType).name == IMPRESSION_TYPE_LIST.LOVE &&
                        (x.snippet as ISnippetModel).id == snippet.id
                ) != -1
                    ? 1
                    : 0
            const isViewed =
                impressions.findIndex(
                    x =>
                        (x.type as IImpressionType).name == IMPRESSION_TYPE_LIST.VIEW &&
                        (x.snippet as ISnippetModel).id == snippet.id
                ) != -1
                    ? 1
                    : 0
            const money = (price * 0.5 * (isViewed + 5 * isLoved)) / (viewsNumber + 5 * lovesNumber)
            //send money to owner
            paymentService_receive({ money, idSeller: (snippet.seller as Types.ObjectId).toHexString() })
        }
    }
}

interface IPaymentService_receive {
    money: number
    idSeller: string
}
export async function paymentService_receive(data: IPaymentService_receive) {
    const seller = await Seller.findById(data.idSeller)
    if (!seller) return
    const balance = await balanceDal_add({ amount: data.money, user: seller.user, date: new Date(), info: '' })
}

interface IPaymentService_transfer {
    idUser: string
    amount: number
    iban: string
}
export async function paymentService_transfer(data: IPaymentService_transfer) {
    const current = await balanceService_getCurrent({ idUser: data.idUser })
    if (current < data.amount) throw Error('Not enough money')
    return balanceDal_add({
        amount: -data.amount,
        date: new Date(),
        user: Types.ObjectId(data.idUser),
        info: 'IBAN: ' + data.iban
    })
}
