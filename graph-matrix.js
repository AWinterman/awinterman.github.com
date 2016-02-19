var d3 = require('d3')
  , format = require('util').format

setTimeout(add)

function add() {
  var big_matrix = document.getElementById('big_matrix')
    , multiple_axes = document.getElementById('multiple_axes')
    , little_matrix = document.getElementById('little_matrix')
    , little_matrix_svg
    , multiple_axes_svg
    , big_matrix_svg

  big_matrix_svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  multiple_axes_svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  little_matrix_svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  little_matrix.appendChild(little_matrix_svg)
  multiple_axes.appendChild(multiple_axes_svg)
  big_matrix.appendChild(big_matrix_svg)

  var data = make_data(40)
    , colors = d3.scale.category10().range()

  scatter_multiple_axes(
      data
    , d3.select(multiple_axes_svg)
    , [lookup(['t0'])]
    , [d3.scale.linear()]
    , [lookup(['y0']), lookup(['y1']), lookup(['y2'])]
    , [d3.scale.linear(), d3.scale.linear(), d3.scale.linear()]
    , colors
    , 350
    , 400
    , 0
  )

  scatter_matrix(
      data
    , d3.select(little_matrix_svg)
    , [lookup(['t0'])]
    , [d3.scale.linear()]
    , [lookup(['y0']), lookup(['y1']), lookup(['y2'])]
    , [d3.scale.linear(), d3.scale.linear(), d3.scale.linear()]
    , colors
    , 150
    , 350
    , 10
  )

  var g = scatter_matrix(
      data
    , d3.select(big_matrix_svg)
    , [lookup(['t0']), lookup(['t1']), lookup(['t2'])]
    , [d3.scale.linear(), d3.scale.linear(), d3.scale.linear()]
    , [lookup(['y0']), lookup(['y1']), lookup(['y2']), lookup(['y3'])]
    , [d3.scale.linear(), d3.scale.linear(), d3.scale.linear(), d3.scale.linear()]
    , colors
    , 125
    , 150
    , 5
  )

  g.selectAll('circle')
    .on('mouseover', function(point, index) {

      g.selectAll('circle.class-' + point.index)
        .attr('r', 9)
        .style('stroke', 'white')

    })
    .on('mouseout', function(point, index) {
      var current_radius = d3.select(this).attr('r')

      g.selectAll('circle.class-' + point.index)
        .style('opacity', null)
        .style('stroke', null)
        .attr('r', 3)
    })
}

function scatter_multiple_axes(
    data
  , canvas
  , getxs
  , xscales
  , getys
  , yscales
  , colors
  , HEIGHT
  , WIDTH
  , PADDING
) {
  var transform
    , g

  g = canvas
    .style('width', (WIDTH + PADDING) + 50)
    .style('height', (HEIGHT + PADDING) + 80)
    .append('g').attr('transform', 'translate(50, 50)')

  for(var outer = 0; outer < getxs.length; ++outer) {
    for(var inner = 0; inner < getys.length; ++inner) {
      transform = format(
          'translate(%s, %s)'
        , (PADDING) * outer
        , (PADDING) * inner
      )

      var cell = g
        .append('g')
        .attr('transform', transform)

      var canvas = scatter(
          data
        , cell
        , getxs[outer]
        , xscales[outer].range([PADDING/2, WIDTH - PADDING/2])
        , getys[inner]
        , yscales[inner].range([HEIGHT - PADDING/2, PADDING/2])
        , colors[inner % colors.length]
        , !inner
        , !outer
        , HEIGHT
        , WIDTH
        , PADDING
        , inner
      )

      canvas.selectAll('.y.label').attr('y',  15 * inner)
    }
  }
}

