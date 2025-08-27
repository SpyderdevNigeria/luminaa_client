import { Outlet } from "react-router-dom"
import BusinessNavigation from "./Navigation"
import Footer from "./Footer"
import ScrollToTop from "../../common/ScrollToTop"

function BusinessLayout() {
  return (
    <div>
        <ScrollToTop />
        <BusinessNavigation/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default BusinessLayout