import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../../api/user/userApi";
import { getCookie, setCookie, removeCookie } from "../../pages/user/cookieUtil";

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

        console.log("userInfo: " + userInfo);
        console.log(userInfo.nickname);
        console.log(userInfo.email);
        console.log(userInfo.password);
        console.log(userInfo.phoneNum);
        console.log(userInfo.profileImg);

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

            const payload = action.payload;

            console.log("Payload for cookie:", payload);

            setCookie("user", JSON.stringify(payload), 1);
        

            return { ...state, ...payload };
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

            console.log("Payload for cookie:", payload);

            return { ...state, ...payload };
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