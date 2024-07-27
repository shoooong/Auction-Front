import { Cookies } from "react-cookie";

const cookies = new Cookies();

// export const setCookie = (name, value, days) => {

//     const expires = new Date();
//     expires.setUTCDate(expires.getUTCDate() + days);

//     return cookies.set(name, value, {path:'/', expires:expires});
// };

export const setCookie = (name, value, minutes) => {
    
    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000);

    return cookies.set(name, value, { path: "/", expires:expires });
};

export const getCookie = (name) => {
    return cookies.get(name);
};

export const removeCookie = (name, path='/') => {
    cookies.remove(name, {path});
};