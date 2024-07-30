import React, { useState, useEffect, useRef } from "react";
import { SERVER_URL } from "api/serverApi";
import { EventSourcePolyfill } from "event-source-polyfill";

import { Box, Button } from "@mui/material";

// 리덕스 import
import { useSelector } from "react-redux";

export default function Alarm(props) {
    // props
    const { open, close } = props;
    const [allAlarm, setAllAlarm] = useState([]);
    // 리덕스에서 accessToken 가져오기
    const accessToken = useSelector((state) => state.loginSlice.accessToken);

    // sse 알람
    useEffect(() => {
        const eventSource = new EventSourcePolyfill(
            `${SERVER_URL}/api/alarm/subscribe`,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "text/event-stream",
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        if (accessToken) {
            eventSource.addEventListener("alarm-list", (event) => {
                console.log(JSON.parse(event.data));
                // setAlarmList(JSON.parse(event.data));
                setAllAlarm(() => JSON.parse(event.data));
            });

            eventSource.addEventListener("alarm", (event) => {
                console.log(JSON.parse(event.data));
                // setAlarm(JSON.parse(event.data));
                setAllAlarm((list) => [...list, JSON.parse(event.data)]);
            });
            eventSource.addEventListener("beat", (event) => {
                console.log(event.data);
            });

            eventSource.addEventListener("error", () => {
                eventSource.close();
            });
        } else {
            eventSource.close();
        }
    }, [accessToken]);

    const condition = (event) => {
        if (event === "LUCKYAPPLY") {
            return "럭키드로우에 응모 완료되었습니다.";
        } else if (event === "LUCKY") {
            return "럭키드로우에~ 당첨~ 되었습니다~~~ 예에에에에 짝짝짝";
        } else if (event === "STYLE") {
            return "당신의 스타일에 누군가가 원픽";
        } else if (event === "ONETOONE") {
            return "1:1문의 답변 완료~!";
        } else if (event === "SALES") {
            return "급전이 왔어요~! 급전이!";
        } else if (event === "COUPON") {
            return "쿠폰 발급이 됐습니다.";
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
                            {allAlarm === "" ? (
                                <div>받은 알람이 없습니다.</div>
                            ) : (
                                allAlarm.map((list) => (
                                    <div className="alarm" key={list.alarmId}>
                                        <span className="black-label">
                                            {condition(list.alarmType)}
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
