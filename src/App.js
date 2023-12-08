import "./sass/main.scss";
import Header from "./components/Header";
import Info from "./components/Info";
import SignUpForm from "./components/SignUpForm";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import LogInForm from "./components/LogInForm";
import { useRef } from "react";

function App() {
  const resultRef = useRef(null);
  return (
    <div className="container">
      <Header resultRef={resultRef} />
      <div ref={resultRef}>
        <Routes>
          <Route path="/" element={<LogInForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Routes>
      </div>
      <Info />
      <Footer />
    </div>
  );
}

export default App;
