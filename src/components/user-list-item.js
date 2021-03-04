import React from 'react';
import './user-list-tem.css';

const UserListItem = ({ user, org, selectOrg }) => {
    return (
        <>
            <div className="user-list-item">
                <p className="name">{user.name}</p>
                <p onClick={()=> selectOrg(user.organizaiton)} className="company">{org}</p>
            </div>
        </>
    )
};

export default UserListItem;