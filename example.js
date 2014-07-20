$(document).ready(function () {
    console.log('doc ready');
    var remoteOptions = {
      limit : 2,
      datasource : 'remote',
      data : 'example.json?keyword='
    };
    var autocompleteData = ["london", "paris", "stockholm", "delhi", "madrid", "madurai", "madras"];
    var localOptions = {
        limit : 2,
        datasource : 'local',
        data : autocompleteData
    };
    $.fn.autocomplete(remoteOptions);
//    $.fn.autocomplete(localOptions);
});
