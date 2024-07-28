import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccount, registerOrModifyAccount } from "api/user/mypageApi";

const initState = {
    depositor: "",
    bankName: "",
    accountNum: "",
};

const OrderAccountPopup = ({ userAccount, setUserAccount, setAccountOpen }) => {
    const [account, setAccount] = useState(initState);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userAccount) {
            setAccount(userAccount);
        } else {
            setAccount(initState);
        }
        console.log("account===" + JSON.stringify(userAccount, null, 2));
    }, [userAccount]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        try {
            await registerOrModifyAccount(account);
            alert("계좌 정보가 성공적으로 저장되었습니다.");
            setUserAccount(account);
            setIsEditing(false);
            setIsAdding(false);
            setAccountOpen(false);
        } catch (error) {
            console.error("Error saving account data:", error);
            alert("계좌 정보 저장에 실패하였습니다. 다시 시도해 주세요.");
        }
    };

    const handleCancel = () => {
        if (userAccount) {
            setAccount(userAccount);
        } else {
            setAccount(initState);
        }
        setIsEditing(false);
        setIsAdding(false);
        setAccountOpen(false);
    };

    return (
        <>
            <div className="account-form">
                <div>
                    <label>예금주</label>
                    <input
                        name="depositor"
                        type="text"
                        value={account.depositor}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>은행명</label>
                    <input
                        name="bankName"
                        type="text"
                        value={account.bankName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>계좌번호</label>
                    <input
                        name="accountNum"
                        type="text"
                        value={account.accountNum}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="account-btn">
                <button type="button" onClick={handleSave}>
                    저장
                </button>
                <button type="button" onClick={handleCancel}>
                    취소
                </button>
            </div>
        </>
    );
};

export default OrderAccountPopup;
