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
    if (!name) {
        return "";
    }
    
    if (name.length <= 2) {
        return name.charAt(0) + "*";
    }
    return name.charAt(0) + "*".repeat(name.length - 2) + name.charAt(name.length - 1);
}

export const formatPhoneNumber = (phoneNum) => {
    if (!phoneNum) {
        return "";
    }

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
        case 'CANCEL': return '입찰 취소';
        case 'FAIL': return '실패';
        default: return status;
    }
};


// 정규 표현식
export const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$#!%*?&]{8,}$/;
export const phoneNumRegExp = /^\d{11}$/;
export const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


