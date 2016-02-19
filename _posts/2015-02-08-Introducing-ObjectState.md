---
layout: post 
title: ObjectState 
subtitle: minimal one way data binding
---


At Urban Airship, we've developed a novel approach to building our web
application. The basic underlying components are described
[here][front-end-streams], but as your web application grows in complexity, the
problem of determining the current state of the page based on the behavior of
each component becomes non-trivial. ObjectState is our solution to this
problem.

## Front end development is a lot like plumbing.

The client wants to send a push, but doesn't know how to use an API directly,
so we set up a [dynamic html5 form][upw-docs] that gives them live feedback as
they enter the specification of the push. Have they gone over the previously
restrictive iOS byte limit? Did they select an option that requires additional
input? Did they typo an iOS device identifier?  These questions have a common
characteristic: Their resolution involves updating state over time.

Our user interface is expressed in terms of [through streams][through], a
user-land utility for quickly creating [node streams][substack-streams].
Streams are an abstraction for modelling data over time-- the metaphor is that
data flows through the stream, and can be redirected via piping from one stream
to another. UI components, meaning a visual element on the screen with which
the user can interact, and the units of logic that perform validation, preview,
or submission, are all implemented in streams.  Data is piped from
network-request-making streams to transform and error handler streams, and then
into a stream which updates the user interface. User manipulation of the
interface is represented as a stream which we pipe to validation streams, and
then, should the validation succeed, a stream which issues network requests,
beginning the cycle again. We manage the flow of data from client to server and
back, and that's the job.

This can get complicated when the interface grows complex. How do you model the
state of a complicated form, like the one sending a push described above? Each
input element and selector has a corresponding stream, but, in order to
evaluate whether the push that would result from the user input is valid, we
need to aggregate all the flows of data into a single structure representing
the state of the page. Then we can validate and ultimately translate this
structure into a request against our push API.

## ObjectState: What does it do?

We accomplish this aggregation and updating via a module called ObjectState,
available on [npm][npm-objectstate]. This module's explicit purpose is to be
the single source of truth for the combined last-seen state of an arbitrary
number of streams (really event emitters, of which streams are a sub-class). 

ObjectState models state as a simple JavaScript object. ObjectState
can "listen" to a stream. Each time the stream emits data, ObjectState updates
its internal model of the state and emits it.  Clients subscribed to the
ObjectState receive a full representation of the state each time it changes. 

The main benefit of this arrangement is that it permits us to easily
encapsulate and compose asynchronous processes. Sources of data to which the
ObjectState instance subscribes need only have knowledge of their own concerns.
They don't need to know about the greater significance of the data they
represent, they merely surface it for consumption downstream. 

Modules downstream, which consume the aggregated state, can more or less ignore
the data's source. As far as they are concerned, a plain JavaScript object came
in, they did what they needed to do, whether that be simply emitting a
transformed object, updating a CSS class, or causing a re-render of the
interface. Dealing with data changing over time, with asynchronous data
sources, or with a complicated user interface are all concerns external to the
consuming stream.

How does this play into our push-sending form? Each option, toggle, or button
is modelled as a stream. An ObjectState (or a heirarchy of them, it doesn't
matter), listens to streams representing user input and updates itself
appropriately. A single module listens to the state, and applies a series of
validator functions, providing the user with near-instantaneous feedback about
the validity of their proposed push. Another module translates the state into a
[JSON API payload][api], which can be saved or sent. Each module exports a
stream, each propagates updates when the user makes a change. If external input
can impact the composition of a push (e.g. the ticking of the clock when
scheduling a push), then that too is represented as a stream to which the
ObjectState listens.

ObjectState is a light weight solution that fits well with the architecture
we've chosen for our web application-- we eschew large client side frameworks,
relying instead on a constellation of small modules and
[browserify][browserify]. Googling for "state management, user interfaces,
JavaScript" produces some interesting results, usually involving large,
monolithic client libraries, finite state machines, or the HTTP protocol. No
solution is quite so web-client oriented, or quite so simple, in the [simple
made easy][simple-made-easy] sense of the word. I would advocate using this
module if you can conveniently include node modules in your application (recall
that it relies on node streams, and hence node event emitters) and you find 
you need a strong abstraction for managing UI state. 

If you're interested in using ObjectState, check out the project from 
[github][github-objectstate], or [come work for us][careers]!

[upw-docs]: http://docs.urbanairship.com/user-guide/message-composer.html#create-a-push-notification
[substack-philosophy]: http://substack.net/how_I_write_modules
[substack-streams]: https://github.com/substack/stream-handbook#classic-streams
[through]: https://github.com/dominictarr/through
[npm-objectstate]: https://www.npmjs.org/objectstate
[github-objectstate]: https://github.com/urbanairship/objectstate
[api]: http://docs.urbanairship.com/api/ua.html
[no-mvc-post]: http://www.code-experience.com/why-you-might-not-need-mvc-with-reactjs/
[simple-made-easy]: http://www.infoq.com/presentations/Simple-Made-Easy
[browserify]: http://browserify.org/
[careers]: http://urbanairship.com/careers
[front-end-streams]: http://words.jessekeane.me/front-end-streams/
