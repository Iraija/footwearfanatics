import AllProduct from "./inventory/Products";
import Categories from "./inventory/Categories";
import Brands from "./inventory/Brands";

function Inventory() {

    return (
        <div className="flex-1 flex flex-col gap-5 mb-16">
            <h1 className="text-3xl text-black font-bold">Inventory</h1>
            <div className="flex-1 flex flex-col gap-7">
                <Categories />
                <AllProduct />
                <Brands />
            </div>
        </div>
    );
}

export default Inventory;
