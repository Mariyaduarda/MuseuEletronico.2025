import './App.css'
import './components/CRT filter/CRTfilter.css'
import MenuBar from "./components/layouts/MenuBar.tsx";
import Footer from "./components/layouts/Footer.tsx";

function App() {

    return (
        <>
            <div className="crt-filter">
                <MenuBar/>
                <button className="toggle-btn"></button>
            </div>
            <div className="crt-filter">
                <Footer/>
            </div>
        </>
    )
}

export default App