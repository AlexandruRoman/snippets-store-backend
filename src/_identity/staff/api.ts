import { createRouter } from 'src/__helpers/api'
import staffEndpoint_add from './_endpoints/add'

export default function staffApi() {
    return createRouter('/staff', staffEndpoint_add)
}
