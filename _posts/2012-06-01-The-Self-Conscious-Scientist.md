---
layout: post
title: The Self Conscious Scientist 
subtitle: Notes from the Field. 
---

<!-- Include Image here -->

<span class="quote">'Data Scientist'</span> is an interesting title. It sounds post-modern, self-referential. Data from observation, observation from science--  the science of science's results. Given technology today, the position is well motivated and natural. There are these behemoth organizations - mercurial, corporate  scientist like <span class="quote">Google</span>, <span class="quote">Facebook</span>, and <span class="quote">Amazon </span> - literally making more observations than anyone has ever made before. Information is an asset, but data in the wild is  impenetrable, sprawling, and without grammar, full of reason, but without rhyme or rhythm; sensical but not interpretable; structured, but only for the dry, infinitely patient machines we have designed to do such things for us. Hence the demand for a new kind of scientist-- we make sense of this sound and fury.

At larger companies fielding intensive applications, data scientists are PHD statisticians with a technical understanding of the mechanisms of data storage and retrieval. The job is a mix of data management and interpretation. Data Scientists leverage the considerable deductive power of statistics and machine learning to make predictions, recognize trends, and interpret complicated phenomena with rational, reproducible methodologies which rigorously quantize uncertainty.

At [Periscopic](http://www.periscopic.com/), a small company in Portland, Oregon, the job is somewhat different. Rather than statistics, I use information visualization as my primary method of communication.  

<div class='img' style="float:none;">
	<img  class='center' src='/images/the-self-conscious-scientist/minard_napoleon.png', style="" width='800'>
<div class='caption' > "The most successful infographic ever made", depicting Napoleon's invasion of Russia. The width of the line is the size of Napolean's army. The beige part of the line is his advance (dates are annotated on the map), and the black part of the line is his retreat. Want more? go <a href="http://cartographia.wordpress.com/category/charles-joseph-minard/">here</a>. </div>
</div>

It is surprising to see how much the prototyping I do can influence our final result. The way I choose to display this information frames the future conversations we have about the project. This process itself is interesting. We do almost no statistics, although we do occasionally use [kernel density estimation](http://en.wikipedia.org/wiki/Kernel_density_estimation) to construct a curve which summarizes the data's distribution, rather we focus on a complete and honest portrayal of the data. This involves a fair bit of thought. To make a successful visualization, a number of questions need to be answered: 


<ul id="questions">
 <li > How many categories do we need to depict?</li>
 <li > Do we show the data itself? Or do we rely on summary statistics (counts, averages, ranges) to describe its character?</li>
 <li > What is the purpose of the piece-- is there a story here, or do we want to simply provide a tool for the visitor to construct their own conclusions?</li>
 <li > How numerate is the intended audience?</li>
 <li > How many orders of magnitude will we have to depict?</li>
</ul>

The answers to these questions shapes the ultimate product. When the process goes well, we make interesting, interactive web experiences that translate data into a format the user can understand, framed in a way that makes it interesting and enjoyable to explore. My role is often that of data journalist. I receive a data set, and I need to quickly produce graphic answers the questionsi.


### Follow that Mapping! ###

------

As with more traditional journalism, honesty is very important. In this context, that means that the data must pass through my hands onto the page with no more artifice than necessary. The process must be a 1:1 mapping. The same input must yield the same output, no matter  the data point or the methodology chosen. This idea is fundamental to any sort of information visualization. A deviation from it is effectively a lie. For example, examine this chart from Fox News:

<div class='img' style="float:none;">
	<img src='/images/the-self-conscious-scientist/fnc-an-20111212-markedchart.jpg', style="" >
<div class='caption'> The lie found out 
Media Matters' article on this chart can be found <a href=http://mediamatters.org/blog/201112120005>here</a>.
</div>
</div>

This is a plot of unemployment over eleven months during 2011. It cites its sources, labels its axes, and even annotates the points on the plot. This is a good thing, otherwise it would be impossible to see the issue without the outside research. <a href="http://mediamatters.org/blog/201112120005">Media Matters</a>, an organization which corrects misinformation in the media, marked up the chart to show the problem. The last point is labelled correctly, but misplaced. It should be the lowest point on the graph. The shape of the graph has been manipulated to support an exogenous narrative. 

 

###The Eye Can Be Fooled###

-------

There are other, less ostentatious ways to mislead with graphics. Our eyes are wonderful organs, our cognitive facilities capable of effortlessly solving complicated physics problems-- triangulating an object's position in three dimensions, and deducing its trajectory. Unfortunately, we do not make interactive info-sculptures, where the viewer can leverage that impressive interpretive power. We are restricted to [Flatland](http://en.wikipedia.org/wiki/Flatland), and here the eye is easy to fool.  


<div class='img' style="float:none;">
<iframe width="560" height="315" src="http://www.youtube.com/embed/hAXm0dIuyug" frameborder="0" allowfullscreen></iframe>
<div class='caption' > I bet you miss binocular vision. Welcome to Flatland!</div>
</div>


Balls roll uphill. The image draws itself. There are subtle acts of cognition that can lead us to impossible conclusions.

<div class='img' style="float:none;">
	<img src='/images/the-self-conscious-scientist/DrawingHands.jpg' >
<div class='caption' > This discussion requires at least one Escher. </div>
</div>

This is not just a curiosity resulting from the depiction of three dimensional objects in two space. It has real implications for effective data visualization, which often rely upon our ability to judge volume and draw strait lines with our mind's eye. Context is very important. Phenomena like [the contrast effect](http://en.wikipedia.org/wiki/Contrast_effect) can dramatically change our perception of identical shapes, a problem exacerbated by data spanning many orders of magnitude. The visualization doesn't need to be complicated in order to fool the eye. In fact, a [pie chart](http://www.stevefenton.co.uk/Content/Pie-Charts-Are-Bad/) is sufficient, which is not to say they can't be [used effectively](http://flowingdata.com/2012/05/19/good-use-of-pie-charts/).

Even with well established methods popular in academia, design considerations can have a large effect on how a graphic is perceived. Look at the following chart of the same unemployment data Fox News depicted above, this one made by the Bureau of Labor Services itself.

<div class='img' style="float:none;">
	<img src='/images/the-self-conscious-scientist/bls-20111212-unemploymentrate-2011.jpg' >
<div class='caption' style="width: 900px;"> No Lie, just a different aspect ratio. </div>
</div>

Apart from actually depicting the data, this chart has an aspect ratio closer to one. The data is permitted to range over much more vertical space, implying higher volatility than in Fox News' chart. This is not a lie, but it implies a much less stable situation than it would otherwise. Had Fox News used real data, but kept their aspect ratio, the two charts would still tell a different story.



### Sensible Metaphors, Mathematics, and Aesthetics ###

------


A good visualization designer must be careful to avoid these pitfalls. The designer must be aware of the eye's tendencies, and use them to her advantage. She must also recognize that any visualization is ultimately a metaphor. The closer the metaphor relates to an actual experience the viewer has had the more successful it will be. For example, examine the following:


<div class='img' style="float:none;">
	<img src='/images/the-self-conscious-scientist/Horizon.png', style="width: 860px;" >
<div class='caption' style="width: 900px;"> I feel like we are looking at a mountain range. </div>
</div>

This is a *horizon chart* pulled from Mike Bostock's [`cubism.js`](http://square.github.com/cubism/). This should be read like a traditional area chart, modulo some maximum value. Imagine that the highest value on the chart is 100. The opacity represents the number of multiples of 100 to add to the represented value. So the lightest shade is <span class="quote">`0*100 + value`</span>. The next dark shade is <span class="quote">`1*100 + value`</span>, and so on. When a region is anchored at the top of the chart, it represents negative values. I find this intuitive because the salient parts of the graph appear to be much closer to the viewer. The parts which draw the viewers eye are the parts the viewer should be paying attention to, anyway.


<div class='img' style="float:none;">
	<img src='/images/the-self-conscious-scientist/branches.jpg', style=" width: 860px;" >
<div class='caption' style="width: 900px;"> Now we actually are looking at a mountain range. </div>
</div>


The metaphor does not match exactly with our life experience, but the cognitive connections the viewer needs to make are simple. They are aided by the use of color in the graph.

Another example is this [wind chart](http://hint.fm/wind/index.html). Which depicts U.S. meteorological measurements with gently curving lines. The longer and thicker a line, the stronger the wind. To me, this looks like fur, providing a natural frame of reference. Of course, if you follow the link above, you will find charts annotated with legends, and you can watch the data change in real time.

<div class='img' style="float:none;">
	<img src='/images/the-self-conscious-scientist/wind-chart.png' >
</div>

###Coda###
-------

Information visualisation is subtle work, the issue of a curious union of honesty in motivation, mathematics in production, and aesthetics in evaluation. It relies upon visual metaphor -- these are poems, produced with rigorous fidelity to the platonic original. Make no mistake, this is literature, encoded. Literature is code.

