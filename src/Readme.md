# The UI Cretion assumptions
* Taken 3 default options for the drop downs.
* We can search in the drop-downs.
* We can change the duration from the Duration selector
* Change the value the graph updates itself, no need to submit a button.

## Things to look for

* Calls to backend for ports happen only when u type atleast 3 characters, to Reduce the number of calls to back-end.
* Calls happen as you change the values.
* created components for Async select input box.
* created a resusable line-chart component (can be improved) so that we dont need to write d3 code again in case we need to resuse it.
* used some font-awesome icons to make it look good. (tried to make it look intresting)
* I ahve boortstrap to create the basic layout as well, will try to flex itself with size.