import * as DateFNS from 'date-fns';

const getDueString = (date) => {
    const nowDate = new Date();
    if (DateFNS.isToday(date)) {
        return `Today at ${DateFNS.format(date, 'HH:mm')}`;
    }

    if (DateFNS.isTomorrow(date)) {
        return `Tomorrow at ${DateFNS.format(date, 'HH:mm')}`;
    }

    const diffInDays = Math.abs(DateFNS.differenceInDays(nowDate, date));

    if (DateFNS.isBefore(date, nowDate)) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }

    return `In ${diffInDays} day${diffInDays > 1 ? 's' : ''}`;
};

export const getRelativeDateString = (isoDate) => {
    if (!isoDate) {
        return {
            string: null,
            color: '',
        };
    }

    const date = DateFNS.parseISO(isoDate);
    const nowDate = new Date();

    return {
        string: getDueString(date),
        color: DateFNS.isBefore(date, nowDate)
            ? 'error'
            : DateFNS.isBefore(nowDate, DateFNS.addDays(date, 1))
            ? 'warning'
            : '',
    };
};
