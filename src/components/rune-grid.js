import React, { Component } from 'react';
import Rune from "./rune";

/**
 * Component for rendering rune grid given array of items
 */
class RuneGrid extends Component {
    constructor() {
        super();
        this.state = {
            maxColumns: 4,
            maxRows: 2
        };
    }

    /**
     * Insert runes into columns for row
     * @param {int} rowIndex Index of current row
     */
    renderRunes(rowIndex) {
        var items = this.props.items;
        let columns = [];
        for (let column = 0; column < this.state.maxColumns; column++) {
            let item = items.find(e => e.row === rowIndex && e.column === column);
            if (item) {
                columns.push(
                    <Rune
                        key={column}
                        runeClass={item.className}
                        isActivated={item.isActivated}
                        canBeActivated={item.canBeActivated}
                        canBeDeactivated={item.canBeDeactivated}
                        onClick={(e) => this.props.onClick(e, item.className)}
                    />
                );
                // add path if there is another rune coming up
                if (column < this.state.maxColumns - 1) {
                    let nextRune = items.find(e => e.row == rowIndex && e.column === column+1);
                    let pathClass = "path" + ((!nextRune.isActivated) ? " deactivated" : "");
                    columns.push(
                        <div className={pathClass} key={`path-${column}`} />
                    );
                }
            }
        }
        return columns;
    }

    /**
     * Render rune grid
     */
    render() {
        var rows = [];
        for (let i = 0; i < this.state.maxRows; i++) {
            rows.push(
                <div className="row" key={`row-${i}`}>
                    <span>TALENT PATH {i+1}</span>
                    {this.renderRunes(i)}
                </div>
            )
        }

        return (
        <div className="rune-grid">
            {rows}
        </div>
        );
    }
}

export default RuneGrid;