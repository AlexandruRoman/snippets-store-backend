import { ISnippetImpression, SnippetImpression } from './schema'

export async function snippetImpressionDal_add(data: ISnippetImpression) {
    const snippetImpression = new SnippetImpression(data)
    await snippetImpression.validate()
    return snippetImpression.save()
}
