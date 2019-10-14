import { ITemplateTag, TemplateTag } from './schema'

export async function templateTagDal_add(name: string) {
    const templateTagModel: ITemplateTag = {
        name
    }
    const templateTag = new TemplateTag(templateTagModel)
    await templateTag.validate()
    return templateTag.save()
}

export async function templateTagDal_update(id: string, name: string) {
    const templateTag = await TemplateTag.findById(id)
    if (!templateTag) return
    templateTag.name = name
    return templateTag.save()
}
