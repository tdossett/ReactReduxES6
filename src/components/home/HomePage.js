import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
    render() {
        return(
            <div className="jumbotron">
            <h1>Plurasight Administration</h1>
            <p>React, Redux Router in E6 for ultra-repsonsive web apps.</p>
            <Link to="about" className="btn btn-primary btn-md">Learn More</Link>
        </div>
        );
    }
}

export default HomePage;