import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { SERVER_URL } from "api/serverApi";

import Feed from "pages/style/Feed";

const StyleRankingList = () => {
    const [feeds, setFeeds] = useState([]);

    const CLOUD_STORAGE_BASE_URL =
        "https://kr.object.ncloudstorage.com/push/shooong/";

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/feedRanking`);
                const data = response.data.map((feed) => ({
                    id: feed.feedId,
                    username: feed.nickName, // Use nickName instead of userId
                    image: `${CLOUD_STORAGE_BASE_URL}${feed.feedImage}`,
                    description: feed.feedTitle,
                    likes: feed.likeCount,
                }));
                setFeeds(data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchFeeds();
    }, []);

    return (
        <>
            <div className="sub-nav">
                <Link to="/style">피드</Link>
                <Link to="/style/rank">랭킹</Link>
                <Link to="/style/register">스타일 등록하기</Link>
            </div>
            <div className="feed-list">
                {feeds.map((feed) => (
                    <Link key={feed.id} to={`/style/styledetail/${feed.id}`}>
                        <Feed
                            username={feed.username} // Display the nickname
                            image={feed.image}
                            description={feed.description}
                            likes={feed.likes}
                        />
                    </Link>
                ))}
            </div>
        </>
    );
};

export default StyleRankingList;
