import React, { useState, useEffect } from 'react';

const Postcode = ({ onSave, selectedAddress }) => {
    const [zonecode, setZonecode] = useState('');
    const [roadAddress, setRoadAddress] = useState('');
    const [jibunAddress, setJibunAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [guide, setGuide] = useState('');

    const [defaultAddress, setDefaultAddress] = useState(false);
    const [addressName, setAddressName] = useState('');
    const [name, setName] = useState('');
    const [addrPhone, setAddrPhone] = useState('');

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (selectedAddress) {
            setZonecode(selectedAddress.zonecode);
            setRoadAddress(selectedAddress.roadAddress);
            setJibunAddress(selectedAddress.jibunAddress);
            setExtraAddress(selectedAddress.extraAddress);
            setDetailAddress(selectedAddress.detailAddress);
            setDefaultAddress(selectedAddress.defaultAddress);
            setAddressName(selectedAddress.addressName);
            setName(selectedAddress.name);
            setAddrPhone(selectedAddress.addrPhone);

        }
    }, [selectedAddress]);

    const handleComplete = (data) => {
        let roadAddr = data.roadAddress;
        let extraRoadAddr = '';

        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname;
        }

        if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
        }

        if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')';
        }

        setZonecode(data.zonecode);
        setRoadAddress(roadAddr);
        setJibunAddress(data.jibunAddress);
        setExtraAddress(extraRoadAddr);

        if (data.autoRoadAddress) {
            const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
            setGuide('(예상 도로명 주소 : ' + expRoadAddr + ')');
        } else if (data.autoJibunAddress) {
            const expJibunAddr = data.autoJibunAddress;
            setGuide('(예상 지번 주소 : ' + expJibunAddr + ')');
        } else {
            setGuide('');
        }
    };

    const openPostcode = () => {
        new window.daum.Postcode({
            oncomplete: handleComplete,
        }).open();
    };

    const handleSave = () => {
        const addressData = {
            zonecode,
            roadAddress,
            jibunAddress,
            detailAddress,
            extraAddress,
            defaultAddress,
            addressName,
            name,
            addrPhone
        };

        if (selectedAddress) {
            onSave(addressData, selectedAddress.addressId);
        } else {
            onSave(addressData);
        }
    };

    return (
        <div>
            <input type="text" id="sample4_postcode" placeholder="우편번호" value={zonecode} readOnly />
            <input type="button" onClick={openPostcode} value="우편번호 찾기" /><br />
            <input type="text" id="sample4_roadAddress" placeholder="도로명주소" value={roadAddress} readOnly />
            <input type="text" id="sample4_jibunAddress" placeholder="지번주소" value={jibunAddress} readOnly />
            <span id="guide" style={{ color: '#999', display: guide ? 'block' : 'none' }}>{guide}</span>
            <input type="text" id="sample4_detailAddress" placeholder="상세주소" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} />
            <input type="text" id="sample4_extraAddress" placeholder="참고항목" value={extraAddress} readOnly />

            <label>
                <input type="checkbox" checked={defaultAddress} onChange={(e) => setDefaultAddress(e.target.checked)} />
                기본 배송지로 설정
            </label>
            <input type="text" placeholder="배송지명" value={addressName} onChange={(e) => setAddressName(e.target.value)} />
            <input type="text" placeholder="수령인 이름" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="수령인 전화번호" value={addrPhone} onChange={(e) => setAddrPhone(e.target.value)} />

            <button type="button" onClick={handleSave}>저장</button>
        </div>
    );
};

export default Postcode;