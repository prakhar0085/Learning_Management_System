import axios from 'axios';
import { serverUrl } from '../App.jsx';
import { useDispatch } from 'react-redux';
import { setCourseData } from '../redux/courseSlice.js';
import { useEffect } from 'react';

const useGetCourseData = () => {
  const dispatch = useDispatch()
  // Removed unused userData

  useEffect(()=>{
    const getAllPublishedCourse = async () => {
      try {
        const result = await axios.get(serverUrl + "/api/course/getpublishedcoures" , {withCredentials:true})
        console.log(result.data)
        dispatch(setCourseData(result.data))
        
      } catch (error) {
        console.log(error)
      }
    }
    getAllPublishedCourse()
  },[dispatch]) // Added missing dependency

}

export default useGetCourseData
