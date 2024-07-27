import React, { useState, useEffect } from "react";
import { Box, Dialog, DialogTitle, Button } from "@mui/material";
import {
    getAddress,
    addAddress,
    modifyAddress,
    deleteAddress,
} from "api/user/mypageApi";
import { getCookie } from "pages/user/cookieUtil";
import "styles/order.css";
// import jwtAxios from "pages/user/jwtUtil";
import "styles/order_coupon.css";
import Postcode from "components/mypage/Postcode";
import { maskName, formatPhoneNumber } from "../pages/user/mypageUtil";
import { useNavigate } from "react-router-dom";

const fetchData = async (setAddresses, setLoading, navigate) => {
    const userInfo = getCookie("user");

    if (!userInfo || !userInfo.accessToken) {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/user/login");
        return;
    }

    try {
        const response = await getAddress();
        setAddresses(response);
    } catch (error) {
        console.error("배송지 정보를 불러오는 중 오류가 발생했습니다.", error);
    }
    setLoading(false);
};

const OrderAddressComponent = ({ onSelectAddress }) => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(setAddresses, setLoading, navigate);
    }, [navigate]);

    useEffect(() => {
        console.log("addresses:", addresses);
    }, [addresses]);

    const handleAddAddress = async (addressData) => {
        try {
            const response = await addAddress(addressData);
            if (response.defaultAddress) {
                setAddresses([
                    response,
                    ...addresses.map((address) => ({
                        ...address,
                        defaultAddress: false,
                    })),
                ]);
            } else {
                setAddresses([...addresses, response]);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(Object.values(error.response.data).join("\n"));
            } else {
                console.error("배송지 추가 중 오류가 발생했습니다.", error);
                alert("배송지 추가 중 오류가 발생했습니다.");
            }
        }
    };

    const handleModifyAddress = async (addressData, addressId) => {
        try {
            const response = await modifyAddress(addressData, addressId);
            setAddresses(
                addresses.map((address) =>
                    address.addressId === addressId ? response : address
                )
            );
            if (response.defaultAddress) {
                setAddresses(
                    addresses
                        .map((address) =>
                            address.addressId === addressId
                                ? response
                                : { ...address, defaultAddress: false }
                        )
                        .sort((a, b) => b.defaultAddress - a.defaultAddress)
                );
            } else {
                setAddresses(
                    addresses.map((address) =>
                        address.addressId === addressId ? response : address
                    )
                );
            }
            setSelectedAddress(null);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(Object.values(error.response.data).join("\n"));
            } else {
                console.error("배송지 수정 중 오류가 발생했습니다.", error);
                alert("배송지 수정 중 오류가 발생했습니다.");
            }
        }
    };

    const handleDeleteAddress = async (addressId) => {
        try {
            await deleteAddress(addressId);
            setAddresses(
                addresses.filter((address) => address.addressId !== addressId)
            );
        } catch (error) {
            console.error("배송지 삭제 중 오류가 발생했습니다.", error);
            alert("배송지 삭제 중 오류가 발생했습니다.");
        }
    };

    const handleSave = (addressData) => {
        if (selectedAddress) {
            handleModifyAddress(addressData, selectedAddress.addressId);
        } else {
            handleAddAddress(addressData);
        }
        setIsAdding(false);
        setSelectedAddress(null);
        setOpen(false);
    };

    const handleCancel = () => {
        setIsAdding(false);
        setSelectedAddress(null);
        setOpen(false);
    };

    return (
        <div className="address-management">
            <div className="detail-history-title">
                <h2 className="title">배송지 관리</h2>
                {!isAdding && (
                    <button
                        className="add-button"
                        type="button"
                        onClick={() => {
                            setIsAdding(true);
                            setOpen(true);
                        }}
                    >
                        추가
                    </button>
                )}
            </div>
            <div className="addresses-list">
                {addresses.map((address) => (
                    <div
                        className="address-card"
                        key={address.addressId}
                        onClick={() => setSelectedAddress(address)}
                    >
                        <div className="address-info">
                            <div className="address-header">
                                <p className="address-name">
                                    {maskName(address.name)}
                                </p>
                                {address.defaultAddress && (
                                    <span className="default-badge">
                                        기본 배송지
                                    </span>
                                )}
                            </div>

                            <p className="address-phone">
                                {formatPhoneNumber(address.addrPhone)}
                            </p>
                            <p className="address-zonecode">
                                ({address.zonecode}) {address.roadAddress}
                            </p>
                            <p className="address-detail">
                                {address.detailAddress}
                            </p>
                        </div>
                        <div className="address-actions">
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedAddress(address);
                                    setOpen(true);
                                }}
                            >
                                수정
                            </button>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteAddress(address.addressId);
                                }}
                            >
                                삭제
                            </button>
                        </div>
                    </div>
                ))}
                {addresses.length === 0 && (
                    <p className="non-history">등록된 배송지가 없습니다.</p>
                )}
            </div>

            <Dialog
                open={open}
                onClose={handleCancel}
                PaperProps={{
                    style: {
                        width: "100%",
                        maxWidth: "500px",
                        margin: "auto",
                    },
                }}
            >
                <Box sx={{ p: 2 }}>
                    <div className="popup-title-box">
                        <DialogTitle>배송지 관리</DialogTitle>
                        <Button
                            className="popup-close-btn"
                            onClick={handleCancel}
                        />
                    </div>

                    <div className="popup-content">
                        {(isAdding || selectedAddress) && (
                            <Postcode
                                onSave={handleSave}
                                selectedAddress={selectedAddress}
                            />
                        )}
                    </div>
                </Box>
            </Dialog>
        </div>
    );
};
export default OrderAddressComponent;
