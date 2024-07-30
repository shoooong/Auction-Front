import React from "react";
import { useParams } from "react-router-dom";

import FeedDetail from "./FeedDetail";

const FeedDetailWrapper = () => {
    const { feedId } = useParams();
    return (
        <div>
            <FeedDetail feedId={feedId} />
        </div>
    );
};

export default FeedDetailWrapper;
