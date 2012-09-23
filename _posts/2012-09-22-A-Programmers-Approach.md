--- 
layout: post 
title: A Data Scientist Has Insights! 
subtitle: Why do it yourself when a computer will do it for you?
---


I love mathematics. It is austere, beautiful, rigorous and logical. It is one
of the few truly honest disciplines-- premises are defined, and deductions
follow clearly from first principles. Logic chases truth up the tree of
grammar, and ultimately we develop useful conceptual tools that enable feats of
apparent sorcery. Need to shout a message in public that only your intended
recipient can understand? We can do that. Curious if socio-economic and
religious indicators can predict political alignment? [we can do that
too](http://scott.fortmann-roe.com/docs/BiasVariance.html). 

I was also incredibly lucky to learn mathematics at Reed College, where a proof
based approach is dominant among the faculty. This is good because as a result
I was rarely asked to be a human computer. I certainly computed my fair share
of [singular value
decompositions](http://www.miislita.com/information-retrieval-tutorial/singular-value-decomposition-fast-track-tutorial.pdf)
(I think two is a fair share) in linear algebra, and path integrals in complex
analysis, but for the most part problem sets consisted of a series of proofs.

One problem with this approach is I rarely felt comfortable applying these
concepts. A friend glibly asserted that after Reed Math, he wouldn't be able to
build a bridge, but he would be able to prove a bridge satisfying the
appropriate constraints could exists in arbitrarily many dimensions. 

After a working at [Periscopic](www.periscopic.com), and scripting for about a
year, it occurred to me that mathematics classes at Reed were structured like
software libraries -- meaning we started with simple basic concepts and used
them to build more complicated ideas over the course of the class, which also
got me thinking about ways to give some classes more concrete contours
without loosing that lovely, intimately theoretical approach.


>> In a sentence, the idea is to have students build a library that implements the
concepts they learn over the course of the class. 


For example, I could imagine a linear algebra class that proceeded along much
the same lines as it did at Reed. We would start with the axioms of
a vector space: associativity, commutativity, and inverses for vector addition;
vector 0; and rules for scalar multiplication. Then, we could implement vectors
as a sublcass of, for example, Python lists. Students could test their
implementation against the axioms to demonstrate that they have indeed made
vectors over their chosen field. The teacher could provide alternate
implementations that are also consistent with the vector space axioms, or use the
standard implementation over a different field to demonstrate the flexibility
of the idea. For example, the students could design a vector space over the
field of reals, and the teacher could demonstrate that polynomials of degree
`n` are a vector space over the reals as well, by doing something as simple as
changing the `__repr__` method \[1\]  of the vector object.


Vector multiplication is a simple algorithm that the students will eventually
extend to matrix multiplication. This will provide them with easy access to
visualization software that will permit clear demonstration of the affects of
rotation or translation matrices. A brief forray into technical applications
could be made - for example [SVG
transfromations](http://www.w3.org/TR/SVG/coords.html#TransformAttribute) -
accepts a matrix which completely specifies the desired transformation. 


The students should be made to suffer through matrix inversion when they first
encounter it, and then encouraged to explore and implement any one of a variety
of matrix inversion algorithms. They should be asked to prove properties the
matrix inverse, and then use those properties to test their implementation.


Their computer processes could also be use to provide a compelling introduction
to a number of linear algebra applications. I personally found Linear Algebra
to be one of the less interesting courses I took in college, but it is
certainly the most useful - linear algebra concepts pop up all over the place -
so this subject would especially benefit from brief forays into application.

One example subject could be finding a Support Vector Machine (this would
require multivariate calculus as a prerequisite) for an interesting prediction problem.
The class could even take a [Kaggle
competition](http://www.kaggle.com/competitions) as its target, and learn the
mathematics necessary to implement logistic regression, or a
k-nearest-neighbors learning algorithm, and see how it matches up against other
competitors solutions. The cash reward could provide an extra little bump to
student's investment in the course.

It's true that repeatedly executing an algorithm by hand leads to mastery of
that algorithm, but it is also true that the interesting mathematics does not
lie in the mechanics of these concepts, but in their application to problems
that would be difficult or impossible without them, and in proving interesting
facts about these algorithms. It's unlikely that any undergraduate will ever
have to implement even a t-test by hand in a career in science or statistics.
As such, rather than learn the mechanics themselves, they should learn how to
tell a computer to do the mechanics for them. They should learn how to test the
computer's results, and how to write good, reusable code. All of these skills
will ultimately be more useful than knowing how to invert an `n x m` matrix by
hand, for example. Moreover, I think they will help the student think
conceptually about mathematics as a process, and help them see new advances in
context of old algorithms.

\[1\] the `__repr__` method determines what happens when `print` is called with
the object as an argument.
