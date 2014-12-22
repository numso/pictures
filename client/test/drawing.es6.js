var d3 = require('d3');

var svg = d3.select('#picture-box').append('svg')
  .attr('width', 500)
  .attr('height', 500)
  .style('background-color', '#ccc')

svg.append('circle')
  .attr('cx', 100)
  .attr('cy', 100)
  .attr('fill', '#777')
  .attr('r', 100);
