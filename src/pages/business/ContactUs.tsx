
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import website from '../../utils/website';

const socialLinks = [
  {
    icon: <FaTwitter />,
    link: website.socialMedias.twitter,
  },
  {
    icon: <FaFacebookF />,
    link: website.socialMedias.facebook,
  },
  {
    icon: <FaLinkedinIn />,
    link: website.socialMedias.linkedin,
  },
  {
    icon: <FaInstagram />,
    link: website.socialMedias.instagram,
  },
]
export default function ContactUs() {
  return (
    <div>
      {/* <PageTitle
        title="Contact Us"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: "Contact Us" },
        ]}
      /> */}
      {/* Map Placeholder */}
      <div className="w-full h-[400px] mt-6 overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.4730671188353!2d7.037472!3d4.8401077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1069cd9721a684d7%3A0xf4ea1a4947628d89!2sOak%20Endoscopy%20Centre%2C%20Estate%2C%20Rumuogba%2C%20Port%20Harcourt%20500102%2C%20Rivers!5e0!3m2!1sen!2sng!4v1692878212345!5m2!1sen!2sng"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

      </div>
      <section className="py-4 bg-gray-100">
        <div className="business-container mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Column: Contact Info */}
          <div className="lg:w-1/3 w-full relative top-[-60px]">
            <div className="bg-primary text-white px-8 py-12  space-y-6">
              <h4 className="text-xl  lg:text-2xl font-semibold">Connect With Us</h4>
              <p className="text-white/80">
                Contact Oak Endoscopy Centre today for appointments, inquiries, or support. We are here to serve you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-2xl mt-1" />
                  <p>{website?.address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="text-2xl mt-1" />
                  <p>24/7 Support<br />{website?.contact?.phone1}</p>
                </div>
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-2xl mt-1" />
                  <p>
                    <a href={`mailto:${website?.contact?.email}`} className="underline">{website?.contact?.email}</a><br />
                    {/* <a href="mailto:info@Laboratory.com" className="underline">info@Laboratory.com</a> */}
                  </p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((i, index) => (
                  <a
                    key={index}
                    href={i.link}
                    className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full hover:bg-primary hover:text-white transition"
                  >
                    {i.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:w-2/3 w-full">
            <div className=" lg:px-8 md:py-6 space-y-6">
              <div className="mb-6">
                <h5 className="text-primary font-semibold uppercase mb-2">Contact Us</h5>
                <h2 className="text-2xl md:text-3xl font-bold">Feel Free To Ask Send Your Message.</h2>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    required
                    className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    required
                    className="w-full p-3 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    required
                    className="w-full p-3 border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Subject"
                    required
                    className="w-full p-3 border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  required
                  className="w-full p-3  border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  className="px-4 bg-primary text-white py-3  font-medium hover:bg-primary-dark transition"
                >
                  Send Message
                </button>
              </form>


            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
