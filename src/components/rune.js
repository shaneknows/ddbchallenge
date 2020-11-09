import React, { Component } from 'react';

/**
 * Component for rendering an individual rune
 */
class Rune extends Component {
    render() {
        let runeElementClass = "rune";
        let runeIconClass = this.props.runeClass;
        if (!this.props.isActivated) {
            runeElementClass += " deactivated";
            runeIconClass += " deactivated";
        }

        return (
            <div className="rune-wrapper">
                <div className={runeElementClass}>
                    <div 
                        className={runeIconClass} 
                        onClick={(e) => (this.props.canBeActivated) ? this.props.onClick(e) : 0} 
                        onContextMenu={(e) => (this.props.canBeDeactivated) ? this.props.onClick(e) : e.preventDefault()}>
                    </div>
                </div>
            </div>
        );
    }
}
export default Rune;