import TopPart from "./TopPart";
import MiddlePart from "./MiddlePart";
import EndPart from "./EndPart";

const Navbar = () => {


    return (
        <nav>
            <TopPart />
            <div className="main-container">
                <MiddlePart />
                <EndPart />
            </div>
        </nav>
    );
};

export default Navbar;
