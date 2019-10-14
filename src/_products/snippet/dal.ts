import { ISnippet, Snippet } from './schema'
import { Types } from 'mongoose'
import { SnippetStatus } from '../snippet-status/schema'
import SNIPPET_STATUS_LIST from '../snippet-status/list'

export async function snippetDal_add(data: ISnippet) {
    const snippet = new Snippet(data)
    await snippet.validate()
    return snippet.save()
}

export function snippetDal_getPopulated(conditions: any) {
    return Snippet.find(conditions)
        .populate('template')
        .populate({
            path: 'seller',
            populate: { path: 'user' }
        })
        .populate('snippetTags')
        .populate('status')
}

export function snippetDal_getByIdPopulated(id: string) {
    return Snippet.findById(id)
        .populate('template')
        .populate({
            path: 'seller',
            populate: { path: 'user' }
        })
        .populate('snippetTags')
        .populate('status')
}

interface ISnippetDal_getFiltered {
    tagIds?: string[]
    sellerIds?: string[]
    templateIds?: string[]
    statusIds?: string[]
    page?: number
    perPage?: number
}
export async function snippetDal_getFiltered(filters: ISnippetDal_getFiltered) {
    const status = await SnippetStatus.findOne({ name: SNIPPET_STATUS_LIST.ACCEPTED })
    if (!status) throw new Error('staus')
    const conditions: any = {}
    if (filters.tagIds && filters.tagIds.length > 0)
        conditions.snippetTags = {
            $in: filters.tagIds
        }
    if (filters.sellerIds && filters.sellerIds.length > 0)
        conditions.seller = {
            $in: filters.sellerIds
        }
    if (filters.templateIds && filters.templateIds.length > 0)
        conditions.template = {
            $in: filters.templateIds
        }
    conditions.status = status._id
    let page = filters.page ? filters.page : 1
    let perPage = filters.perPage ? filters.perPage : 100
    return snippetDal_getPopulated(conditions)
        .skip((page - 1) * perPage)
        .limit(perPage)
}

interface ISnippetDal_update {
    id: string
    name?: string
    code?: string
    description?: string
    tagIds?: string[]
    images?: string[]
}
export async function snippetDal_update(data: ISnippetDal_update) {
    const status = await SnippetStatus.findOne({ name: SNIPPET_STATUS_LIST.PROPOSED })
    if (!status) throw Error('Wrong status')
    let snippet = await Snippet.findById(data.id)
    if (!snippet) throw Error('Wrong snippet')
    snippet.status = Types.ObjectId(status.id)
    if (data.name) snippet.name = data.name
    if (data.code) snippet.code = data.code
    if (data.description) snippet.description = data.description
    if (data.tagIds) snippet.snippetTags = data.tagIds.map(Types.ObjectId)
    if (data.images) snippet.images = data.images
    await snippet.validate()
    return snippet.save()
}

interface ISnippetDal_updateStatus {
    id: string
    status: string
}
export async function snippetDal_updateStatus(data: ISnippetDal_updateStatus) {
    const status = await SnippetStatus.findOne({ name: data.status })
    if (!status) throw Error('Wrong status')
    let snippet = await Snippet.findById(data.id)
    if (!snippet) throw Error('Wrong snippet')
    snippet.status = Types.ObjectId(status.id)
    await snippet.validate()
    return snippet.save()
}
