import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCookie } from "pages/user/cookieUtil";
import { getUser, modifyUser } from "api/user/userApi";

const initState = {
    email: '',
    password: '',
    nickname: '',
    phoneNum: '',
    profileImg: ''
};

const ModifyPage = () => {
    const [user, setUser] = useState(initState);

    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = getCookie("user");

        if (!userInfo || !userInfo.accessToken) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/user/login');
            return;
        }

        const fetchData = async () => {
            try {
                const response = await getUser(userInfo.accessToken);
                setUser({...response});
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [navigate]);

    const handleChange = (e) => {
        user[e.target.name] = e.target.value;

        setUser({...user});
    }

    const handleClickModify = async () => {
        try {
            await modifyUser(user);
            alert('회원 정보가 성공적으로 수정되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('Modify Error...', error);
            alert('회원 정보 수정에 실패하였습니다. 다시 시도해 주세요.');
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setUser(prevState => ({ ...prevState, profileImg: reader.result }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const maskEmail = (email) => {
        const [localPart, domainPart] = email.split('@');
        const localPartLength = localPart.length;

        if (localPartLength <= 2) {
            return '*'.repeat(localPartLength) + '@' + domainPart;
        }

        const visiblePart = localPart.slice(0, 2);
        const maskedPart = '*'.repeat(localPartLength - 2);

         return `${visiblePart}${maskedPart}@${domainPart}`;
    };

    return (
        <div className="data-container">
            <div  className="history-title">
                <p>프로필 수정</p>
            </div>

            <div className="top-container">
                <div className="modify-img-container">
                    <img className="modify-img" src={user.profileImg} alt="프로필 이미지" />
                    <div className="file-input-container">
                        <input type="file" id="file-input" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                        <label htmlFor="file-input" className="file-input-label">파일 선택</label>
                    </div>
                </div>
                <div>
                    <div className="modify-nickname">
                        <input name="nickname" type={'text'} value={user.nickname} onChange={handleChange} />
                    </div>

                    <div className="modify-email">
                        <input name="email" type={'text'} value={maskEmail(user.email)} readOnly />
                    </div>
                </div>
            </div>

            <div>
                <div className="modify-phone">
                    <input name="phoneNum" type={'text'} value={user.phoneNum} onChange={handleChange} />
                </div>
                <div className="modify-password">
                    <input name="password" type={'password'} value={user.password} onChange={handleChange} />
                </div>
            </div>

            <div>
                <button type="button" onClick={handleClickModify}>수정</button>
                <button type="button" onClick={() => navigate('/mypage')}>취소</button>
            </div>
        </div>
    );
}

export default ModifyPage;