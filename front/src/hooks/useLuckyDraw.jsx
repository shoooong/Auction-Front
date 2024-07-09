import { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_URL } from 'api/serverApi';

const useLuckyDraw = () => {
    const [drawItems, setDrawItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDrawItems = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/luckydraw`);
                const data = response.data;

                if (Array.isArray(data)) {
                    setDrawItems(data);
                } else {
                    throw new Error("Unexpected response format");
                }
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