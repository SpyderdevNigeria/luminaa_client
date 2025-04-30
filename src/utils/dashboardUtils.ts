import { CiTablets1 } from "react-icons/ci";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { TbSmartHome } from "react-icons/tb";
import { BiSolidClinic } from "react-icons/bi";
import { LiaPillsSolid } from "react-icons/lia";
import { FiPackage } from "react-icons/fi";
import routeLinks from "./routes";

export const navItemsPatient = [

    { label: 'Dashboard', title:'Dashboard', icon: TbSmartHome, to:routeLinks?.patient?.dashboard },
    { label: 'Prescription', title:'Prescription', icon: CiTablets1, to:routeLinks?.patient?.prescription },
    { label: 'Orders', title:'Orders', icon: FiPackage,  to:routeLinks?.patient?.orders },
    { label: 'Pharmacy', title:'Pharmacy', icon: LiaPillsSolid,  to:routeLinks?.patient?.pharmacy },
    { label: 'Lab/Radiology',  title:'Lab/Radiology', icon: BiSolidClinic,  to:routeLinks?.patient?.lab },
    { label: 'Consultations', title:'Consultations',  icon: LiaStethoscopeSolid, to:routeLinks?.patient?.consultations },   
   

]
