import { Schema, Document, Model, model, Types } from 'mongoose'
import { ISeller, Seller } from 'src/_identity/seller/schema'
import { ITemplateTag, TemplateTag } from '../template-tag/schema'

const seller = Seller
const tag = TemplateTag

export interface ITemplate {
    seller: Types.ObjectId | ISeller
    templateTags: (Types.ObjectId | ITemplateTag)[]
    images: string[]
    name: string
    description: string
}

export interface ITemplateModel extends ITemplate, Document {}

export let TemplateSchema: Schema = new Schema({
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    templateTags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'TemplateTag',
            required: true
        }
    ],
    images: [
        {
            type: String,
            required: true
        }
    ],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

export const Template: Model<ITemplateModel> = model<ITemplateModel>('Template', TemplateSchema)
