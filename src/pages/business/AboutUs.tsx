
import PageTitle from '../../components/business/PageTitle'

import AboutUsSection from '../../components/business/about/AboutUsSection'
import ServicesSection from "../../components/business/home/ServicesSection"
import TeamSection from '../../components/business/about/TeamSection'
import AboutUsImage from '../../assets/images/business/about/single-img-eight.jpg'
import TestimonialSection from '../../components/business/home/TestimonialSection'
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
          subtitle="We Employ The Latest Research Technology & Company"
          description="Paramedical healthcare field attracts to save lives & helping people..."
          listLeft={[
            "Engage - marketing automation",
            "Learn from customer feedback"
          ]}
          listRight={[
            "Acquire live chat enables sales",
            "Customer support"
          ]}
          mainImage={AboutUsImage}
          visionTitle="Our Vision"
          visionDesc="Our excellent team is ready to be part of your team to work into the different areas of diagnoses. Scientists helping scientists."
          missionTitle="Our Mission"
          missionDesc="Exceeding the prevailing standard of health care.
          Offering premium health care in minimal access surgery.
          Prevention, early diagnosis and treatment of cancer."
        />

    <ServicesSection/>

    <TestimonialSection/>

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