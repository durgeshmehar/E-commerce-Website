import { useSelector} from "react-redux"
import { Navigate } from "react-router-dom"
import { selectUserInfo } from "../user/userSlice";

function Protected({children}) {
    const userInfo = useSelector(selectUserInfo);
    
    if(!userInfo){
        return <Navigate to="/login" replace={true} />
    }
    if(userInfo && userInfo.role !== 'admin'){
        return <Navigate to="/" replace={true} />
    }
    
  return children;
}

export default Protected;