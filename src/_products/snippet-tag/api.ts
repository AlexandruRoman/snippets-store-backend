import { createRouter } from 'src/__helpers/api'
import snippetTagEndpoint_add from './_endpoints/add'
import snippetTagEndpoint_delete from './_endpoints/delete'
import snippetTagEndpoint_get from './_endpoints/get'
import snippetTagEndpoint_getAll from './_endpoints/get-all'
import snippetTagEndpoint_update from './_endpoints/update'

export default function snippetTagApi() {
    return createRouter(
        '/snippet-tag',
        snippetTagEndpoint_add,
        snippetTagEndpoint_delete,
        snippetTagEndpoint_get,
        snippetTagEndpoint_getAll,
        snippetTagEndpoint_update
    )
}
