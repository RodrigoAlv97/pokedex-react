import React from "react";
import capitalize from "../modules/capitalize";
import getColor from "../modules/getColor";

export default function Moves(props) {

    return (

        <div>

            <div className="moves-titles">
                <div className="move-titles">Name</div>
                <div className="move-titles">Type</div>
                <div className="move-titles">Description</div>
                <div className="move-titles">Accuracy</div>
                <div className="move-titles">PP</div>
                <div className="move-titles">Power</div>
                <div className="move-titles">Class</div>
            </div>

            {props.moves.map(x => {
                const styles = {
                    backgroundColor: getColor(x.type)
                }
                return (

                    <div className="moves" key={x.name}>

                        <div className="move-name"> {capitalize(x.name).replace('-', ' ')} </div>
                        <div style={styles} className='move-type'>
                            {x.type.toUpperCase()}
                        </div>
                        <div className="move-desc"> {x.desc.replace('$effect_chance%', '')}</div>
                        <div className="move-acc"> {x.accuracy} </div>
                        <div className="move-pp"> {x.pp} </div>
                        <div className="move-power"> {x.power} </div>
                        <div className="move-class"> {capitalize(x.dmgClass)} </div>

                    </div>
                )
            })}
        </div>
    )
}