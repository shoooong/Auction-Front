import { Box, Button } from "@mui/material";

export default function Alarm(props) {
    // props
    const { open, close } = props;

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
                        <div className="alarm-box">
                            <div className="alarm">
                                <span className="black-label">알람 타이틀</span>
                                <span className="grey-label">
                                    알람 내용내용 내용 내용 내용 내용 내용 내용
                                    내용 내용 내용 내용 내용 내용 내용 내용 내용
                                    내용 내용 내용 내용 내용 내용 내용 내용 내용
                                </span>
                            </div>

                            {/* <div className="alarm">
                                <span className="black-label">알람 타이틀</span>
                                <span className="grey-label">
                                    알람 내용내용 내용 내용 내용 내용 내용 내용
                                    내용 내용 내용 내용 내용 내용 내용 내용 내용
                                    내용 내용 내용 내용 내용 내용 내용 내용 내용
                                </span>
                            </div>
                            <div className="alarm">
                                <span className="black-label">알람 타이틀</span>
                                <span className="grey-label">
                                    알람 내용내용 내용 내용 내용 내용 내용 내용
                                    내용 내용 내용 내용 내용 내용 내용 내용 내용
                                    내용 내용 내용 내용 내용 내용 내용 내용 내용
                                </span>
                            </div>
                            <div className="alarm">
                                <span className="black-label">알람 타이틀</span>
                                <span className="grey-label">
                                    알람 내용내용 내용 내용 내용 내용 내용 내용
                                    내용 내용 내용 내용 내용 내용 내용 내용 내용
                                    내용 내용 내용 내용 내용 내용 내용 내용 내용
                                </span>
                            </div> */}
                        </div>
                    </Box>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
