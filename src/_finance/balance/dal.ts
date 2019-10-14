import { IBalance, Balance } from './schema'

export async function balanceDal_add(data: IBalance) {
    const balance = new Balance(data)
    await balance.validate()
    return balance.save()
}
