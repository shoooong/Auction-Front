import { useEffect, useState } from "react";

import { Dialog } from "@mui/material";
import OrderAccountPopup from "./OrderAccountPopup";

const OrderAccountInfo = ({ userAccount, setUserAccount }) => {
    const [accountOpen, setAccountOpen] = useState(false);
    return (
        <div className="account_info_area info_area">
            <div className="account_info">
                <h3 className="title_txt">판매 정산 계좌</h3>
                <div className="info_box">
                    <dt className="buy_title">계좌</dt>
                    <dd className="desc">
                        {userAccount?.bankName} {userAccount?.accountNum}
                    </dd>
                </div>
                <div className="info_box">
                    <dt className="buy_title">예금주</dt>
                    <dd className="desc">{userAccount?.depositor}</dd>
                </div>
            </div>
            <div className="account_btn btn_box">
                <button
                    className="btn_edit border_box"
                    onClick={() => setAccountOpen(true)}
                >
                    변경
                </button>
            </div>
            <Dialog
                open={accountOpen}
                onClose={() => setAccountOpen(false)}
                PaperProps={{
                    style: {
                        textAlign: "center",
                        width: "520px",
                        maxWidth: "unset",
                        height: "330px",
                        maxHeight: "unset",
                    },
                }}
            >
                <OrderAccountPopup
                    userAccount={userAccount}
                    setUserAccount={setUserAccount}
                    setAccountOpen={setAccountOpen}
                />
            </Dialog>
        </div>
    );
};

export default OrderAccountInfo;
