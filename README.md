# Zepto Autocomplete Plugin

## Autocomplete plugin for ZeptoJS

Zepto Autocomplete plugin is a micro js js library (few KBs) that allows ZeptoJS users to easily plugin 'autocomplete' functionality to their text boxes, by adding a class and initializing the plugin on page load.

Datasource for the autocomplete can be a local javascript Array objecty or a remote GET request returning a JSON array. The text limit is customizable and all values can be passed on initialization. Styling for the results, can be customized by importing 3 styles.

## Examples

```bash
# HTML file. Note : `autocomplete-input` is the expected style for the input field, that needs to auto-completed.
<input type="text" class="autocomplete-input" placeholder="Type any 3 letters here ...">

# Initialize in javascript on page load with options.
# Below example is for "Local Datastore"
    $(document).ready(function () {
      var autocompleteData = ["madras","london", "paris", "stockholm", "delhi", "madrid", "madurai"];
      var localOptions = {limit: 2, datasource: 'local', data: autocompleteData};
      $.fn.autocomplete(localOptions);
      ...
      ...
    }

# Below example is for "Rocal Datastore"
    $(document).ready(function () {
      var remoteOptions = {limit: 2, datasource: 'remote', data: 'example.json?keyword='};
      $.fn.autocomplete(remoteOptions);
      ...
      ...
    }
```
* Example folder contains a complete working html,js and css.

## Dependencies
There are no hard dependencies. Running an `npm install` will install the libraries required.

## Running Tests
You will need PhantomJS. `grunt` command will run all the tests and build the distribution.

### License
Copyright (c) 2014 Sriram Narasimhan
Licensed under the MIT license.