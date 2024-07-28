import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loginPost, logoutPost, unregisterUser } from "api/user/userApi";

import { getCookie, setCookie, removeCookie } from "utils/cookieUtil";

const initState = {
    email:'',
    password:'',
    nickname:'',
    phoneNum: '',
    profileImg: ''
};

const loadMemberCookie = () => {
    
    const userInfo = getCookie("user");

    if (userInfo && userInfo.nickname) {
        userInfo.nickname = decodeURIComponent(userInfo.nickname);
    };

    return userInfo;
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param);
});

export const logoutPostAsync = createAsyncThunk('logoutPostAsync', async () => {
    return await logoutPost();
});

export const unregisterUserAsync = createAsyncThunk('unregisterUserAsync', async () => {
    return await unregisterUser();
});

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login...");

            const payload = action.payload;

            console.log("Payload for cookie:", payload);

            setCookie("user", JSON.stringify(payload), 60 * 3);
        

            return { ...state, ...payload };
        },
        logout: () => {
            console.log("logout...");

            removeCookie("user");

            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase( loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled");

            const payload = action.payload;

            if (!payload.error) {
                setCookie("user", JSON.stringify(payload), 60 * 3)         
            }

            console.log("Payload for cookie:", payload);

            return { ...state, ...payload };
        })
        .addCase(loginPostAsync.pending, () => {
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected, () => {
            console.log("rejected")
        })
        .addCase(logoutPostAsync.fulfilled, () => {
            console.log("logout fulfilled");

            removeCookie("user");
            return { ...initState };
        })
        .addCase(logoutPostAsync.pending, () => {
            console.log("logout pending");
        })
        .addCase(logoutPostAsync.rejected, () => {
            console.log("logout rejected");
        })
        .addCase(unregisterUserAsync.fulfilled, () => {
            console.log("unregister fulfilled");

            removeCookie("user");
            return { ...initState };
        })
        .addCase(unregisterUserAsync.pending, () => {
            console.log("unregister pending");
        })
        .addCase(unregisterUserAsync.rejected, () => {
            console.log("unregister rejected");
        });
    }
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;