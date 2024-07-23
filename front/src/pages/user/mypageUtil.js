// 마이페이지 메인
export const maskEmail = (email) => {
    const [localPart, domainPart] = email.split("@");
    const localPartLength = localPart.length;

    if (localPartLength <= 2) {
        return "*".repeat(localPartLength) + "@" + domainPart;
    }

    const visiblePart = localPart.slice(0, 2);
    const maskedPart = "*".repeat(localPartLength - 2);

    return `${visiblePart}${maskedPart}@${domainPart}`;
};

// 배송지 관리
export const maskName = (name) => {
    if (name.length > 1) {
        return name[0] + '*'.repeat(name.length - 1);
    }
    return name;
};

export const formatPhoneNumber = (phoneNum) => {
    if (phoneNum.length === 11) {
        return `${phoneNum.slice(0, 3)}-${phoneNum.slice(3, 4)}***-*${phoneNum.slice(8)}`;
    }
    return phoneNum;
};



// 구매 내역, 판매 내역
export const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price);
};

export const getStatusText = (status) => {
    switch (status) {
        case 'INSPECTION': return '검수 중';
        case 'PROCESS': return '입찰 중';
        case 'WAITING': return '입찰 중';
        case 'COMPLETE': return '종료';
        case 'CANCEL': return '취소';
        case 'FAIL': return '실패';
        default: return status;
    }
};

