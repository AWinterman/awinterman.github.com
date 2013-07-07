var Mapping = require("d3-mapping")
  , d3 = require("d3")
  , w = require("wrappers")

var margin = {top: 0, right: 0, bottom: 0, left: 0}
  var container = d3.select(".graph")
  container.append("svg").append("g").append("path")

  console.log(container)

function draw(data, container) {
  var height = container.style("height").slice(0,-2) - margin.left - margin.right
    , width = container.style("width").slice(0,-2) - margin.top - margin.bottom

  container.select("g").attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = new Mapping(d3.time.scale(), function(d){return d3.time.format("%d-%b-%y").parse(d.date)})
  var y = new Mapping(d3.scale.linear(), function(d){return +d.close})

  x.range([0, width]);
  y.range([height, 0]);


  var area = d3.svg.area()
      .x(x.place)
      .y0(height)
      .y1( y.place);

  // Compute the domains: 
  x.compute_domain(data);

  y.compute_domain(data);

  // but we actually want the y.domain to range to zero.
  y.min(0)

  // Drawing the graph.
  container.select("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area);

  }

d3.csv( "/data/timeseries-data.tsv", function(data) {
  draw(data, container)
  window.onresize = w.debounce(function() { 
     draw(data, container) 
  }, 20, true)
});

