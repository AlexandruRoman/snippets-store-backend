import { Schema, Document, Model, model, Types } from 'mongoose'
import { ITemplate, Template } from '../template/schema'
import { ISeller, Seller } from 'src/_identity/seller/schema'
import { ISnippetStatus, SnippetStatus } from '../snippet-status/schema'
import { SnippetTag, ISnippetTag } from '../snippet-tag/schema'

const template = Template
const seller = Seller
const tag = SnippetTag
const snippetStatus = SnippetStatus

export interface ISnippet {
    template: Types.ObjectId | ITemplate
    seller: Types.ObjectId | ISeller
    name: string
    code: string
    description: string
    images: string[]
    snippetTags: (Types.ObjectId | ISnippetTag)[]
    status: Types.ObjectId | ISnippetStatus
}

export interface ISnippetModel extends ISnippet, Document {}

export let SnippetSchema: Schema = new Schema({
    template: {
        type: Schema.Types.ObjectId,
        ref: 'Template',
        required: true
    },
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    snippetTags: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SnippetTag',
            required: true
        }
    ],
    status: {
        type: Schema.Types.ObjectId,
        ref: 'SnippetStatus',
        required: true
    }
})

export const Snippet: Model<ISnippetModel> = model<ISnippetModel>('Snippet', SnippetSchema)
