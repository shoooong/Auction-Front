import { useState } from "react";

import { IconButton, Button, Box, Dialog, DialogTitle } from "@mui/material";
import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";

import BookmarkOff from "assets/images/bookmark-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";
import LikeOff from "assets/images/life-off-grey.svg";
import LikeOffBlack from "assets/images/like-off.svg";
import LikeOn from "assets/images/like-on.svg";
import LikeOnBlack from "assets/images/like-on-black.svg";

export default function Sample() {
    // 좋아요 그리고 북마크 훅
    const [like, setLike] = useState(false);
    const [likeH, setLikeH] = useState(false);

    // 팝업 훅
    const [open, setOpen] = useState(false);

    // 마이페이지 탭버튼
    // const [value, setValue] = React.useState(0);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    return (
        <div className="container">
            <h1>페이지의 타이틀</h1>
            <h2 className="title">상의</h2>

            <h1>박스의 타이틀</h1>
            <Box className="product-title-box">
                <h2 className="product-title">지금 많이 거래되는 상품</h2>
                <h3 className="product-sub-title">거래량 급상승</h3>
            </Box>

            <h1>박스</h1>
            <Box className="box">
                <Box className="product-title-box">
                    <h2 className="product-title">지금 많이 거래되는 상품</h2>
                    <h3 className="product-sub-title">거래량 급상승</h3>
                </Box>
                <Box className="product-wrap no-wrap">
                    <div className="product">
                        <div>
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
                        </div>
                        <div>
                            <p className="semibold-black">Nike</p>
                            <p className="light-black">
                                Nike x Supreme SB Darwin Low White
                            </p>
                            <span className="red-bullet">FQ3000-100</span>
                            <span className="semibold-black">
                                205,000
                                <span className="light-black">원</span>
                            </span>
                            <span className="light-grey">즉시 구매가</span>
                        </div>
                    </div>
                    <div className="product">
                        <div>
                            <span className="rank">1</span>
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
                        </div>
                        <div>
                            <p className="semibold-black">Nike</p>
                            <p className="light-black">
                                Nike x Supreme SB Darwin Low White
                            </p>
                            <span className="red-bullet">FQ3000-100</span>
                            <span className="semibold-black">
                                205,000
                                <span className="light-black">원</span>
                            </span>
                            <span className="light-grey">즉시 구매가</span>
                        </div>
                    </div>
                    <div className="product">
                        <div>
                            <span className="rank">1</span>
                            <IconButton
                                onClick={() => setLikeH((likeH) => !likeH)}
                                className=""
                            >
                                {likeH ? (
                                    <span>
                                        <img src={LikeOn} alt="LikeOn" />
                                    </span>
                                ) : (
                                    <span>
                                        <img src={LikeOff} alt="LikeOff" />
                                    </span>
                                )}
                            </IconButton>
                        </div>
                        <div>
                            <p className="semibold-black">Nike</p>
                            <p className="light-black">
                                Nike x Supreme SB Darwin Low White
                            </p>
                            <span className="red-bullet">FQ3000-100</span>
                            <span className="semibold-black">
                                205,000
                                <span className="light-black">원</span>
                            </span>
                            <span className="light-grey">즉시 구매가</span>
                        </div>
                    </div>
                    <div className="product">
                        <div>
                            <span className="rank">1</span>
                            <IconButton
                                onClick={() => setLikeH((likeH) => !likeH)}
                                className=""
                            >
                                {likeH ? (
                                    <span>
                                        <img
                                            src={LikeOnBlack}
                                            alt="LikeOnBlack"
                                        />
                                    </span>
                                ) : (
                                    <span>
                                        <img
                                            src={LikeOffBlack}
                                            alt="LikeOffBlack"
                                        />
                                    </span>
                                )}
                            </IconButton>
                        </div>
                        <div>
                            <p className="semibold-black">Nike</p>
                            <p className="light-black">
                                Nike x Supreme SB Darwin Low White
                            </p>
                            <span className="red-bullet">FQ3000-100</span>
                            <span className="semibold-black">
                                205,000
                                <span className="light-black">원</span>
                            </span>
                            <span className="light-grey">즉시 구매가</span>
                        </div>
                    </div>
                    <div className="product">
                        <div>
                            <span className="rank">1</span>
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
                        </div>
                        <div>
                            <p className="semibold-black">Nike</p>
                            <p className="light-black">
                                Nike x Supreme SB Darwin Low White
                            </p>
                            <span className="red-bullet">FQ3000-100</span>
                            <span className="semibold-black">
                                205,000
                                <span className="light-black">원</span>
                            </span>
                            <span className="light-grey">즉시 구매가</span>
                        </div>
                    </div>
                </Box>

                <h1>더보기 버튼과 위치</h1>
                <div className="text-center">
                    <Button className="add-btn">더보기</Button>
                </div>
            </Box>

            <h1>상품만 있는 페이지를 위한 박스</h1>
            <Box className="product-wrap inline-flex">
                <div className="product">
                    <div>
                        <IconButton
                            onClick={() => setLike((like) => !like)}
                            className=""
                        >
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
                        <p className="semibold-black">Nike</p>
                        <p className="light-black">
                            Nike x Supreme SB Darwin Low White
                        </p>
                        <span className="red-bullet">FQ3000-100</span>
                        <span className="semibold-black">
                            205,000
                            <span className="light-black">원</span>
                        </span>
                        <span className="light-grey">즉시 구매가</span>
                    </div>
                </div>
                <div className="product">
                    <div>
                        <span className="rank">1</span>
                        <IconButton
                            onClick={() => setLike((like) => !like)}
                            className=""
                        >
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
                        <p className="semibold-black">Nike</p>
                        <p className="light-black">
                            Nike x Supreme SB Darwin Low White
                        </p>
                        <span className="red-bullet">FQ3000-100</span>
                        <span className="semibold-black">
                            205,000
                            <span className="light-black">원</span>
                        </span>
                        <span className="light-grey">즉시 구매가</span>
                    </div>
                </div>
                <div className="product">
                    <div>
                        <span className="rank">1</span>
                        <IconButton
                            onClick={() => setLikeH((likeH) => !likeH)}
                            className=""
                        >
                            {likeH ? (
                                <span>
                                    <img src={LikeOn} alt="LikeOn" />
                                </span>
                            ) : (
                                <span>
                                    <img src={LikeOff} alt="LikeOff" />
                                </span>
                            )}
                        </IconButton>
                    </div>
                    <div>
                        <p className="semibold-black">Nike</p>
                        <p className="light-black">
                            Nike x Supreme SB Darwin Low White
                        </p>
                        <span className="red-bullet">FQ3000-100</span>
                        <span className="semibold-black">
                            205,000
                            <span className="light-black">원</span>
                        </span>
                        <span className="light-grey">즉시 구매가</span>
                    </div>
                </div>
                <div className="product">
                    <div>
                        <span className="rank">1</span>
                        <IconButton
                            onClick={() => setLikeH((likeH) => !likeH)}
                            className=""
                        >
                            {likeH ? (
                                <span>
                                    <img src={LikeOnBlack} alt="LikeOnBlack" />
                                </span>
                            ) : (
                                <span>
                                    <img
                                        src={LikeOffBlack}
                                        alt="LikeOffBlack"
                                    />
                                </span>
                            )}
                        </IconButton>
                    </div>
                    <div>
                        <p className="semibold-black">Nike</p>
                        <p className="light-black">
                            Nike x Supreme SB Darwin Low White
                        </p>
                        <span className="red-bullet">FQ3000-100</span>
                        <span className="semibold-black">
                            205,000
                            <span className="light-black">원</span>
                        </span>
                        <span className="light-grey">즉시 구매가</span>
                    </div>
                </div>
                <div className="product">
                    <div>
                        <span className="rank">1</span>
                        <IconButton
                            onClick={() => setLike((like) => !like)}
                            className=""
                        >
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
                        <p className="semibold-black">Nike</p>
                        <p className="light-black">
                            Nike x Supreme SB Darwin Low White
                        </p>
                        <span className="red-bullet">FQ3000-100</span>
                        <span className="semibold-black">
                            205,000
                            <span className="light-black">원</span>
                        </span>
                        <span className="light-grey">즉시 구매가</span>
                    </div>
                </div>
                <div className="product">
                    <div>
                        <span className="rank">1</span>
                        <IconButton
                            onClick={() => setLike((like) => !like)}
                            className=""
                        >
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
                        <p className="semibold-black">Nike</p>
                        <p className="light-black">
                            Nike x Supreme SB Darwin Low White
                        </p>
                        <span className="red-bullet">FQ3000-100</span>
                        <span className="semibold-black">
                            205,000
                            <span className="light-black">원</span>
                        </span>
                        <span className="light-grey">즉시 구매가</span>
                    </div>
                </div>
            </Box>

            <h1>버튼들</h1>
            <div className="flex ">
                <button className="align-center flex-grow inline-flex flex-start buy-btn">
                    구매
                    <span>
                        <span>210,000원</span>
                        즉시 구매가
                    </span>
                </button>
                <button className="flex-grow align-center inline-flex flex-start sell-btn">
                    판매
                    <span>
                        <span>210,000원</span>
                        즉시 판매가
                    </span>
                </button>
            </div>
            <Button
                className="full-btn align-center"
                onClick={() => setLike((like) => !like)}
            >
                {like ? (
                    <span>
                        <img src={BookmarkOn} alt="BookmarkOn" />
                    </span>
                ) : (
                    <span>
                        <img src={BookmarkOff} alt="BookmarkOff" />
                    </span>
                )}
                관심상품 <span>3,298</span>
            </Button>
            <Button className="full-btn full-btn-apply">응모하기</Button>
            <button className="buy-btn flex justify-center">
                구매
                <b>일반배송(5-7일소요)</b>
            </button>
            <Button className="medium-btn">
                <span className="black-label">225</span>
            </Button>
            <Button className="medium-btn medium-btn-click">
                <span className="black-label">225</span>
            </Button>
            <Button className="medium-btn">
                <span className="black-label">225</span>
                <span className="black-label">구매입찰</span>
            </Button>
            <Button className="medium-btn">
                <span className="black-label">225</span>
                <span className="red-label">230,000</span>
            </Button>
            <Button className="medium-btn">
                <span className="black-label">225</span>
                <span className="green-label">230,000</span>
            </Button>
            <Button className="medium-btn medium-btn-click">
                <span className="black-label">225</span>
                <span className="black-label">구매입찰</span>
            </Button>
            <Button className="cancel-btn">
                <span className="black-label">취소</span>
            </Button>
            <Button className="confirm-btn">
                <span className="white-label">확인</span>
            </Button>
            <Button className="small-btn">프로필 관리</Button>

            <h1>팝업</h1>
            <Box className="popup space-between" onClick={() => setOpen(true)}>
                모든 사이즈
                <span className="popup-icon"></span>
            </Box>

            <Dialog open={open}>
                <div className="popup-title-box">
                    <DialogTitle>
                        구매하기<span>(가격 단위: 원)</span>
                    </DialogTitle>
                    <Button
                        className="popup-close-btn"
                        onClick={() => setOpen(false)}
                    ></Button>
                </div>

                <div className="popup-content">
                    <Box className="popup-product flex align-center">
                        <div className="w20p">
                            <div style={{ background: "#ddd", height: "80px" }}>
                                여기다 상품 놔
                            </div>
                        </div>
                        <div className="product-info w80p">
                            <span>FQ3000-100</span>
                            <span>Nike x Supreme SB Darwin Low White</span>
                            <span>나이키 x 슈프림 SB 다윈 로우 화이트</span>
                        </div>
                    </Box>

                    <div className="scroll">
                        <div className="inline-flex">
                            <Button className="medium-btn medium-btn-click">
                                <span className="black-label">프로필 관리</span>
                            </Button>
                            <Button className="medium-btn">
                                <span className="black-label">프로필 관리</span>
                            </Button>
                            <Button className="medium-btn">
                                <span className="black-label">프로필 관리</span>
                            </Button>
                            <Button className="medium-btn">
                                <span className="black-label">프로필 관리</span>
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="popup-bottom justify-center">
                    <Button
                        className="cancel-btn"
                        onClick={() => setOpen(false)}
                    >
                        <span className="black-label">취소</span>
                    </Button>
                    <Button className="confirm-btn">
                        <span className="white-label">확인</span>
                    </Button>
                </div>
            </Dialog>

            <h1>탭메뉴 - 마이페이지</h1>
            <div className="mypage-tab buying">
                <Tabs defaultValue={1}>
                    <TabsList>
                        <Tab value={1}>
                            <span>0</span>
                            <b>구매 입찰</b>
                        </Tab>
                        <Tab value={2}>
                            <span>0</span>
                            <b>진행중</b>
                        </Tab>
                        <Tab value={3}>
                            <span>0</span>
                            <b>종료</b>
                        </Tab>
                    </TabsList>
                    <TabPanel value={1}>First page</TabPanel>
                    <TabPanel value={2}>Second page</TabPanel>
                    <TabPanel value={3}>Third page</TabPanel>
                </Tabs>
            </div>
            <div className="mypage-tab sales">
                <Tabs defaultValue={1}>
                    <TabsList>
                        <Tab value={1}>
                            <span>0</span>
                            <b>판매 입찰</b>
                        </Tab>
                        <Tab value={2}>
                            <span>0</span>
                            <b>진행중</b>
                        </Tab>
                        <Tab value={3}>
                            <span>0</span>
                            <b>종료</b>
                        </Tab>
                    </TabsList>
                    <TabPanel value={1}>First page</TabPanel>
                    <TabPanel value={2}>Second page</TabPanel>
                    <TabPanel value={3}>Third page</TabPanel>
                </Tabs>
            </div>

            <h1>탭메뉴 - 상품 상세 페이지</h1>
            <div className="product-tab">
                <Tabs defaultValue={1}>
                    <TabsList>
                        <Tab value={1}>1개월</Tab>
                        <Tab value={2}>3개월</Tab>
                        <Tab value={3}>6개월</Tab>
                        <Tab value={4}>1년</Tab>
                        <Tab value={5}>전체</Tab>
                    </TabsList>
                    <TabPanel value={1}>First page</TabPanel>
                    <TabPanel value={2}>Second page</TabPanel>
                    <TabPanel value={3}>Third page</TabPanel>
                    <TabPanel value={4}>fourth page</TabPanel>
                    <TabPanel value={5}>fifth page</TabPanel>
                </Tabs>
            </div>

            <h1>스낵바 알림창</h1>
            <div className="snackbar">
                <div className="space-between">
                    <div className="align-center">
                        <span
                            style={{
                                width: "34px",
                                height: "34px",
                                background: "#ddd",
                                display: "inline-block",
                            }}
                        >
                            {/* 이미지 넣을 것.. */}
                        </span>
                        <span>관심 상품에 저장되었습니다.</span>
                    </div>
                    <Button>보러가기</Button>
                </div>
            </div>
        </div>
    );
}
