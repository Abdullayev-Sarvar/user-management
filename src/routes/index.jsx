import { useRoutes } from "react-router-dom";
import { lazy } from 'react'
import { SuspenseComponent as Suspense} from "../utils";

const Home = lazy(() => import('../routes/home/Home'));
const Auth = lazy(() => import('./auth/Auth'));
const Login = lazy(() => import('./auth/login/Login'));
const SignUp = lazy(() => import('./auth/signup/SignUp'));
const NotFound = lazy(() => import('./notfound/NotFound'));
const CreateUser = lazy(() => import('./create/CreateUser'));
const Details = lazy(() => import('./details/Details'));

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
    },
    {
      path: "/create",
      element: <Suspense><CreateUser /></Suspense>
    },
    {
      path: "/details/:id",
      element: <Suspense><Details /></Suspense>
    },
    {
      path: "*",
      element: <Suspense><NotFound /></Suspense>
    }
  ])
}

export default RoutesController