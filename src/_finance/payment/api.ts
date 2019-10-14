import { createRouter } from 'src/__helpers/api'
import paymentEndpoint_paySellers from './_endpoints/pay-sellers'
import paymentEndpoint_transferToAccount from './_endpoints/transfer-to-account'

export default function paymentApi() {
    return createRouter('/payment', paymentEndpoint_paySellers, paymentEndpoint_transferToAccount)
}
