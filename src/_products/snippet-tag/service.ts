import { SnippetTag } from './schema'

export async function snippetTagService_delete(id: string) {
    return SnippetTag.deleteOne({ _id: id })
}
