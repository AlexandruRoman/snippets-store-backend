import { Router, NextFunction, Response } from 'express'
import { IPermissionRequest } from 'src/__helpers/api'
import * as Joi from 'joi'
import { SnippetStatus } from '../../snippet-status/schema'
import SNIPPET_STATUS_LIST from '../../snippet-status/list'
import { snippetDal_getPopulated } from '../dal'

/*
 *         ___      .______    __
 *        /   \     |   _  \  |  |
 *       /  ^  \    |  |_)  | |  |
 *      /  /_\  \   |   ___/  |  |
 *     /  _____  \  |  |      |  |
 *    /__/     \__\ | _|      |__|
 */

export default function snippetEndpoint_getForStaff() {
    const router = Router()
    router.get('/get-for-staff', controller)
    return router
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
        const status = await SnippetStatus.findOne({ name: SNIPPET_STATUS_LIST.PROPOSED })
        if (!status) throw new Error('staus')
        const response = await snippetDal_getPopulated({ status: status._id })
        return res.status(200).json(response)
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

interface IRequest extends IPermissionRequest {}
