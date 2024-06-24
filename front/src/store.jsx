import { configureStore } from '@reduxjs/toolkit';
import loginSlice from './pages/user/slices/loginSlice';

export default configureStore({
    reducer: {
        "loginSlice": loginSlice
    }
});