import { useState } from "react"
import { Nav, NavLink } from "reactstrap"

const SideNav = () => {
    const [isAdmin, setIsAdmin] = useState(true)
    const [isInstructor, setInstructor] = useState(false)
    const [isStudent, setIsStudent] = useState(true)
    
    return(
        <div>
            <Nav vertical>
                {isAdmin && 
                    <div>
                    <NavLink href="#">
                        Admin Panel
                    </NavLink>

                    <NavLink href="usermanagement">
                    UserManagement
                    </NavLink>
                    </div>
                }
                {isInstructor && 
                    <NavLink href="#">
                        Instructor Panel
                    </NavLink>
                }
                <NavLink href="#">
                    Find
                </NavLink>
                <NavLink href="#">
                    Add New
                </NavLink>
                <NavLink href="#">
                    Menu
                </NavLink>
                <NavLink href="#">
                    Give Feedback
                </NavLink>
                <NavLink href="#">
                    Learn More
                </NavLink>
                <NavLink href="#">
                    Settings
                </NavLink>
            </Nav>
        </div>
    )
}

export default SideNav