import React, { useEffect, useState } from "react";

import calculateDaysLeft from "api/calculateDaysLeft";

const Countdown = ({ startDate, endDate }) => {
    const [daysLeft, setDaysLeft] = useState(null);

    useEffect(() => {
        const days = calculateDaysLeft(startDate, endDate);
        setDaysLeft(days);
    }, [startDate, endDate]);

    return <span>{daysLeft > 0 ? `D-${daysLeft}` : "Coupon expired"}</span>;
};

export default Countdown;
