---
layout: post
title: So it's been a while
---

I've been kind of busy. My life lately has been traveling to and from San
Francisco to see my parents (It's somewhat incidental that it's a software
mecca), reading an excellent series of books called *[The Dagger and The
Coin](http://www.danielabraham.com/books-by-daniel-abraham/the-dagger-and-the-coin/)*,
and going blues dancing. In a few weeks, I'm going to Romania and Barcelona
with my mother, for her 50th highschool reunion.

In other news, I've been thinking a lot about time series and d3 recently. At
work I've built up a whole API that sort of sits on top of d3 and draws graphs
for you. I'm feeling increasingly 'meh' about it. The basics are as follows:

## chart drawers ##

These are litle modules which take some number (probably two, one for x and y)
of [d3-mappping](#2013-07-04-DRYing-up-D3.md) instances,
export a class with two methods: `update` and `draw`. Given an array of data,
`update` recalculates the binding between data and dom elements, adding new
ones where necessary and removing old ones. `draw` updates dom attributes on
the screen.  These  modules might draw lines to the screen for a line chart. They do
not, however, manage the range of the scale, that is still left to the user.

At the time, the API seemed like the obvious thing to do. Now I'm not sure why
these don't just implement a [`stream`
API](https://github.com/substack/stream-handbook), pipe websockets or requests
or whatever into it, and then leave it well enough
alone.

## graph ##

The graph module handles the rest of it-- it provides methods to update the
range of the chart based on dimensions you hand it, draws axes, and provides a
platform for extension. I'm currently flirting with something like a Builder
api-- you `.add` charts to it when you instantiate it, and then you pipe data
into it and it draws a full graph to the screen. In this view, tooltips are
just like any other graph type-- you draw hit areas with the data to render
into the tooltip bound to the hit area, and then add an event handler for
display.

This I feel a bit happier with, but the utility of the d3-mapping, and
basically everything except for the streaming interface, is starting to seem
more circumspect. One day maybe we'll open source these things, and you'll be
able to see what I'm talking about. Today, these are just my semi-sensical
ruminations. If there is a moral it is this, don't invent abstraction, and
certainly don't invent APIs, use old things in new ways. Maybe in a different
language, where objects document themselves, but not in javascript, not here.
