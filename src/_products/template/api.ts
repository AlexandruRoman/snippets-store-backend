import { createRouter } from 'src/__helpers/api'
import templateEndpoint_add from './_endpoints/add'
import templateEndpoint_delete from './_endpoints/delete'
import templateEndpoint_get from './_endpoints/get'
import templateEndpoint_getFiltered from './_endpoints/get-filtered'
import templateEndpoint_update from './_endpoints/update'
import templateEndpoint_getMine from './_endpoints/get-mine'

export default function templateApi() {
    return createRouter(
        '/template',
        templateEndpoint_add,
        templateEndpoint_delete,
        templateEndpoint_getMine,
        templateEndpoint_get,
        templateEndpoint_getFiltered,
        templateEndpoint_update
    )
}
