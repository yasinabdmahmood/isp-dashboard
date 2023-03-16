import React from 'react';
import { useParams } from 'react-router';

function EditClient() {
    const {id} = useParams()
    return (
        <div>
          <h1>Edit client {id}</h1>
        </div>
    );
}

export default EditClient;