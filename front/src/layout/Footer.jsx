import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import FooterLogo from "assets/images/footer-logo.svg";
import Git from "assets/images/git.svg";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

export default function Footer() {
    // scroll top
    const [showButton, setShowButton] = useState(false);
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    useEffect(() => {
        const handleShowButton = () => {
            if (window.scrollY > 500) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        console.log(window.scrollY);
        window.addEventListener("scroll", handleShowButton);
        return () => {
            window.removeEventListener("scroll", handleShowButton);
        };
    }, []);

    return (
        <>
            <div className="container">
                <div className="footer">
                    <Box className="align-center">
                        <img src={FooterLogo} alt="logo" />
                        <b>개인정보처리방침</b>
                        <b>이용약관</b>
                    </Box>
                    <div className="flex space-between align-end">
                        <div className="w70p">
                            <span>
                                푸쉬 주식회사 | 대표자: 소피안 | 사업자번호:
                                000-11-001100 사업자 정보 확인
                            </span>
                            <span>
                                통신판매업: 2023-서울강남B-1111 |
                                개인정보보호책임자: 김수현 | 이메일:
                                info@push.com
                            </span>
                            <span>
                                전화번호: 070-0000-1111 | 주소: 서울 강남구
                                강남대로94길 20, 삼오빌딩 5층
                            </span>
                            <span>©PUSH. ALL RIGHTS RESERVED</span>
                        </div>
                        <div style={{ width: "100px", height: "100px" }}>
                            <a href="https://github.com/shoooong">
                                <img src={Git} alt="git" className="w100p" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="scroll-top">
                <button id="top" onClick={scrollToTop} type="button">
                    <ArrowUpwardRoundedIcon />
                </button>
            </div>
        </>
    );
}
