import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../../api/user/userApi";
import { getCookie, setCookie, removeCookie } from "../../pages/user/cookieUtil";

const initState = {
    email:''
};

const loadMemberCookie = () => {
    
    const userInfo = getCookie("user");

    if (userInfo && userInfo.nickname) {
        userInfo.nickname = decodeURIComponent(userInfo.nickname);

        console.log("userInfo: " + userInfo);
        console.log(userInfo.nickname);
    };

    return userInfo;
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param);
});

const loginSlice = createSlice({
    name: 'LoginSlice',
    initialState: loadMemberCookie() || initState,
    reducers: {
        login: (state, action) => {
            console.log("login...");

            const data = action.payload;

            return {email: data.email};
        },
        logout: (state, action) => {
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
                setCookie("user", JSON.stringify(payload), 1)         // 1일
            }
            return payload;
        })
        .addCase(loginPostAsync.pending, (state,action) => {
            console.log("pending")
        })
        .addCase(loginPostAsync.rejected, (state,action) => {
            console.log("rejected")
        })
    }
});

export const {login, logout} = loginSlice.actions;

export default loginSlice.reducer;