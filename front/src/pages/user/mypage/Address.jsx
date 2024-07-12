import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAddress, addAddress, modifyAddress } from "api/user/mypageApi";
import Postcode from "components/mypage/Postcode";
import { getCookie } from 'pages/user/cookieUtil';


const fetchData = async (setAddresses, setLoading, navigate) => {
    const userInfo = getCookie("user");

    if (!userInfo || !userInfo.accessToken) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/user/login');
        return;
    }

    try {
        const response = await getAddress();
        setAddresses(response);
    } catch (error) {
        console.error('배송지 정보를 불러오는 중 오류가 발생했습니다.', error);
    }
    setLoading(false);
};

const Address = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData(setAddresses, setLoading, navigate);
    }, [navigate]);

    useEffect(() => {
        console.log('addresses:', addresses); 
    }, [addresses]);

    const handleAddAddress = async (addressData) => {
        try {
            const response = await addAddress(addressData);
            if (response.defaultAddress) {
                setAddresses([response, ...addresses.map(address => ({ ...address, defaultAddress: false }))]);
            } else {
                setAddresses([...addresses, response]);
            }
        } catch (error) {
            console.error('배송지 추가 중 오류가 발생했습니다.', error);
            alert('배송지 추가 중 오류가 발생했습니다.');
        }
    };

    const handleModifyAddress = async (addressData, addressId) => {
        try {
            const response = await modifyAddress(addressData, addressId);
            setAddresses(addresses.map(address => address.addressId === addressId ? response : address));
            if (response.defaultAddress) {
                setAddresses(addresses.map(address => address.addressId === addressId ? response : { ...address, defaultAddress: false }).sort((a, b) => b.defaultAddress - a.defaultAddress));
            } else {
                setAddresses(addresses.map(address => address.addressId === addressId ? response : address));
            }
            setSelectedAddress(null);
        } catch (error) {
            console.error('배송지 수정 중 오류가 발생했습니다.', error);
            alert('배송지 수정 중 오류가 발생했습니다.');
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
    };

    const handleCancel = () => {
        setIsAdding(false);
        setSelectedAddress(null);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="history-title">
                <h2 className="title">배송지 관리</h2>
            </div>
            <div>
                {addresses.map((address) => (
                    <div key={address.addressId} onClick={() => setSelectedAddress(address)}>
                        <p>{address.zonecode}</p>
                        <p>{address.addressName}</p>
                        <p>{address.roadAddress}</p>
                        <p>{address.detailAddress}</p>
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedAddress(address);
                            }}
                        >
                            수정
                        </button>
                    </div>
                ))}
                {addresses.length === 0 && <p>등록된 배송지가 없습니다.</p>}
            </div>
            {!isAdding && (
                <button type="button" onClick={() => setIsAdding(true)}>추가</button>
            )}
            {(isAdding || selectedAddress) && (
                <Postcode
                    onSave={handleSave}
                    selectedAddress={selectedAddress}
                />
            )}
            {(isAdding || selectedAddress) && (
                <button type="button" onClick={handleCancel}>취소</button>
            )}
        </div>
    );
};

export default Address;