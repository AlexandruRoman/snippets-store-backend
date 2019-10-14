import { Router, NextFunction, Response } from 'express'
import { IPermissionRequest } from 'src/__helpers/api'
import * as Joi from 'joi'
import { snippetTagDal_update } from '../dal'

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

export default function snippetTagEndpoint_update() {
    const router = Router()
    router.put('/update', validation, controller)
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
    id: Joi.string().required(),
    name: Joi.string().required()
}

async function validation(req: IRequest, res: Response, next: NextFunction) {
    const validation = Joi.validate(req.body, schema)
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
        const snippetTag = await snippetTagDal_update(req.body.id, req.body.name)
        return res.status(200).json(snippetTag)
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

interface IBody {
    id: string
    name: string
}

interface IRequest extends IPermissionRequest {
    body: IBody
}
