import { ISnippetComment, SnippetComment } from './schema'

export async function snippetCommentDal_add(data: ISnippetComment) {
    const snippetComment = new SnippetComment(data)
    await snippetComment.validate()
    return snippetComment.save()
}
