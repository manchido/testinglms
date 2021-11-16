import { useState } from "react"
import { Nav, NavLink } from "reactstrap"

const SideNav = (props) => {
    const [isAdmin, setIsAdmin] = useState(true)
    const [isInstructor, setInstructor] = useState(false)
    const [isStudent, setIsStudent] = useState(true)

    const {sideNavWidth} = props
    
    return(
        <nav style={{position: "fixed", borderRight: '2px solid whitesmoke', height: '120vh'}}>
            <Nav vertical>
                <img style={{position: 'absolute', width: `${sideNavWidth == 12 ? "180px" : "80px"}`}} className="p-3" src="https://giveitanudge.com/wp-content/themes/website4.0/assets/img/logos/ndg-logo--dark.svg" alt="nudge" />
                {/* {isAdmin && 
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
                } */}
                <div className="main-menu">
                    <NavLink href="#">
                        <i class="bi bi-search ps-2 pe-3 fs-5"></i>
                        {sideNavWidth == 12 && <span>Find</span>}
                    </NavLink>
                    <NavLink href="#">
                        <i class="bi bi-plus-circle-fill ps-2 pe-3 fs-5"></i>
                        {sideNavWidth == 12 && <span>Add New</span>}
                    </NavLink>
                    <NavLink href="#">
                        <i class="bi bi-list ps-2 pe-3 fs-5"></i>
                        {sideNavWidth == 12 && <span>Menu</span>}
                    </NavLink>
                </div>
                <div className="secondary-menu">
                    <NavLink href="#">
                        <i class="bi bi-chat-text-fill ps-2 pe-3 fs-5"></i>
                        {sideNavWidth == 12 && <span>Give Feedback</span>}
                    </NavLink>
                    <NavLink href="#">
                        <i class="bi bi-arrow-right-circle-fill ps-2 pe-3 fs-5"></i>
                        {sideNavWidth == 12 && <span>Learn More</span>}
                    </NavLink>
                    <NavLink style={{borderBottom: "whitesmoke 2px solid"}} href="#">
                        <i class="bi bi-gear-fill ps-2 pe-3 fs-5"></i>
                        {sideNavWidth == 12 && <span>Settings</span>}
                    </NavLink>
                </div>
            </Nav>
        </nav>
    )
}

export default SideNav