import { useState } from "react"
import SideNav from "../SideNav/SideNav"
import Learn from "../Learn/Learn"
import AdminPanel from "../AdminPanel/AdminPanel"
import InstructorPanel from "../InstructorPanel/InstructorPanel"

const ParentMain = () => {
    const [isAdmin, setIsAdmin] = useState(true)
    const [isInstructor, setInstructor] = useState(false)
    const [isStudent, setIsStudent] = useState(true)

    return (
        <div className="d-flex col-12">
            <div className="col-2">
                <SideNav/>
            </div>
            <div className="col-8">
                {isAdmin && <AdminPanel />}
                {isInstructor && <InstructorPanel />}
                {isStudent && <Learn />}
            </div>
        </div>
    )
}

export default ParentMain