
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8377978288957!2d-73.99169!3d40.75651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855d9e32411%3A0xb9175e10c849cb48!2s1010%20Avenue%20of%20the%20Moon%2C%20New%20York%2C%20NY%2010018%2C%20USA!5e0!3m2!1sen!2sng!4v1693100000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
      <section className="py-4 bg-gray-100">
        <div className="business-container mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Column: Contact Info */}
          <div className="lg:w-1/3 w-full relative top-[-60px]">
            <div className="bg-primary text-white px-8 py-12  space-y-6">
              <h4 className="text-xl  lg:text-2xl font-semibold">Connect With Us</h4>
              <p className="text-white/80">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-2xl mt-1" />
                  <p>1010 Avenue of the Moon, 12 New York, NY 10018 US.</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaPhoneAlt className="text-2xl mt-1" />
                  <p>24/7 Support<br/>+1800 200 133</p>
                </div>
                <div className="flex items-start gap-3">
                  <FaEnvelope className="text-2xl mt-1" />
                  <p>
                    <a href="mailto:info@Laboratory.com" className="underline">info@Laboratory.com</a><br/>
                    <a href="mailto:info@Laboratory.com" className="underline">info@Laboratory.com</a>
                  </p>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-3 mt-6">
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full hover:bg-primary hover:text-white transition">
                  <FaFacebookF />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full hover:bg-primary hover:text-white transition">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full hover:bg-primary hover:text-white transition">
                  <FaInstagram />
                </a>
                <a href="#" className="w-10 h-10 flex items-center justify-center bg-white text-primary rounded-full hover:bg-primary hover:text-white transition">
                  <FaTwitter />
                </a>
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
