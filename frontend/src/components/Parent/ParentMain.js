import { useState, useEffect, lazy, Suspense } from "react"
import {getUserDetails} from '../../utils/common'

const SideNav = lazy(() => import('../SideNav/SideNav'))
const AdminPanel = lazy(() => import('../AdminPanel/AdminPanel'))
const InstructorPanel = lazy(() => import('../InstructorPanel/InstructorPanel'))
const Learn = lazy(() => import('../Learn/Learn'))
const UserMain = lazy(() => import('../UserPanel/UserMain'))


const ParentMain = () => {
    const [sideNavHover, setSideNavHover] = useState(false)
    const [sideNavWidth, setNavWidth] = useState(1)
    const [isAdmin, setIsAdmin] = useState(true)
    const [isInstructor, setInstructor] = useState(true)
    const [isStudent, setIsStudent] = useState(true)
    const [userDetails, setUserDetails] = useState(true)
    const loggedUserId = localStorage.getItem("_id_")
    
    const localUrl = "http://localhost:8001"
    const serverUrl = "http://172.105.51.160"

    useEffect(() => {
        
        getUserDetails(loggedUserId).then(result =>{
            setUserDetails(result)
        })
        
    },[])

    

    return (
        <div className="d-flex col-12">
            <div 
                className={`col-`+Number(sideNavWidth)}
                style={{overflow: 'hidden'}}
                onMouseEnter={()=>setNavWidth(2)}
                onMouseLeave={()=>setNavWidth(1)}
            >
                <Suspense fallback={<div></div>}>
                    <SideNav/>   
                </Suspense> 
            </div>
            <div className={`col-`+Number(12-sideNavWidth)} style={{minHeight: '95vh', marginTop: 30}}>
                <Suspense fallback={<div></div>}>
                    {isAdmin && <AdminPanel />}
                    {isInstructor && <InstructorPanel />}
                    {isStudent && <Learn />}
                </Suspense>
            </div>
            <div style={{position: 'absolute', right: 24, top: 10}}>
                <Suspense fallback={<div></div>}>
                    <UserMain userDetails={userDetails}/>
                </Suspense>
            </div>
        </div>
    )
}

export default ParentMain