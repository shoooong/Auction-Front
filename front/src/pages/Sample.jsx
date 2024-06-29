import { useState } from "react";

import { IconButton, Button, Box, Dialog, DialogTitle } from "@mui/material";

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
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // const [maxWidth, setMaxWidth] = useState("lg");

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

            <h1>팝업</h1>
            <Button className="popup" onClick={() => setOpen(true)}>
                모든 사이즈
            </Button>

            <Dialog onClose={handleClose} open={open} maxWidth={"md"}>
                <DialogTitle>Set backup account</DialogTitle>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In
                    modi sed laboriosam eum voluptatibus. Fugit, natus? Hic
                    minima illo autem totam consequatur similique excepturi
                    voluptatum perferendis sit debitis, facere quis.
                </div>
            </Dialog>
        </div>
    );
}
