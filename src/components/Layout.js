import { Outlet, Link } from "react-router-dom";
const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/component1">Component 1</Link>
                    </li>
                    <li>
                        <Link to="/detail/1">Detail /1</Link>
                    </li>
                    <li>
                        <Link to="/detail/2">Detail /2</Link>
                    </li>
                    <li>
                        <Link to="/detail/3">Detail /3</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </>
    )
};
export default Layout;