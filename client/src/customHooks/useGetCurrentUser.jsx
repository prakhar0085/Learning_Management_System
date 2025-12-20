import { useEffect } from "react"
import { serverUrl } from '../config';
import axios from "axios"
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"

const useGetCurrentUser = ()=>{
    let dispatch = useDispatch()
    // Removed unused useSelector
   
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                let result = await axios.get(serverUrl + "/api/user/currentuser" , {withCredentials:true})
                dispatch(setUserData(result.data))

            } catch (error) {
                console.log(error)
                dispatch(setUserData(null))
            }
        }
        fetchUser()
    },[dispatch]) // Added missing dependency
}

export default useGetCurrentUser
