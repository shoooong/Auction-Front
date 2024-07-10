import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccount, registerOrModifyAccount } from 'api/user/mypageApi';
import { getCookie } from 'pages/user/cookieUtil';

const initState = {
    depositor: '',
    bankName: '',
    accountNum: ''
};

const fetchData = async (setAccount, initState, navigate) => {
    const userInfo = getCookie("user");

    if (!userInfo || !userInfo.accessToken) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/user/login');
        return;
    }

    try {
        const response = await getAccount();
        if (response) {
            setAccount(response);
        } else {
            setAccount(initState);
        }
    } catch (error) {
        console.error('Error fetching account data:', error);
    }
};

const Account = () => {
    const [account, setAccount] = useState(initState);
    const [isEditing, setIsEditing] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(setAccount, initState, navigate);
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            await registerOrModifyAccount(account);
            alert('계좌 정보가 성공적으로 저장되었습니다.');
            setIsEditing(false);
            setIsAdding(false);
            navigate('/mypage/account');
        } catch (error) {
            console.error('Error saving account data:', error);
            alert('계좌 정보 저장에 실패하였습니다. 다시 시도해 주세요.');
        }
    };

    const handleCancel = () => {
        fetchData(setAccount, initState, navigate);
        setIsEditing(false);
        setIsAdding(false);
        navigate('/mypage/account');
    };

    return (
        <div className="account-container">
            {account.depositor && !isAdding && !isEditing && (
                <div>
                    <p><strong>예금주</strong> {account.depositor}</p>
                    <p><strong>은행명</strong> {account.bankName}</p>
                    <p><strong>계좌번호</strong> {account.accountNum}</p>
                    <button type="button" onClick={() => setIsEditing(true)}>수정</button>
                </div>
            )}
            {!account.depositor && !isAdding && !isEditing && (
                <div>
                    <p>등록된 계좌가 없습니다.</p>
                    <button type="button" onClick={() => setIsAdding(true)}>추가</button>
                </div>
            )}
            {(isEditing || isAdding) && (
                <div className="account-form">
                    <div>
                        <label>예금주</label>
                        <input name="depositor" type="text" value={account.depositor} onChange={handleChange} />
                    </div>
                    <div>
                        <label>은행명</label>
                        <input name="bankName" type="text" value={account.bankName} onChange={handleChange} />
                    </div>
                    <div>
                        <label>계좌번호</label>
                        <input name="accountNum" type="text" value={account.accountNum} onChange={handleChange} />
                    </div>
                    <button type="button" onClick={handleSave}>저장</button>
                    <button type="button" onClick={handleCancel}>취소</button>
                </div>
            )}
        </div>
    );
};

export default Account;