import React from 'react';
import { EDUCATION, WORK_EXPERIENCE } from '../constants/Contact';
import { WorkExperience, Education } from 'types/ContactTypes';

const CareerDetails: React.FC<{
    details?: WorkExperience[] | Education[], about: string
}> = ({ details, about }) => {
    return <div className="app-section">
        <div className="app-section-header">
            <h3>{about === EDUCATION ? EDUCATION : WORK_EXPERIENCE}</h3>
        </div>
        {details && details.length > 0 ? details.map(detail => <div className="app-section-body">
            <div className="app-history-item">
                <div className="app-history-item-dates">
                    {detail.startYear} - {detail.endYear || 'Present'}
                </div>
                <div className="app-history-item-body">
                    <div className="app-history-item-title">{detail.institution}</div>
                    {about === 'education'
                        ? (detail as Education).degree
                        : (detail as WorkExperience).title}
                </div>
            </div>
        </div>) : `No Information available to display`}
    </div>
}

export default CareerDetails;