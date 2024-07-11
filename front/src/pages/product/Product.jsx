import React from 'react';
import { IconButton } from "@mui/material";
import BookmarkOff from "../../assets/images/bookmark-off.svg";
import BookmarkOn from "../../assets/images/bookmark-on.svg";
import "../../styles/product.css";

const Product = ({ rank, productImg, productBrand, productName, productLike, modelNum, productMinPrice, setLike, like }) => {
  return (
    <div className="product">
      <div>
        <img src={productImg} alt={productName} className="post-image" />
        {/* <img src={productImg} alt={productName} className="post-image" /> */}
        <span className="rank">{rank}</span> {/* 순위 표시 */}
        <IconButton onClick={() => setLike((like) => !like)} className="">
          {like ? (
            <span>
              <img src={BookmarkOn} alt="BookmarkOn" />
            </span>
          ) : (
            <span>
              <img src={BookmarkOff} alt="BookmarkOff" />
            </span>
          )}
        </IconButton>
      </div>
      <div>
        <p className="semibold-black">{productBrand}</p>
        <p className="light-black">{productName}</p>
        <span className="red-bullet">{modelNum}</span>
        <span className="semibold-black">
          {productMinPrice}
          <span className="light-black">원</span>
        </span>
        <span className="light-grey">즉시 구매가</span>
      </div>
    </div>
  );
};

export default Product;
