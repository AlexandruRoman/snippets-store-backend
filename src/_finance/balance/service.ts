import { Balance } from './schema'

interface IBalanceService_getCurrent {
    idUser: string
}
export async function balanceService_getCurrent(data: IBalanceService_getCurrent) {
    const transactions = await Balance.find({ user: data.idUser })
    let amount = 0
    for (let i of transactions) amount += i.amount
    return amount
}
