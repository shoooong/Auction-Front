export default function calculateDaysLeft(startDate, endDate) {
    const currentDate = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    let daysLeft;

    if (currentDate < start) {
        const timeDiff = start - currentDate;
        daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    } else if (currentDate >= start && currentDate <= end) {
        const timeDiff = end - currentDate;
        daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    } else {
        daysLeft = 0;
    }

    return daysLeft;
}
