import TopPart from "./TopPart";
import MiddlePart from "./MiddlePart";
import EndPart from "./EndPart";
import ProductCard from "../Shared/ProductCard";
import Title from "../Shared/Title";
import SignUP from "../CreateAccount/SignUP";
import Number from "../CreateAccount/Number";
import Email from "../CreateAccount/Email";


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


<SignUP />
<Number />
<Email />
        </nav>
    );
};

export default Navbar;
