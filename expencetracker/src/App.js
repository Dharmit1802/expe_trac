import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing';
import Dashboard from "./components/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (

    <div className="bg-black min-h-[100vh]">

      <Routes>

        {/* <Route path='/' element={<Landing></Landing>}></Route> */}

        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>

        <Route path='/' element={<Login></Login>}></Route>

        <Route path='/signup' element={<Signup></Signup>}></Route>

      </Routes>
    </div>
  );
}

export default App;
