import React from "react";
import Types from "./Types";
import getColor from "../modules/getColor";

export default function BasicData(props) {

    const spriteStyle = {
        height: '300px',
        width: '300px',
        border: '10px solid',
        borderImage: `linear-gradient(45deg, ${getColor(props.typeOne)}, ${props.typeTwo !== '' ? getColor(props.typeTwo) : getColor(props.typeOne)}) 1`,
    }

    return (
        <div className="basic-data">

            <div className="name">
                {props.name}
            </div>

            <div style={spriteStyle} className="sprite" >
                <img className="poke-image" src={props.sprite} alt={`${props.name} sprite`} />
            </div>

            <div className="type-container">
                <Types type={props.typeOne} />
                {props.typeTwo !== '' ? <Types type={props.typeTwo} /> : ''}
            </div>

            <div className="pokemon-desc">{props.desc.replace('', ' ')}</div>

            <div>
                <div className="height">Height: {props.height}</div>
                <div className="weight">Weight: {props.weight}</div>
            </div>

        </div>
    )
}