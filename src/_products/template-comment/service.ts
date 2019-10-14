import { Client } from 'src/_identity/client/schema'
import { ITemplateComment, TemplateComment } from './schema'
import { Types } from 'mongoose'
import { templateCommentDal_add } from './dal'

interface ITemplateCommentService_add {
    idUser: string
    idTemplate: string
    text: string
}
export async function templateCommentService_add(data: ITemplateCommentService_add) {
    const client = await Client.findOne({ user: data.idUser })
    if (!client) throw Error('No client found.')
    return templateCommentDal_add({
        client: client.id,
        template: Types.ObjectId(data.idTemplate),
        text: data.text
    })
}
