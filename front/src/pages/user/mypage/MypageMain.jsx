import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useCustomLogin from "hooks/useCustomLogin";
import { getMypageData } from "api/user/mypageApi";
import { CLOUD_STORAGE_BASE_URL } from "api/cloudStrorageApi";
import { formatPrice, getStatusText, maskEmail } from "pages/user/mypageUtil";
import { Button } from "@mui/material";
// import { Button, IconButton } from "@mui/material";

import "styles/mypage.css";
import icon1 from "assets/images/icon1.svg";
import icon2 from "assets/images/icon2.svg";
import icon3 from "assets/images/icon3.svg";
import icon4 from "assets/images/icon4.svg";
import icon5 from "assets/images/icon5.svg";
import icon6 from "assets/images/icon6.svg";
import banner from "assets/images/toss_banner.webp";
// import BookmarkOff from "assets/images/bookmark-off.svg";
// import BookmarkOn from "assets/images/bookmark-on.svg";

export default function MypageMain() {
    const [profile, setProfile] = useState(null);
    const [couponCount, setCouponCount] = useState(0);
    const [buyHistory, setBuyHistory] = useState(null);
    const [saleHistory, setSaleHistory] = useState(null);
    const [bookmarkProducts, setBookmarkProducts] = useState([]);
    // const [like, setLike] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {exceptionHandler} = useCustomLogin();

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getMypageData();

                setProfile(response.profileDto);
                setCouponCount(response.couponCount);
                setBuyHistory(response.buyHistoryAllDto);
                setSaleHistory(response.saleHistoryDto);
                setBookmarkProducts(response.bookmarkProductsDto);
            } catch (error) {
                exceptionHandler(error);
                setError("정보를 불러오는 중 오류가 발생했습니다.");
            }
            
            setLoading(false);
        };
        fetchData();
    }, [exceptionHandler]);

    const getStatusCount = (status) => {
        const statusCount = saleHistory.salesStatusCounts.find(count => count.salesStatus === status);
        return statusCount ? statusCount.count : 0;
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    

    

    return (
        <div className="full-container">
            {profile && (
                <div className="profile-container">
                    <div className="profile">
                    <img src={`${CLOUD_STORAGE_BASE_URL}/mypage/${profile.profileImg}`} alt="프로필사진" />
                        <div>
                            <p>{profile.nickname}</p>
                            <p>{maskEmail(profile.email)}</p>
                        </div>
                    </div>

                    <div className="button-container">
                        <Button
                            className="medium-btn"
                            onClick={() => navigate("/mypage/modify")}
                        >
                            <span className="black-label">프로필 관리</span>
                        </Button>
                        <Button className="medium-btn">
                            <span className="black-label">내 스타일</span>
                        </Button>
                    </div>
                </div>
            )}

            <div className="buttons">
                <div className="button">
                    <img src={icon1} alt="판매자등급 아이콘" />
                    <p>판매자 등급</p>
                </div>
                <div className="button">
                    <img src={icon2} alt="쿠폰 아이콘" />
                    <p>쿠폰 {couponCount}</p>
                </div>
                <div className="button">
                    <img
                        src={icon3}
                        alt="배송지관리 아이콘"
                        onClick={() => navigate("/mypage/delivery")}
                    />
                    <p>배송지 관리</p>
                </div>
                <div className="button">
                    <img
                        className="account-img"
                        src={icon4}
                        alt="계좌관리 아이콘"
                    />
                    <p>계좌 관리</p>
                </div>
                <div className="button">
                    <img
                        src={icon5}
                        alt="응모내역 아이콘"
                        onClick={() => navigate("/mypage/applyHistory")}
                    />
                    <p>응모내역</p>
                </div>
                <div className="button">
                    <img
                        src={icon6}
                        alt="공지사항 아이콘"
                        onClick={() => navigate("/service/info")}
                    />
                    <p>공지사항</p>
                </div>
            </div>

            <div className="buy-history">
                <div className="history-title">
                    <p>구매 내역</p>
                    <Link to="/mypage/buyingHistory">더보기</Link>
                </div>
                {buyHistory && (
                    <div>
                        <div className="buy-summary">
                            <div>
                                전체 <span>{buyHistory.allCount}</span>
                            </div>
                            <div>
                                입찰 중 <span>{buyHistory.processCount}</span>
                            </div>
                            <div>
                                종료 <span>{buyHistory.completeCount}</span>
                            </div>
                        </div>
                        {buyHistory.buyingDetails.length > 0 ? (
                            buyHistory.buyingDetails.map((buy, index) => (
                                <div className="buy-item" key={index}>
                                    <img src={`${CLOUD_STORAGE_BASE_URL}/products/${buy.productImg}`} alt={buy.productName} />
                                    <div>
                                        <p>{buy.productName}</p>
                                        <p>{buy.productSize}</p>
                                    </div>
                                    <p>{formatPrice(buy.orderPrice)}원</p>
                                    <p>{getStatusText(buy.biddingStatus)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="non-history">구매 내역이 없습니다.</p>
                        )}
                    </div>
                )}
            </div>

            <div className="sale-history">
                <div className="history-title">
                    <p>판매 내역</p>
                    <Link to="/mypage/salesHistory">더보기</Link>
                </div>
                {saleHistory && (
                    <div>
                        <div className="sale-summary">
                            <div>
                                전체 <span>{saleHistory.allCount}</span>
                            </div>
                            <div>
                                검수 중 <span>{getStatusCount('INSPECTION')}</span>
                            </div>
                            <div>
                                입찰 중 <span>{getStatusCount('PROCESS')}</span>
                            </div>
                            <div>
                                종료 <span>{getStatusCount('COMPLETE')}</span>
                            </div>
                        </div>
                        {saleHistory.saleDetails.length > 0 ? (
                            saleHistory.saleDetails.map((sale, index) => (
                                <div className="sale-item" key={index}>
                                    <img src={`${CLOUD_STORAGE_BASE_URL}/products/${sale.productImg}`} alt={sale.productName} />
                                    <div>
                                        <p>{sale.productName}</p>
                                        <p>{sale.productSize}</p>
                                    </div>
                                    <p>
                                        {formatPrice(sale.saleBiddingPrice)}원
                                    </p>
                                    <p>{getStatusText(sale.salesStatus)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="non-history">판매 내역이 없습니다.</p>
                        )}
                    </div>
                )}
            </div>

            <div>
                <img className="mypage-banner" src={banner} alt="이벤트 배너" />
            </div>

            <div className="bookmark">
                <div className="history-title">
                    <p>관심 상품</p>
                    <Link to="/mypage/bookmark">더보기</Link>
                </div>
                {bookmarkProducts.length > 0 ? (
                    <div className="bookmark-grid">
                        {bookmarkProducts.map((bookmark, index) => (
                            <div className="bookmark-item product" key={index}>
                                <img src={`${CLOUD_STORAGE_BASE_URL}/products/${bookmark.productDetailsDto.productImg}`} alt={bookmark.productDetailsDto.name} />
                                {/* <img src={photo} alt="이앤톤" /> */}

                                {/* <div className="product"> */}
                                {/* <img src={photo} alt="이앤톤" /> */}
                                {/* <div className="icon-container">
                                        <IconButton
                                            onClick={() => setLike((like) => !like)}
                                            className=""
                                        >
                                            {like ? (
                                                <span>
                                                    <img
                                                        src={BookmarkOn}
                                                        alt="BookmarkOn"
                                                    />
                                                </span>
                                            ) : (
                                                <span>
                                                    <img
                                                        src={BookmarkOff}
                                                        alt="BookmarkOff"
                                                    />
                                                </span>
                                            )}
                                        </IconButton>
                                    </div> */}
                                {/* </div> */}
                                <div>
                                    <p className="semibold-black">
                                        {
                                            bookmark.productDetailsDto
                                                .productBrand
                                        }
                                    </p>
                                    <p className="light-black">
                                        {bookmark.productDetailsDto.productName}
                                    </p>
                                    <span className="red-bullet">
                                        {bookmark.productDetailsDto.modelNum}
                                    </span>
                                    <span className="semibold-black">
                                        {bookmark.nowLowPrice}
                                        <span className="light-black">원</span>
                                    </span>
                                    <span className="light-grey">
                                        즉시 구매가
                                    </span>
                                </div>
                                {/* <p className="bookmark-text1">
                                    {bookmark.productDetailsDto.productBrand}
                                </p>
                                <p className="bookmark-text2">
                                    {bookmark.productDetailsDto.productName}
                                </p>
                                <p className="bookmark-text3">
                                    {bookmark.productDetailsDto.modelNum}
                                </p>
                                <p className="bookmark-text4">
                                    {bookmark.nowLowPrice}원
                                </p>
                                <p className="bookmark-text5">즉시 구매가</p> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="non-history">관심 상품이 없습니다.</p>
                )}
            </div>
        </div>
    );
}
