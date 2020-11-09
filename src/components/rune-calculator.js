import React, { Component } from 'react';
import Counter from './counter';
import RuneGrid from './rune-grid';

/**
 * Component for managing state of run grid items
 * and updating the counter when valid changes are detected
 */
class RuneCalculator extends Component {
    /**
     * Set app defaults
     */
    constructor() {
        super();
        this.state = {
            maxPoints: 6,
            pointsUsed: 0,
            rows: 2,
            gridItems: [
                { row: 0, column: 0, className: "stack", canBeActivated: true },
                { row: 0, column: 1, className: "utensils", canBeActivated: false },
                { row: 0, column: 2, className: "cake", canBeActivated: false },
                { row: 0, column: 3, className: "crown", canBeActivated: false },
                { row: 1, column: 0, className: "boat", canBeActivated: true },
                { row: 1, column: 1, className: "snorkle", canBeActivated: false },
                { row: 1, column: 2, className: "bolt", canBeActivated: false },
                { row: 1, column: 3, className: "skull", canBeActivated: false },
            ]
        };
    }

    /**
     * Render rune grid and calculator
     */
    render() {
        const points = this.state.pointsUsed;
        const maxPoints = this.state.maxPoints;
        return (
            <div className="content">
              <RuneGrid
                items={this.state.gridItems}
                onClick={(e, runeClass) => this.handleClick(e, runeClass)}
              />
              <Counter value={points} maxPoints={maxPoints} />
            </div>
          );
    }

    /**
     * Update counter when points are added/removed
     * @param {EventArgs} e Event fired
     * @param {string} runeClass Rune updated
     */
    handleClick(e, runeClass) {
        var increment = 0;
        if (e.type === 'click') {
            increment = 1;
        } else if (e.type === 'contextmenu') {
            e.preventDefault();
            increment = -1;
        } 

        // Ensure value will be in proper range after update
        var potentialVal = this.state.pointsUsed + increment;
        if (potentialVal <= this.state.maxPoints && 
            potentialVal >= 0) {
                this.updateGridItems(increment, runeClass)
                this.setState({
                    pointsUsed: potentialVal
                });
        }
    }

    /**
     * Determine what grid items to update
     * @param {int} increment Positive/Negative increment
     * @param {string} runeClass Rune updated
     */
    updateGridItems(increment, runeClass) {        
        // Shallow copy items
        let items = this.state.gridItems;
        let runeClicked = items.find(i => i.className == runeClass);
        let nextRune = items.find(i => i.column === runeClicked.column + 1 && i.row === runeClicked.row);
        let previousRune = items.find(i => i.column === runeClicked.column - 1 && i.row === runeClicked.row);

        // Update node and surrounding items
        if (increment > 0) {
            // Activate
            if (nextRune) {
                nextRune.canBeActivated = true;
            }
            if (previousRune) {
                previousRune.canBeDeactivated = false;
            }
            runeClicked.isActivated = true;
            runeClicked.canBeActivated = false;
            runeClicked.canBeDeactivated = true;
        } else {
            // Deactivate
            if (nextRune) {
                nextRune.canBeActivated = false;
            }
            if (previousRune){
                previousRune.canBeDeactivated = true;
            }
            runeClicked.isActivated = false;
            runeClicked.canBeActivated = true;
            runeClicked.canBeDeactivated = false;
        }
    }
}

export default RuneCalculator;
