import { Role } from '../role/schema'
import * as bcrypt from 'bcrypt'
import { User } from './schema'

export function userDal_getUserWithPermissions(conditions: any) {
    return User.findOne(conditions).populate({
        path: 'role',
        populate: { path: 'permissions' }
    })
}

interface IUserDal_add {
    role: string
    name: string
    password: string
    email: string
}
export async function userDal_add(data: IUserDal_add) {
    const role = await Role.findOne({ name: data.role })
    if (!role) return
    const { name, email, password } = data
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = new User({
        name,
        email,
        password: hashedPassword,
        role: role.id
    })
    await user.validate()
    return user.save()
}
