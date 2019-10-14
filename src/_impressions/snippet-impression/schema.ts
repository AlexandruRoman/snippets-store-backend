import { Schema, Document, Model, model, Types } from 'mongoose'
import { IClient, Client } from 'src/_identity/client/schema'
import { ISnippet, Snippet, ISnippetModel } from 'src/_products/snippet/schema'
import { IImpressionType, ImpressionType } from '../impression-type/schema'

const client = Client
const snippet = Snippet
const impressionType = ImpressionType

export interface ISnippetImpression {
    client: Types.ObjectId | IClient
    snippet: Types.ObjectId | ISnippetModel
    date: Date
    type: Types.ObjectId | IImpressionType
}

export interface ISnippetImpressionModel extends ISnippetImpression, Document {}

export let SnippetImpressionSchema: Schema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    snippet: {
        type: Schema.Types.ObjectId,
        ref: 'Snippet',
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

export const SnippetImpression: Model<ISnippetImpressionModel> = model<ISnippetImpressionModel>(
    'SnippetImpression',
    SnippetImpressionSchema
)
