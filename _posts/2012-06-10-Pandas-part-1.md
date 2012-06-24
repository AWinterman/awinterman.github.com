---
layout: post
title: Introduction to Pandas, Part 1.
subtitle: Wetting your feet. 
---

Pandas is a relatively new python package for data analysis that offers to combine some of the convenience of `R` with the beauty, concision, and good design characteristic of the `python`. Python is a much nicer language to write, and often boasts significant performance advantages over R. R has the advantage of a large user base of people doing statistical computing. There are many useful packages providing very advanced functionality. If a statistician wants to do it, there's almost certainly an R package that implements it. 

Until now R has also had more sophisticated data structures for statistical computation. It supports high dimensional matrices, heterogenious matrix like objects called data frames, heterogenious arrays (lists), and homogenious arrays (vectors). Pandas ports at least some of these to python, and also implements quite a bit of advanced functionality - e.g. table joins, split-apply-combine loops, etc. So I've been interested in learning Pandas for a while, especially after reading the [white paper](http://www.scribd.com/doc/71048089/pandas-a-Foundational-Python-Library-for-Data-Analysis-and-Statistics). 

So I'm going to start exploring. Usually, tutorials are written by people who already understand the material. They often forget facets of the learning process, which though challenging are not particularly interesting to talk about. I think that bloggin my exploratory process could be very helpful to somebody in the same position I am in. If you make it through this post, I'd love to hear your thoughts. Tweet me @andywinterman, or just [email me](andywinterman@gmail.com). Eventually I'll implement comments here, I swear, but not today! 


###The question: Do stocks regress to the mean?###

We need a real world application to motivate our exploration. After all one doesn't do complicated data analysis just because one can - so let's ask an interesting question, and start going about answering it.

One of the more interesting things I learned during my short lived career as a biostatitics student was that measurements of a population trend toward the mean. This is partly a consequence of the definition of the mean, as a summary statistic, but it's not obvious that this tendence should hold. However, if this tendency does hold, then it could be a useful guide for the placing of bets in the market.
	
In particular, does it hold that stock prices regress to some mean. Would placing one day bets that a stock will regress towards the market average be a good investment strategy? How about 1 day bets that a stcok regresses towards its historical mean?
	
###Getting and characterizing the data###
	
For what follows, you'll need pandas (use `pip install pandas`. You also need a few other libraries (notably `matplotlib` for plotting.). I think you can get most of them using `pip install <LIBRARY-NAME>`, but your mileage may vary depending on your setup. Installing packages can sometimes be an unreasonable pain in the ass, especially if you haven't done it much before, so budget time accordingly.
	
Let's get started.
{% highlight py %}

import pandas
import dateutil
import matplotlib.pyplot as plt
from pprint import PrettyPrinter
pp = PrettyPrinter(indent = 4).pprint

{% endhighlight %}


Apart from pandas, we've grabbed a plotting library, some utilities for handling dates, and pretty printing for nicely formatted output. 

Have a look at the top level pandas methods:

{% highlight py %}

pp(dir(pandas))

{% endhighlight %}
	
Our data set is a time series (1970-2010), so I expect to familiarize myself with `pandas.timeseries` or `pandas.TimeSeries`.
	
The data set is divided into sectinos by the first letter of the stock ticker.  let's just start with the A\* data.

{% highlight py %}
file_path = "StockData/AMEX/AMEX_daily_prices_A.csv"
data = pandas.read_csv(file_path, converters ={'date':dateutil.parser.parse})
{% endhighlight %}


This reads the csv, and also parses the column named 'date' as a date, using a parser from the `dateutil` package.
	
This creates a pandas Data Frame
Check it out!
	
{% highlight pycon %}
>>> data	
<class 'pandas.core.frame.DataFrame'>
Int64Index: 109443 entries, 0 to 109442
Data columns:
exchange                 109443  non-null values
stock_symbol             109443  non-null values
date                     109443  non-null values
stock_price_open         109443  non-null values
stock_price_high         109443  non-null values
stock_price_low          109443  non-null values
stock_price_close        109443  non-null values
stock_volume             109443  non-null values
stock_price_adj_close    109443  non-null values
dtypes: float64(5), int64(1), object(3)
{% endhighlight %}

Unlike R data objects, calling the data-frame doesn't bite. Instead of streaming however many thousands of rows into `stdout`, calling the object tells us useful summary information about it, along with its class. This is snazzy, and very helpful for interactive data explorations. If you do want to look at a few values, you can call `data.values`. In the present case, this is also rather friendly:


{% highlight py %}
>>> data.values
array([[AMEX, AIP, 2010-02-08 00:00:00, ..., 78.8, 200, 78.8],
	   [AMEX, AIP, 2010-02-05 00:00:00, ..., 76.2, 700, 76.2],
	   [AMEX, AIP, 2010-02-04 00:00:00, ..., 77.71, 200, 77.71],
	   ..., 
	   [AMEX, AFO, 2007-05-02 00:00:00, ..., 10.0, 0, 10.0],
	   [AMEX, AFO, 2007-05-01 00:00:00, ..., 10.0, 17000, 10.0],
	   [AMEX, AFO, 2007-04-30 00:00:00, ..., 10.0, 100, 10.0]], dtype=object)

{% endhighlight %}

So now that we've got a dataframe object, my first action is generally to poke at it, and see what it can do:

{% highlight py %}

pp(dir(data))

{% endhighlight %}

