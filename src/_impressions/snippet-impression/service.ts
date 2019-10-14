import { ImpressionType } from '../impression-type/schema'
import { snippetImpressionDal_add } from './dal'
import { Types } from 'mongoose'
import { SnippetImpression, ISnippetImpression, ISnippetImpressionModel } from './schema'
import IMPRESSION_TYPE_LIST from '../impression-type/list'
import { Client } from '../../_identity/client/schema'

interface ISnippetImpressionService_add {
    userId: string
    snippetId: string
    typeName: string
}
export async function snippetImpressionService_add(data: ISnippetImpressionService_add) {
    const client = await Client.findOne({ user: data.userId })
    if (!client) throw new Error('client')
    const impressionType = await ImpressionType.findOne({ name: data.typeName })
    if (!impressionType) return
    const snippetImpressionModel: ISnippetImpression = {
        client: Types.ObjectId(client.id),
        snippet: Types.ObjectId(data.snippetId),
        date: new Date(),
        type: impressionType.id
    }
    if (data.typeName == IMPRESSION_TYPE_LIST.LOVE) {
        const impression = await SnippetImpression.findOne({
            snippet: data.snippetId,
            client: client.id,
            type: impressionType.id
        })
        if (!impression) return snippetImpressionDal_add(snippetImpressionModel)
        return SnippetImpression.deleteOne({ _id: impression._id })
    }
    return snippetImpressionDal_add(snippetImpressionModel)
}

interface ISnippetImpressionService_count {
    idSnippet: string
}
export async function snippetImpressionService_count(data: ISnippetImpressionService_count) {
    const impressionTypeLove = await ImpressionType.findOne({ name: IMPRESSION_TYPE_LIST.LOVE })
    const impressionTypeView = await ImpressionType.findOne({ name: IMPRESSION_TYPE_LIST.VIEW })
    if (!impressionTypeLove) return
    if (!impressionTypeView) return
    const views = await SnippetImpression.countDocuments({ type: impressionTypeView, snippet: data.idSnippet })
    const loves = await SnippetImpression.countDocuments({ type: impressionTypeLove, snippet: data.idSnippet })
    return { views, loves }
}

interface ISnippetImpressionService_isLoved {
    userId: string
    snippetId: string
}
export async function snippetImpressionService_isLoved(data: ISnippetImpressionService_isLoved) {
    const client = await Client.findOne({ user: data.userId })
    if (!client) throw new Error('client')
    const type = await ImpressionType.findOne({ name: IMPRESSION_TYPE_LIST.LOVE })
    if (!type) throw new Error('type')
    const impression = await SnippetImpression.findOne({ snippet: data.snippetId, client: client.id, type: type.id })
    if (!impression) return false
    return true
}
