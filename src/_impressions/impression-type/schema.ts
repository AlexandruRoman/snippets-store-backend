import { Schema, Document, Model, model } from 'mongoose'

export interface IImpressionType {
    name: string
}

export interface IImpressionTypeModel extends IImpressionType, Document {}

export let ImpressionTypeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

export const ImpressionType: Model<IImpressionTypeModel> = model<IImpressionTypeModel>(
    'ImpressionType',
    ImpressionTypeSchema
)
