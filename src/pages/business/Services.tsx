import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import PageTitle from "../../components/business/PageTitle";
import { serviceCategories } from "../../utils/businessUtils";
import { IoIosArrowForward } from "react-icons/io";
import website from "../../utils/website";
import { motion, AnimatePresence } from "framer-motion";

// Helper to normalize strings
const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, "-");

function Services() {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");
  const navigate = useNavigate();

  const normalizedCategory = category ? category.toLowerCase() : "";
  const categoryKey = Object.keys(serviceCategories).find(
    (key) => normalize(key) === normalizedCategory
  );

  const categoryData = categoryKey ? serviceCategories[categoryKey] : null;
  const services = categoryData?.services || [];

  const selectedService =
    serviceParam && services.length > 0
      ? services.find((s) => normalize(s.name) === serviceParam) || null
      : null;

  const handleCategoryClick = (cat: string) => {
    navigate(`/services/${normalize(cat)}`);
  };

  const handleServiceClick = (cat: string, service: string) => {
    navigate(`/services/${normalize(cat)}?service=${normalize(service)}`);
  };

  return (
    <div>
      {/* Page Title with animation */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <PageTitle
          title={categoryKey || "Services"}
          breadcrumb={[
            { name: "Home", href: "/" },
            { name: categoryKey || "Services" },
          ]}
        />
      </motion.div>

      <div className="business-container mx-auto px-4 my-10">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <motion.div
            className="lg:w-2/6 w-full space-y-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="bg-primary/10 p-4 shadow space-y-4">
              <ul className="space-y-2">
                {Object.keys(serviceCategories).map((cat) => {
                  const isActiveCategory = cat === categoryKey;
                  const catServices = serviceCategories[cat].services;

                  return (
                    <li key={cat}>
                      <motion.div
                        onClick={() => handleCategoryClick(cat)}
                        className={`cursor-pointer px-4 py-2 font-semibold transition-colors ${
                          isActiveCategory
                            ? "bg-primary text-white"
                            : "hover:bg-primary hover:text-white bg-white text-black"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <div className="flex items-center justify-between">
                          {cat} <IoIosArrowForward className="w-4 h-4" />
                        </div>
                      </motion.div>

                      {isActiveCategory && (
                        <motion.ul
                          className="mt-2 space-y-1 pl-4 bg-white"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: { opacity: 0 },
                            visible: {
                              opacity: 1,
                              transition: { staggerChildren: 0.1 },
                            },
                          }}
                        >
                          {catServices.map((s) => {
                            const isSelected =
                              selectedService?.name === s.name;
                            return (
                              <motion.li
                                key={s.name}
                                onClick={() =>
                                  handleServiceClick(cat, s.name)
                                }
                                className={`cursor-pointer px-2 py-1 rounded transition-colors ${
                                  isSelected
                                    ? "text-primary font-semibold"
                                    : "text-gray-700 hover:text-primary"
                                }`}
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 },
                                }}
                              >
                                {s.name}
                              </motion.li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact Widget */}
            <motion.aside
              className="p-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-primary text-white p-10  relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-900 opacity-50 "></div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-center mb-4">
                    <i className="flaticon-pigment text-4xl"></i>
                  </div>

                  <h4 className="text-xl font-bold">How Can We Help?</h4>
                  <p>If you need any help, please feel free to contact us.</p>

                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <i className="flaticon-call"></i>
                      <span>{website?.contact?.phone1}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="flaticon-email"></i>
                      <a
                        href="mailto:info@laboratory.com"
                        className="underline hover:text-primary"
                      >
                        {website?.contact?.email}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.aside>
          </motion.div>

          {/* Main Content */}
          <div className="lg:w-4/6 w-full space-y-6">
            <AnimatePresence mode="wait">
              {selectedService ? (
                <motion.div
                  key={selectedService.name}
                  className="bg-white p-6 space-y-4 "
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-primary">
                    {selectedService.name}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedService.description}
                  </p>

                  {selectedService.image && (
                    <motion.img
                      src={selectedService.image}
                      alt={selectedService.name}
                      className="w-full h-64  md:h-[500px] object-cover rounded"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  )}
                </motion.div>
              ) : categoryData ? (
                <motion.div
                  key={categoryKey}
                  className="bg-white space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-primary">
                    {categoryKey}
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {categoryData.description}
                  </p>

                  {categoryData.defaultImage && (
                    <motion.img
                      src={categoryData.defaultImage}
                      alt={categoryKey}
                      className="w-full h-64  md:h-[500px] object-cover rounded "
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    />
                  )}

                  {/* Services List */}
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3 text-primary">
                      Services:
                    </h3>
                    <motion.ul
                      className="list-disc pl-5 space-y-1 marker:text-primary"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: { staggerChildren: 0.1 },
                        },
                      }}
                    >
                      {services.map((s) => (
                        <motion.li
                          key={s.name}
                          onClick={() =>
                            categoryKey && handleServiceClick(categoryKey, s.name)
                          }
                          className="cursor-pointer hover:text-primary transition-colors"
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 },
                          }}
                        >
                          {s.name}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              ) : (
                <motion.p
                  className="text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Select a category and service from the sidebar to see the details.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
