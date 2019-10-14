import { createRouter } from 'src/__helpers/api'
import templateTagEndpoint_add from './_endpoints/add'
import templateTagEndpoint_delete from './_endpoints/delete'
import templateTagEndpoint_get from './_endpoints/get'
import templateTagEndpoint_getAll from './_endpoints/get-all'
import templateTagEndpoint_update from './_endpoints/update'

export default function templateTagApi() {
    return createRouter(
        '/template-tag',
        templateTagEndpoint_add,
        templateTagEndpoint_delete,
        templateTagEndpoint_get,
        templateTagEndpoint_getAll,
        templateTagEndpoint_update
    )
}
