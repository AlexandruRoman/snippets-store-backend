import { ITemplateComment, TemplateComment } from './schema'

export async function templateCommentDal_add(data: ITemplateComment) {
    const templateComment = new TemplateComment(data)
    await templateComment.validate()
    return templateComment.save()
}
