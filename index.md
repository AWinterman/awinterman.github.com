---
title: Literature is Code
layout: default
---


#Literature is Code#

-------


<div class="about"> 
<p> Intermittent opinions from a developer with a humanist bent hailing from the
as-yet unfounded pragmatists' political party.
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

<div class=notebook>
<p> A static site generated with <a href="https://github.com/mojombo/jekyll">Jekyll</a>, and hosted for free on <a href="github.com">github</a>. Find the <a href="https://github.com/AWinterman/awinterman.github.com">source</a>.</p>
</div>


