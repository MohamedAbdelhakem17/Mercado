import TopPart from "./TopPart";
import MiddlePart from "./MiddlePart";
import EndPart from "./EndPart";
import SignIN from "../Register/SignIN";
import SignUP from "../Register/SignUP";
import Number from "../Register/Number";
import Email from "../Register/Email";

const Navbar = () => {


    return (
        <nav>
            <TopPart />
            <div className="main-container">
                <MiddlePart />
                <EndPart />
            </div>
            <SignIN />
            <SignUP />
            <Number />
            <Email />
        </nav>
    );
};

export default Navbar;
