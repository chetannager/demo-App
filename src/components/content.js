import React from 'react';
import { Link } from 'react-router-dom';

function Content() {
    return ( 
        <div>
            <Link to={{
                pathname:"/about",
                data:{
                    "name":"Chetan"
                }
                }}>About</Link>
        </div>
    )
}

export default Content;