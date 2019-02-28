# Tocalabs UI test

Well this is my 2.5hr stab at it.

## What I have done so far:
* Created an app which stores nodes in state;
* Nodes are also stored in localstorage and are retrieved on mount
* 2 types of node can be created
* Nodes are draggable within an SVG. I know the spec said **canvas** but I interpretted that as a general term rather than specifically relating to the HTML element. This is because I have little experience with canvas, but a fair amount with SVG. Play to your strengths and all that.
* Nodes have connections that connect them to one another.
* *Activity* type nodes can connect to one other node.
* *Decision* type nodes have 2 connections ('yes' and 'no') so therefore can connect to 2 types.
* I have added some basic styling to aid layout and visual differentiation

## Things I would have liked to do but didn't have time:
* Some sort of drag and drop interface for making the connections
* Make it **much** prettier
* Look at using redux. I didn't and regretted it later in the build. I don't have a great deal of experience with redux (which is why I didn't use it), but it definitely would have made some of the event handling much easier.
* Refactored the functions that build the connections - it's horrendously inefficient, but it's what I could manage to do in the time.
* Maybe rebuild it in Vue? Only half joking.
