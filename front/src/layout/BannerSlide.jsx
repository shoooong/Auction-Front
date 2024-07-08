import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function BannerSlide() {
    return (
        <>
            <Swiper
                loop={true}
                mousewheel={true}
                speed={150}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Mousewheel]}
                className="mySwiper"
            >
                <SwiperSlide className="first-banner"></SwiperSlide>
                <SwiperSlide className="second-banner"></SwiperSlide>
                <SwiperSlide className="third-banner"></SwiperSlide>
            </Swiper>
        </>
    );
}
