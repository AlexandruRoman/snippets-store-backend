import { createRouter } from 'src/__helpers/api'
import subscriptionTypeEndpoint_getAll from './_endpoints/get-all'

export default function subscriptionTypeApi() {
    return createRouter('/subscription-type', subscriptionTypeEndpoint_getAll)
}
