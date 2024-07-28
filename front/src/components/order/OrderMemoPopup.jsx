import { useEffect, useState } from "react";

const OrderMemoPopup = ({ userMemo, setUserMemo, memoOpen, setMemoOpen }) => {
    // const [memo, setMemo] = useState("");
    const [memo, setMemo] = useState({
        content: "",
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (userMemo) {
            setMemo(userMemo);
        } else {
            setMemo({ content: "" });
        }
        console.log("account===" + JSON.stringify(userMemo, null, 2));
    }, [userMemo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMemo((prevMemo) => ({
            ...prevMemo,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            console.log("usermeom===" + userMemo);
            console.log("memo====" + memo);
            setUserMemo(memo);
            setIsEditing(false);
            setIsAdding(false);
            setMemoOpen(false);
        } catch (error) {
            alert("에러");
            console.error("Error saving account data:", error);
        }
    };

    const handleCancel = () => {
        if (userMemo) {
            setMemo(userMemo);
        } else {
            setMemo("");
        }
        setIsEditing(false);
        setIsAdding(false);
        setMemoOpen(false);
    };
    return (
        <>
            <div className="memo_form account-form">
                <h3>배송 요청사항</h3>
                <div className="userMemo_box">
                    <textarea
                        name="content"
                        placeholder="내용을 입력해주세요.(최대 40자)"
                        onChange={handleChange}
                        maxLength="40"
                    />
                </div>
            </div>
            <div className="order-btn">
                <button
                    className="order_cancel_btn order_btn"
                    type="button"
                    onClick={handleCancel}
                >
                    취소
                </button>
                <button
                    className="order_save_btn order_btn"
                    type="button"
                    onClick={handleSave}
                    // disabled={memo.content.trim() === ""}
                >
                    확인
                </button>
            </div>
        </>
    );
};
export default OrderMemoPopup;
