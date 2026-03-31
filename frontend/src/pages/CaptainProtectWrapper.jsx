import React,{useContext, useEffect} from 'react'
import { CaptainDataContext } from '../Context/CaptainContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CaptainProtectWrapper = ({children}) => {
  const token = localStorage.getItem('captain_token');
  const navigate = useNavigate();

  const {captain, setCaptain} = useContext(CaptainDataContext);
  const [isLoading, setIsloading] = React.useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/captainLogin');
      setIsloading(false);
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers:{
          Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if(response.status === 200){
          const data = response.data;
          setCaptain(data.captain);   
          setIsloading(false);
      }
    })
    .catch((error) => {
      console.log(error);
      localStorage.removeItem('captain_token');
      navigate('/captainLogin');
      setIsloading(false);
    });
  }, [token, navigate, setCaptain]);

  if(isLoading){
    return <div>Loading...</div>;
  }

 return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectWrapper