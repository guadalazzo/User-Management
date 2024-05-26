import { useEffect, useState } from "react";
import { getCultivationUsers } from "../../../services"; 
import { useParams } from 'react-router-dom';
import {cultivationUsers} from '../../../types/index';

export default function EditCultivation() {
    const { id } = useParams();
    const [cultivationUsers, setCultivationUsers] = useState<cultivationUsers[]>([]);
  // Load cultivation by id
  const loadCultivationUsers = async (id: string) => {
    try {
      const data = await getCultivationUsers(id);
      setCultivationUsers(data);
    } catch (e) {
      console.error('Failed to load cultivation:', e);
    }
  };

    useEffect(() => {
        if (id) {
            loadCultivationUsers(id);
        }
        return () => {
          // on unmount
        };
      }, []);

    return <>
        {!cultivationUsers.length ? <> No cultivation Users</>:<>{cultivationUsers.map(cultivationUser=>{
            return <div>{cultivationUser.user.name}</div>
        })}</> }
    </>
}