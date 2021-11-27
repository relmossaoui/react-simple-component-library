import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Switch from "../src/index.js";
import { VALID_DIRECTIONS } from "../../config";

let container = null;
beforeEach(() => {
  // met en place un élément DOM comme cible de rendu
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // nettoie en sortie de test
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('# test switch component', () => {
    it('test switch off state', () => {
        let onChange= jest.fn()
        act(() => {
            render( <Switch 
                checked={false} 
                color="blue"
                label="label 1"
                onChange={onChange}
            />, container)
        })

        expect(container.querySelector("[data-test-id=switch-input-test-id]").checked).toBeFalsy()
        expect(container.querySelector("[data-test-id=switch-checker-test-id]").style.getPropertyValue('--checker-bg-color')).toBe('#FFFFFF')
    
        act(() => {
            container.querySelector("[data-test-id=switch-checker-test-id]").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        })

        expect(onChange).toHaveBeenCalledWith(true); // update correctly the state
        expect(onChange).toHaveBeenCalledTimes(1); // called just one time

    })

    it('test switch on state', () => {
        let onChange= jest.fn()
        act(() => {
            render( <Switch 
                checked={true} 
                color="blue"
                label="label 1"
                onChange={onChange}
            />, container)
        })

        expect(container.querySelector("[data-test-id=switch-input-test-id]").checked).toBeTruthy()
        expect(container.querySelector("[data-test-id=switch-checker-test-id]").style.getPropertyValue('--checker-bg-color')).toBe('blue')
        
        act(() => {
            container.querySelector("[data-test-id=switch-checker-test-id]").dispatchEvent(new MouseEvent("click", { bubbles: true }));
        })

        expect(onChange).toHaveBeenCalledWith(false); // update correctly the state
        expect(onChange).toHaveBeenCalledTimes(1); // called just one time

    })

    it('test switch label and label direction', () => {
        let dir = VALID_DIRECTIONS.top;
        let label = 'label 1'
        act(() => {
            render( <Switch 
                checked={true} 
                color="blue"
                label={label}
                labelDir={dir}
            />, container)
        })
        
        expect(container.querySelector("[data-test-id=switch-container-test-id]").classList.contains('switch--label-dir-' + dir)).toBeTruthy()
        expect(container.querySelector("[data-test-id=switch-input-label-test-id]").innerHTML.trim()).toBe(label)
        
        // set an invalid direction => a default direction is used
        dir = 'invalid_dir';
        act(() => {
            render( <Switch 
                checked={true} 
                color="blue"
                label={label}
                labelDir={dir}
            />, container)
        })

        expect(container.querySelector("[data-test-id=switch-container-test-id]").classList.contains('switch--label-dir-' + VALID_DIRECTIONS.bottom)).toBeTruthy()
    })
})