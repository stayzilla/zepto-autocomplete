;
(function ($) {
    var ZeptoAutoComplete = {
        limit: 3,
        autoCompleteURL: '',
        searchTerm: '',
        autoComplete: function (limit) {
            var searchTextField = $('.autocomplete-input');
            this.autoCompleteURL = searchTextField.data('source');
            this.searchTerm = searchTextField.data('search-key');
            this.limit = limit;
            searchTextField.bind("input paste keyup", $.proxy(ZeptoAutoComplete.handleSearch, this));
        },
        handleSearch: function (evt) {
            var message = $(evt.srcElement).val();
            var url = this.autoCompleteURL + '?' + this.searchTerm + '=' + message;
            if (ZeptoAutoComplete.isWithinLimit(message, this.limit)) {
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'json',
                    success: ZeptoAutoComplete.successHandler
                });
            }
        },
        isWithinLimit: function (message, limit) {
            return message !== undefined && message.length > limit;
        },
        successHandler: function (data) {
            var resultContainer = $('.auto-complete-result');
            var autocompleteHTML = "<ol>";
            $.map(data, function (listItem) {
                autocompleteHTML += "<li>" + listItem + "</li>";
            });
            autocompleteHTML += "</ol>";
            resultContainer.html(autocompleteHTML);
            resultContainer.show();
        }
    };
    $.extend($.fn, ZeptoAutoComplete)
})(Zepto);
