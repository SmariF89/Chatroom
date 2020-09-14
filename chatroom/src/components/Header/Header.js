import React from 'react';
import UserInfo from '../UserInfo/UserInfo';
import PrivateMessage from '../PrivateMessage/PrivateMessage';

class Header extends React.Component {
    render() {
        return (
            <div className='Header'>
                <UserInfo />
                <PrivateMessage />
            </div>
        );
    };
};

export default Header;
