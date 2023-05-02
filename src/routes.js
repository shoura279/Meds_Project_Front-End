import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import App from "./App";
import AddMed from "./pages/Manage-Meds/AddMed";
import UpdateMed from "./pages/Manage-Meds/UpdateMed";
import ManageMeds from "./pages/Manage-Meds/ManageMeds";
import Guest from "./middleware/Guest";
import Admin from "./middleware/Admin";
import AddCategory from "./pages/Manage-Categories/AddCategory";
import ManageCategories from "./pages/Manage-Categories/ManageCategories";
import UpdateCategory from "./pages/Manage-Categories/UpdateCategory";
import AddUser from "./pages/Manage-Users/AddUser";
import ManageUsers from "./pages/Manage-Users/ManageUsers";
import UpdateUser from "./pages/Manage-Users/UpdateUser";
import ManageReq from "./pages/Manage-Req/ManageReq";
import ShowReq from "./pages/Show-Req/ShowReq";
import Gethistory from "./pages/History/Gethistory";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      /* GUEST MIDDELWARE */
      {
        element: <Guest />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/ManageMeds",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageMeds />,
          },
          {
            path: "AddMedicine",
            element: <AddMed />,
          },
          {
            path: ":id",
            element: <UpdateMed />,
          },
        ],
      },
      {
        path: "/ManageCategories",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageCategories />,
          },
          {
            path: "AddCategory",
            element: <AddCategory />,
          },
          {
            path: ":id",
            element: <UpdateCategory />,
          },
        ],
      },
      {
        path: "/ManageUsers",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageUsers />,
          },
          {
            path: "AddUser",
            element: <AddUser />,
          },
          {
            path: ":id",
            element: <UpdateUser />,
          },
        ],
      },
      {
        path: "/ManageRequests",
        element: <Admin />,
        children: [
          {
            path: "",
            element: <ManageReq />,
          },
        ],
      },
      {
        path: "/ShowRequestes",
        children: [
          {
            path: "",
            element: <ShowReq />,
          },
        ],
      },
      {
        path: "/Gethistory",
        children: [
          {
            path: "",
            element: <Gethistory />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to={"/"} />,
      },
    ],
  },
]);
