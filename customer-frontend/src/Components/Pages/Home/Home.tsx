import "./Home.css";
import { NavLink } from "react-router-dom";

function Home(): JSX.Element {
    return (
        <div className="Home">
			דף הבית

            <br />
            <br />
            <br />

            <NavLink to={"/products/all/all"}>לרשימת המוצרים המלאה</NavLink>
        </div>
    );
}

export default Home;
