import { Link } from "react-router-dom"


function Button({title, link }: any) {
  return (
    <Link to={link} className='flex items-center font-bold gap-2 bg-primary text-white px-6 py-3  transition hover:bg-primary/80'>
      {title}
        {/* <MdArrowForwardIos size={14} /> */}
    </Link>
  )
}

export default Button