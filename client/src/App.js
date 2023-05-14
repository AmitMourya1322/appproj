
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Form from './pages/Form';
import Home from './pages/Home';
import Header from './Components/Header';
import NotFound from './pages/NotFound';
import FRegister from './pages/firestation/FRegister';
import FLogin from './pages/firestation/FLogin';
import SRegister from './pages/Staff/SRegister'
import SLogin from './pages/Staff/SLogin';
import CRegister from './pages/control/CRegistration';
import CLogin from './pages/control/CLogin';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { UserContextProvider } from './pages/UserContext';
import UserDetailsShort from './pages/getDetails/UserDetailsShort';
import UserDetails from './pages/getDetails/UserDetails';
import UserSAdmin from './pages/AdminControl/UserSAdmin';
import AdminEdit from './pages/AdminControl/AdminEdit';
import NewForm from './pages/AdminControl/NewForm';
function App() {
  return (
    <UserContextProvider>
   
    <Header/>
    <Routes>
      
    <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/form' element={<Form/>}/>
      <Route path='/fireStationSignup' element={<FRegister/>}/>
      <Route path='/fireStationLogin' element={<FLogin/>}/>
      <Route path='/StaffSignup' element={<SRegister/>}/>
      <Route path='/StaffLogin' element={<SLogin/>}/>
      <Route path='/ControlSignup' element={<CRegister/>}/>
      <Route path='/ControlLogin' element={<CLogin/>}/>
      <Route path='/posts' element={<UserDetailsShort/>}/>
      <Route path='/post/:id' element={<UserDetails/>}/>
      <Route path='/adminGet' element={<UserSAdmin/>}/>
      <Route path='/adminGet/:id' element={<AdminEdit/>}/>
      <Route path='/newForm' element={<NewForm/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    
  
    <ToastContainer/>
    </UserContextProvider>
  );
}

export default App;
