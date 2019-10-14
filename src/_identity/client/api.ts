import { createRouter } from 'src/__helpers/api'
import clientEndpoint_get from './_endpoints/get'

export default function clientApi() {
    return createRouter('/client', clientEndpoint_get)
}
