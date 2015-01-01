var React = require('react');
var d3 = require('d3');

var BigPicture = React.createClass({

  componentDidMount() {
    this.svg = d3.select('#picture-box').append('svg')
      .attr('width', 500)
      .attr('height', 500);

    this.svg.append('circle')
      .attr('class', 'real-circle')
      .attr('cx', 150)
      .attr('cy', 150)
      .attr('r', 50)
      .attr('fill', '#333');
  },

  render() {
    return (
      <div id="picture-box" className="picture --big">
      </div>
    );
  }

});

module.exports = BigPicture;
