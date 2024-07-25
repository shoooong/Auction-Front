import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "api/serverApi";
import jwtAxios from "pages/user/jwtUtil";
import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";
import "styles/bookmark.css";

const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/";
const CLOUD_STORAGE_BASE_URL_DUMMY = "https://kr.object.ncloudstorage.com/push/shooong/dummy/";

const MypageBookmark = () => {
    const [requestProducts, setRequestProducts] = useState([]);
    const [feedBookmarks, setFeedBookmarks] = useState([]);

    useEffect(() => {
        const fetchRequestProducts = async () => {
            try {
                const response = await jwtAxios.get(`${SERVER_URL}/select/bookmark`);
                setRequestProducts(response.data);
            } catch (error) {
                console.error("Error fetching request products:", error);
            }
        };

        fetchRequestProducts();
    }, []);

    useEffect(() => {
        const fetchFeedBookmarks = async () => {
            try {
                const response = await jwtAxios.get(`${SERVER_URL}/feed/feedBookmark`);
                setFeedBookmarks(response.data);
            } catch (error) {
                console.error("Error fetching feed bookmarks:", error);
            }
        };

        fetchFeedBookmarks();
    }, []);

    return (
        <div className="container"> 
            <div className="mypage-tab buying">
                <Tabs defaultValue={1}>
                    <TabsList className="bookmark-tab">
                        <Tab value={1}>
                            <span className="bookmark-tab-span">관심 상품</span>
                        </Tab>
                        <Tab value={2}>
                            <span className="bookmark-tab-span">관심 스타일</span>
                        </Tab>
                    </TabsList>
                    <TabPanel value={1}>
                        <div className="request-products">
                            {requestProducts.length === 0 ? (
                                <p>로딩 중...</p>
                            ) : (
                                requestProducts.map(product => (
                                    <Link 
                                      key={product.productId} 
                                      to={`/clothes/details/${product.modelNum}`}
                                      className="product-item"
                                    >
                                        <img 
                                            src={`${CLOUD_STORAGE_BASE_URL_DUMMY}products${product.productImg}`} 
                                            alt={product.productName} 
                                        />
                                        <h3>{product.productName}</h3>
                                        <p>{product.productBrand}</p>
                                        <p>Lowest Bidding Price: {product.salesBiddingPrice ? `${product.salesBiddingPrice} 원` : "없음"}</p>
                                    </Link>
                                ))
                            )}
                        </div>
                    </TabPanel>
                    <TabPanel value={2}>
                        <div className="feed-bookmarks">
                            {feedBookmarks.length === 0 ? (
                                <p>로딩 중...</p>
                            ) : (
                                feedBookmarks.map(feed => (
                                    <Link 
                                      key={feed.feedId} 
                                      to={`/style/styledetail/${feed.feedId}`}
                                      className="feed-item"
                                    >
                                        <img 
                                            src={`${CLOUD_STORAGE_BASE_URL}${feed.feedImage}`} 
                                            alt={`Feed ${feed.feedId}`} 
                                        />
                                        <h3>{feed.feedTitle}</h3>
                                        <p>Feed ID: {feed.feedId}</p>
                                    </Link>
                                ))
                            )}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default MypageBookmark;
