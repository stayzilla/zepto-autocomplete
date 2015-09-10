# Zepto Autocomplete Plugin

## Autocomplete plugin for ZeptoJS

Zepto Autocomplete plugin is a micro js library (few KBs) that allows ZeptoJS users to easily plugin 'autocomplete' functionality to their text boxes, by adding a class and initializing the plugin on page load.

Datasource for the autocomplete can be a local javascript Array object or a remote GET request returning a JSON array. The text limit is customizable and all values can be passed on initialization. Styling for the results, can be customized by importing 3 styles.

## Examples
### HTML element style requirements

```bash
# HTML file containing the required DOM elements.
# `autocomplete-input` and `autocomplete-result` are the 2 expected styles for input and output respectively.

<input type="text" class="autocomplete-input">
<div class="autocomplete-result"></div>
```

### Autocompleting using a local datastore (JS Array)

```bash
# Initialize in javascript on page load with options.
# Below example is for "Local Datastore"

    $(document).ready(function () {
      var autocompleteData = ["madras","london", "paris", "stockholm", "delhi", "madrid", "madurai"];
      var localOptions = {limit: 2, datasource: 'local', data: autocompleteData};
      $.fn.autocomplete(localOptions);
      ...
      ...
    }
```

### Autocompleting using a remote datastore (JSON Array response from a URL)

```bash
# Below example is for "Remote Datastore", URL

    $(document).ready(function () {
      var remoteOptions = {limit: 2, datasource: 'remote', data: 'example.json?keyword='};
      $.fn.autocomplete(remoteOptions);
      ...
      ...
    }
```
* Example folder contains a complete working html,js and css.

### Case-sensitive matching options

```bash
# Set caseSensitive to false to enable case-insensitive matching
# Leave this option off to use the default case-sensitive matching

    $(document).ready(function () {
      var remoteOptions = {limit: 2, datasource: 'remote', data: 'example.json?keyword=', caseSensitive: false};
      $.fn.autocomplete(remoteOptions);
      ...
      ...
    }
```

### Optional show and hide functions

```bash
# Set 'show' and 'hide' options if you want to override the default $.show() and $.hide() actions 
# on the .autocomplete-result container.

    var options = {
      limit: 2, 
      datasource: 'remote', 
      data: 'example.json?keyword=', 
      show: function(){ ... },
      hide: function(){ ... }
    };

```

## Dependencies
There are no hard dependencies. Running an `npm install` will install the libraries required.

## Running Tests
You will need PhantomJS. `grunt` command will run all the tests and build the distribution.

### License
Copyright (c) 2014 http://www.stayzilla.com
Licensed under the MIT license.
