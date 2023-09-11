import HomeScreen from '../../screens/home';
import WelcomeScreen from '../../screens/welcome';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Root = () => {
    return (
        <div className='main-container'>
            <Router>
                <Routes>
                    <Route path='/' exact Component={HomeScreen} />
                    <Route path='/welcome' exact Component={WelcomeScreen} />
                </Routes>
            </Router>
        </div>
    )
}

export default Root