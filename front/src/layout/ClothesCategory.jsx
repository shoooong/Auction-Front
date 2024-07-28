import { Link } from "react-router-dom";

import BannerSlide from "./BannerSlide";
import ClothesMain from "pages/clothes/ClothesMain";

import { Card, Box } from "@mui/material";

import Top from "assets/images/top.png";
import Bottom from "assets/images/bottom.png";
import Outer from "assets/images/outer.png";
import Inner from "assets/images/inner.png";
import Shoes from "assets/images/shoes.png";

export default function ClothesCategory() {
    return (
        <>
            <BannerSlide />

            <div className="container">
                <Box className="bottom-nav no-wrap">
                    <Card>
                        <Link to="clothes/top">
                            <img src={Top} alt="상의 라우터" />
                            <span>상의</span>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="clothes/bottom">
                            <img src={Bottom} alt="하의 라우터" />
                            <span>하의</span>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="clothes/outer">
                            <img src={Outer} alt="아우터 라우터" />
                            <span>아우터</span>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="clothes/shoes">
                            <img src={Shoes} alt="신발 라우터" />
                            <span>신발</span>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="clothes/inner">
                            <img src={Inner} alt="이너웨어 라우터" />
                            <span>이너웨어</span>
                        </Link>
                    </Card>
                </Box>
            </div>

            <ClothesMain />
        </>
    );
}
