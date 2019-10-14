import { createRouter } from 'src/__helpers/api'
import snippetEndpoint_add from './_endpoints/add'
import snippetEndpoint_detele from './_endpoints/detele'
import snippetEndpoint_getFiltered from './_endpoints/get-filtered'
import snippetEndpoint_get from './_endpoints/get'
import snippetEndpoint_update from './_endpoints/update'
import snippetEndpoint_updateStatus from './_endpoints/update-status'
import snippetEndpoint_getByTemplate from './_endpoints/get-by-template'
import snippetEndpoint_getMine from './_endpoints/get-mine'
import snippetEndpoint_getForStaff from './_endpoints/get-for-staff'

export default function snippetApi() {
    return createRouter(
        '/snippet',
        snippetEndpoint_add,
        snippetEndpoint_detele,
        snippetEndpoint_getMine,
        snippetEndpoint_getForStaff,
        snippetEndpoint_getFiltered,
        snippetEndpoint_get,
        snippetEndpoint_update,
        snippetEndpoint_updateStatus,
        snippetEndpoint_getByTemplate
    )
}
