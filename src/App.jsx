import React from 'react';
import { createHashRouter, Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import Layout from './Pages/layout';
import Home from './Pages/Home';

const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<h1>About</h1>} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
