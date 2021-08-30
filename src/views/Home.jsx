import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
    return(
        <div>
            <Link to="/kitchen">Kitchen</Link>
        </div>
    );
}