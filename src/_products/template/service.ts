import { Seller } from 'src/_identity/seller/schema'
import { templateDal_add, templateDal_getPopulated } from './dal'
import { Types } from 'mongoose'
import { Snippet } from '../snippet/schema'
import { Template } from './schema'
import { TemplateImpression } from 'src/_impressions/template-impression/schema'
import { TemplateComment } from '../template-comment/schema'

interface ITemplateService_add {
    userId: string
    name: string
    description: string
    tagIds: string[]
    images: string[]
}
export async function templateService_add(data: ITemplateService_add) {
    const seller = await Seller.findOne({ user: data.userId })
    if (!seller) throw Error('You are not a valid seller!')
    return templateDal_add({
        seller: Types.ObjectId(seller.id),
        templateTags: data.tagIds.map(Types.ObjectId),
        description: data.description,
        name: data.name,
        images: data.images
    })
}

export async function templateService_delete(id: string) {
    await Snippet.deleteMany({ template: id })
    await TemplateImpression.deleteMany({ template: id })
    await TemplateComment.deleteMany({ template: id })
    return Template.deleteOne({ _id: id })
}

interface ITemplateService_getMine {
    idUser: string
}
export async function templateService_getMine(data: ITemplateService_getMine) {
    const seller = await Seller.findOne({ user: data.idUser })
    if (!seller) throw Error('Seller not found')
    return templateDal_getPopulated({ seller: seller.id })
}
