import BookmarkProduct from "pages/user/mypage/BookmarkProduct";
import BookmarkFeed from "pages/user/mypage/BookmarkFeed";

import { Tabs, TabsList, TabPanel, Tab } from "@mui/base";

import "styles/bookmark.css";


const MypageBookmark = () => {
    return (
        <div className="container"> 
            <div className="mypage-tab buying">
                <Tabs defaultValue={1}>
                    <TabsList className="bookmark-tab">
                        <Tab value={1}>
                            <span>관심 스타일</span>
                        </Tab>
                        <Tab value={2}>
                            <span className="bookmark-tab-span">관심 상품</span>
                        </Tab>
                    </TabsList>
                    <TabPanel value={1}><BookmarkFeed/></TabPanel>
                    <TabPanel value={2}><BookmarkProduct /></TabPanel>
                </Tabs>
            </div>
        </div>
    );
}


export default MypageBookmark;
