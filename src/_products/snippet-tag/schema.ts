import { Schema, Document, Model, model } from 'mongoose'

export interface ISnippetTag {
    name: string
}

export interface ISnippetTagModel extends ISnippetTag, Document {}

export let SnippetTagSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    }
})

export const SnippetTag: Model<ISnippetTagModel> = model<ISnippetTagModel>('SnippetTag', SnippetTagSchema)
