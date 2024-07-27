import React from "react";
const Feed = ({ username, image, description, likes }) => {
    return (
        <div className="feed">
            <div className="feed-img-box">
                <img src={image} alt={description} />
            </div>
            <div className="feed-info">
                <span>{username}</span>
                <span>❤️ {likes}</span>
                <p>{description}</p>
            </div>
        </div>
    );
};

export default Feed;
