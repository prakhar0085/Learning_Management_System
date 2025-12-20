import { useEffect } from 'react'
import { serverUrl } from '../config';
import axios from 'axios'
import { setCreatorCourseData } from '../redux/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const useGetCreatorCourseData = () => {
  const dispatch = useDispatch()
  const { userData } = useSelector(state => state.user)

  
    useEffect(() => {
      // Only fetch when logged in and role is educator
      if (!userData || userData?.role !== 'educator') return

      const getCreatorData = async () => {
        try {
          const result = await axios.get(
            serverUrl + "/api/course/getcreatorcourses",
            { withCredentials: true }
          )
          await dispatch(setCreatorCourseData(result.data))
          console.log(result.data)
        } catch (error) {
          console.log(error)
          const msg = error?.response?.data?.message || 'Failed to fetch creator courses'
          // Avoid spamming toast on expected auth errors during startup
          if (![400, 401].includes(error?.response?.status)) {
            toast.error(msg)
          }
        }
      }

      getCreatorData()
    }, [userData, dispatch]) // Added missing dispatch dependency
  
}

export default useGetCreatorCourseData
