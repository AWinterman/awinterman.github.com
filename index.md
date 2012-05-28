---
title: Hello World!
layout: default
---


#Literature is Code#
##The adventures of a curious humanist##

  <ul class="posts">
    {% for post in site.posts %}
      <li> <a href="{{ post.url }}">blog/ {{post.title}}</a></li>
    {% endfor %}
  </ul>


