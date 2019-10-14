import { createRouter } from 'src/__helpers/api'
import balanceEndpoint_getByUser from './_endpoints/get-by-user'
import balanceEndpoint_getCurrent from './_endpoints/get-current'

export default function balanceApi() {
    return createRouter('/balance', balanceEndpoint_getByUser, balanceEndpoint_getCurrent)
}
