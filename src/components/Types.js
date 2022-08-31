import React from "react";
import getColor from "../modules/getColor";

export default function Types(props) {

    const styles = {
        backgroundColor: getColor(props.type)
    }

    return (
        <div style={styles} className="types">
            {props.type.toUpperCase()}
        </div>
    )
}