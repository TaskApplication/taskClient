import { createBrowserRouter } from 'react-router-dom';

import Home from './Home';
import V1App from './v1/App';
import V2App from './v2/App';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/v1',
    element: <V1App />,
  },
  {
    path: '/v2',
    element: <V2App />,
  },
]);

export default router;
