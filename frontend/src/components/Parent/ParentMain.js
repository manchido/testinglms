import { useState, useEffect, lazy, Suspense } from "react"

const SideNav = lazy(() => import('../SideNav/SideNav'))
const AdminPanel = lazy(() => import('../AdminPanel/AdminPanel'))
const InstructorPanel = lazy(() => import('../InstructorPanel/InstructorPanel'))
const Learn = lazy(() => import('../Learn/Learn'))
const UserMain = lazy(() => import('../UserPanel/UserMain'))

const ParentMain = () => {
    const [sideNavHover, setSideNavHover] = useState(false)
    const [sideNavWidth, setNavWidth] = useState(1)
    const [isAdmin, setIsAdmin] = useState(true)
    const [isInstructor, setInstructor] = useState(false)
    const [isStudent, setIsStudent] = useState(true)
    const [userDetails, setUserDetails] = useState(true)

    useEffect(() => {
        getUserDetails()
    },[])

    const getUserDetails = async () =>{
        const nudgeToken = localStorage.getItem("nudgeToken")
        const id = localStorage.getItem("_id_")
        const localUrl = "http://localhost:8001"
        const url = localUrl + '/api/users/getone'
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-access-token': nudgeToken
            },
            body: JSON.stringify({id: id})
        }
        const response = await fetch(url, requestOptions)
        const data = await response.json();
        if(data) {
            console.log("getUserDetails",data);
            setUserDetails(data)
        }
        else if(data.status === "error") {
            console.log("No record");
        }
    
    };

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
            <div className={`col-`+Number(12-sideNavWidth)} style={{minHeight: '100vh', marginTop: 30}}>
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