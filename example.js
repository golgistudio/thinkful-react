var BlameCalculator = React.createClass({
    getInitialState: function() {
        return {
            valueMultiplier: 10000
        };
    },

    onFeeMultiplierChange: function(event) {
        this.setState({
            valueMultiplier: event.target.value
        });
    },

    render: function() {
        var blameTotal = 0
        React.Children.forEach(this.props.children, function(child) {
            blameTotal += parseFloat(child.props.children);
        });

        return (
            <div>
                <h2>Causes ({Math.round(blameTotal * 100)}%)</h2>
                {this.props.children}

                <h2>Fee Multiplier ({this.state.valueMultiplier})</h2>
                <input type="range" name="fee-multiplier"
                       min="10000" max="100000" step="1000"
                       value={this.state.valueMultiplier}
                       onChange={this.onFeeMultiplierChange} />

                 <h2>Total Value</h2>
                <output name="total-value">${Math.round(blameTotal * this.state.valueMultiplier)}</output>
            </div>
        );
    }
});

var Cause = React.createClass({
    render: function() {
        var barStyle = {
            width: this.props.children * 100 + '%'
        };
      
        var iconClass = 'fa fa-' + this.props.icon;

        return (
            <div>
                <div>
                    <i className={iconClass}></i>
                    {this.props.name} ({this.props.children * 100}%)
                </div>
                <div>
                    <div className="bar" style={barStyle}>
                    </div>
                </div>
            </div>
        )
    }
});

window.addEventListener('DOMContentLoaded', function() {
    React.render(
        <BlameCalculator>
            <Cause name="Sunshine" icon="sun-o">0.15</Cause>
            <Cause name="Moonlight" icon="moon-o">0.2</Cause>
            <Cause name="Good Times" icon="glass">0.1</Cause>
            <Cause name="Boogieing" icon="music">0.05</Cause>
        </BlameCalculator>,
        document.body
    );
});