function scatter_matrix(
    data
  , canvas
  , getxs
  , xscales
  , getys
  , yscales
  , colors
  , HEIGHT
  , WIDTH
  , PADDING
) {
  var transform
    , g

  g = canvas
    .style('width', (WIDTH + PADDING) * getxs.length + 50)
    .style('height', (HEIGHT + PADDING)* getys.length + 50)
    .append('g').attr('transform', 'translate(50, 30)')

  for(var outer = 0; outer < getxs.length; ++outer) {
    for(var inner = 0; inner < getys.length; ++inner) {
      transform = format(
          'translate(%s, %s)'
        , (WIDTH + PADDING) * outer
        , (HEIGHT + PADDING) * inner
      )

      var cell = g
        .append('g')
        .attr('transform', transform)


      var plot = scatter(
          data
        , cell
        , getxs[outer]
        , xscales[outer].range([PADDING/2, WIDTH - PADDING/2])
        , getys[inner]
        , yscales[inner].range([HEIGHT - PADDING/2, PADDING/2])
        , colors && colors[inner % colors.length]
        , !inner
        , !outer
        , HEIGHT
        , WIDTH
        , PADDING
      )

      plot
      .attr('class', format(
          'cell-%s cell-%s'
        , getxs[outer].path[0]
        , getys[inner].path[0]
      ))
    }
  }

  return g

  }

function scatter(
    data
  , canvas
  , getx
  , xscale
  , gety
  , yscale
  , color
  , draw_x_axis
  , draw_y_axis
  , height
  , width
  , padding
  , index
) {

  var xaxis
    , yaxis

  xscale
    .domain(d3.extent(data.map(getx)))
    .nice(3)

  yscale
   .domain(d3.extent(data.map(gety)))
   .nice(3)

  xaxis = d3.svg.axis()

  xaxis
    .scale(xscale)
    .orient('top')
    .ticks(3)
    .tickSize(-height + padding)
    .tickPadding(7)

  var xaxis_el = canvas.append('g')
    .attr('transform', format('translate(0, %s)', padding/2))
    .call(xaxis)

  xaxis_el.selectAll('.tick line')
    .style('stroke', color)
    .style('fill', color)

  yaxis = d3.svg.axis()

  yaxis
    .scale(yscale)
    .orient('left')
    .ticks(3)
    .tickSize(-width + padding)
    .tickPadding(8)

  var yaxis_el = canvas.append('g')
    .attr('transform', format('translate(%s, 0)', padding/2))
    .call(yaxis)

  yaxis_el.selectAll('.tick line')
    .style('stroke', color)
    .style('fill', color)

  if(draw_y_axis) {
    var text = yaxis_el.selectAll('.tick')
      .attr('class', 'y tick show')
      .style('fill', color)
      .selectAll('text')

    if(index !== undefined) {
      text.attr('y', 10 * (index - 1))
    }

    yaxis_el
      .append('text')
      .attr('transform', format('translate(-50, %s)', height/2))
      .text(gety.path[0])
      .attr('class', 'y label')
      .attr('fill', color)
  }

  if(draw_x_axis) {
    xaxis_el.selectAll('.tick').attr('class', 'tick show')

    xaxis_el
      .append('text')
      .text(getx.path[0])
      .attr('transform', format('translate(%s, -20)', width/2))
      .attr('class', 'x label')
  }

  var colorscale = d3.scale.category10().domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

  canvas.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', Math.log(Math.sqrt(width * width + height * height)) / 2)
    .attr('cx', function(d) {
      return xscale(getx(d))
    })
    .attr('cy', function(d) {
      return yscale(gety(d))
    })
    .style('fill', function(d) {
      return color || colorscale(d.class)
    })
    .attr('class', function(d) {
      return 'class-' + d.index
    })

  return canvas
}

function make_data(len) {
  var data = []
    , point
    , t1
    , t2

  for(var i = 0; i < len; ++i) {
    point = {}

    point.index = i

    point.t0 = Math.round(i + (Math.random() - 0.5 * 2))

    t1 = - (Math.random() - 0.5) * 5
    t2 = i * (Math.random() - 0.5 )

    point.t1 = t1
    point.t2 = t2

    point.y0 = point.t0 * 15 + (Math.random() - 0.5) * 16 + t1 * t1 * 10
    point.y1 = t1 * 10 + 12 * (Math.random() - 0.5)

    point.y2 = t2 * t1 + 10 + (Math.random() - 0.5) * 15 + point.y0/10
    point.y3 = t2 + (Math.random() - 0.5)

    point.y0 = point.y0/10
    point.y1 = point.y1/10
    point.y2 = point.y2 / 100

    point.class = Math.floor((i / len) * 3)

    data.push(point)
  }

  return data
}

function lookup(arr) {
  get.path = arr

  return get

  function get(obj) {
    var keys = arr.slice()
    while(keys.length) {
      var key = keys.shift()

      obj = obj[key]

      if(obj === null || obj === undefined) {
        return undefined
      }
    }

    return obj
  }
}
