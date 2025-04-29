import { AiOutlineLogout } from 'react-icons/ai'
import { BsQuestionCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className="flex flex-col gap-3 ">
    <Link to="" className="flex items-center text-sm p-2 font-[400]">
      <BsQuestionCircle className="w-6 h-6 mx-2 " />
      Help
    </Link>

    <Link to="" className="flex items-center text-sm p-2 font-[400]">
      <AiOutlineLogout className="w-6 h-6 mx-2" />
      Log out
    </Link>
  </div>
  )
}

export default Footer