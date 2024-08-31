import React from 'react';
import { Contact } from 'types/ContactTypes';

const Profile: React.FC<{
    info: Contact
}> = ({ info }) => {
    return <div className="app-person-profile-header">
        <div className="app-person-profile-photo" style={{ backgroundImage: 'url(avatar.png)' }}></div>
        <h2>{info.name}</h2>
        <div className="app-person-profile-department">
            {info?.department}
        </div>
        <div className="app-person-profile-phone-number">
            {info?.phoneNumber}
        </div>
        <div className="app-person-profile-phone-number">
            <a href="mailto:adam.wright@mycompany.com">{info?.email}</a>
        </div>
    </div>;
}

export default Profile;