import { Router, NextFunction, Response } from 'express'
import { IPermissionRequest, checkPermission } from 'src/__helpers/api'
import * as Joi from 'joi'
import { snippetImpressionService_add } from '../service'
import IMPRESSION_TYPE_LIST from 'src/_impressions/impression-type/list'
import PERMISSION_LIST from 'src/_identity/permission/list'

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

export default function snippetImpressionEndpoint_love() {
    const router = Router()
    router.post('/love/:snippetId', checkPermission(PERMISSION_LIST.MAKE_IMPRESSION), validation, controller)
    return router
}

/*
 *    ____    ____  ___       __       __   _______       ___   .___________. __    ______   .__   __.
 *    \   \  /   / /   \     |  |     |  | |       \     /   \  |           ||  |  /  __  \  |  \ |  |
 *     \   \/   / /  ^  \    |  |     |  | |  .--.  |   /  ^  \ `---|  |----`|  | |  |  |  | |   \|  |
 *      \      / /  /_\  \   |  |     |  | |  |  |  |  /  /_\  \    |  |     |  | |  |  |  | |  . `  |
 *       \    / /  _____  \  |  `----.|  | |  '--'  | /  _____  \   |  |     |  | |  `--'  | |  |\   |
 *        \__/ /__/     \__\ |_______||__| |_______/ /__/     \__\  |__|     |__|  \______/  |__| \__|
 */

const schema = {
    snippetId: Joi.string().required()
}

async function validation(req: IRequest, res: Response, next: NextFunction) {
    const validation = Joi.validate(req.params, schema)
    if (validation.error) return res.status(400).send(validation.error)
    next()
}

/*
 *      ______   ______   .__   __. .___________..______      ______    __       __       _______ .______
 *     /      | /  __  \  |  \ |  | |           ||   _  \    /  __  \  |  |     |  |     |   ____||   _  \
 *    |  ,----'|  |  |  | |   \|  | `---|  |----`|  |_)  |  |  |  |  | |  |     |  |     |  |__   |  |_)  |
 *    |  |     |  |  |  | |  . `  |     |  |     |      /   |  |  |  | |  |     |  |     |   __|  |      /
 *    |  `----.|  `--'  | |  |\   |     |  |     |  |\  \--.|  `--'  | |  `----.|  `----.|  |____ |  |\  \--.
 *     \______| \______/  |__| \__|     |__|     | _| `.___| \______/  |_______||_______||_______|| _| `.___|
 */

async function controller(req: IRequest, res: Response) {
    try {
        const snippetImpression = await snippetImpressionService_add({
            userId: req.jwtData.user.id as string,
            snippetId: req.params.snippetId,
            typeName: IMPRESSION_TYPE_LIST.LOVE
        })
        return res.status(200).json(snippetImpression)
    } catch (error) {
        console.log(error)
        return res.status(400).send(error)
    }
}

/*
 *    .___________.____    ____ .______    _______     _______.
 *    |           |\   \  /   / |   _  \  |   ____|   /       |
 *    `---|  |----` \   \/   /  |  |_)  | |  |__     |   (----`
 *        |  |       \_    _/   |   ___/  |   __|     \   \
 *        |  |         |  |     |  |      |  |____.----)   |
 *        |__|         |__|     | _|      |_______|_______/
 */

interface IParams {
    snippetId: string
}

interface IRequest extends IPermissionRequest {
    params: IParams
}
