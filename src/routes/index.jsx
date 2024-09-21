import { useRoutes } from "react-router-dom";
import { lazy } from 'react'
import { SuspenseComponent as Suspense} from "../utils";

const Home = lazy(() => import('../routes/home/Home'));
const Auth = lazy(() => import('./auth/Auth'));
const Login = lazy(() => import('./auth/login/Login'));
const SignUp = lazy(() => import('./auth/signup/SignUp'));

const RoutesController = () => {
  return useRoutes([
    {
        path: "/",
        element: <Suspense><Home /></Suspense>
    },
    {
      path: "/auth",
      element: <Suspense><Auth /></Suspense>,
      children: [
        {
          path: "/auth/login",
          element: <Suspense><Login /></Suspense>
        },
        {
          path: "/auth/signup",
          element: <Suspense><SignUp /></Suspense>
        }
      ]
    }
  ])
}

export default RoutesController