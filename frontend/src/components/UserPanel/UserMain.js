import { useState } from "react"
import { Card } from "reactstrap"

const UserMain = (props) => {
    const [toggleProfile, setToggleProfile] = useState(false)

    const {userDetails} = props
    console.log("userDetails",userDetails)

    return(
        <div onClick={()=>setToggleProfile(!toggleProfile)}>
            {
                !toggleProfile ?
                <div className="pointer" style={{maxWidth: 200, overflow: 'hidden'}}>
                    <Card className="d-flex flex-row align-items-center px-2 py-1">
                        <img className="me-2" src={userDetails.avatarUrl} alt="avatar" style={{width: 30, height: 30, borderRadius: '50%', objectFit: 'cover'}} />
                        <div className="bold fs-5">{userDetails.firstName}</div>
                        <i class="bi bi-caret-down-fill ms-2 caret"></i>
                    </Card>
                </div>
                :
                <div className="pointer" style={{width: 250, overflow: 'hidden'}}>
                    <Card className="d-flex align-items-center px-2 pt-3 pb-2">
                        <i class="bi bi-caret-up-fill ms-2 caret" style={{position: 'absolute', right: 10, top: 5}}></i>
                        <div className="d-flex justify-content-center align-items-center">
                            <img className="me-2" src={userDetails.avatarUrl} alt="avatar" style={{width: 50, height: 50, borderRadius: '50%', objectFit: 'cover'}} />
                        </div>
                        <div className="d-flex">
                            <div className="bold fs-4">{userDetails.firstName}</div>
                            <div className="bold fs-4 ms-2">{userDetails.lastName}</div>
                        </div>
                        <div>
                            <div className="bold fs-6 ms-2">Email: {userDetails.email}</div>
                            <div className="bold fs-6 ms-2">Contact: {userDetails.phoneNumber}</div>
                            <div className="bold fs-6 ms-2">Country: {userDetails.country}</div>
                            {/* <div className="bold fs-6 ms-2">Company: {userDetails.company}</div> */}
                            <div className="bold fs-6 ms-2">Verified: {`${userDetails.isVerified}`}</div>
                        </div>
                    </Card>
                </div>
            }
        </div>
    )
}

export default UserMain