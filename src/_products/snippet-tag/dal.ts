import { ISnippetTag, SnippetTag } from './schema'

export async function snippetTagDal_add(name: string) {
    const snippetTagModel: ISnippetTag = {
        name
    }
    const snippetTag = new SnippetTag(snippetTagModel)
    await snippetTag.validate()
    return snippetTag.save()
}

export async function snippetTagDal_update(id: string, name: string) {
    const snippetTag = await SnippetTag.findById(id)
    if (!snippetTag) return
    snippetTag.name = name
    return snippetTag.save()
}
