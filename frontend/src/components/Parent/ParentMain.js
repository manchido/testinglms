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
    const [isInstructor, setInstructor] = useState(true)
    const [isStudent, setIsStudent] = useState(true)
    const [userDetails, setUserDetails] = useState(true)
    
    const localUrl = "http://localhost:8001"
    const serverUrl = "http://172.105.51.160"

    useEffect(() => {
        getUserDetails()
    },[])

    const getUserDetails = async () =>{
        const nudgeToken = localStorage.getItem("nudgeToken")
        const id = localStorage.getItem("_id_")
        const url = `${process.env.REACT_APP_API_URL}/api/users/getone`
        const requestOptions = {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-access-token': nudgeToken
            },
            body: JSON.stringify({id: id}),
            Referer: "http://172.105.51.160/"
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