import React, { useEffect, useState } from "react";

const CouponCountdown = ({ startDate, onCountdownEnd }) => {
    const [timeLeft, setTimeLeft] = useState({});
    const [isCouponAvailable, setIsCouponAvailable] = useState(false);

    useEffect(() => {
        if (!startDate) {
            console.error("startDate prop is missing");
            return;
        }

        const calculateTimeLeft = () => {
            const now = new Date();
            const start = new Date(startDate);
            const total = start - now;

            if (total <= 0) {
                setIsCouponAvailable(true);
                if (onCountdownEnd) onCountdownEnd();
                return;
            }

            const seconds = Math.floor((total / 1000) % 60);
            const minutes = Math.floor((total / 1000 / 60) % 60);
            const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            const days = Math.floor(total / (1000 * 60 * 60 * 24));

            setTimeLeft({
                total,
                days,
                hours,
                minutes,
                seconds,
            });
        };

        // Initial calculation
        calculateTimeLeft();

        // Set up an interval to update the countdown every second
        const timer = setInterval(calculateTimeLeft, 1000);

        // Clear interval on component unmount
        return () => clearInterval(timer);
    }, [startDate, onCountdownEnd]);

    return (
        <div className="coupon-countdown">
            {isCouponAvailable ? (
                <p className="coupon-available">쿠폰 발급 가능!</p>
            ) : (
                <div className="countdown-timer">
                    {timeLeft.total > 0 ? (
                        <>
                            {timeLeft.days > 0 && (
                                <span>{timeLeft.days}: </span>
                            )}
                            {timeLeft.hours > 0 && (
                                <span>{timeLeft.hours}: </span>
                            )}
                            {timeLeft.minutes > 0 && (
                                <span>{timeLeft.minutes}: </span>
                            )}
                            <span>{timeLeft.seconds}</span>{" "}
                            {/* Always show seconds */}
                        </>
                    ) : (
                        <p>쿠폰 발급 기한이 지났습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default CouponCountdown;
