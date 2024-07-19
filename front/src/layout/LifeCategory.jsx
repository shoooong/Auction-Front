import { Link } from "react-router-dom";

import { Card, Box } from "@mui/material";

import BannerSlide from "./BannerSlide";
import LifeMain from "pages/life/LifeMain";

import Top from "assets/images/top.png";
import Bottom from "assets/images/bottom.png";
import Outer from "assets/images/outer.png";

export default function ClothesCategory() {
    return (
        <>
            <BannerSlide />

            <div className="container">
                <Box className="bottom-nav no-wrap">
                    <Card>
                        <Link to="/life/interior">
                            <img src={Top} alt="" />
                            <span>인테리어</span>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="/life/kitchen">
                            <img src={Bottom} alt="" />
                            <span>키친</span>
                        </Link>
                    </Card>
                    <Card>
                        <Link to="/life/beauty">
                            <img src={Outer} alt="" />
                            <span>뷰티</span>
                        </Link>
                    </Card>
                </Box>

                <LifeMain />
            </div>
        </>
    );
}
