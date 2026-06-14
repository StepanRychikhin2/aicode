import React from "react";
import Header from "./components/Header";
import InfoCards from "./components/InfoCards";
import Advantages from "./components/Advantages";
import CallToAction from "./components/CallToAction";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <InfoCards />
      <Advantages />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
