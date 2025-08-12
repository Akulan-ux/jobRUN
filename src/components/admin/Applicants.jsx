import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setAllApplicants } from '../../redux/applicationSlice';
import { APPLICATION_API_END_POINT } from '../utils/constant';

const Applicants = () => {
  const params = useParams();
    const dispatch = useDispatch();
    const {applicants} = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
  return (
    <div >
        <Navbar/>
        <div className="max-w-7xl mx-auto mt-14">
            <h1>Applicants ({applicants?.applications?.length})</h1>
            <ApplicantsTable />

        </div>

      
    </div>
  )
}

export default Applicants
