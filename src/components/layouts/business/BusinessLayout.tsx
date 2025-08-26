import { Outlet } from "react-router-dom"
import BusinessNavigation from "./Navigation"
import Footer from "./Footer"

function BusinessLayout() {
  return (
    <div>
        <BusinessNavigation/>
      <Outlet />
      <Footer/>
    </div>
  )
}

export default BusinessLayout