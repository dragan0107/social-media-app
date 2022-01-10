import React from 'react';

const ProfileFriend = () => {
    return (
        <div className="single-friend">
            <img
                src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                alt=""
                className="user-friend-img"
            />
            <span className="user-friend-name">John Doe</span>
        </div>
    );
};

export default ProfileFriend;
