import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SERVER_URL } from "api/serverApi";
import jwtAxios from "pages/user/jwtUtil";

const CLOUD_STORAGE_BASE_URL = "https://kr.object.ncloudstorage.com/push/shooong/";

const FeedBookmarks = () => {
    const [feedBookmarks, setFeedBookmarks] = useState([]);

    useEffect(() => {
        const fetchFeedBookmarks = async () => {
            try {
                const response = await jwtAxios.get(`${SERVER_URL}/feed/feedBookmark`);
                setFeedBookmarks(response.data);
            } catch (error) {
                console.error("Error fetching feed bookmarks:", error);
            }
        };

        fetchFeedBookmarks();
    }, []);

    return (
        <div className="feed-bookmarks">
            {feedBookmarks.length === 0 ? (
                <p>로딩 중...</p>
            ) : (
                feedBookmarks.map(feed => (
                    <Link 
                      key={feed.feedId} 
                      to={`/style/styledetail/${feed.feedId}`}
                      className="feed-item"
                    >
                        <img 
                            src={`${CLOUD_STORAGE_BASE_URL}${feed.feedImage}`} 
                            alt={`Feed ${feed.feedId}`} 
                        />
                        <h3>{feed.feedTitle}</h3>
                        <p>Feed ID: {feed.feedId}</p>
                    </Link>
                ))
            )}
        </div>
    );
};

export default FeedBookmarks;
