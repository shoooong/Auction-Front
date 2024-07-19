import Buy from "pages/ordres/Buy";
import Sell from "pages/ordres/Sell";

const orderRouter = () => {
    return [
        {
            path: "/buy",
            element: <Buy />,
        },
        {
            path: "/sell",
            element: <Sell />,
        },
    ];
};
