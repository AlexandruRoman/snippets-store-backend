import { createRouter } from 'src/__helpers/api'
import snippetImpressionEndpoint_love from './_endpoints/love'
import snippetImpressionEndpoint_view from './_endpoints/view'
import snippetImpressionEndpoint_getCountsBySnippet from './_endpoints/get-counts-by-snippet'
import snippetImpressionEndpoint_isLoved from './_endpoints/is-loved'

export default function snippetImpressionApi() {
    return createRouter(
        '/snippet-impression',
        snippetImpressionEndpoint_love,
        snippetImpressionEndpoint_view,
        snippetImpressionEndpoint_getCountsBySnippet,
        snippetImpressionEndpoint_isLoved
    )
}
