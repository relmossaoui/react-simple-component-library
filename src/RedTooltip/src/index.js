import React, { useState, useEffect, createRef } from "react";
import './style.css'

import { VALID_DIRECTIONS } from "../../config";

/**
 * Return a tooltip react component
 *
 * @export
 * @param { Object } {
 *     dir,
 *     bgColor,
 *     color,
 *     children,
 *     title
 * }
 * @returns { React.Component }
 */
export default function ({
    dir,
    bgColor,
    color,
    children,
    title
}) {
    // create a ref for tooltip title

    let tooltipRef = createRef()
    // define a reactive class for tooltip title tied to props updates.
    let [ tooltipClass, setTooltipClass ] = useState('');

    // update tooltip title class 
    useEffect(() => {
        // validate passed 'dir' prop and set a default direction of it's not.
        let tooltipDir = dir in VALID_DIRECTIONS ? dir : VALID_DIRECTIONS.bottom
        setTooltipClass(`tooltip__title tooltip__title--${tooltipDir}`)
    }, [ dir ]);

    // update color and background color of tooltip title
    useEffect(() => {
        let tooltipStyles = `
            --tooltip-bg-color  : ${ bgColor || 'grey' };
            --tooltip-color     : ${ color || 'white' } 
        `;

        tooltipRef.current.setAttribute('style', tooltipStyles);
    }, [ bgColor, color ])

    // set visibility && transform styles on mouse over/out to have some animations
    let setTooltipVisibility = ( isVisible = false ) => {
        tooltipRef.current.style.visibility =  isVisible ? 'visible' : 'hidden';
        tooltipRef.current.style.transform =  isVisible ? 'scale(1)' : 'scale(0.9)';
    }

    return (
        <div 
            className="tooltip__target" 
            onMouseOver={() => setTooltipVisibility(true) }
            onMouseOut={() => setTooltipVisibility() }
            data-test-id="tooltip-container-test-id"
        > 
            { children } 
            <div data-test-id="tooltip-content-test-id" ref={ tooltipRef } className={ tooltipClass } > { title } </div>
        </div>
    )
}