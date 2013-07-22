---
layout: post
title: A d3 Link Register
subtitle: A class for adding and removing nodes from d3.layout.force() instances.
---

<aside> 
This is the second in a series of posts about recent modules I've made to
facilitate working with [d3js][].
</aside>


The [force directed layouts][] provided by [d3js][] are a powerful tool for
organizing shapes in two dimensions in a pleasing way. A force directed layout
is a technique in which position on the canvas is calculated via physical
approximation-- each node is assigned a charge, each edge between two nodes is
modelled as a spring, and then iterative numerical methods calculate the final
layout of the whole system. Charge and the spring constant can be defined based
upon values of the data, providing opportunities for more sophisticated data
visualizations. There are a few additional constants the user can set, but I'll
refer you to the [documentation][force directed layouts] for a
discussion of these.

At one point, I'm sure force directed layouts were valuable only for their
final result-- they merely provide a programatic solution to the tedious problem
of laying out the graph in a manner that was both aesthetially
pleasing and readable. Now however, via the wonders of Javascript and the web,
we can animate the process of finding this solution, and it turns out do much
more.

<aside>
[This presentation](http://www.youtube.com/watch?v=3kKqroXQm0E) is a great
resource for learning about the power and flexibility of force directed layouts
</aside>

For example, with the addition of a few event handlers to control interaction
and a few custom actions executed on each iteration, it is possible to create
[playful](http://mbostock.github.io/d3/talk/20111018/collision.html),
[interactive](http://bl.ocks.org/mbostock/1062288) graph visualizations. 

## Data Structure ##

One wrinkle when working with force directed layouts is they expected data in a
particular format. Unfortunately, d3's
[creators](https://github.com/mbostock/d3/graphs/contributors) eschewed the
[matrix](https://en.wikipedia.org/wiki/Adjacency_matrix)
[representations](https://en.wikipedia.org/wiki/Incidence_matrix) of a graph,
favoring instead an [incidence
list][] implemented in  terms of
native Javascript arrays and objects.  The format is documented in the accessor
functions for the
[nodes](https://github.com/mbostock/d3/wiki/Force-Layout#wiki-nodes) and
[edges](https://github.com/mbostock/d3/wiki/Force-Layout#wiki-links) of the
layout, but I'll go over it briefly here.

<aside>
I'm going to use [graph theory](http://en.wikipedia.org/wiki/Graph_theory)
terms wherever possible. In particular, I will always refer to the points of
the graph as "nodes", and the links between them as "edges". This differs
slightly from d3js' usage.
</aside>

The force layout maintains two arrays of objects, `nodes`, which holds data
on the nodes of the graph, and `edges`, which records edges between them. An
element of the `nodes` array might look like the following:

{% highlight javascript %}

{
    index:  <zero based index (int)>
  , x:  <current x position (float)>
  , y:  <current y position (float)>
  , px:  <previous x position (float)>
  , py:  <previous y position (float)>
  , fixed :  <lock x and y? (boolean)>
  , weight :  <count of connections to the node (int)>
}

{% endhighlight %}

Note that you do not actually need to provide any of these values to
successfully add the node to the graph. On the next tick of execution, the
force layout will provide values for each of them, and continue to update them
as the layout evolves.

The `edges` array is an [incidence list][], of which each element has the
following shape:

{% highlight javascript %}

{
    source: <reference to an element of the nodes array>
  , target: <reference to an element of the nodes array>
}

{% endhighlight %}

Initially, you can simply supply indices for the source and target-- the force
layout will updated the `edges` array with the correct element on the next tick.

<aside> If any reader has any resources comparing space and time performance of
the structures for representing a connected graph in Javascript, I'd love to
hear about it.</aside>

There is nothing wrong with this choice, indeed it allows the designers
to avoid implementing linear algebra in Javascript for their graphing library
(although I'm sure there's at least one [library on
npm](https://npmjs.org/search?q=linear+algebra) that could provide a basis
for this functionality, now). It is also a very flexibly data structure, easily
implemented in terms of Javascript's dynamic arrays, facilitating easy addition
of nodes and links between nodes, and support for non-simple graphs in a natural
way.

However, certain operations are more difficult. For example, removing a node
requires iterating through the incidince list and removing all
instances where either attribute refers to the node to be removed. Removing
edges likewise requires pairwise comparison of each and every element in the
array. Additionally, because the `edges` array refers to nodes by reference,
the user needs to keep track of which methods cause data copy rather than
passing by reference. These pain points are not severe for most applications but
I recently encountered one painful enough to make constructing a new
abstraction worth while. 

## [d3-link-register](https://github.com/AWinterman/d3-link-register) ##

What it is. 

<div class=constructor></div>
<div class=compare-circles></div>


[d3js]: http://d3js.org/
[Coulomb's law]: https://en.wikipedia.org/wiki/Coulomb's_law
[force directed layouts]: https://github.com/mbostock/d3/wiki/Force-Layout
[incidence list]: http://en.wikipedia.org/wiki/Graph_theory#List_structures 
