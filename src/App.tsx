import { useEffect, useState } from "react";
import "./App.css";
// import Card from "./components/Card";
// import ThemeBtn from "./components/ThemeBtn";
import { ThemeProvider } from "./context/theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; 
import Applications from "./components/Applications";
import { Toaster } from "./components/ui/toaster"

function App() {
  const [themeMode, setThemeMode] = useState("dark");
  const darkTheme = () => {
    setThemeMode("dark");
  };
  const lightTheme = () => {
    setThemeMode("light");
  };

  useEffect(() => {
    document.querySelector("html")?.classList.remove("dark", "light");
    document.querySelector("html")?.classList.add(themeMode);
  }, [themeMode]);

  return (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <Navbar />
      <div className="pt-16">  
        <Applications />
      </div>
      {/* <div className="flex flex-wrap min-h-screen items-center">
        <div className="w-full">
          <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
            <ThemeBtn/>
          </div>
          <div className="w-full max-w-sm mx-auto">
            <Card/>
          </div>
        </div>
      </div> */}

      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
