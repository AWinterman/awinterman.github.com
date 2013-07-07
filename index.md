---
title: Literature is Code
layout: default
about: A static site generated with [Jekyll](http://jekyllrb.com/), and hosted for free on [github](github.com). Find the [source](https://github.com/AWinterman/awinterman.github.com).
---

#Literature is Code#

-------
<div class="landing-page-detail"> 
<p> Intermittent opinions from a developer with a humanist bent hailing from the
yet-unfounded pragmatists' political party.
</p>
<p>Intermittent commentary on art,
culture, maybe even technology, mixed in with observations of a personal
nature and, if you're lucky, the occasional work of fiction.
</p>
</div>


<div class="posts">
<h3>Posts</h3>
<table>
{% for post in site.posts %}
  <tr> 
        <td class=date> <span>{{ post.date | date_to_string }} </td>  <td class=postTitle><a href="{{ post.url }}">{{ post.title }}</a><td>
  </tr>
{% endfor %}
</table>
</div>

