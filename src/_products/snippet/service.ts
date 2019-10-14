import { Seller } from 'src/_identity/seller/schema'
import { snippetDal_add, snippetDal_getPopulated } from './dal'
import { SnippetStatus } from '../snippet-status/schema'
import { Types } from 'mongoose'
import { SnippetImpression } from 'src/_impressions/snippet-impression/schema'
import { Snippet } from './schema'
import { SnippetComment } from '../snippet-comment/schema'

interface ISnippetService_add {
    idTemplate: string
    idUser: string
    status: string
    name: string
    code: string
    description: string
    tags: string[]
    images: string[]
}
export async function snippetService_add(data: ISnippetService_add) {
    const seller = await Seller.findOne({ user: data.idUser })
    if (!seller) throw Error('You are not a valid seller!')
    const status = await SnippetStatus.findOne({ name: data.status })
    if (!status) throw Error('Not a valid status!')
    return snippetDal_add({
        code: data.code,
        description: data.description,
        name: data.name,
        seller: Types.ObjectId(seller.id),
        status: Types.ObjectId(status.id),
        snippetTags: data.tags.map(Types.ObjectId),
        template: Types.ObjectId(data.idTemplate),
        images: data.images
    })
}

export async function snippetService_delete(id: string) {
    await SnippetImpression.deleteMany({ snippet: id })
    await SnippetComment.deleteMany({ snippet: id })
    return Snippet.deleteOne({ _id: id })
}

interface ISnippetService_getMine {
    userId: string
}
export async function snippetService_getMine(data: ISnippetService_getMine) {
    const seller = await Seller.findOne({ user: data.userId })
    if (!seller) throw new Error('seller')
    return snippetDal_getPopulated({ seller: seller._id })
}
