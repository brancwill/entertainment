import React from 'react';
import { Link } from 'react-router-dom';

const Sorry = () => {
    return (
        <div className="Sorry">
            <Link className="headingS back" to="../">Go Back</Link>
            <h1 className="headingL">Sorry, as this is a mock-app, there is no video to play.</h1>
            <img src="assets/noTV.svg" alt="" />
        </div>
    );
};

export default Sorry;