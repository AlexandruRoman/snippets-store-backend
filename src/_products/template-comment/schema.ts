import { Schema, Document, Model, model, Types } from 'mongoose'
import { IClient, Client } from 'src/_identity/client/schema'
import { ITemplate, Template } from '../template/schema'

const client = Client
const template = Template

export interface ITemplateComment {
    client: Types.ObjectId | IClient
    template: Types.ObjectId | ITemplate
    text: string
}

export interface ITemplateCommentModel extends ITemplateComment, Document {}

export let TemplateCommentSchema: Schema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    template: {
        type: Schema.Types.ObjectId,
        ref: 'Template',
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

export const TemplateComment: Model<ITemplateCommentModel> = model<ITemplateCommentModel>(
    'TemplateComment',
    TemplateCommentSchema
)