This is a little dizzying. For now, rather than try to answer the big question posed at the top, let's just examine some characteristics of the data to familiarize ourselves with a few methods.

###**Pet Question:** How has the number of A\* Companies change over time?###

One of the things that Pandas makes really easy is the split-apply-combine process. I first encountered this with Hadley Wickham's `plyr` package. The basic idea is you divide up the data based on a variable of interest, apply some function to it which either summarizes or transforms the data, and then recombine the results into a new data object.

For example, we'll eventually want to run an analysis on each stock over time. 	We'd call:


{% highlight py %}

stocks = data.groupby('stock_symbol', axis = 0)

{% endhighlight %}

This "encapsulates the information for how to split up the data," but doesn't actually do the split. If your interested in more detail, see [here](http://pandas.sourceforge.net/groupby.html). The `axis` argument specifies whether to do grouping on the rows, the columns, or other dimensions in the case of higher dimensional objects.

let's find out how many stocks are available to us we at any given time.

{% highlight py %}
obspertime = data.groupby('date',axis =0).aggregate(len) 
{% endhighlight %}

This does two things. First it says subsection the data by it's date. Then, for each unique date, it gets the length of the associated subsection. Or at least that's what I hope I'm doing. Let's have a look.

{% highlight py %}

print obspertime
	
{% endhighlight %}

looks like we have the same number of columns as before. It looks to me like my aggregate function was applied down each column. Let's check if they're all equal.

Indexing in Pands is done using the `.ix` attribute. This indexes in a familiar way to R users. For example `obspertime.ix[0,0]` will pick out the 0-th element from the 0-th row. If you only hand it one index, it will pick out the row you specify (0 based indexing). I want to check equality across columns, and I want to do this quick and dirty. I have no doubt that there is a more panda-monian way to accomplish this, but for now this will do.
	
We're going to compare every column to the first column, and save the results
in a variable called `columns`.
	
{% highlight py %}

equals_first = [] 
i = 1 
#We will compare each entry to the first entry, so skip it.
while 1:
	try:
		#When you ask for equality between `pandas` series, 
		#it compares elementwise. when the series are of equal 
		#length, it returns a new series with the results of the 
		#comparison. I want to know if the whole column is equal 
		#to the first one:  
		isEqual = all(obspertime.ix[:,i] == obspertime.ix[:,0])
		columns.append(isEqual)
		i += 1
	except IndexError:
		break

{% endhighlight %}

`all(equals_first)` returns true. So all the columns are equal. Great! This means that the `.aggregate` method applied
its argument to each column. Ok, so let's pick a column
	
{% highlight py %}

obspertime = obspertime.ix[:, 0]
	
{% endhighlight %}

Once again, we can take advantage of pandas smart natural print behavior.

{% highlight py %}

obspertime
dir(obspertime)

{% endhighlight %}
	
I notice that:

{% highlight py %}

	'plot' in dir(obspertime)

{% endhighlight %}

returns `True`
	
Let's see what it does!

<div>
{% highlight py %}
#Plotting:
obspertime.plot() 
#Asking matplotlib to print the thing.
plt.show() 
{% endhighlight %}
</div>

<div class='img' style="float:none;">
	<img src="/images/pandas-intro/DailyA.jpg", style="opacity: 0.85;">
</div>

Yuk!
	
Looks like there's a lot of small interval fluctuation in the early days of the time series. This makes the plot hard to read, and obscures the trend. Let's identify a rough period for the fluctuation.
	
Let's start by having a look at 1991. At some point, probably during the aggregate step, date became an index. This means we can use it to subset our data without recourse to `.ix`. We simply need to specify a start date and an end date.


{% highlight py %}
	
	#Setting start and end dates
	start = pandas.datetime(year = 1991, month = 1, day = 1)
	end = pandas.datetime(year = 1992, month = 1, day = 1)

	#Picking out the slice and plotting.
	obspertime.ix[start:end].plot()
	plt.show()

{% endhighlight %}

<div class='img' style="float:none;">
	<img src="/images/pandas-intro/1991Daily.jpg", style="opacity: 0.85;">
</div>


There is still a lot of noise. It looks like the interval of fluctuation is sub-monthly, so let's look at a single month, how about January:

{% highlight py %}
jan91 = obspertime.ix[start:pandas.datetime(year = 1991, month=2, day = 1)]
jan91.plot(); plt.show()
{% endhighlight %}
	
<div class='img' style="float:none;">
	<img src="/images/pandas-intro/Jan1991Daily.jpg", style="opacity: 0.85;">
</div>

It looks like we actually do have some fairly dramatic variation day to day.
I think it's appropriate to calculate monthly summaries in this case, 
So we have to do some split apply combine logic.
	
Following instructions [here](http://pandas.sourceforge.net/timeseries.html):

{% highlight py %}
monthly = pandas.DateRange(obspertime.index.min()
						  , obspertime.index.max()
						  , offset = pandas.datetools.MonthEnd())
grouped = obspertime.groupby(monthly.asof)		

month_means = grouped.mean()
month_means.plot(); plt.show()
{% endhighlight %}

<div class='img' style="float:none;">
	<img src="/images/pandas-intro/MonthlyAveragesACounts.jpg", style="opacity: 0.85;">
</div>

Unlike the previous graph, this provides a readable summary of the trend. Were I to prepare a report on these stocks, this is the graphs I would use.

I feel like my feet are wet, this is a good first few steps with pandas. We'll do some heavier lifting next time.


	
	
	
	
	
	
	
