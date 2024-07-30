import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAddress, addAddress, modifyAddress, deleteAddress } from "api/user/mypageApi";

import { getCookie } from "utils/cookieUtil";

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

const useAddress = () => {
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
                    ...addresses?.map((address) => ({
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
    return {
        addresses,
        selectedAddress,
        isAdding,
        loading,
        open,
        setSelectedAddress,
        setIsAdding,
        setOpen,
        handleAddAddress,
        handleModifyAddress,
        handleDeleteAddress,
        handleSave,
        handleCancel,
    };
};

export default useAddress;
