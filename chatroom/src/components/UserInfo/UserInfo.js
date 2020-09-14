import React from 'react';
import { PropTypes } from 'prop-types';

// Image courtesy: http://charmscrp.wikia.com/
class UserInfo extends React.Component {
    render() {
        return (
            <div className="UserInfo">
                Welcome, {this.context.user}
            </div>
        );
    };
};

UserInfo.contextTypes = {
    user: PropTypes.string
}

export default UserInfo;
