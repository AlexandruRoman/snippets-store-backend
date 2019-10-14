import { ImpressionType } from '../impression-type/schema'
import { templateImpressionDal_add } from './dal'
import { Types } from 'mongoose'
import { TemplateImpression, ITemplateImpression, ITemplateImpressionModel } from './schema'
import IMPRESSION_TYPE_LIST from '../impression-type/list'
import { Template } from '../../_products/template/schema'
import { Client } from '../../_identity/client/schema'

interface ITemplateImpressionService_add {
    userId: string
    templateId: string
    typeName: string
}
export async function templateImpressionService_add(data: ITemplateImpressionService_add) {
    const client = await Client.findOne({ user: data.userId })
    if (!client) throw new Error('client')
    const impressionType = await ImpressionType.findOne({ name: data.typeName })
    if (!impressionType) return
    const templateImpressionModel: ITemplateImpression = {
        client: Types.ObjectId(client.id),
        template: Types.ObjectId(data.templateId),
        date: new Date(),
        type: impressionType.id
    }
    if (data.typeName == IMPRESSION_TYPE_LIST.LOVE) {
        const impression = await TemplateImpression.findOne({
            template: data.templateId,
            client: client.id,
            type: impressionType.id
        })
        if (!impression) return templateImpressionDal_add(templateImpressionModel)
        return TemplateImpression.deleteOne({ _id: impression._id })
    }
    return templateImpressionDal_add(templateImpressionModel)
}

interface ITemplateImpressionService_count {
    idTemplate: string
}
export async function templateImpressionService_count(data: ITemplateImpressionService_count) {
    const impressionTypeLove = await ImpressionType.findOne({ name: IMPRESSION_TYPE_LIST.LOVE })
    const impressionTypeView = await ImpressionType.findOne({ name: IMPRESSION_TYPE_LIST.VIEW })
    if (!impressionTypeLove) return
    if (!impressionTypeView) return
    const views = await TemplateImpression.countDocuments({ type: impressionTypeView, template: data.idTemplate })
    const loves = await TemplateImpression.countDocuments({ type: impressionTypeLove, template: data.idTemplate })
    return { views, loves }
}

interface ITemplateImpressionService_isLoved {
    userId: string
    templateId: string
}
export async function templateImpressionService_isLoved(data: ITemplateImpressionService_isLoved) {
    const client = await Client.findOne({ user: data.userId })
    if (!client) throw new Error('client')
    const type = await ImpressionType.findOne({ name: IMPRESSION_TYPE_LIST.LOVE })
    if (!type) throw new Error('type')
    const impression = await TemplateImpression.findOne({ template: data.templateId, client: client.id, type: type.id })
    if (!impression) return false
    return true
}
