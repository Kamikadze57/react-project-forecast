import { useState } from "react";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import Footer from "./Components/Footer/Footer";

function App() {
  const baseUrl = import.meta.env.BASE_URL;

  // const [count, setCount] = useState(0);

  return (
    <>
      <Header baseUrl={baseUrl} />
      <Hero baseUrl={baseUrl} />
      <Footer baseUrl={baseUrl} />
    </>
  );
}

export default App;
