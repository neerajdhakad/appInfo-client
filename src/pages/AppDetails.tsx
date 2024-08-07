import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";


function AppDetails() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) return <div className="px-8">Add Skeleton Loading...</div>;

  return (
    <>
      <div className="w-full py-4 px-8 flex items-center gap-4 shadow-md bg-white dark:bg-gray-800 dark dark:text-white">
        <Link to={"/"}>
          <ArrowLeft />
        </Link>
        <div className="text-2xl cursor-pointer">Application Name</div>
      </div>
      <div className="w-full flex flex-col md:flex-row gap-3 app-details px-8 mt-4">
        <div className="w-full md:w-1/2">
          {/* Application Repo Path */}
          <div className=" application-repo-path border-2 border-dashed  p-4">
            <h1 className="text-2xl font-semibold mb-2 md:mb-4">Repo Path</h1>
            <div className=" flex flex-wrap flex-col md:flex-row md:gap-3 mb-2">
              <p className="text-lg italic font-medium">Client - </p>
              <a
                href="https://ufd.ttx.com/efm/#/equipment/search/ea"
                target="_blank"
                className=" text-lg text-blue-600"
              >
                https://ufd.ttx.com/efm/#/equipment/search/ea
              </a>
            </div>
            <div className="flex flex-wrap md:gap-3 mb-2">
              <p className="text-lg italic font-medium">Api - </p>
              <a
                href="https://ufd.ttx.com/efm/#/equipment/search/ea"
                target="_blank"
                className=" text-lg text-blue-600"
              >
                https://ufd.ttx.com/efm/#/equipment/search/ea
              </a>
            </div>
          </div>
          {/* Prod URL */}
          <div className="prod-url mt-4 flex flex-wrap items-center gap-3 border-2 border-dashed  p-4">
            <p className="text-2xl font-semibold">Prod Url - </p>{" "}
            <a
              className="text-blue-600 text-lg"
              target="_blank"
              href="https://www.google.com/"
            >
              https://www.google.com/
            </a>
          </div>
          {/* TechStack used */}
          <div className="tech-stack mt-4 border-2 border-dashed  p-4">
            <p className="text-2xl font-semibold">Techstacks </p>
            <div className=" flex flex-wrap gap-3 ">
              <div className="flex flex-wrap items-center gap-2 border-2 border-dashed w-fit px-2 py-1 mt-2">
                <img
                  className="h-6 w-6"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-angular-3-226070.png?f=webp&w=512"
                  alt="logo"
                />
                <p className="text-lg">Angular</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 border-2 border-dashed w-fit px-2 py-1 mt-2">
                <img
                  className="h-6 w-6"
                  src="https://cdn.iconscout.com/icon/free/png-512/free-react-3-1175109.png?f=webp&w=256"
                  alt="logo"
                />
                <p className="text-lg">React</p>
              </div>
            </div>
          </div>
          {/* Access/Roles Required */}
          <div className="prod-url mt-4 flex flex-wrap items-center gap-3 border-2 border-dashed   p-4">
            <p className="text-2xl font-semibold">Access/Roles Required -</p>{" "}
            <p className="text-xl">MaintainAppUserRequestsAdmin</p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {/* Database Used */}
          <div className="application-repo-path border-2 border-dashed  p-4">
            <h1 className="text-2xl font-semibold mb-2 md:mb-4">
              Server-Database Used
            </h1>
            <div className=" flex flex-wrap flex-col md:flex-row md:gap-3 mb-2">
              <p className="text-lg italic font-medium">SQLQUFDDB - </p>
              <p className=" text-lg text-blue-600">FDUFDDB</p>
            </div>
          </div>
          {/* Sharepoint URL */}
          <div className="prod-url mt-4 flex flex-wrap items-center gap-3 border-2 border-dashed  p-4">
            <p className="text-2xl font-semibold">SharePoint Document - </p>{" "}
            <a
              className="text-blue-600 text-lg"
              target="_blank"
              href="https://www.google.com/"
            >
              https://www.google.com/
            </a>
          </div>
          {/* Application Type */}
          <div className="prod-url mt-4 flex flex-wrap items-center gap-3 border-2 border-dashed  p-4">
            <p className="text-2xl font-semibold">Application Type - </p>{" "}
            <p className="text-xl">Web Application</p>
          </div>
          {/* Application SME Name */}
          <div className="prod-url mt-4 flex flex-wrap items-center gap-3 border-2 border-dashed   p-4">
            <p className="text-2xl font-semibold">Application SME Name -</p>{" "}
            <p className="text-xl">Devendra Jha</p>
          </div>
          {/* Stored Procedure Excel Sheet */}
          <div className="prod-url mt-4 flex flex-wrap items-center gap-3 border-2 border-dashed   p-4">
            <p className="text-2xl font-semibold">Stored Procedure Excel Sheet </p>{" "}
            <Button className="text-xl" variant={"outline"}>Export to Excel</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppDetails;
