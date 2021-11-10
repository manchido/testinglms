import { useState } from "react"
import { Card } from "reactstrap"
import useComponentVisible from '../isComponentVisible'

const UserMain = (props) => {
    const [toggleProfile, setToggleProfile] = useState(false)
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

    const {userDetails} = props
    console.log("userDetails",userDetails)

    const onLogout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return(
        <div ref={ref}>
            {
                !isComponentVisible ?
                <div className="pointer" style={{maxWidth: 200, overflow: 'hidden'}} onClick={()=>setIsComponentVisible(!isComponentVisible)}>
                    <Card className="d-flex flex-row align-items-center px-3 py-2">
                        <img className="me-2" src={userDetails.avatarUrl} alt="avatar" style={{width: 30, height: 30, borderRadius: '50%', objectFit: 'cover'}} />
                        <div className="bold fs-5">{userDetails.firstName}</div>
                        <i class="bi bi-caret-down-fill ms-2 caret"></i>
                    </Card>
                </div>
                :
                <div style={{width: 300, overflow: 'hidden'}}>
                    <Card className="d-flex align-items-center px-2 pt-3 pb-2" style={{height: '97vh'}}>
                        <i className="bi bi-caret-up-fill ms-2 caret p-3 pointer" style={{position: 'absolute', right: -5, top: -10}} onClick={()=>setIsComponentVisible(!isComponentVisible)}></i>
                        <i className="bi bi-bell-fill ms-2 caret p-3 pointer" style={{position: 'absolute', right: 250, top: -4, transform: 'scale(1.2)'}}></i>
                        <div className="d-flex justify-content-center align-items-center">
                            <img className="me-2 mt-3" src={userDetails.avatarUrl} alt="avatar" style={{width: 80, height: 80, borderRadius: '50%', objectFit: 'cover'}} />
                        </div>
                        <div className="d-flex mt-2">
                            <div className="bold fs-3">{userDetails.firstName}</div>
                            <div className="bold fs-3 ms-2">{userDetails.lastName}</div>
                        </div>
                        <div className="bold d-flex col-12 justify-content-center fs-6 pointer blue-400">Profile</div>
                        <div className="d-flex col-11 flex-column border-top mt-3 pt-2 px-2">
                            <div className="bold fs-6">Email: {userDetails.email}</div>
                            <div className="bold fs-6">Contact: {userDetails.phoneNumber}</div>
                            <div className="bold fs-6">Country: {userDetails.country}</div>
                            {/* <div className="bold fs-6 ms-2">Company: {userDetails.company}</div> */}
                            <div className="bold fs-6">Verified: {`${userDetails.isVerified}`}</div>
                        </div>
                        <div className="d-flex col-11 border-top mt-3 pt-2 px-2">
                            <div className="bold fs-5">Members</div>
                        </div>
                        <div className="d-flex col-11 border-top mt-3 pt-2 px-2">
                            <div className="bold fs-5">Information</div>
                        </div>
                        <div 
                            className="d-flex border-top mt-3 pt-2 col-11 px-2 pointer"
                            onClick={()=>onLogout()}
                        >
                            Logout
                        </div>
                    </Card>
                </div>
            }
        </div>
    )
}

export default UserMain