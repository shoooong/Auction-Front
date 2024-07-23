import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCookie } from "pages/user/cookieUtil";
import { getUser, modifyUser } from "api/user/userApi";
import { formatPhoneNumber, maskEmail } from "../mypageUtil";

const initState = {
    email: '',
    password: '',
    nickname: '',
    phoneNum: '',
    profileImg: ''
};

const ModifyPage = () => {
    const [user, setUser] = useState(initState);
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong";
    
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

    const handleChange = ({ target: { name, value } }) => {
        setUser((prev) => ({ ...prev,
            [name]: name === "password" ? (value ? value : null) : value  }));
    }

    const handleClickModify = async () => {
        try {   
            await modifyUser(user, file);
            alert('회원 정보가 성공적으로 수정되었습니다.');
            navigate('/mypage');
        } catch (error) {
            console.error('Modify Error...', error);
            alert('회원 정보 수정에 실패하였습니다. 다시 시도해 주세요.');
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
            setUser(prevState => ({ ...prevState, profileImg: reader.result }));
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    

    return (
        <div className="profile-modify-container">
            <div className="detail-history-title">
                <h2 className="title">프로필 수정</h2>
            </div>

            <div className="profile-top-container">
                <div className="profileImg-modify-container">
                    <img className="modify-img" src={user.profileImg.startsWith('data:') ? user.profileImg : `${CLOUD_STORAGE_BASE_URL}/mypage/${user.profileImg}`} alt="프로필 이미지" />
                    <div className="profile-input-container">
                        <input type="file" id="file-input" accept=".jpg, .jpeg, .png" onChange={handleFileChange} />
                        <label htmlFor="file-input" className="profile-input-label">파일 선택</label>
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

            <div className="profile-bottom-container">
                <div className="modify-phone">
                    <input name="phoneNum" type={'text'} value={formatPhoneNumber(user.phoneNum)} onChange={handleChange} />
                </div>
                <div className="modify-password">
                    <input name="password" type={'password'} placeholder="비밀번호는 영문, 숫자, 특수문자를 포함하여 10자 이상이어야 합니다." onChange={handleChange} />
                </div>
            </div>

            <div className="profile-button">
                <button type="button" onClick={handleClickModify}>수정</button>
                <button type="button" onClick={() => navigate('/mypage')}>취소</button>
            </div>
        </div>
    );
}

export default ModifyPage;