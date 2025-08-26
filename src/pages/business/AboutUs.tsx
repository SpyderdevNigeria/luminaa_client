
import PageTitle from '../../components/business/PageTitle'
import AboutUsSection from '../../components/business/about/AboutUsSection'
import ServicesSection from '../../components/business/about/ServicesSection'
import WorkingProcess from '../../components/business/about/WorkingProcess'
import TeamSection from '../../components/business/about/TeamSection'

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
        description="Paramedical healthcare field attracts to save lives & helping people, being a doctor is not your only choice. We show how else you can help patients without being a doctor, here we serve awesome opportunity."
        listLeft={["Engage - marketing automation", "Learn from customer feedback"]}
        listRight={["Acquire live chat enables sales", "Customer support"]}
        callNumbers={["123-456-7890", "456-789-4565"]}
        signature="/images/author-sign.png"
        founder="John Martin (M.L.B)"
        founderRole="Chairman and Founder"
        bgImage="/images/bg/bg1.jpg"
        mainImage="/images/single-img-six.png"
        />

        {/* <!--introduction-section end--> */}


        {/* <!--features-section--> */}
        <ServicesSection
        sectionTitle="OUR SPECIALTIES"
        subtitle="Why Choose Us"
        description="Our excellent team is ready to be part of your team to work into the different areas of diagnoses. Scientists helping scientists."
        services={[
            { icon: "flaticon-lab", title: "High\nQuality Services" },
            { icon: "flaticon-laboratory-3", title: "Fast\nWorking Process" },
            { icon: "flaticon-24-hours", title: "24/7\nCustomer Support" },
            { icon: "flaticon-scientist-1", title: "Expert\nLabtechician Team" },
        ]}
        footerText="Laboratories Used For Scientific Research"
        footerLink="#"
        bgImage="/images/bg/bg8.jpg"
        />

        {/* <!--features-section--> */}


        {/* <!--fid-section--> */}

        {/* <!--fid-section end--> */}

        {/* <!--procedure-section--> */}
<WorkingProcess
  sectionTitle="OUR SERVICES"
  subtitle="Our Working Process"
  description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ev"
  bgImage="/images/bg/bg9.jpg"
  steps={[
    {
      icon: "flaticon-lab-2",
      number: "01",
      title: "Data Collection",
      description: "For the accurate diagnoses, perfect information is must require",
      arrow: "/images/arrow-1.png",
    },
    {
      icon: "flaticon-healthcare-and-medical-1",
      number: "02",
      title: "Diagnose Process",
      description: "The collection goes to the particular department for the tests",
      arrow: "/images/arrow-2.png",
      arrowFlip: true,
    },
    {
      icon: "flaticon-laboratory-3",
      number: "03",
      title: "Access To Reports",
      description: "As a result, that arrive one can access their report online or direct",
    },
  ]}
/>

        {/* <!--procedure-section end--> */}


        {/* <!--team-section--> */}
<TeamSection
  title="OUR SPECIALTIES"
  subtitle="Led by Passionate Experts"
  description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  members={[
    {
      name: "Duck Peter",
      position: "CEO At Lab",
      image: "/images/team-member/team-img01.jpg",
      socials: {
        facebook: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Lexa May Cruz",
      position: "CEO At Lab",
      image: "/images/team-member/team-img02.jpg",
      socials: {
        facebook: "#",
        twitter: "#",
      },
    },
    {
      name: "Andrew Bon",
      position: "CEO At Lab",
      image: "/images/team-member/team-img03.jpg",
    },
    {
      name: "John Martin",
      position: "CEO At Lab",
      image: "/images/team-member/team-img04.jpg",
      socials: {
        instagram: "#",
      },
    },
    // Add more members as needed
  ]}
/>

        {/* <!--team-section end--> */}

      
    </div></div>
  )
}

export default AboutUs