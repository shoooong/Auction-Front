import React, { useState, useEffect, useRef } from "react";
import { SERVER_URL } from "api/serverApi";
import { NativeEventSource, EventSourcePolyfill } from "event-source-polyfill";

import { Box, Button } from "@mui/material";

// 리덕스 import
import { useSelector } from "react-redux";

export default function Alarm(props) {
    // props
    const { open, close } = props;
    const [alarmList, setAlarmList] = useState(null);
    const [alarm, setAlarm] = useState(null);

    // 리덕스에서 accessToken 가져오기
    const accessToken = useSelector((state) => state.loginSlice.accessToken);
    console.log(accessToken);

    // sse 알람
    const EventSource = EventSourcePolyfill;
    useEffect(() => {
        if (accessToken) {
            const fetchSse = () => {
                const eventSource = new EventSource(
                    `${SERVER_URL}/alarm/subscribe`,
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "text/event-stream",
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                );

                eventSource.addEventListener("alarm-list", (event) => {
                    console.log(JSON.parse(event.data));

                    if (JSON.parse(event.data).alarmType === "LUCKYAPPLY") {
                        return "럭키드로우에 응모 완료되었습니다.";
                    } else if (JSON.parse(event.data).alarmType === "LUCKY") {
                        return "럭키드로우에~ 당첨~ 되었습니다~~~ 예에에에에 짝짝짝";
                    } else if (JSON.parse(event.data).alarmType === "STYLE") {
                        return "당신의 스타일 원픽";
                    } else if (
                        JSON.parse(event.data).alarmType === "ONETOONE"
                    ) {
                        return "1:1문의 답변 완료~!";
                    } else if (JSON.parse(event.data).alarmType === "SALES") {
                        return "급전이 왔어요~! 급전이!";
                    }
                    setAlarmList(JSON.parse(event.data));
                });

                eventSource.addEventListener("alarm", (event) => {
                    alert(event.data);
                    console.log(JSON.parse(event.data));
                    setAlarm(JSON.parse(event.data));
                });

                eventSource.addEventListener("error", () => {
                    eventSource.close();
                });

                // eventSource.onerror = async () => {
                //     // e: Event
                //     eventSource.close();
                //     // 재연결
                //     // setTimeout(fetchSse, 4500);
                // };
                // eventSource.onopen = (event) => {
                //     console.log("Connection to server opened.");
                // };

                // eventSource.onmessage = (event) => {
                //     console.log("New message:", event.data);
                // };
            };
            fetchSse();
        }
    }, [accessToken]);

    const condition = (event) => {
        if (JSON.parse(event.data) === "LUCKYAPPLY") {
            return "럭키드로우에 응모 완료되었습니다.";
        } else if (JSON.parse(event.data) === "LUCKY") {
            return "럭키드로우에~ 당첨~ 되었습니다~~~ 예에에에에 짝짝짝";
        } else if (JSON.parse(event.data) === "STYLE") {
            return "당신의 스타일 원픽";
        } else if (JSON.parse(event.data) === "ONETOONE") {
            return "1:1문의 답변 완료~!";
        } else if (JSON.parse(event.data) === "SALES") {
            return "급전이 왔어요~! 급전이!";
        }
    };

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
                            style={{ maxHeight: "100%", marginTop: 0 }}
                        >
                            {alarmList === null ? (
                                <div>받은 알람이 없습니다.</div>
                            ) : (
                                alarmList.map((list) => (
                                    <div className="alarm" key={list.alarmId}>
                                        <span className="black-label">
                                            {list.alarmType}
                                        </span>
                                        <span className="grey-label"></span>
                                        <span className="grey-label">
                                            {list.alarmDate}
                                        </span>
                                    </div>
                                ))
                            )}
                            {alarm === null ? (
                                <></>
                            ) : (
                                alarm.map((list) => (
                                    <div className="alarm" key={list.alarmId}>
                                        <span className="black-label">
                                            {list.alarmType}
                                        </span>
                                        <span className="grey-label"></span>
                                        <span className="grey-label">
                                            {list.alarmDate}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </Box>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
