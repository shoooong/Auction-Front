import React, { useState, useEffect } from "react";
import { SERVER_URL } from "api/serverApi";
import { EventSourcePolyfill } from "event-source-polyfill";

import { Box, Button } from "@mui/material";

export default function Alarm(props) {
    // props
    const { open, close } = props;
    const [accessToken, setAccessToken] = useState(null);
    const [alarmList, setAlarmList] = useState(null);
    const [alarm, setAlarm] = useState(null);

    useEffect(() => {
        function getAccessTokenFromCookie() {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; user=`);
            if (parts.length === 2) {
                const cookieValue = parts.pop().split(";").shift();
                if (cookieValue) {
                    const decodedValue = decodeURIComponent(cookieValue);
                    const jsonObject = JSON.parse(decodedValue);
                    return jsonObject.accessToken;
                }
            }
            return null;
        }

        const token = getAccessTokenFromCookie();
        if (token) {
            setAccessToken(token);
            console.log(token);
        }
    }, []);

    // sse 알람
    // useEffect(() => {
    //     const sse = () => {
    //         const eventSource = new EventSourcePolyfill(
    //             `${SERVER_URL}/alarm/subscribe`,
    //             {
    //                 withCredentials: true,
    //                 headers: {
    //                     "Content-Type": "text/event-stream",
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );

    //         eventSource.addEventListener("alarm-list", (event) => {
    //             if (JSON.parse(event.data).alarmType === "LUCKYAPPLY") {
    //                 return "럭키드로우에 응모 완료되었습니다.";
    //             } else if (JSON.parse(event.data).alarmType === "LUCKY") {
    //                 return "럭키드로우에~ 당첨~ 되었습니다~~~ 예에에에에 짝짝짝";
    //             } else if (JSON.parse(event.data).alarmType === "STYLE") {
    //                 return "당신의 스타일 원픽";
    //             } else if (JSON.parse(event.data).alarmType === "ONETOONE") {
    //                 return "1:1문의 답변 완료~!";
    //             } else if (JSON.parse(event.data).alarmType === "SALES") {
    //                 return "급전이 왔어요~! 급전이!";
    //             }
    //             setAlarmList(JSON.parse(event.data));
    //         });

    //         eventSource.addEventListener("alarm", (event) => {
    //             console.log(JSON.parse(event.data));
    //             setAlarm(event.data);
    //         });

    //         eventSource.addEventListener("error", (event) => {
    //             console.log(event);
    //         });

    //         eventSource.onerror = () => {
    //             eventSource.removeEventListener();
    //         };
    //     };

    //     sse();
    // }, [accessToken]);

    return (
        <>
            {open ? (
                <div className="alarm-popup">
                    <Box open={open} className="alarm-wrap">
                        <div className="title-box">
                            <h3 className="title">알림</h3>
                            <Button
                                className="popup-close-btn "
                                onClick={close}
                            ></Button>
                        </div>
                        <div
                            className="alarm-box scroll"
                            style={{ maxHeight: "100%" }}
                        >
                            {alarmList.map((list) => (
                                <div className="alarm" key={list.alarmId}>
                                    <span className="black-label">
                                        {list.alarmType}
                                    </span>
                                    <span className="grey-label">
                                        럭키드로우 응모 하셨습니다.
                                    </span>
                                    <span className="grey-label">
                                        {list.alarmDate}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </Box>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
