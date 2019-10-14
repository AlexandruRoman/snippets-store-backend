import { createRouter } from 'src/__helpers/api'
import braintreeEndpoint_getToken from './_endpoints/get-token'

export default function braintreeApi() {
    return createRouter('/braintree', braintreeEndpoint_getToken)
}
