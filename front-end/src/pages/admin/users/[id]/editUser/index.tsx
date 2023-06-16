import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../../../../../types';
import axios from 'axios';
import CreateUser from '../../create';

const EditUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState<IUser | null>(null);
    
    useEffect(() => {
    axios.get(`http://localhost:8000/api/edit_user/${userId}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error("Error fetching userdata:", error);
      });
  }, [userId]);
    return (
        <div>
      {/* {user? (
        <CreateUser isEditMode={true} existingUser={user} />
      ) : (
        <p>chargement des données de user...</p>
      )} */}
    </div>
    );
};

export default EditUser;