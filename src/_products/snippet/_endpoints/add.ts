import { Router, NextFunction, Response } from 'express'
import { IPermissionRequest, checkPermission } from 'src/__helpers/api'
import * as Joi from 'joi'
import { Seller } from 'src/_identity/seller/schema'
import { snippetDal_add } from '../dal'
import SNIPPET_STATUS_LIST from 'src/_products/snippet-status/list'
import { snippetService_add } from '../service'
import PERMISSION_LIST from 'src/_identity/permission/list'

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

export default function snippetEndpoint_add() {
    const router = Router()
    router.post('/add', checkPermission(PERMISSION_LIST.CRUD_SNIPPET), validation, controller)
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
    idTemplate: Joi.string().required(),
    name: Joi.string().required(),
    code: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array()
        .items(Joi.string())
        .required(),
    images: Joi.array()
        .items(Joi.string())
        .required()
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
        const snippet = await snippetService_add({
            code: req.body.code,
            description: req.body.description,
            idUser: req.jwtData.user.id as string,
            idTemplate: req.body.idTemplate,
            name: req.body.name,
            status: SNIPPET_STATUS_LIST.PROPOSED,
            tags: req.body.tags,
            images: req.body.images
        })
        return res.status(200).json(snippet)
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
    idTemplate: string
    name: string
    code: string
    description: string
    tags: string[]
    images: string[]
}

interface IRequest extends IPermissionRequest {
    body: IBody
}
