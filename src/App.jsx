import React from 'react';
import { createBrowserRouter, Route ,RouterProvider,createRoutesFromElements} from "react-router-dom";
import Layout from './Pages/layout';
import Home from './Pages/Home';
const App = () => {
const router = createBrowserRouter(
createRoutesFromElements(
<Route element={<Layout/>}>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<h1>About</h1>} />
</Route>

));

    return ( <RouterProvider router={router} /> );
}
 
export default App;