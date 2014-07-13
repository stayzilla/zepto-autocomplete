$(document).ready(function () {
    console.log('doc ready');
//    $.fn.autoCompleteRemote(2);
    $.fn.autoCompleteLocal(2, ["london", "paris", "stockholm", "delhi","madrid","madurai","madras"]);
});