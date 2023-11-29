import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import Gestion from './components/Gestion'
import {createBrowserRouter,RouterProvider, } from "react-router-dom";
import Informes from './components/Informes';

const router = createBrowserRouter([
    { path: '/',children: [{
        index: true,
        element: <Login/>
    },{
         path: 'home',
        element: <Home/>
    },{
        path: 'informe',
        element:<Informes/>
    },{
        path: 'gestion',
        element:<Gestion/>
    }]
    }
])

function App() {
    return (
        <RouterProvider router={router}/>
    );
}
export default App;