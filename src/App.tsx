import { AuthProvider } from '@core-state/auth-context/AuthContext';
import { router } from '@routes/index';
import { RouterProvider } from 'react-router-dom';

function App() {

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
