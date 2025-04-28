import React from 'react'
import { useNavigate } from 'react-router-dom'
import routeLinks from '../../utils/routes'

const placeholder = 'https://via.placeholder.com/150'

const LabLogin = () => {
  const [loginData, setLoginData] = React.useState({
    email: '',
    password: ''
  })
  
  const navigate = useNavigate()

  const query = {
    accountType: 'lab',
  }


  const handleLogin = () => {
    // Logic for handling login
    const user = {}

    if (user?.role === 'lab') {
      // Redirect to lab dashboard
      navigate(routeLinks.auth.login)
    }

  }
  return (
    <div>
      <img src={user?.image || placeholder} alt="" onError={
        (e) => {
          e.currentTarget.src = placeholder
        }
      } />
    </div>
  )
}

export default LabLogin