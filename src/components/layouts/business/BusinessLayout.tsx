import { Outlet } from "react-router-dom"
import BusinessNavigation from "./Navigation"
import Footer from "./Footer"
import ScrollToTop from "../../common/ScrollToTop"
import { IoIosArrowUp } from "react-icons/io"

function BusinessLayout() {
  return (
    <div id="top">
        <ScrollToTop />
        <BusinessNavigation/>
      <Outlet />
      <Footer/>
      <a href="#top"  className="fixed shadow bottom-6 right-6 bg-primary/90 text-white p-2 rounded-full z-40">
      <IoIosArrowUp className="text-2xl"/>
      </a>
    </div>
  )
}

export default BusinessLayout