import { setAllJobs, setSingleJob } from '.././redux/jobSlice'
import { JOB_API_END_POINT } from '../components/utils/constant'

import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetSingleJob = (jobId) => {
    const dispatch = useDispatch();
    
}

export default useGetSingleJob