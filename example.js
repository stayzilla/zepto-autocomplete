$(document).ready(function () {
    console.log('doc ready');
    var remoteOptions = {
      limit : 2,
      datasource : 'remote',
      data : 'example.json'
    };
    $.fn.autocomplete(remoteOptions);
    var autocompleteData = ["london", "paris", "stockholm", "delhi", "madrid", "madurai", "madras"];
    var localOptions = {
        limit : 2,
        datasource : 'local',
        data : autocompleteData
    };
//    $.fn.autocomplete(localOptions);
});