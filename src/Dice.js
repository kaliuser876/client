import React from "react";

import "./dice.css";

import blank from "./diceImages/blank.png";
import d20 from "./diceImages/d20.png";
import d12 from "./diceImages/d12.png";
import d10 from "./diceImages/d10.png";
import d8 from "./diceImages/d8.png";
import d6 from "./diceImages/d6.png";
import d4 from "./diceImages/d4.png";

function Dice(props){
    // props id is the image we are using
    let useImage = blank;
    if(props.value === 4){
        useImage = d4;
    }
    else if(props.value === 6){
        useImage = d6;
    }
    else if(props.value === 8){
        useImage = d8;
    }
    else if(props.value === 10){
        useImage = d10;
    }
    else if(props.value === 12){
        useImage = d12;
    }
    else if(props.value === 20){
        useImage = d20;
    }
    
    return(
        <div className="dice">
            <div className="dice-text">
                Value: {props.value},&nbsp; Amount: {props.amount}
            </div>
                <img src={useImage} alt="Dice Image" className="dice-image"/>
            <div className="dice-buttons">
                <button type="button" onClick={props.onAdd}>+</button>
                <button type="button" onClick={props.onSubtract}>-</button>
            </div>
        </div>

    );
}

export default Dice; // Export 