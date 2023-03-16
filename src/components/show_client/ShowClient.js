import React from 'react';
import { useParams } from 'react-router';

function ShowClient() {
    const {id} = useParams();
    return (
        <div>
           <h1>Show client {id}</h1> 
        </div>
    );
}

export default ShowClient;