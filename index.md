---
title: Literature is Code
layout: default
---


#Literature is Code#

-------

###Posts###

<table class="posts">
{% for post in site.posts %}
  <tr> 
        <td class=date> <span>{{ post.date | date_to_string }} </td>  <td class=postTitle><a href="{{ post.url }}">{{ post.title }}</a><td>
  </tr>
{% endfor %}
</table>




