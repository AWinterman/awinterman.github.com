---
title: Literature is Code
layout: default
---


#Literature is Code#

-------

###Posts###



<ul class="posts">
{% for post in site.posts %}
  <li> <span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>

------

###Carravagio###

<img src="http://upload.wikimedia.org/wikipedia/en/c/cc/Caravaggio_incredulity.jpg" class = resize>

------
