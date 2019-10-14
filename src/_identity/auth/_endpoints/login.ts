import { Router, NextFunction, Response } from 'express'
import * as Joi from 'joi'
import * as bcrypt from 'bcrypt'
import { userDal_getUserWithPermissions } from 'src/_identity/user/dal'
import { generateUserToken } from 'src/_identity/jwt/factory'
import { IPermissionRequest } from 'src/__helpers/api'
import { IUserModel } from 'src/_identity/user/schema'

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

export default function authEndpoint_login() {
    const router = Router()
    router.post('/login', validation, controller)
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
    email: Joi.string()
        .min(5)
        .max(255)
        .required()
        .email(),
    password: Joi.string()
        .min(5)
        .max(255)
        .required()
}

async function validation(req: IRequest, res: Response, next: NextFunction) {
    const validation = Joi.validate(req.body, schema)
    if (validation.error) return res.status(400).send(validation.error)

    let user = await userDal_getUserWithPermissions({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email.')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Wrong password.')

    req.user = user
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
    const user = req.user
    const token = generateUserToken(user)
    return res.status(200).send(token)
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
    email: string
    password: string
}

interface IRequest extends IPermissionRequest {
    user: IUserModel
    body: IBody
}
