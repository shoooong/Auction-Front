import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "api/serverApi";
import { getCookie } from "pages/user/cookieUtil";
import { Button } from "@mui/material";
// import { Button, IconButton } from "@mui/material";


import "styles/mypage.css";
import icon1 from "assets/images/icon1.jpg";
import icon2 from "assets/images/icon2.jpg";
// TODO: 배송지 관리 아이콘 추가
import icon4 from "assets/images/icon4.jpg";
import icon5 from "assets/images/icon5.jpg";
import icon6 from "assets/images/icon6.jpg";
import photo from "assets/images/myson.jpg";
// import BookmarkOff from "assets/images/bookmark-off.svg";
// import BookmarkOn from "assets/images/bookmark-on.svg";

export default function MypageMain() {

    const [profile, setProfile] = useState(null);
    const [couponCount, setCouponCount] = useState(0);
    const [buyHistory, setBuyHistory] = useState(null);
    const [saleHistory, setSaleHistory] = useState(null);
    const [bookmarkProducts, setBookmarkProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // const [like, setLike] = useState(false);

    const userInfo = getCookie("user");

    useEffect(() => {
        const fetchData = async () => {
            if (!userInfo || !userInfo.accessToken) {
                alert('로그인이 필요한 서비스입니다.');
                navigate('/user/login');
                return;
            }

            try {
                const response = await axios.get(`${SERVER_URL}/mypage`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.accessToken}`
                    }
                });
                setProfile(response.data.profileDto);
                setCouponCount(response.data.couponCount);
                setBuyHistory(response.data.buyHistoryDto);
                setSaleHistory(response.data.saleHistoryDto);
                setBookmarkProducts(response.data.bookmarkProductsDto);
            } catch (error) {
                setError('정보를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const maskEmail = (email) => {
        const [localPart, domainPart] = email.split('@');
        const localPartLength = localPart.length;

        if (localPartLength <= 2) {
            return '*'.repeat(localPartLength) + '@' + domainPart;
        }

        const visiblePart = localPart.slice(0, 2);
        const maskedPart = '*'.repeat(localPartLength - 2);

         return `${visiblePart}${maskedPart}@${domainPart}`;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };




    return (
        <div className="data-container">
            {profile && (
                <div className="profile-container"> 
                    <div className="profile">
                        {/* <img src={profile.profileImg} alt="프로필사진" /> */}
                        <img src={photo} alt="이앤톤" />
                        <div>
                            <p>{profile.nickname}</p>
                            <p>{maskEmail(profile.email)}</p>
                        </div>
                    </div>

                    <div className="button-container">
                        <Button className="medium-btn" onClick={() => navigate('/mypage/modify')}>
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
                    <img src="" alt="배송지관리 아이콘" onClick={() => navigate('/mypage/delivery')}/>
                    <p>배송지 관리</p>
                </div>
                <div className="button">
                    <img src={icon4} alt="회원탈퇴 아이콘" />
                    <p>회원 탈퇴</p>
                </div>
                <div className="button">
                    <img src={icon5} alt="응모내역 아이콘" onClick={() => navigate('/mypage/applyHistory')}/>
                    <p>응모내역</p>
                </div>
                <div className="button">
                    <img src={icon6} alt="공지사항 아이콘" onClick={() => navigate('/service/info')}/>
                    <p>공지사항</p>
                </div>
            </div>
            
            <div className="buy-history">
                <div className="history-title">
                    <p>구매 내역</p>
                    <Link to="/mypage/buyingHistory">더보기 ></Link>
                </div>
                {buyHistory && (
                    <div>
                        <div className="buy-summary">
                            <div>전체 <span>{buyHistory.allCount}</span></div>
                            <div>입찰 중 <span>{buyHistory.processCount}</span></div>
                            <div>종료 <span>{buyHistory.completeCount}</span></div>
                        </div>
                        {buyHistory.orderDetails.length > 0 ? (
                            buyHistory.orderDetails.map(order => (
                                <div className="buy-item" key={order.productId}>
                                    {/* <img src={order.productImg} alt={order.productName} /> */}
                                    <img src={photo} alt="이앤톤" />
                                    <div>
                                        <p>{order.productName}</p>
                                        <p>{order.productSize}</p>
                                    </div>
                                        <p>{formatPrice(order.orderPrice)}원</p>
                                        <p>{order.orderStatus}</p>
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
                    <Link to="/mypage/salesHistory">더보기 ></Link>
                </div>
                {saleHistory && (
                    <div>
                        <div className="sale-summary">
                            <div>전체 <span>{saleHistory.allCount}</span></div>
                            <div>검수 중 <span>{saleHistory.inspectionCount}</span></div>
                            <div>진행 중 <span>{saleHistory.processCount}</span></div>
                            <div>종료 <span>{saleHistory.completeCount}</span></div>
                        </div>
                        {saleHistory.saleDetails.length > 0 ? (
                            saleHistory.saleDetails.map(sale => (
                                <div className="sale-item" key={sale.productId}>
                                    {/* <img src={sale.productImg} alt={sale.productName} /> */}
                                    <img src={photo} alt="이앤톤" />
                                    <div>
                                        <p>{sale.productName}</p>
                                        <p>{sale.productSize}</p>
                                    </div>
                                        <p>{formatPrice(sale.saleBiddingPrice)}원</p>
                                        <p>{sale.salesStatus}</p>
                                </div>
                            ))
                        ) : (
                            <p className="non-history">판매 내역이 없습니다.</p>
                        )}
                    </div>
                )}
            </div>
            
            <div className="mypage-banner">
                <img src="" alt="이벤트 배너" />                 
            </div>
            
            <div className="bookmark">
                <div className="history-title">
                    <p>관심 상품</p>
                    <Link to="/mypage/bookmark">더보기 ></Link>
                </div>
                {bookmarkProducts.length > 0 ? (
                    <div className="bookmark-grid">
                        {bookmarkProducts.map(bookmark => (
                            <div className="bookmark-item" key={bookmark.productDetailsDto.productId}>
                                {/* <img src={bookmark.productDetailsDto.productImg} alt={bookmark.productDetailsDto.name} /> */}
                                {/* <img src={photo} alt="이앤톤" /> */}

                                {/* <div className="product"> */}
                                    <img src={photo} alt="이앤톤" />
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
                                
                                <p className="bookmark-text1">{bookmark.productDetailsDto.productBrand}</p>
                                <p className="bookmark-text2">{bookmark.productDetailsDto.productName}</p>
                                <p className="bookmark-text3">{bookmark.productDetailsDto.modelNum}</p>
                                <p className="bookmark-text4">{bookmark.nowLowPrice}원</p>
                                <p className="bookmark-text5">즉시 구매가</p>

                            </div>
                        ))}
                    </div>
                ): (
                    <p className="non-history">관심 상품이 없습니다.</p>
                )}
            </div>
        </div>
    );
}
