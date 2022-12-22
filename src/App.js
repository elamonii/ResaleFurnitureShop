import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from '../src/routes/Routes';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <div>
      <HelmetProvider>
        <RouterProvider router={router}></RouterProvider>
        <Toaster></Toaster>
      </HelmetProvider>
    </div>
  );
}

export default App;
