import React from 'react';
import useLuckyDraw from "hooks/useLuckyDraw";



const LuckyDraw = () => {
    const { drawItems, loading, error } = useLuckyDraw();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="column-direction align-center">
            <h1>Lucky</h1>
            <h1>Draw</h1>

            {drawItems.map(item => (
                <div className="product column-direction align-center">
                        <div>
                            <p>{item.luckyImage}</p>
                        </div>
                        <h2>{item.luckyName}</h2>
                        <p>{item.content}</p>
                        
                </div>
            ))}
        </div>
    );
}

export default LuckyDraw;