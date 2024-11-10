import TopPart from "./TopPart";
import MiddlePart from "./MiddlePart";
import EndPart from "./EndPart";
import ProductCard from "../Shared/ProductCard";
import Title from "../Shared/Title";

const Navbar = () => {


    return (
        <nav>
            <TopPart />
            <div className="main-container">
                <MiddlePart />
                <EndPart />

                <div className="flex flex-wrap">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
                <Title title={"Mohamed"} />
                <Title title={"Mohamed Abdelhakem"} />
                <Title title={"Mohamed Abdelhakem Abdelruhman"} />
            </div>




        </nav>
    );
};

export default Navbar;
