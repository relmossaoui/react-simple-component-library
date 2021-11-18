import React, { useEffect, createRef } from "react";
import './style.css'

import { VALID_DIRECTIONS } from "../../config";

/**
 *
 *
 * @export
 * @param { Object } {
 *     checked,
 *     color,
 *     labelDir,
 *     label,
 *     onChange
 * }
 * @returns { React.Component }
 */
export default function ({
    checked,
    color,
    labelDir,
    label,
    onChange
}) {
    // define checker ref
    let checkerRef = createRef()

    useEffect(() => {
        let styles = `
            --checker-transation-x : ${ checked ? 'calc(100% - 2px)' : '-2px' };
            --checker-bg-color : ${ checked ? color : '#FFFFFF' };
            --checker-shadow-color : ${ checked ? color : '#b1afaf80' };
            --switch--bg-color : ${ checked ? color : '#b1afaf80' }
        `;

        // update checker styles anomation based on its state 
        checkerRef.current.setAttribute('style', styles);

    }, [ checked ])

    // validate switch label direction and set default direction
    let switchLabelDir = labelDir in VALID_DIRECTIONS ? labelDir : VALID_DIRECTIONS.bottom

    return (
        <div className="switch-container">
            <div className={ `switch switch--label-dir-${  switchLabelDir }` }>
                <label className="switch__label"> { label } </label>
                <div>
                    <div className="switch__checkbox">
                        <input 
                            readOnly
                            className="switch__input"
                            type="checkbox" 
                            checked={checked}
                        />
                        <div 
                            ref={checkerRef} 
                            onClick={() => onChange(!checked)} 
                            className="switch__checker" 
                        ></div>
                    </div>  
                </div>  
            </div>
        </div>
    )
}

