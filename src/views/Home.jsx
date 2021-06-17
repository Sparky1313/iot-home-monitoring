import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
    return(
        <div>
            <p>YoU dId It! YoU sIgNeD iN!</p>
            <Link to="/kitchen">Kitchen</Link>
        </div>
    );
}