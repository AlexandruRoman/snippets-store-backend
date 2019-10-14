import { createRouter } from './__helpers/api'
import authApi from './_identity/auth/api'
import clientApi from './_identity/client/api'
import staffApi from './_identity/staff/api'
import snippetApi from './_products/snippet/api'
import snippetTagApi from './_products/snippet-tag/api'
import templateApi from './_products/template/api'
import templateTagApi from './_products/template-tag/api'
import snippetImpressionApi from './_impressions/snippet-impression/api'
import templateImpressionApi from './_impressions/template-impression/api'
import braintreeApi from './_finance/braintree/api'
import subscriptionApi from './_finance/subscription/api'
import balanceApi from './_finance/balance/api'
import paymentApi from './_finance/payment/api'
import snippetCommentApi from './_products/snippet-comment/api'
import templateCommentApi from './_products/template-comment/api'
import subscriptionTypeApi from './_finance/subscription-type/api'

export default function indexApi() {
    return createRouter(
        '/',
        authApi,
        clientApi,
        staffApi,
        snippetApi,
        snippetTagApi,
        snippetCommentApi,
        templateApi,
        templateTagApi,
        templateCommentApi,
        snippetImpressionApi,
        templateImpressionApi,
        braintreeApi,
        subscriptionApi,
        balanceApi,
        paymentApi,
        subscriptionTypeApi
    )
}
