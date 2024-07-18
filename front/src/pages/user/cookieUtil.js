import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days) => {

    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);

    return cookies.set(name, value, {path:'/', expires:expires});
};

export const getCookie = (name) => {
    return cookies.get(name);
    // let value = "; " + document.cookie;
    // let parts = value.split("; " + name + "=");
    // if (parts.length === 2)
    //     return parts.pop().split(";").shift();
    // return null;
};

export const removeCookie = (name, path='/') => {
    cookies.remove(name, {path});
};