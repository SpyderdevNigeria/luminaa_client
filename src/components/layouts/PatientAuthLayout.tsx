import { Outlet, Link } from 'react-router-dom';
import Background from '../../assets/images/auth/Desktop - 7.webp'; 
import website from '../../utils/website';

function PatientAuthLayout() {
    return (
        <div
          className="min-h-screen bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="p-4 md:p-8">
            <Link to="/">
              <img src={website?.logo} alt="Logo"
                className="w-36 md:w-44 mx-auto md:mx-0"
              />
            </Link>
          </div>
    
          <div className="px-4 md:px-0">
            <Outlet />
          </div>
        </div>
      );
}

export default PatientAuthLayout