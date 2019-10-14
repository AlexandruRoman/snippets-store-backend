import { Schema, Document, Model, model } from 'mongoose'

export interface ISnippetStatus {
    name: string
}

export interface ISnippetStatusModel extends ISnippetStatus, Document {}

export let SnippetStatusSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const SnippetStatus: Model<ISnippetStatusModel> = model<ISnippetStatusModel>(
    'SnippetStatus',
    SnippetStatusSchema
)
