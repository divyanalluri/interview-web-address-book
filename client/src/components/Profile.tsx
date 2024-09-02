import React from 'react';
import { Contact } from 'types/ContactTypes';

const Profile: React.FC<{
    info: Contact
}> = ({ info }) => {
    return <div className="d-flex app-person-profile-header">
        <img
            alt="Profile Photo"
            className="app-person-profile-photo"
            src={info.profile_photo_url ?? "avatar.png"}
            onError={(e) => {
                e.currentTarget.src = "avatar.png";
            }}></img>
        <div className='d-flex justify-content-center flex-column'>
            <h2>{info.name}</h2>
            {info?.department && <div className="app-person-profile-department">{info?.department}</div>}
            {info?.phoneNumber && <div className="app-person-profile-phone-number">{info?.phoneNumber}</div>}
            {info?.email && <div className="app-person-profile-phone-number">
                <a href={`mailto:${info.email}`}>{info?.email}</a></div>}
        </div>
    </div>;
}

export default Profile;