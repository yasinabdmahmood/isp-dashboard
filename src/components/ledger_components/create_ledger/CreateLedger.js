import React, { useEffect, useState, useReducer } from 'react';
import Autosuggest from 'react-autosuggest';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datetime';
import theme from './theme.module.scss';
import styles from './styles.module.scss';

import Reducer from '../../../redux/helpers/reducer';
const { createLedger, getCompanies, getAgents } = Reducer.asyncThunks;

const getSuggestions = (value, agents) => {
  const filterAgent = (agent) => {
    // check if the client name is within the searched text
    const condition = agent.name.toLowerCase().includes(value.toLowerCase());
    return condition ? true : false;
  }
  return agents.filter(el => filterAgent(el))
};

const getSuggestionValue = suggestion => suggestion.name;

function parseDate(dateTimeStr) {
  function padNumber(num) {
    return num.toString().padStart(2, '0');
  }
  const date = new Date(dateTimeStr);
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());

  return `${year}-${month}-${day}`;
}

function slectedCompaniesReducer(state, action) {
  let newState = null
  switch (action.type) {
    case 'setValue':
      newState = { ...state, [action.key]: action.value };
      break;
    case 'removeKey':
      newState = { ...state };
      newState = Object.keys(state).reduce((acc, key) => {
        if (key !== action.key) {
          acc[key] = newState[key];
        }
        return acc;
      }, {});
      break;
    case 'addKey':
      if (state.hasOwnProperty(action.key)) {
        newState = { ...state };
      } else {
        newState = { ...state, [action.key]: 0 }
      }
      break;
    default:
      newState = { ...state };
  }
  console.log(newState);
  return newState;
}

function CreateLedger() {
  const [suggestions, setSuggestions] = useState([]);
  const [agent, setAgent] = useState('');
  const [deposit, setDeposit] = useState(0);
  const [selectedCompanies, customDispatch] = useReducer(slectedCompaniesReducer, {});
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [date, setDate] = useState(new Date());


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const companies = useSelector(state => state.database.companies);
  const agents = useSelector(state => state.database.agents);

  useEffect(() => {
    if (companies.length === 0) {
      dispatch(getCompanies())
    }
    if (agents.length === 0) {
      dispatch(getAgents())
    }
  }, [dispatch])

  useEffect(() => {
    if (selectedCompany === null && companies.length > 0) {
      setSelectedCompany(companies[0]?.id)
    }

  }, [companies]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const agentId = agents.find(el => el.name === agent)?.id
    if (!agentId) {
      window.alert('This user does not exist')
      return;
    }

    const payloadData = {
      agent_id: parseInt(agentId),
      detail: selectedCompanies,
      date: parseDate(date),
      deposit,
    }
    console.log(payloadData)
    const response = await dispatch(createLedger(payloadData))
    if (response.type.includes('fulfilled')) {
      window.alert('The item was created successfully')
      navigate('/home/ledgers')
    } else {
      window.alert('The action failed, please try again')
    }
  };
  const renderSuggestion = (suggestion) => {
    const searchStr = agent;
    const searchChars = searchStr.toLowerCase().split("");
    const suggestionNameChars = suggestion.name.split("");

    const renderCharsWithHighlights = (chars) => {
      const result = [];
      let matchIndex = -1;
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const charToLower = char.toLowerCase();
        if (charToLower === searchChars[matchIndex + 1]) {
          matchIndex++;
          result.push(<span style={{ color: "red" }}>{char}</span>);
        } else {
          result.push(<span>{char}</span>);
        }
      }
      return result;
    };

    return (
      <div className={theme["suggestion-custom-container"]}>
        <p>{renderCharsWithHighlights(suggestionNameChars)}</p>
      </div>
    );
  };

  const onChange = (event, { newValue }) => {
    setAgent(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value, agents));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Enter Agent',
    value: agent,
    onChange,
  };

  return (
    <>
      <h2 className='text-start h4 m-4'>Create new Ledger</h2>
      <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center' >
        <FormGroup className='d-flex flex-column'>
          <Label for="client">Agent</Label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            theme={theme}
          />
        </FormGroup>

        <FormGroup>
          <Label for="deposit">deposit</Label>
          <Input type="number" name="deposit" className='bg-white' id="profit" value={deposit} onChange={(e) => setDeposit(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label for="date">Date</Label>
          <DatePicker
            id="date"
            value={date}
            onChange={(value) => setDate(value)}
            inputProps={{


              className: `bg-white ${styles.inputfield}`,
              autoComplete: 'off',
              placeholder: 'Enter date',
            }}
            dateFormat="YYYY/MM/DD"
            closeOnSelect
          />
        </FormGroup>

        {Object.keys(selectedCompanies).map((company) => {
          return (
            <FormGroup>
              <Label for={company}>{company}</Label>
              <Input type="number" name={company} className='bg-white' id="profit" value={selectedCompanies[company]} onChange={(e) => customDispatch({ type: "setValue", value: parseInt(e.target.value), key: company })} />
              <Input type="button" onClick={(e) => { e.preventDefault(); customDispatch({ type: "removeKey", key: company }) }} name={company} className='bg-danger' id="profit" value={"Delete"} />
            </FormGroup>
          )
        })}

        <Button color="primary" className='btn-sm' type="submit">Create</Button>
      </Form>
      <Form onSubmit={(e) => { e.preventDefault(); customDispatch({ type: "addKey", key: e.target.companyType.value }) }} className='d-flex flex-column align-items-center' >
        <FormGroup className='d-flex flex-column'>
          <Label for="subscription-type">Add type</Label>
          <select name="companyType" className={`bg-white`} id="subscription-type" value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
            {companies.map(company => {
              return <option value={company.name}>{company.name}</option>
            })}
          </select>
        </FormGroup>
        <Button color="primary" className='btn-sm' type="submit">Add new type</Button>
      </Form>
    </>
  );
}

export default CreateLedger;