import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "api/serverApi";

import Feed from "./Feed";

const FeedList = () => {
    const [feeds, setFeeds] = useState([]);

    const CLOUD_STORAGE_BASE_URL =
        "https://kr.object.ncloudstorage.com/push/shooong/";

    useEffect(() => {
        const fetchFeeds = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/feed/feedList`);
                const data = response.data.map((feed) => ({
                    id: feed.feedId,
                    username: feed.userId ? `User ${feed.userId}` : "Unknown",
                    image: `${CLOUD_STORAGE_BASE_URL}${feed.feedImage}`, // 이미지 URL 조합
                    description: feed.feedTitle,
                    likes: feed.likeCount,
                }));
                setFeeds(data);
            } catch (error) {
                console.error("Error fetching feeds:", error);
            }
        };

        fetchFeeds();
    }, []);

    return (
        <div className="feed-list">
            {feeds.map((feed) => (
                <Link key={feed.id} to={`/style/styledetail/${feed.id}`}>
                    <Feed
                        username={feed.username}
                        image={feed.image}
                        description={feed.description}
                        likes={feed.likes}
                    />
                </Link>
            ))}
        </div>
    );
};

export default FeedList;
