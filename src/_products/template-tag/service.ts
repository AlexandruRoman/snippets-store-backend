import { TemplateTag } from './schema'

export async function templateTagService_delete(id: string) {
    return TemplateTag.deleteOne({ _id: id })
}
