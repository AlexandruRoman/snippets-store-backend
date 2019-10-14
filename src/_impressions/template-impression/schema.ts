import { Schema, Document, Model, model, Types } from 'mongoose'
import { IClient, Client } from 'src/_identity/client/schema'
import { ITemplate, Template } from 'src/_products/template/schema'
import { IImpressionType, ImpressionType } from '../impression-type/schema'

const client = Client
const template = Template
const impressionType = ImpressionType

export interface ITemplateImpression {
    client: Types.ObjectId | IClient
    template: Types.ObjectId | ITemplate
    date: Date
    type: Types.ObjectId | IImpressionType
}

export interface ITemplateImpressionModel extends ITemplateImpression, Document {}

export let TemplateImpressionSchema: Schema = new Schema({
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
    date: {
        type: Date,
        required: true
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'ImpressionType',
        required: true
    }
})

export const TemplateImpression: Model<ITemplateImpressionModel> = model<ITemplateImpressionModel>(
    'TemplateImpression',
    TemplateImpressionSchema
)
