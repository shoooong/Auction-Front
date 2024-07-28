import { useEffect, useState } from "react";
import { maskName, formatPhoneNumber } from "utils/mypageUtil";

import { Dialog } from "@mui/material";

import arrowImg from "assets/images/arrow2.svg";
import postImg from "assets/images/icon-post.png";

import OrderAddressPopup from "components/OrderAddressPopup";
import OrderMemoPopup from "./OrderMemoPopup";

const OrderAddressInfo = ({
    addressInfo,
    userAddress,
    setUserAddress,
    userMemo,
    setUserMemo,
}) => {
    const [addressData, setAddressData] = useState();
    const [addressOpen, setAddressOpen] = useState(false);
    const [memoOpen, setMemoOpen] = useState(false);

    useEffect(() => {
        if (userAddress) {
            setAddressData(userAddress);
            // setUserAddress(addressInfo);
            console.log("addressInfo====" + addressInfo);
        } else {
            setAddressData({});
            setUserAddress();
        }
        console.log("account===" + JSON.stringify(addressInfo, null, 2));
        console.log("product===" + JSON.stringify(addressData, null, 2));
        console.log("userAddres===" + JSON.stringify(userAddress, null, 2));
    }, [userAddress]);

    return (
        <div className="delivery_info_area info_area">
            <div className="delivery_address_info">
                <div className="delivery_title">
                    <h3 className="title_txt">배송 주소</h3>
                    <p className="add_more_btn sub_text">+ 새 주소 추가</p>
                </div>
                <div className="delivery_content">
                    <div className="delivery_info">
                        <div className="address-info">
                            <dl className="info_list">
                                <div className="info_box">
                                    <dt className="buy_title">받는 분</dt>
                                    <dd className="desc">
                                        {maskName(userAddress?.name)}
                                    </dd>
                                </div>
                                <div className="info_box">
                                    <dt className="buy_title">연락처</dt>
                                    <dd className="desc">
                                        {formatPhoneNumber(
                                            userAddress?.addrPhone
                                        )}
                                    </dd>
                                </div>
                                <div className="info_box">
                                    <dt className="buy_title">배송 주소</dt>
                                    <dd className="desc">
                                        {userAddress ? (
                                            <>
                                                ({userAddress?.zonecode}
                                                )&nbsp;
                                                {userAddress?.roadAddress}
                                                &nbsp;
                                                {userAddress?.detailAddress}
                                            </>
                                        ) : (
                                            "등록된 배송지가 없습니다. 배송지를 추가해주세요"
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <div className="btn_box">
                            <button
                                className="btn_edit border_box"
                                onClick={() => setAddressOpen(true)}
                            >
                                변경
                            </button>
                        </div>
                    </div>
                    <div className="">
                        <div
                            className="memo_box border_box"
                            onClick={() => setMemoOpen(true)}
                        >
                            <button className="btn_shipping_memo ">
                                <span className="shipping_memo">
                                    {userMemo?.content ? (
                                        <>{userMemo?.content}</>
                                    ) : (
                                        "요청사항 없음"
                                    )}
                                </span>
                            </button>
                            <img src={arrowImg} alt="" />
                        </div>
                    </div>
                    <div className="border_line"></div>
                </div>
            </div>
            <div className="delivery_delivery_type_info">
                <h3 className="title_txt">배송 방법</h3>
                <div className="delivery_option">
                    <div className="delivery_way">
                        <div className="way_info border_box">
                            <div className="way_icon">
                                <img src={postImg} className="way_img"></img>
                            </div>
                            <div className="way_desc flex_space">
                                <div className="post">
                                    <span className="bold_title">일반배송</span>
                                    <span className="desc">3,000원</span>
                                </div>
                                <p className="sub_text">
                                    검수 후 배송 ・ 5-7일 내 도착 예정
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={addressOpen}
                onClose={() => setAddressOpen(false)}
                PaperProps={{
                    style: {
                        textAlign: "center",
                        width: "520px",
                        maxWidth: "unset",
                        height: "600px",
                        maxHeight: "unset",
                        // borderRadius: "15px",
                    },
                }}
            >
                <OrderAddressPopup
                    userAddress={userAddress}
                    setUserAddress={setUserAddress}
                    addressOpen={addressOpen}
                    setAddressOpen={setAddressOpen}
                />
            </Dialog>
            <Dialog
                open={memoOpen}
                onClose={() => setMemoOpen(false)}
                PaperProps={{
                    style: {
                        textAlign: "center",
                        width: "520px",
                        maxWidth: "unset",
                        height: "205px",
                        maxHeight: "unset",
                    },
                }}
            >
                <OrderMemoPopup
                    userMemo={userMemo}
                    setUserMemo={setUserMemo}
                    memoOpen={memoOpen}
                    setMemoOpen={setMemoOpen}
                />
            </Dialog>
        </div>
    );
};

export default OrderAddressInfo;
