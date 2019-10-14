import * as braintree from 'braintree'

export const paymentGateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: 'p4zg5b9xgf9qpm4f',
    publicKey: 'c4n7932t87rf2qbx',
    privateKey: 'bd5e7e8d95ecf0bf238b77d53c51f56f'
})
