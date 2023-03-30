import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { editSubscriptionType, getClients, getSubscriptionTypes} from '../../redux/database/databaseReducer';
import { useParams } from "react-router-dom";

function EditSubscriptionType() {
    const { id } = useParams();
    const subscriptionType = useSelector(state => state.database.subscriptionTypes.find(subscriptionType => subscriptionType.id === parseInt(id)));
    const [category, setCategory] = useState(null);
    const [cost, setCost] = useState(null);
    const [profit, setProfit] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
      async function fetchData() {
        if(subscriptionType.length === 0){
          await dispatch(getClients());
          await dispatch(getSubscriptionTypes());
        }
      }
      fetchData();
    }, [subscriptionType.length]);
  
    useEffect(() => {
      if (subscriptionType) {
        setCategory(subscriptionType.category);
        setCost(subscriptionType.cost);
        setProfit(subscriptionType.profit);
      }
    }, [subscriptionType]);
  
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const payloadData = {
          id,category,cost,profit
      }
      dispatch(editSubscriptionType(payloadData))
      navigate('/home/subscriptionTypes')
    };
    
    if (!category || !cost || !profit) {
      return <div>Loading...</div>;
    }
  
    return (
      <>
      <h2 className='text-center m-4'>Edit SubscriptionType</h2>
      <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup>
          <Label for="category">Type</Label>
          <Input type="text" name="category" className='bg-white' id="category" required value={category} onChange={(e) => setCategory(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="cost">Price</Label>
          <Input type="number" name="cost" className='bg-white' id="cost" required value={cost} onChange={(e) => setCost(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="profit">Profit</Label>
          <Input type="number" name="profit" className='bg-white' id="profit" required value={profit} onChange={(e) => setProfit(e.target.value)} />
        </FormGroup>
        <Button color="primary" type="submit">Update Subscription Type</Button>
      </Form>
      </>  
    );
}

export default EditSubscriptionType;