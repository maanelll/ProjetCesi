import React,{useState, useEffect, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../../../../../types';
import axios from 'axios';
import CreateUser from '../../create';
import AuthContext from '../../../../../config/authContext';

const EditUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { token } = useContext(AuthContext);
    const config = {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  };
    useEffect(() => {
    axios.get(`https://localhost:8000/api/user/${userId}`,config)
      .then(response => {
        setUser(response.data);
        console.log(response.data); 
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      })
      .finally(() => setLoading(false));
  }, [userId]);

    return (
        <div>
      {loading ? (
        <p>Chargement des données de l'utilisateur...</p>
      ) : (
        user && <CreateUser isEditMode={true} existingUser={user} />
      )}
    </div>
    );
};


export default EditUser;