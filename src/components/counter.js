import React, { Component } from 'react';

/**
 * Component for rendering the points display
 */
class Counter extends Component {
    render() {
        let pointsSpent = this.props.value;
        let totalPoints = this.props.maxPoints;
        return (
            <div className="counter-widget">
                <div className="counter">
                    {pointsSpent} / {totalPoints}     
                </div>
                <div className="tag">
                    Points Spent
                </div>
            </div>
        
        );
    }
}

export default Counter;