import { useState } from "react"
import { Nav, NavLink } from "reactstrap"

const SideNav = () => {
    const [isAdmin, setIsAdmin] = useState(true)
    const [isInstructor, setInstructor] = useState(false)
    const [isStudent, setIsStudent] = useState(true)
    
    return(
        <div>
            <Nav vertical className="border flex-nowrap" style={{minHeight: "100vh"}}>
                <img style={{width: "120px"}} className="p-3" src="https://giveitanudge.com/wp-content/themes/website4.0/assets/img/logos/ndg-logo--dark.svg" alt="nudge" />
                {isAdmin && 
                    <div>
                    <NavLink style={{borderTop: "whitesmoke 2px solid"}} href="#">
                        Admin Panel
                    </NavLink>

                    <NavLink href="usermanagement">
                        User Management
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
                <NavLink style={{borderBottom: "whitesmoke 2px solid"}} href="#">
                    Settings
                </NavLink>
            </Nav>
        </div>
    )
}

export default SideNav