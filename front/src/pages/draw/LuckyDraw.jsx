import { useNavigate } from "react-router-dom";

import useLuckyDraw from "hooks/useLuckyDraw";

import { Button } from "@mui/material";

const LuckyDraw = () => {
    const { drawItems, loading, error } = useLuckyDraw();
    const navigate = useNavigate();

    const handleApplyClick = (luckyId) => {
        navigate(`/luckydraw/${luckyId}`);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="lucky-main">
            <div className="title-box">
                <h3>
                    LUCKY
                    <br />
                    DRAW
                </h3>
                <p>놓칠 수 없는 당첨 기회!</p>
                <p>
                    드로우는 1번만 응모 가능하며, 당첨자 발표일에 공지사항에서
                    결과 확인 가능합니다.
                </p>
            </div>

            <div style={{ padding: "50px 0 70px" }}>
                {drawItems.map((item) => (
                    <div className="justify-center" key={item.luckyId}>
                        <div>
                            <div className="img-box">
                                <p>{item.luckyImage}</p>
                            </div>

                            <h2>{item.luckyName}</h2>
                            <p>{item.content}</p>
                            <Button
                                className="btn btn-text apply-btn full-btn"
                                onClick={() => handleApplyClick(item.luckyId)}
                            >
                                응모하기
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LuckyDraw;
