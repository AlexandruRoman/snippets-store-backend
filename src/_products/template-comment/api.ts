import { createRouter } from 'src/__helpers/api'
import templateCommentEndpoint_add from './_endpoints/add'
import templateCommentEndpoint_getByTemplate from './_endpoints/get-by-template'

export default function templateCommentApi() {
    return createRouter('/template-comment', templateCommentEndpoint_add, templateCommentEndpoint_getByTemplate)
}
