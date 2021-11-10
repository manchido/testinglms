import { useState } from "react"
import SideNav from "../SideNav/SideNav"
import Learn from "../Learn/Learn"
import AdminPanel from "../AdminPanel/AdminPanel"
import InstructorPanel from "../InstructorPanel/InstructorPanel"

const ParentMain = () => {
    const [sideNavHover, setSideNavHover] = useState(false)
    const [sideNavWidth, setNavWidth] = useState(1)
    const [isAdmin, setIsAdmin] = useState(true)
    const [isInstructor, setInstructor] = useState(false)
    const [isStudent, setIsStudent] = useState(true)

    return (
        <div className="d-flex col-12">
            <div 
                className={`col-`+Number(sideNavWidth)}
                style={{overflow: 'hidden'}}
                onMouseEnter={()=>setNavWidth(2)}
                onMouseLeave={()=>setNavWidth(1)}
            >
                <SideNav/>
            </div>
            <div className={`col-`+Number(12-sideNavWidth)} style={{minHeight: '100vh'}}>
                {isAdmin && <AdminPanel />}
                {isInstructor && <InstructorPanel />}
                {isStudent && <Learn />}
            </div>
        </div>
    )
}

export default ParentMain