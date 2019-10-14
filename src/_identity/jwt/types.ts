import { IRole } from '../role/schema'

interface IJwtUserData {
    id?: string
    role: IRole
}

export interface IJwtData {
    user: IJwtUserData
}
