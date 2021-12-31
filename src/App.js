import React, { Suspense, useContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import O3AppBar from "./components/globals/O3AppBar";
import O3Suspense from "./components/globals/O3Suspense";
import { UserContext, UserProvider } from "./context/user";
import Home from "./pages/Home";

const queryClient = new QueryClient();

const Login = React.lazy(() => import('./pages/Login'));
const Register = React.lazy(() => import('./pages/Register'));
const Contact = React.lazy(() => import('./pages/Contact'));

const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <O3AppBar />
            <Routes>
              {/* Suspense */}
              <Route path="/suspense" element={<O3Suspense />} />

              {/* Home */}
              <Route path="/" alias="/home" element={<Home />} />

              {/* Login */}
              <Route path="/login" element={(
                <Suspense fallback={<O3Suspense />}>
                  <Login />
                </Suspense>
              )} />

              {/* Register */}
              <Route path="/register" element={(
                <Suspense fallback={<O3Suspense />}>
                  <Register />
                </Suspense>
              )} />

              {/* Contacts */}
              <Route path="/contact" element={(
                <Suspense fallback={<O3Suspense />}>
                  <AuthComponent component={Contact} />
                </Suspense>
              )} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </UserProvider>
    </div>
  )
}

const AuthComponent = ({ component: Component, ...params }) => {
  const user = useContext(UserContext);

  if (user) {
    return <Component {...params} />
  } else {
    return <Navigate to="/login" />
  }
}

export default App;