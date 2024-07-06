import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoadJson from './Components/DBComponents/LoadJson';
import AuthRoute from './Components/UserComponents/AuthRoute';
import AdminPanel from './Components/AdminPanelComponents/AdminPanel';
import UserProfile from './Components/Profile/UserProfile';
import Login from "./Components/Login/Login";
import ProfileEdit from "./Components/Profile/ProfileEdit";
import FavoriteMovies from "./Components/Profile/FavoriteMovies";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

import "./style.css"
import "./resetStyle.css"
import MainPage from './Components/MainPage/MainPage';
import FilterMovies from './Components/FilterMovies/FilterMovies';

function App() {
    return (
        <Router>
            <div className="App">
                <LoadJson />
                <Header />
                {/* <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Главная</Link></li>
                            <li><Link to="/profile">Profile</Link></li>
                        </ul>
                    </nav>
                </header> */}
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/adminPanel" element={<AuthRoute element={<AdminPanel />} />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile/edit" element={<ProfileEdit />} />
                    <Route path="/favorite" element={<FavoriteMovies/>}/>
                    <Route path='/filterMovies' element={<FilterMovies/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    );
}

export default App;