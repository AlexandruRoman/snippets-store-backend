import { Schema, Document, Model, model } from 'mongoose'

export interface ITemplateTag {
    name: string
}

export interface ITemplateTagModel extends ITemplateTag, Document {}

export let TemplateTagSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
})

export const TemplateTag: Model<ITemplateTagModel> = model<ITemplateTagModel>('TemplateTag', TemplateTagSchema)
