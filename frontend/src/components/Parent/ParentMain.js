import { useState, useEffect, lazy, Suspense } from "react"
import { Button } from "reactstrap"
import { getUserDetails } from '../../utils/common'

const SideNav = lazy(() => import('../SideNav/SideNav'))
const AdminPanel = lazy(() => import('../AdminPanel/AdminPanel'))
const InstructorPanel = lazy(() => import('../InstructorPanel/InstructorPanel'))
const Learn = lazy(() => import('../Learn/Learn'))
const UserMain = lazy(() => import('../UserPanel/UserMain'))


const ParentMain = () => {
    const [sideNavHover, setSideNavHover] = useState(false)
    const [sideNavWidth, setNavWidth] = useState(5)
    const [isAdmin, setIsAdmin] = useState(true)
    const [isInstructor, setInstructor] = useState(true)
    const [isStudent, setIsStudent] = useState(true)
    const [userDetails, setUserDetails] = useState(true)
    const [toggleAdminPanel, setToggleAdminPanel] = useState(false)
    const [toggleInstructorPanel, setToggleInstructorPanel] = useState(false)

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
                style={{overflow: 'hidden', width:`${sideNavWidth}%`}}
                onMouseEnter={()=>setNavWidth(12)}
                onMouseLeave={()=>setNavWidth(5)}
            >
                <Suspense fallback={<div></div>}>
                    <SideNav sideNavWidth={sideNavWidth}/>   
                </Suspense> 
            </div>
            <div style={{minHeight: '95vh', marginTop: 30, width:`${Number(100-sideNavWidth)}%`}}>
                <Suspense fallback={<div></div>}>
                    {isAdmin && toggleAdminPanel && <AdminPanel />}
                    {isInstructor && toggleInstructorPanel && <InstructorPanel />}
                    {isStudent && <Learn />}
                </Suspense>
            </div>
            <div style={{position: 'absolute', right: 24, top: 10, display: 'flex'}}>
                {isAdmin && <Button color="success" style={{height: "50px"}} className="me-2" onClick={() => setToggleAdminPanel(!toggleAdminPanel)}>Admin Panel</Button>}
                {isInstructor && <Button color="warning" style={{height: "50px"}} className="me-2" onClick={() => setToggleInstructorPanel(!toggleInstructorPanel)}>Instructor Panel</Button>}
                <Suspense fallback={<div></div>}>
                    <UserMain userDetails={userDetails}/>
                </Suspense>
            </div>
        </div>
    )
}

export default ParentMain