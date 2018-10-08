import React from 'react';
import { Edit } from './icons';

const EmptyState = ({ copy, onClick }) =>
    <div className="profile-empty-state" onClick={onClick}>
        <p><Edit />&nbsp;&nbsp;{copy}</p>
    </div>

export default EmptyState;
