import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "api/user/userApi";
import { getCookie, setCookie, removeCookie } from "pages/user/cookieUtil";

const initState = {
    email:'',
    password:'',
    nickname:'',
    phoneNum: '',
    profileImg: '',

    isLogin: false,
};

const loadMemberCookie = () => {
    
    const isLogin = getCookie("isLogin");

    if (isLogin === "true") {
        return { isLogin: true };
    }

    return { isLogin: false };
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

            console.log("Payload for cookie:", action.payload);
        
            return { ...state, isLogin: true };
        },
        logout: (state, action) => {
            console.log("logout...");

            removeCookie('isLogin');

            return { ...initState, isLogin: false };
        }
    },
    extraReducers: (builder) => {
        builder.addCase( loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled");
            console.log("Payload for cookie:", action.payload);

            return { ...state, isLogin: true };
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