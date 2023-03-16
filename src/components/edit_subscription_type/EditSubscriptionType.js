import React from 'react';
import { useParams } from "react-router-dom";

function EditSubscriptionType(props) {
    const { id } = useParams();
    return (
        <div>
           <h1>Edit subscription type {id}</h1> 
        </div>
    );
}

export default EditSubscriptionType;