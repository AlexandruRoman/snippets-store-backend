import { ITemplateImpression, TemplateImpression } from './schema'

export async function templateImpressionDal_add(data: ITemplateImpression) {
    const templateImpression = new TemplateImpression(data)
    await templateImpression.validate()
    return templateImpression.save()
}
