import { useParams, Navigate } from "react-router-dom";
import PageTitle from "../../components/business/PageTitle";
import { members } from "../../utils/businessUtils";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function Team() {
  const { memberName } = useParams<{ memberName: string }>();
console.log(memberName)
  // Find the member by URL
  const member = members.find(
    (m) =>
      m.name.toLowerCase().replace(/\s+/g, "-") ===
      memberName?.toLowerCase()
  );

  if (!member) {
    return <Navigate to="/404" />;
  }

  return (
    <div>
      <PageTitle
        title="Team Details"
        breadcrumb={[
          { name: "Home", href: "/" },
          { name: member.name },
        ]}
      />

<div className="py-20">
  <div className="business-container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-start overflow-hidden ">
      
      {/* Left Column - Image */}
      <div className="lg:w-5/12 w-full">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-64 sm:h-80 lg:w-[435px] lg:h-[620px] object-fill"
        />
      </div>

      {/* Right Column - Details */}
      <div className="lg:w-7/12 w-full p-6 lg:p-8 flex flex-col justify-between">
        {/* Personal Info */}
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold mb-6 text-primary">Personal Information</h2>
          <ul className="space-y-3 mb-6">
            <li className="flex">
              <h5 className="font-semibold w-40 lg:w-48">Name:</h5>
              <span>{member.name}</span>
            </li>
            <li className="flex">
              <h5 className="font-semibold w-40 lg:w-48">Primary Specialty:</h5>
              <span>{member.position}</span>
            </li>
            <li className="flex">
              <h5 className="font-semibold w-40 lg:w-48">Experience:</h5>
              <span>12+ Years</span>
            </li>
          </ul>

          <div className="border-t border-gray-300 my-6"></div>

          {/* Biography */}
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-primary">Biography</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            {member.description}
          </p>

          {/* Social Links at Bottom */}
          <div className="flex space-x-4 mt-4">
            {member.socials?.facebook && (
              <a
                href={member.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-white p-3 rounded-full flex items-center justify-center shadow hover:bg-green-600 transition"
              >
                <FaFacebookF />
              </a>
            )}
            {member.socials?.twitter && (
              <a
                href={member.socials.twitter}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-white p-3 rounded-full flex items-center justify-center shadow hover:bg-green-600 transition"
              >
                <FaTwitter />
              </a>
            )}
            {member.socials?.instagram && (
              <a
                href={member.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="bg-primary text-white p-3 rounded-full flex items-center justify-center shadow hover:bg-green-600 transition"
              >
                <FaInstagram />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
}

export default Team;
