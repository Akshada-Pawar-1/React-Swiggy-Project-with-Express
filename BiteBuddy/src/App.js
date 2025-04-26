import React, { lazy, Suspense, useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import Header from "./components/Header";
// import About from "./components/About";
import Contact from "./components/Contact";
import { Error } from "./components/Error";
import { Body } from "./components/Body";
import ResMenu from "./components/ResMenu";
import Shimmer from "./components/Shimmer";
// import Grocery from "./components/Grocery";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
// import Cart from "./components/Cart";

const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));
const Cart = lazy(() => import("./components/Cart"));

// const { loggedInUser } = useContext(UserContext);

const AppLayout = () => {
  const [userName, setUserName] = useState();

  // Authentication
  useEffect(() => {
    // Make an API call & send UserName & Password
    const data = { name: "Akshada" };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          {/* <UserContext.Provider value={{ loggedInUser: "Akshada" }}> */}
          <Header />
          {/* </UserContext.Provider> */}
          <Outlet />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body />, errorElement: <Error /> },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <About />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      { path: "/contact", element: <Contact />, errorElement: <Error /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Cart />
          </Suspense>
        ),
        errorElement: <Error />,
      },
      {
        path: "/restaurants/:resId",
        element: <ResMenu />,
        errorElement: <Error />,
      },
    ],
  },
  { path: "*", element: <Error /> },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      {routes.map((route, index) => {
        if (route.children) {
          return (
            <Route key={index} path={route.path} element={route.element}>
              {route.children.map((child, childIndex) => (
                <Route
                  key={childIndex}
                  path={child.path}
                  element={child.element}
                />
              ))}
            </Route>
          );
        }
        return <Route key={index} path={route.path} element={route.element} />;
      })}
    </Routes>
  </BrowserRouter>
);
