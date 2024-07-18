import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "api/user/userApi";
import { getCookie, setCookie, removeCookie } from "pages/user/cookieUtil";

const initState = {
    email:'',
    password:'',
    nickname:'',
    phoneNum: '',
    profileImg: '',

    accessToken: null,
    refreshToken: null,
};

const loadMemberCookie = () => {
    
    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    if (accessToken && refreshToken) {
        return {
            accessToken,
            refreshToken,
        };
    }
    return null;
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

            const { accessToken, refreshToken } = action.payload;

            console.log("Payload for cookie:", action.payload);

            setCookie('accessToken', accessToken, 1); 
            setCookie('refreshToken', refreshToken, 60 * 24);
        
            return { ...state, accessToken, refreshToken };
        },
        logout: (state, action) => {
            console.log("logout...");

            removeCookie('accessToken');
            removeCookie('refreshToken');

            return {...initState}
        }
    },
    extraReducers: (builder) => {
        builder.addCase( loginPostAsync.fulfilled, (state, action) => {
            console.log("fulfilled");

            const { accessToken, refreshToken } = action.payload;

            
            setCookie("accessToken", accessToken, 1);
            setCookie("refreshToken", refreshToken, 1);
            

            console.log("Payload for cookie:", action.payload);

            return { ...state, accessToken, refreshToken };
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