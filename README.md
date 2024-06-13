#view project at:https://xahmadraza.github.io/coffee_buzz_haven/

##Learning

1. setting min-height:100vh on parent and setting height:100% on child wont give the child 100% height on parent because the min-height on the parent is not fixed this is same if we even add min-height:100vh; and height:100%. On the other hand, if you give the parent a fixed height instead of min-height, then the child will reliably take up 100% of the parent's height, regardless of the content, because the parent's height is fixed and not variable based on the content or viewport size."

2. We cannot set fixed position parent element on top of child parent as z-index wont work since position:fixed element are relative to the viewport and not to some container
