import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost, logoutPost, unregisterUser, checkAuth } from "../../api/user/userApi";

// 초기 상태 설정
const initState = {
    email: '',
    password: '',
    nickname: '',
    phoneNum: '',
    profileImg: '',
    isLogin: false,
};

// 인증 상태 확인 비동기 작업 생성
export const checkAuthAsync = createAsyncThunk('checkAuthAsync', async () => {
    const response = await checkAuth();
    return response.data;
});

// 로그인 비동기 작업 생성
export const loginPostAsync = createAsyncThunk('loginPostAsync', async (param) => {
    const response = await loginPost(param);
    return response.data;
});

// 로그아웃 비동기 작업 생성
export const logoutPostAsync = createAsyncThunk('logoutPostAsync', async () => {
    const response = await logoutPost();
    return response.data;
});

// 사용자 탈퇴 비동기 작업 생성
export const unregisterUserAsync = createAsyncThunk('unregisterUserAsync', async () => {
    const response = await unregisterUser();
    return response.data;
});

// 로그인 슬라이스 생성
const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                console.log("checkAuth fulfilled");

                const payload = action.payload;

                if (!payload.error) {
                    return { ...state, ...payload, isLogin: true };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log("loginPost fulfilled");

                const payload = action.payload;

                if (!payload.error) {
                    return { ...state, ...payload, isLogin: true };
                } else {
                    return { ...state, isLogin: false };
                }
            })
            .addCase(loginPostAsync.pending, () => {
                console.log("loginPost pending");
            })
            .addCase(loginPostAsync.rejected, () => {
                console.log("loginPost rejected");
            })
            .addCase(logoutPostAsync.fulfilled, () => {
                console.log("logoutPost fulfilled");
                return { ...initState };
            })
            .addCase(logoutPostAsync.pending, () => {
                console.log("logoutPost pending");
            })
            .addCase(logoutPostAsync.rejected, () => {
                console.log("logoutPost rejected");
            })
            .addCase(unregisterUserAsync.fulfilled, () => {
                console.log("unregisterUser fulfilled");
                return { ...initState };
            })
            .addCase(unregisterUserAsync.pending, () => {
                console.log("unregisterUser pending");
            })
            .addCase(unregisterUserAsync.rejected, () => {
                console.log("unregisterUser rejected");
            });
    }
});

// 슬라이스 리듀서 내보내기
export default loginSlice.reducer;