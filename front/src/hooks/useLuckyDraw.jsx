import { useState, useEffect } from "react";

import { getLuckyDraw } from "api/luckydrawApi";

const useLuckyDraw = () => {
    const [drawItems, setDrawItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrawItems = async () => {
            try {
                const data = await getLuckyDraw();
                setDrawItems(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDrawItems();
    }, []);

    return { drawItems, loading, error };
};

export default useLuckyDraw;
