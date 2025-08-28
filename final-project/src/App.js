import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes'; // Impor router kita

function App() {
  // Cukup render RouterProvider dengan konfigurasi router kita
  return <RouterProvider router={router} />;
}

export default App;