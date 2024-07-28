import React from 'react';

import { Button } from "@mui/material";

const BookmarkButton = ({ onClick, bookmarkCount }) => (
    <Button 
        className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeMedium MuiButton-textSizeMedium MuiButton-colorPrimary btn full-btn border-btn align-center css-1e6y48t-MuiButtonBase-root-MuiButton-root" 
        onClick={onClick}
    >
        <span>
            <img src="/static/media/bookmark-off.6b051f0a6642a44e2147719b5bbbf331.svg" alt="BookmarkOff" />
        </span>
        관심상품
        <span>{bookmarkCount}</span>
    </Button>
);

export default BookmarkButton;