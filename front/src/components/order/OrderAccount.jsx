// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAccount, registerOrModifyAccount } from "api/user/mypageApi";
// // import { getCookie } from "pages/user/cookieUtil";
// // import SalesSummary from "./SalesSummary";

// const initState = {
//     depositor: "",
//     bankName: "",
//     accountNum: "",
// };

// // const fetchData = async (setAccount, initState, navigate) => {
// //     const userInfo = getCookie("user");

// //     if (!userInfo || !userInfo.accessToken) {
// //         alert("로그인이 필요한 서비스입니다.");
// //         navigate("/user/login");
// //         return;
// //     }

// //     try {
// //         const response = await getAccount();
// //         if (response) {
// //             setAccount(response);
// //         } else {
// //             setAccount(initState);
// //         }
// //     } catch (error) {
// //         console.error("Error fetching account data:", error);
// //     }
// // };

// const OrderAccount = (userAccount, setUserAccount) => {
//     const [account, setAccount] = useState(initState);
//     const [isEditing, setIsEditing] = useState(false);
//     const [isAdding, setIsAdding] = useState(false);
//     const navigate = useNavigate();

//     console.log(userAccount);
//     useEffect(() => {
//         // fetchData(setAccount, initState, navigate);
//         setAccount(userAccount.data);
//         console.log("account===" + account);

//         console.log("jasn===" + JSON.stringify(account, null, 2));
//     }, [account]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAccount((prevAccount) => ({
//             ...prevAccount,
//             [name]: value,
//         }));
//     };

//     const handleSave = async () => {
//         try {
//             await registerOrModifyAccount(account);
//             alert("계좌 정보가 성공적으로 저장되었습니다.");
//             setIsEditing(false);
//             setIsAdding(false);
//         } catch (error) {
//             console.error("Error saving account data:", error);
//             alert("계좌 정보 저장에 실패하였습니다. 다시 시도해 주세요.");
//         }
//     };

//     const handleCancel = () => {
//         // fetchData(setAccount, initState, navigate);
//         setIsEditing(false);
//         setIsAdding(false);
//     };

//     return (
//         <>
//             <div className="account-form">
//                 <div>
//                     <label>예금주</label>
//                     <input
//                         name="depositor"
//                         type="text"
//                         value={account?.userAccount?.depositor}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>은행명</label>
//                     <input
//                         name="bankName"
//                         type="text"
//                         value={account?.userAccount?.bankName}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>계좌번호</label>
//                     <input
//                         name="accountNum"
//                         type="text"
//                         value={account?.userAccount?.accountNum}
//                         onChange={handleChange}
//                     />
//                 </div>
//             </div>
//             <div className="account-btn">
//                 <button type="button" onClick={handleSave}>
//                     저장
//                 </button>
//                 <button type="button" onClick={handleCancel}>
//                     취소
//                 </button>
//             </div>
//         </>
//     );
// };
// export default OrderAccount;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getAccount, registerOrModifyAccount } from "api/user/mypageApi";
// // import { getCookie } from "pages/user/cookieUtil";
// // import SalesSummary from "./SalesSummary";

// const initState = {
//     depositor: "",
//     bankName: "",
//     accountNum: "",
// };

// const OrderAccount = (userAccount, setUserAccount) => {
//     const [account, setAccount] = useState(initState);
//     const [isEditing, setIsEditing] = useState(false);
//     const [isAdding, setIsAdding] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         console.log("userAccount==" + userAccount);
//         // if (userAccount && userAccount.data) {
//         setAccount(userAccount);
//         // } else {
//         // setAccount(initState);
//         // }
//         console.log("account===" + JSON.stringify(userAccount.data, null, 2));
//     }, [userAccount]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAccount((prevAccount) => ({
//             ...prevAccount,
//             [name]: value,
//         }));
//     };

//     const handleSave = async () => {
//         try {
//             await registerOrModifyAccount(account);
//             alert("계좌 정보가 성공적으로 저장되었습니다.");
//             setUserAccount(account);
//             setIsEditing(false);
//             setIsAdding(false);
//         } catch (error) {
//             console.error("Error saving account data:", error);
//             alert("계좌 정보 저장에 실패하였습니다. 다시 시도해 주세요.");
//         }
//     };

//     const handleCancel = () => {
//         if (userAccount && userAccount.data) {
//             setAccount(userAccount.data);
//         } else {
//             setAccount(initState);
//         }
//         setIsEditing(false);
//         setIsAdding(false);
//     };

//     return (
//         <>
//             <div className="account-form">
//                 <div>
//                     <label>예금주</label>
//                     <input
//                         name="depositor"
//                         type="text"
//                         value={account?.userAccount?.depositor}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>은행명</label>
//                     <input
//                         name="bankName"
//                         type="text"
//                         value={account?.userAccount?.bankName}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div>
//                     <label>계좌번호</label>
//                     <input
//                         name="accountNum"
//                         type="text"
//                         value={account?.userAccount?.accountNum}
//                         onChange={handleChange}
//                     />
//                 </div>
//             </div>
//             <div className="account-btn">
//                 <button type="button" onClick={handleSave}>
//                     저장
//                 </button>
//                 <button type="button" onClick={handleCancel}>
//                     취소
//                 </button>
//             </div>
//         </>
//     );
// };

// export default OrderAccount;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccount, registerOrModifyAccount } from "api/user/mypageApi";
// import { getCookie } from "pages/user/cookieUtil";
// import SalesSummary from "./SalesSummary";

const initState = {
    depositor: "",
    bankName: "",
    accountNum: "",
};

const OrderAccount = ({ userAccount, setUserAccount }) => {
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

export default OrderAccount;
