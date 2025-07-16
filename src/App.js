import React, { useState } from 'react';
import logo from './logo.svg';
import Dice from './Dice';
import './App.css';

let intialDiceSet = [
  {id: 0, value: 4, amount: 0},
  {id: 1, value: 6, amount: 0},
  {id: 2, value: 8, amount: 0},
  {id: 3, value: 10, amount: 0},
  {id: 4, value: 12, amount: 0},
  {id: 5, value: 20, amount: 0},
  ];

function App() {
  // Name the roll
  const [submited, setSubmit] = useState(false);
  const [formData, setFormData] = useState();
  const [name, setName] = useState('');
  // What type of roll is it? Damage, attack, life saving?
  const [rollType, setRollType] = useState('');
  // How many of each dice are needed
  // Order is d20, d12, d10, d8, d6, then d4
  const [dice, setDice] = useState(intialDiceSet); // Going to keep an array of all the different dice used
  // Keep track of the modifiers so we know what to add or subtract
  const [modifier, setModifer] = useState('');

  // The function that resets the form
  const handleReset = (event) => {
    setName('');
    setRollType('');
    setDice(intialDiceSet);
    setModifer('');
    setSubmit(false);
  };
  // The function that updates the name
  const handleTextChange = (event) => {
    setName(event.target.value);
  };

  // The function that updates modifier
  const handleModifierChange = (event) => {
    setModifer(event.target.value);
  };

  // The function that updates the current type
  const handleSelectionChange = (event) => {
    setRollType(event.target.value);
  };

  // Add dice to the specfic index
  function addDice(diceID){
    const newDiceSet = dice.map(die => {
      if(die.id === diceID){
        return {
          ...die,
          amount: die.amount + 1,
        }
      }
      else{
        return die;
      };
    }); 
    setDice(newDiceSet);   
}

  // Remove a die fomr the specific index. 
  const subtractDice = (diceID) => {
    const newDiceSet = dice.map(die => {
      if(die.id === diceID){
        if(die.amount > 0){
          return {
            ...die,
            amount: die.amount - 1,
          }
        }
        else{
          return die;
        }
      }
      else{
        return die;
      };
    }); 
    setDice(newDiceSet);  
  };

  // The function that is submiting the data to wills server
  const handleSubmit = (event) => {
    event.preventDefault(); // Make sure they filled in the form
    
    setFormData({ name, rollType, dice, modifier}); // The data I want to send to will's server

    // Make a post request to wills server and send the data
    console.log(JSON.stringify(formData));
    setSubmit(true);
    // Ask if the user wants to submit another form, and say thank you
  }

  return (
    <div className='background'>
    {!submited && <form onSubmit={handleSubmit} className="App">
      {/* This is the header for the page */}
      <h1>
      Jon and Wills DND form
      </h1>

      {/* This is the input for the name of the roll */}
      <div>
      <label htmlFor='myName'>Enter Name: </label>
      <input 
      type="text"
      id="myName"
      value={name}
      onChange={handleTextChange}
      placeholder='Type Name Here'
      />
      </div>

      {/* This is the dropdown box to select the type of roll */}
      <div>
        <label htmlFor='rollType'>Roll Type: </label>
        <select value={rollType} onChange={handleSelectionChange}> 
          <option value="">Select a Roll Type</option>
          <option value="attack_check">Attack Check Roll</option>
          <option value="attack_damage">Attack Damage Roll</option>
          <option value="ability">Ability check</option>
          <option value="saving">Saving Throw</option>
        </select>
      </div>
    
      {/* This is the dropdown box to select the type of roll */}
      <div className="dice-row">
        {/* Need to make a component that displays the dice, have value, and has a button that increases the count */}
        {dice.map(d => (
          <Dice id={d.id} onAdd={() => addDice(d.id)} onSubtract={() => subtractDice(d.id)} value={d.value} amount={d.amount}></Dice>
        ))}
      </div>

      {/* Allow the user to add modifiers */}
      <div>
      <label htmlFor='modifier'>Enter Modifer: </label>
      <input 
      type="text"
      id="myModifier"
      value={modifier}
      onChange={handleModifierChange}
      placeholder='Type Modifier Here'
      />
      </div>

      {/* Submit button that will send the information to will's server */}
      <div>
        <button type='submit'>Submit</button>
      </div>
    </form>
      }
      {submited && 
      <div>
        <h1>Thank you for entering the roll. Please wait while we calculate your roll.</h1>
        <button onClick={handleReset}>Another Roll</button>
        </div>}
      </div>
  );
}

export default App;
