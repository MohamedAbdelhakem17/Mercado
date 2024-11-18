import Navbar from "../Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../Loading/Loading";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary.jsx";

const SignUP = lazy(() => import("../Register/SignUP"));
const SignIn = lazy(() => import("../Register/SignIN.jsx"));
const VerifyEmail = lazy(() => import("../Register/Email.jsx"));
const Home = lazy(() => import("../Home/Home.jsx"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Navbar />
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<SignUP />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/verifyEmail" element={<VerifyEmail />} />
          </Routes>
        </ErrorBoundary>
      </Router>
    </Suspense>
  );
}

export default App;
