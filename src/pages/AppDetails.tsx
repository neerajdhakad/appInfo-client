import { ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

function AppDetails() {
  return (
    <>
    <div className="fixed w-full py-4 px-8 flex items-center gap-4 shadow-md bg-white dark:bg-gray-800 dark:text-white">
        <Link to={"/"}>
          <ArrowLeft />
        </Link>
        <div className="text-2xl cursor-pointer">app_name Details</div>
      </div>
    </>
  )
}

export default AppDetails