import { RouterProvider } from 'react-router-dom';
import AppRoutes from './AppRoutes';

const Navigation = () => {
  return (
    <>
      <RouterProvider router={AppRoutes} />
    </>
  );
};

export default Navigation;
