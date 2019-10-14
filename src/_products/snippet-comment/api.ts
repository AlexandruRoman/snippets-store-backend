import { createRouter } from 'src/__helpers/api'
import snippetCommentEndpoint_add from './_endpoints/add'
import snippetCommentEndpoint_getBySnippet from './_endpoints/get-by-snippet'

export default function snippetCommentApi() {
    return createRouter('/snippet-comment', snippetCommentEndpoint_add, snippetCommentEndpoint_getBySnippet)
}
