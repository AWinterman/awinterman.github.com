---
title: Plot Matrics 
subtitle: Visualizing corelations between apples and oranges
layout: post-graph-matrix
---

A matrix of graphs is a table in which each cell is a graph. The labels on the
horizontal and verticle edges of the table are, in this case, the scales which
determine the axis and layout of points in graph-space. Why is this useful?
Because it turns out you have a number of measurements for each data point, and
you want to enable the user to draw correlations between more than two of them. 

To give a concrete example, Urban Airship sends pushes over time. For any given
time interval, we know the number of pushes sent and the total number of times
the app was opened. We also have a metric called "average time in app." If the
time in app measured 40 seconds, that would mean that of users who had the app
open during at the time in question, the average time the app had been open for
was 40 seconds.  We [show all three metrics at the same
time](http://docs.urbanairship.com/dashboard/pushes_sent.html): average time in
app; app opens; and pushes sent. The goal is to enable users to draw
correlations between their pushes and user's behavior, thus demonstrating that
sending pushes causes more engagement, and that our clients should continue
paying us.  

Currently, we use a graph something like the following:

<div id="multiple_axes"></div>

This technique-- drawing multiple graphs on the same axis, is a common solution
for  this use case. Points on the graph correspond to one of many axes, usually
differentiated by colors or patterns. This means the graph is dense-- a lot of
information is conveyed in very little space. 

However this approach is problematic. Even if the units are the same,
super-imposing seperate graphs over the same space is hard for the user to
interpret. Unless the colors are chosen carefully, using color to differentiate
them can create challenges for the color blind, and in any event, color is a
weak signifier. Although two points appear next to each other, they represent
completely different values, and possibly even units, depending on the axis to
which they correspond. The result is a graphic which encourages the user to
ignore the value the point actually represents (since determining it is hard),
and instead compare trends across the various measurements plotted on the
graph. 

Don't use multiple axes.  If you have three dimensions to show draw three
graphs. If they share an axis, then arrange them so that that axis applies to
each graph. In other words, supposing they share the x-axis, make a column of
graphs. Each graph has a different y axis, and shares the x axis. The user can
still compare values across the different dimensions for a given value on the x
axis, but leverages position alone to determine the values a point represents.
Trend remains clear, since it's still easy to see all the graphs at once. 

Color is liberated from its over-strained role defining the units and scale for 
a point, so we're free to use it for an ordinal measurement which could, in
UA's case, describe other values about the time period in question.

<div id="little_matrix"></div>

Such a column of graphs is a specific instance of a table layout of graphs, in
which axes are defined along the edges of the table and pertain to every graph
in the row or column.  Any mouse interaction highlighting a point in one graph
also has to highlight the same point in the remaining graphs. For example, in
this example, a number of independent variables are plotted against their
dependent variables, and mouse interaction highlights the corresponding point
in all the other cells.

<div id="big_matrix"></div>

Such matrices are a better, more flexible method for displaying a
number of measurements at once. Determining correlation between two variables
is as simple as finding the right cell where the two variables are graphed.
It's still the case that author needs to [choose comparisons
carefully](http://www.tylervigen.com/), but at least once the choice is made,
the relationship (or lack there of) becomes clear.
