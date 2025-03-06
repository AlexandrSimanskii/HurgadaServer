import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import {Outlet} from 'react-router-dom'

const Layout = () => {
    return (
        <>
        <h1></h1>
            <Header/>

            <Outlet/>

            <Footer/>
        </>
    );
};

export default Layout;