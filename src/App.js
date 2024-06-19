import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoadJson from './Components/DBComponents/LoadJson';
import DisplayData from './Components/DBComponents/DIsplayData';
import AuthRoute from './Components/UserComponents/AuthRoute';

function App() {
    return (
        <Router>
            <div className="App">
                <LoadJson />
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Главная</Link></li>
                            <li><Link to="/json">JSON</Link></li>
                        </ul>
                    </nav>
                </header>
                <Routes>
                    <Route path="/"/>
                    <Route path="/json" element={<AuthRoute element={<DisplayData />} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;