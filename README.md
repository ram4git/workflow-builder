# Introduction
This is a react based flowchart builder with drag and drop components.



## Keyboard / Mouse Commands

__Delete__ removes any selected items
![__Delete__](./images/rjdDelete.gif)

__Shift + Mouse Drag__ triggers a multi-selection box
![Shift + Mouse Drag](./images/mouseDrag.gif)

__Shift + Mouse Click__ selects the item (items can be multi-selected)
![Shift + Mouse Click](./images/shiftClick.gif)

__Mouse Drag__ drags the entire diagram
![Mouse Drag](./images/canvasDrag.gif)

__Mouse Wheel__ zooms the diagram in / out
![Mouse Wheel](./images/mouseWheel.gif)

__Click Link + Drag__ creates a new link point
![Click Link + Drag](./images/createPoint.gif)

__Click Node Port + Drag__ creates a new link
![Click Node Port + Drag](./images/createLink.gif)

__Ctrl or ⌘ + C__ copy any selected items; note that only links that belong to a selected source node will
be copied to the internal clipboard

__Ctrl or ⌘ + V__ paste items previously copied to the internal clipboard

__Ctrl or ⌘ + A__ select all items

__Ctrl or ⌘ + D__ deselect all items

## Disable Actions / Key Commands

The diagram widget accepts an `actions` property which is an object containing specific keys with boolean values that disable / enable the given action. If a specific key isn't passed it will be enabled by default (passing null will disable all actions).


## Special Thanks
This project is based on react-js-diagrams by ![woodenconsulting](https://github.com/woodenconsulting/react-js-diagrams)
