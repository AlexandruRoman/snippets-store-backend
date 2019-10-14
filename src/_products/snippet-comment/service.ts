import { Client } from 'src/_identity/client/schema'
import { snippetCommentDal_add } from './dal'
import { Types } from 'mongoose'

interface ISnippetCommentService_add {
    idUser: string
    idSnippet: string
    text: string
}
export async function snippetCommentService_add(data: ISnippetCommentService_add) {
    const client = await Client.findOne({ user: data.idUser })
    if (!client) throw Error('No client found.')
    return snippetCommentDal_add({ client: client.id, snippet: Types.ObjectId(data.idSnippet), text: data.text })
}
