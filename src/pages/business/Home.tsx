import AboutUs from "../../components/business/home/AboutUs"
import ClientAndTechnologySection from "../../components/business/home/ClientAndTechnologySection"
import HeroSlider from "../../components/business/home/HeroSlider"
import PortfolioSection from "../../components/business/home/PortfolioSection"
import ServicesSection from "../../components/business/home/ServicesSection"
import TestimonialSection from "../../components/business/home/TestimonialSection"

function Home() {
  return (
    <div className="overflow-hidden">
        <HeroSlider/>
        <AboutUs/>
        <ServicesSection/>
        <PortfolioSection/>
        <TestimonialSection/>
        <ClientAndTechnologySection/>
    </div>
  )
}

export default Home