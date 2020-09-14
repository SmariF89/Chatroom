import React from 'react';
import Header from '../Header/Header';
import InnerContainer from '../InnerContainer/InnerContainer';

class Container extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='Container'>
                <Header />
                <InnerContainer />
            </div>
        );
    };
};

export default Container;
