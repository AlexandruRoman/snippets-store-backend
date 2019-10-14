import { createRouter } from 'src/__helpers/api'
import subscriptionEndpoint_add from './_endpoints/add'
import subscriptionEndpoint_getByClient from './_endpoints/get-by-client'

export default function subscriptionApi() {
    return createRouter('/subscription', subscriptionEndpoint_add, subscriptionEndpoint_getByClient)
}
