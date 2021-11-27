import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Tooltip from "../src/index.js";
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

describe('# test tooltip component', () => {
    it('test tooltip on mouse over/out', () => {
        act(() => {
            render( 
                <Tooltip title="Tooltip 1" > 
                    <input type="text" /> 
                </Tooltip>
                ,container )
        })

        // dispatch mouseover action
        act(() => {
            container.querySelector("[data-test-id=tooltip-container-test-id]").dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        })

        expect(container.querySelector("[data-test-id=tooltip-content-test-id]").style.getPropertyValue('visibility')).toBe('visible');

        // dispatch mouseout action
        act(() => {
            container.querySelector("[data-test-id=tooltip-container-test-id]").dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
        })

        expect(container.querySelector("[data-test-id=tooltip-content-test-id]").style.getPropertyValue('visibility')).toBe('hidden');

    })

    it('test tooltip content and direction', () => {
        let dir = VALID_DIRECTIONS.top;
        let title = 'title 1'
        act(() => {
            render( 
            <Tooltip 
                color="yellow"
                bgColor="red"
                title={title}
                dir={dir}
            >
                <input type="text" />
            </Tooltip>
            , container)
        })

        expect(container.querySelector("[data-test-id=tooltip-content-test-id]").classList.contains('tooltip__title--' + dir)).toBeTruthy()
        expect(container.querySelector("[data-test-id=tooltip-content-test-id]").innerHTML.trim()).toBe(title)       
    
        dir = 'invalid_dir';
        act(() => {
            render( 
            <Tooltip 
                title={title}
                dir={dir}
            >
                <input type="text" />
            </Tooltip>
            , container)
        })

        expect(container.querySelector("[data-test-id=tooltip-content-test-id]").classList.contains('tooltip__title--' + VALID_DIRECTIONS.bottom)).toBeTruthy()
    })

    it('test color && background color', () => {
        let color = 'yellow'
        let bgColor = "red"
        act(() => {
            render( 
            <Tooltip 
                color={color}
                bgColor={bgColor}
                title="title"
            >
                <input type="text" />
            </Tooltip>
            , container)
        })

        expect(container.querySelector("[data-test-id=tooltip-content-test-id]").style.getPropertyValue('--tooltip-bg-color')).toBe(bgColor)
        expect(container.querySelector("[data-test-id=tooltip-content-test-id]").style.getPropertyValue('--tooltip-color')).toBe(color)
    })
    
})