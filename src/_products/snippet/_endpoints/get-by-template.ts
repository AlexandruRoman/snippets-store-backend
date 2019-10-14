import { Router, NextFunction, Response } from 'express'
import { IPermissionRequest } from 'src/__helpers/api'
import * as Joi from 'joi'
import { snippetDal_getPopulated } from '../dal'
import { SnippetStatus } from '../../snippet-status/schema'
import SNIPPET_STATUS_LIST from '../../snippet-status/list'

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

export default function snippetEndpoint_getByTemplate() {
    const router = Router()
    router.get('/get-by-template/:idTemplate', validation, controller)
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
    idTemplate: Joi.string().required()
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
        const snippets = await snippetDal_getPopulated({
            template: req.params.idTemplate
        })
        return res.status(200).json(snippets)
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
    idTemplate: string
}

interface IRequest extends IPermissionRequest {
    params: IParams
}
