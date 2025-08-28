
import PageTitle from '../../components/business/PageTitle'

import AboutUsSection from '../../components/business/about/AboutUsSection'
// import ServicesSection from "../../components/business/home/ServicesSection"
import TeamSection from '../../components/business/about/TeamSection'
import AboutUsImage from '../../assets/images/business/about/single-img-eight.jpg'
// import TestimonialSection from '../../components/business/home/TestimonialSection'
import { members } from '../../utils/businessUtils'
function AboutUs() {
  return (
    <div>
      <PageTitle
        title="About Us"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "About Us" },
        ]}
      />

      <div className="site-main">

        {/* <!--introduction-section--> */}
        <AboutUsSection
          sectionTitle="About Us"
          subtitle="Redefining Quality Healthcare with Innovation and Compassion"
          description="Oak Endoscopy Centre is a state of the art health centre offering quality health care to affording clients. In this twenty-first century, technological advancement has evolved a sub-specialty of medicine called Minimal Access Surgery. The telescopic visualization with video-monitor display of images in the diagnosis and treatment of various diseases is routinely practiced in advanced countries but yet to be common practice in Port Harcourt metropolis. An early detection of abnormal growth is a vital step towards effective treatment of cancer."
          listLeft={[
            "Exceeding the prevailing standard of health care.",
            "Offering premium health care in minimal access surgery"
          ]}
          listRight={[
            "Prevention, early diagnosis and treatment of cancer.",
            "Providing compassionate, patient-centered care through innovation and excellence."
          ]}
          mainImage={AboutUsImage}
          visionTitle="Our Vision"
          visionDesc="To be a premier endoscopy, imaging, and cancer care centre, providing advanced diagnostics and compassionate care that improves lives."
          missionTitle="Our Mission"
          missionDesc="Our mission is to exceed the prevailing standards of healthcare by delivering premium services in minimal access surgery, and advancing the prevention, early diagnosis, and treatment of cancer."
        />

    {/* <ServicesSection/>

    <TestimonialSection/> */}

        {/* <!--team-section--> */}
        <TeamSection
          title="OUR SPECIALTIES"
          subtitle="Led by Passionate Experts"
          description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
          members={members}
        />

        {/* <!--team-section end--> */}


      </div></div>
  )
}

export default AboutUs