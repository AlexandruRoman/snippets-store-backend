import { ITemplate, Template } from './schema'
import { Types } from 'mongoose'

export async function templateDal_add(data: ITemplate) {
    const template = new Template(data)
    await template.validate()
    return template.save()
}

export function templateDal_getPopulated(conditions: any) {
    return Template.find(conditions)
        .populate('templateTags')
        .populate({
            path: 'seller',
            populate: { path: 'user' }
        })
}

export function templateDal_getByIdPopulated(id: string) {
    return Template.findById(id)
        .populate('templateTags')
        .populate({
            path: 'seller',
            populate: { path: 'user' }
        })
}

interface ITemplateDal_getFiltered {
    tagIds?: string[]
    page?: number
    perPage?: number
}
export async function templateDal_getFiltered(filters: ITemplateDal_getFiltered) {
    const conditions: any = {}
    if (filters.tagIds && filters.tagIds.length > 0)
        conditions.templateTags = {
            $in: filters.tagIds
        }
    let page = filters.page ? filters.page : 1
    let perPage = filters.perPage ? filters.perPage : 100
    return templateDal_getPopulated(conditions)
        .skip((page - 1) * perPage)
        .limit(perPage)
}

interface ITemplateDal_update {
    id: string
    name?: string
    description?: string
    tagIds?: string[]
    images?: string[]
}
export async function templateDal_update(data: ITemplateDal_update) {
    let template = await Template.findById(data.id)
    if (!template) return
    if (data.name) template.name = data.name
    if (data.description) template.description = data.description
    if (data.tagIds) template.templateTags = data.tagIds.map(Types.ObjectId)
    if (data.images) template.images = data.images
    await template.validate()
    return template.save()
}
