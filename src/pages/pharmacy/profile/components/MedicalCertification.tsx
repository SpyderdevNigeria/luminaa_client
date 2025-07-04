import React from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { updateUser } from "../../../../reducers/authSlice";
import CertificationUploader from "../../../../components/common/CertificationUploader";
import PharmacistApi from "../../../../api/pharmacistApi";
interface MedicalCertificationsProps {
  handleClose: () => void;
  userProfile: any;
}

const MedicalCertification: React.FC<MedicalCertificationsProps> = ({
  handleClose,
  userProfile,
}) => {
   const dispatch = useAppDispatch();
  return (
    <>
<CertificationUploader
  userProfile={userProfile}
  handleClose={handleClose}
  certificateFields={[
    { key: "licenseDocument", label: "Annual License" },
    { key: "graduationCertificate", label: "Graduation Certificate" },
    // { key: "additionalCertificates", label: "Additional Certificates" },
  ]}
  uploadFn={PharmacistApi.uploadDocument}
 onUploadSuccess={(data) => dispatch(updateUser({ ...data, isEmailVerified: userProfile?.isEmailVerified, user:{...userProfile?.user}}))}
/>

    </>
  );
};

export default MedicalCertification;
