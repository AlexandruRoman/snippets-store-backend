import { Schema, Document, Model, model, Types } from 'mongoose'
import { IClient, Client } from 'src/_identity/client/schema'
import { ISnippet, Snippet } from '../snippet/schema'

const client = Client
const snippet = Snippet

export interface ISnippetComment {
    client: Types.ObjectId | IClient
    snippet: Types.ObjectId | ISnippet
    text: string
}

export interface ISnippetCommentModel extends ISnippetComment, Document {}

export let SnippetCommentSchema: Schema = new Schema({
    snippet: {
        type: Schema.Types.ObjectId,
        ref: 'Snippet',
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

export const SnippetComment: Model<ISnippetCommentModel> = model<ISnippetCommentModel>(
    'SnippetComment',
    SnippetCommentSchema
)
