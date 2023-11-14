import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/About" element={<About/>}></Route>

    <Route path="/SignIn" element={<SignIn/>}></Route>
    <Route path="/SignUp" element={<SignUp/>}></Route>
    <Route element={<PrivateRoute/>}>
      <Route path="/Profile" element={<Profile/>}></Route>
    </Route>
  </Routes>
   </BrowserRouter>
}

export default App