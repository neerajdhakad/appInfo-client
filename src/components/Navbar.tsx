import { Link } from "react-router-dom";
import ThemeBtn from "./ThemeBtn"; 
import { Button } from "./ui/button";

function Navbar() { 
  return (
    <>
      <nav className="py-4 px-8 flex justify-between shadow-md dark:bg-gray-800 dark:text-white">
        <div className="text-2xl cursor-pointer">AppInfo | <span className="text-gray-400">Application Information</span> </div>
        <div className="flex items-center justify-center gap-5">
          <Link to={'/addApplication'}>
          <Button className="" variant={"outline"}>Add Application</Button>
          </Link>
          <ThemeBtn />
        </div>
      </nav>
    </>
  );
}

export default Navbar;
