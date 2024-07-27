import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost, logoutPost, unregisterUser, checkAuth } from "../../api/user/userApi";

const initState = {
    email: '',
    password: '',
    nickname: '',
    phoneNum: '',
    profileImg: '',
    isLogin: false,
};

export const checkAuthAsync = createAsyncThunk('checkAuthAsync', async () => {
    const response = await checkAuth();
    return response.data;
});

export const loginPostAsync = createAsyncThunk('loginPostAsync', async (param) => {
    const response = await loginPost(param);
    return response.data;
});

export const logoutPostAsync = createAsyncThunk('logoutPostAsync', async () => {
    const response = await logoutPost();
    return response.data;
});

export const unregisterUserAsync = createAsyncThunk('unregisterUserAsync', async () => {
    const response = await unregisterUser();
    return response.data;
});

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                const payload = action.payload;

                if (!payload.error) {
                    return { ...state, ...payload, isLogin: true };
                } else {
                    return { ...initState };
                }
            })
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                const payload = action.payload;

                if (!payload.error) {
                    return { ...state, ...payload, isLogin: true };
                } else {
                    return { ...initState };
                }
            })
            .addCase(loginPostAsync.pending, (state) => {
                console.log("loginPost pending");
                return state;
            })
            .addCase(loginPostAsync.rejected, (state) => {
                console.log("loginPost rejected");
                return state;
            })
            .addCase(logoutPostAsync.fulfilled, () => {
                console.log("logoutPost fulfilled");
                return { ...initState };
            })
            .addCase(logoutPostAsync.pending, (state) => {
                console.log("logoutPost pending");
                return state;
            })
            .addCase(logoutPostAsync.rejected, (state) => {
                console.log("logoutPost rejected");
                return state;
            })
            .addCase(unregisterUserAsync.fulfilled, () => {
                console.log("unregisterUser fulfilled");
                return { ...initState };
            })
            .addCase(unregisterUserAsync.pending, (state) => {
                console.log("unregisterUser pending");
                return state;
            })
            .addCase(unregisterUserAsync.rejected, (state) => {
                console.log("unregisterUser rejected");
                return state;
            });
    }
});

export default loginSlice.reducer;