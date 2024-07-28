import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import jwtAxios from "utils/jwtUtil";
import { SERVER_URL } from "api/serverApi";

import LikeOn from "assets/images/like-on.svg";
import LikeOff from "assets/images/like-off.svg";
import BookmarkOn from "assets/images/bookmark-on.svg";
import BookmarkOff from "assets/images/bookmark-off.svg";

const FeedDetail = () => {
    const [feed, setFeed] = useState(null);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const { id } = useParams();

    const CLOUD_STORAGE_BASE_URL =
        "https://kr.object.ncloudstorage.com/push/shooong/";

    useEffect(() => {
        const fetchFeedDetail = async () => {
            try {
                const response = await axios.get(
                    `${SERVER_URL}/styleFeed/${id}`
                );
                const feedData = response.data;
                feedData.feedImage = `${CLOUD_STORAGE_BASE_URL}${feedData.feedImage}`;
                setFeed(feedData);
            } catch (error) {
                console.error("Error fetching feed details:", error);
                setError(
                    error.response?.status === 404
                        ? "Feed not found"
                        : "An error occurred"
                );
            }
        };
        fetchFeedDetail();
    }, [id]);

    const handleLikeClick = async () => {
        try {
            const response = await jwtAxios.post(`/user/likeFeed/${id}`);
            if (response.status === 200) {
                setIsLiked(true);
                setFeed((prevFeed) => ({
                    ...prevFeed,
                    likeCount: (prevFeed.likeCount || 0) + 1,
                }));
            }
        } catch (error) {
            console.error("Error liking feed:", error);
        }
    };

    const handleSaveClick = async () => {
        try {
            const response = await jwtAxios.post(`/user/saveFeedBookmark`, {
                feedId: id,
                feedImage: feed.feedImage,
                feedTitle: feed.feedTitle,
            });
            if (response.status === 201) {
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error saving feed:", error);
        }
    };

    if (error) return <div>Error: {error}</div>;
    if (!feed) return <div>Loading...</div>;

    return (
        <div className="container style-detail">
            <img src={feed.feedImage} alt={feed.feedTitle} />
            <div>
                <div>
                    <span className="flex black-label">
                        <img src={LikeOn} alt="heart" />
                        {feed.likeCount}
                    </span>

                    <div className="flex" style={{ marginTop: "5px" }}>
                        <button
                            onClick={handleLikeClick}
                            className="black-label align-center"
                        >
                            {isLiked ? (
                                <>
                                    <img src={LikeOn} alt="likeon" />
                                    Liked
                                </>
                            ) : (
                                <>
                                    <img src={LikeOff} alt="likeoff" />
                                    Like
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleSaveClick}
                            className="black-label align-center"
                        >
                            {isSaved ? (
                                <>
                                    <img src={BookmarkOn} alt="heart" />
                                    Saved
                                </>
                            ) : (
                                <>
                                    <img src={BookmarkOff} alt="heart" />
                                    Save
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <div className="flex" style={{ marginTop: "10px" }}>
                    <p className="black-label">{feed.feedTitle}</p>
                    <p className="grey-label">{feed.nickName || "Unknown"}</p>
                </div>
            </div>
        </div>
    );
};

export default FeedDetail;
