import create from 'zustand';
import { loginPost, logoutPost, unregisterUser, checkAuth } from 'api/user/userApi';
import { getCookie, removeCookie } from 'pages/user/cookieUtil';

// 초기 상태 설정
const initState = {
    email: '',
    nickname: '',
    phoneNum: '',
    profileImg: '',
    isLogin: false,
};

// 쿠키에서 회원 정보 로드
const loadMemberCookie = () => {
    const userInfo = getCookie("user");
    if (userInfo && userInfo.nickname) {
        userInfo.nickname = decodeURIComponent(userInfo.nickname);
    }
    return userInfo || initState;
};

// Zustand 스토어 생성
const useLoginStore = create((set) => ({
    ...loadMemberCookie(),
    login: async (param) => {
        try {
            const response = await loginPost(param);
            const payload = response.data;
            if (!payload.error) {
                // 쿠키는 서버에서 설정되므로 여기서는 상태만 업데이트
                set({ ...payload, isLogin: true });
            }
        } catch (error) {
            console.log("login rejected", error);
        }
    },
    logout: async () => {
        try {
            await logoutPost();
            removeCookie("user");
            set({ ...initState });
        } catch (error) {
            console.log("logout rejected", error);
        }
    },
    unregister: async () => {
        try {
            await unregisterUser();
            removeCookie("user");
            set({ ...initState });
        } catch (error) {
            console.log("unregister rejected", error);
        }
    },
    checkAuth: async () => {
        try {
            const response = await checkAuth();
            const payload = response.data;
            if (!payload.error) {
                set({ ...payload, isLogin: true });
            } else {
                set({ isLogin: false });
            }
        } catch (error) {
            set({ isLogin: false });
            console.log("checkAuth rejected", error);
        }
    }
}));

export default useLoginStore;