import React from 'react';
import { useParams } from 'react-router-dom';

function EditSubscriptionRecord() {
    const {id} = useParams();
    return (
        <div>
            <h1>Edit Subscription Record {id} </h1>
        </div>
    );
}

export default EditSubscriptionRecord;