import { createRouter } from 'src/__helpers/api'
import templateImpressionEndpoint_love from './_endpoints/love'
import templateImpressionEndpoint_view from './_endpoints/view'
import templateImpressionEndpoint_getCountsByTemplate from './_endpoints/get-counts-by-template'
import templateImpressionEndpoint_isLoved from './_endpoints/is-loved'

export default function templateImpressionApi() {
    return createRouter(
        '/template-impression',
        templateImpressionEndpoint_love,
        templateImpressionEndpoint_view,
        templateImpressionEndpoint_getCountsByTemplate,
        templateImpressionEndpoint_isLoved
    )
}
