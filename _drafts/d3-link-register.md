---
layout: post
title: A d3 Link Register
subtitle: A class for adding and removing nodes from d3.layout.force() instances.
graph: graph-constructor
---

<aside> 
This is the second in a series of posts about recent modules I've made to
facilitate working with [d3js][].
</aside>

[d3js][], a framework for data visualization, lets the user do some pretty
amazing things. Among these are its support of interactive graph visualizations
(in the sense of a graph of a network, as opposed to a chart). In this age of
big data and commercial tools that manage your social network for you, graph
visualizations are a sexy ([if often ineffective][hive plot]) tools for
displaying network data. [d3js][] supports this by providing a function
[`d3.layout.force`][d3.layout.force] which can manages drawing the graph for the user.

It turns out force layouts are rather complicated: On top of managing the native
complexities of retrieving data and binding it to the DOM, the user must also
manage the event loop, and a Javascript implementation of an [incidence
list][]. This not terribly hard for the base case, but once you start
writing more copmlicated extensions, managing al this can get complicated. I've
written a module to help manage the incidince list, but before describing it I
think it's worthwhile to talk about what force layouts are, what the incidence
list is, and the challenges this choice of data structure results in.

## Force Layouts ##
A [force directed layout][] is a technique for laying a graph on a canvas in
which the positoin of each node is calculated via physical approximation-- each
node is assigned a charge, each edge between two nodes is modelled as a spring,
and then iterative numerical methods calculate the final layout of the whole
system. The user can define charge and the spring constant relative to the data
the nodes and links represent, providing opportunities for more sophisticated
data visualizations. At one point, I'm sure force
directed layouts were valuable only for their final result-- they merely
provide a programatic solution to the tedious problem of laying out the graph.
However, given the dynamic nature of the web, we can now use the same
technology to create
[playful](http://mbostock.github.io/d3/talk/20111018/collision.html),
[interactive](http://bl.ocks.org/mbostock/1062288) graph visualizations.

<aside> [This presentation](http://www.youtube.com/watch?v=3kKqroXQm0E) is a
great resource for learning about the power and flexibility of force directed
layouts. </aside>

The force layouts have three facets: The recalculation of position that happens
on every tick; interaction; and the data structures which represent the nodes
and the links. For the most part these are all static, set in stone on
initialization of the layout and then left to play out, with the exception that
the magnitude of the change in position slowly damps down over time. 

However, there are certainly cases where you'd want to these facets to change,
whether as a simple funciton of time, or in response to interaction. A 
[simple example]({{page.url}}#constructor), implemented below with the
[d3-link-register][] would be to add or remove nodes and links according to
interaction from the user.

<div id=constructor>
<p>
Click to create new nodes. Shift click to delete nodes.
</p>


</div>

Adding nodes or links is easy enough, but due to the choice of data
structure, removing nodes or links, or even checking if a node exists, is more
complicated. Even an example as simple the one takes some rather intense logic
to delete a node, lest the links which used to end or originate at it remain,
floating in space. Having an API

## Data Structure ##

The
[creators](https://github.com/mbostock/d3/graphs/contributors) of d3js eschewed the
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

A graph layout can be represented with two arrays of objects, `nodes`, which
holds data on the nodes of the graph, and `edges`, which records edges between
them. An element of the `nodes` array might look like the following:

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
successfully add the node to the graph. So long as your new node subtypes the
`Object` class, the force layout will provide values for each attribute on the
next tick, and continue to update them as the layout evolves.

The `edges` array is an [incidence list][]-- that is an array of objects, each
with the  following shape:

{% highlight javascript %}

{
    source: <reference to an element of the nodes array>
  , target: <reference to an element of the nodes array>
}

{% endhighlight %}

Initially, you can simply supply indices for the source and target-- the force
layout will updated the `edges` array with the correct element on the next tick.

There is no requirement that edges be unique-- indeed some graphs make explicit
use of the multiplicity of edges. For example a graph of a person's social
network might use multiple networks for the relationship between two people (a
person might have a spanish tutor who is also their coworker). This data
structure lends itself most directly to
[directed](https://en.wikipedia.org/wiki/Directed_graph),
[non-simple](http://mathworld.wolfram.com/SimpleGraph.html) graphs, like [this
visualization of Mobile Patent Suits](http://bl.ocks.org/mbostock/1153292), but
of course all it takes is a little bit of care or ambiguation to produce
different graph type.

<aside> If any reader has any resources comparing space and time performance of
the structures for representing a connected graph in Javascript, I'd love to
hear about it.</aside>

There is nothing wrong with using an [incidence list][], indeed it allows the
designers to avoid implementing linear algebra in Javascript for their graphing
library (although I'm sure there's at least one [library on
npm](https://npmjs.org/search?q=linear+algebra) that could provide a basis for
this functionality, if it were desirable). It is also a very flexibly data
structure, easily implemented in terms of Javascript's dynamic arrays,
facilitating easy addition of nodes and links between nodes, and support for
non-simple graphs in a natural way.

However, certain operations are more difficult. For example, removing a node
requires iterating through the incidince list and removing all instances where
either source or target attribute points to the node to be removed. Removing
edges likewise requires pairwise comparison of each element in the array, since
there is no gaurantee that edges will not be repeated multiple times in the
array. Additionally, because the `edges` array refers to nodes by reference,
the user needs to keep track of which methods cause data copy when manipulating
the links array. 

None of these are particularly difficult on their own, but as I was working on
the [second example]({{page.url}}#compare-circles) below (originally for its
own project), I found myself writing these general methods for constant time
membership tests, and addition and removal of links. Since I was writing them
anyway, I pulled these methods out into their own module, wrote
[some](https://ci.testling.com/AWinterman/d3-link-register)
[tests](https://travis-ci.org/AWinterman/d3-link-register) for
it, and tossed it up on [npm](https://npmjs.org/package/d3-link-register).

## [d3-link-register][] ##

The `d3-link-register` is a class for adding and removing nodes and links from
an incidence list and its associated nodes array. It maintains an identifier
attribute on each node (different from the index d3 provides, since the
identifier needs to persist through addition and deletion), and, when links are
added, registers them in a hash table (well really a javascript object, which
may or may not be a hash table under the hood, depending on how it is
optimized), in which the hash function is simply the concatenation of the
identifier attributes of the source and target nodes.

Maintaining a hash table permits constant time membership checks, and constant
time removal of links. This does mean that addition of nodes and links is a
little slower, since we need to make sure each node has a unique index, and we
need to compute the hash for each link. However, the main gain is not in terms
of performance (how often do you add or remove a node, really? and how often
are you trying to do this on a graph with a significant number of nodes?), but
rather in terms of convenience. Methods for adding, removing and checking for
membership, and computing the index of a link provide for a somewhat nicer
experience. The API is documented in [depth][README]. The user can specify whether
the graph is directed and if loops are allowed. There is an [open
issue](https://github.com/AWinterman/d3-link-register/issues/1) to allow
support for graphs with multiple edges between a given pair of nodes.

<div id=compare-circles></div>

[force directed layout]: http://en.wikipedia.org/wiki/Force-directed_graph_drawing 
[README]: https://github.com/AWinterman/d3-link-register/blob/master/README.md
[incidence list]: http://en.wikipedia.org/wiki/Graph_theory#List_structures 
[d3.layout.force]: https://github.com/mbostock/d3/wiki/Force-Layout
[d3-link-register]: https://github.com/AWinterman/d3-link-register
[Coulomb's law]: https://en.wikipedia.org/wiki/Coulomb's_law
[hive plot]: http://www.hiveplot.net/
[d3js]: http://d3js.org/
