import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";
import { getBookmarkProducts } from "api/user/mypageApi";

const BookmarkProduct = () => {
    const [bookmarkProducts, setBookmarkProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getBookmarkProducts();
                setBookmarkProducts(response);
            } catch (error) {
                setError('정보를 불러오는 중 오류가 발생했습니다.');
                setLoading(false);
            }
            setLoading(false);
        };
        fetchData();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const formatPrice = (price) => {
        return price.toLocaleString('ko-KR');
    };

    return (
        <div className="full-container">
           {bookmarkProducts.length > 0 ? (
                <div className="bookmark-grid">
                    {bookmarkProducts.map((bookmark, index) => (
                        <div className="bookmark-item" key={index}>
                            <img src={`${CLOUD_STORAGE_BASE_URL}/dummy/products${bookmark.productDetailsDto.productImg}`} alt={bookmark.productDetailsDto.productName} />
                            <p className="bookmark-text1">{bookmark.productDetailsDto.productBrand}</p>
                            <p className="bookmark-text2">{bookmark.productDetailsDto.productName}</p>
                            <p className="bookmark-text3">{bookmark.productDetailsDto.modelNum}</p>
                            <p className="bookmark-text4">{formatPrice(bookmark.nowLowPrice)}원</p>
                            <p className="bookmark-text5">즉시 구매가</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="non-history">관심 상품이 없습니다.</p>
            )}
        </div>
    );
}

export default BookmarkProduct;