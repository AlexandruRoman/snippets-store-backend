import * as moment from 'moment'
export function todayQuery() {
    const today = moment().startOf('day')
    return {
        $gte: today.toDate(),
        $lte: moment(today)
            .endOf('day')
            .toDate()
    }
}
