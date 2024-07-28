import React from 'react';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, ToggleButton } from "@mui/material";

const BookmarkModal = ({ open, onClose, sizes, selectedSize, onSizeChange, onSave }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>관심상품 저장</DialogTitle>
        <DialogContent>
            <div className="scroll size-buttons">
                {sizes.map((size, index) => (
                    <ToggleButton
                        key={index}
                        value={size}
                        selected={selectedSize === size}
                        onChange={() => onSizeChange(size)}
                        className="btn toggle-btn"
                    >
                        <span className="black-label">{size}</span>
                    </ToggleButton>
                ))}
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>취소</Button>
            <Button onClick={onSave}>저장</Button>
        </DialogActions>
    </Dialog>
);

export default BookmarkModal;