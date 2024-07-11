import TopProduct from "pages/product/TopProduct";
import NewProductList from "pages/product/NewProduct";
import PopularProductList from "../product/PopularProductList";

export default function Clothes() {
    return (
        <div>
            <PopularProductList />
            <NewProductList />
            <TopProduct />
        </div>
    );
}
