;
(function ($) {
    var ZeptoAutoComplete = {
        limit: 3,
        autoCompleteURL: '',
        searchTerm: '',
        init: function (limit) {
            var searchTextField = $('.autocomplete-input');
            this.autoCompleteURL = searchTextField.data('source');
            this.searchTerm = searchTextField.data('search-key');
            this.limit = limit;
        },
        autoCompleteRemote: function (limit) {
            ZeptoAutoComplete.init(limit);
            var searchTextField = $('.autocomplete-input');
            searchTextField.bind("paste keyup", $.proxy(ZeptoAutoComplete._handleSearch, this));
        },
        clearAutoCompleteResults: function () {
            $('.auto-complete-result').html('');
            $('.auto-complete-result').hide();
        },
        autoCompleteLocal: function (limit, data) {
            ZeptoAutoComplete.init(limit);
            var searchTextField = $('.autocomplete-input');
            searchTextField.bind("input paste keyup", function () {
                var message = searchTextField.val();
                if (ZeptoAutoComplete._isWithinLimit(message)) {
                    ZeptoAutoComplete._successHandler(data.filter(function (i) {
                        return i.indexOf(message) > -1;
                    }));
                } else {
                    ZeptoAutoComplete.clearAutoCompleteResults();
                }
            });
        },
        _handleSearch: function (evt) {
            var message = $(evt.srcElement).val();
            var url = ZeptoAutoComplete.autoCompleteURL + '?' + ZeptoAutoComplete.searchTerm + '=' + message;
            var withinLimit = ZeptoAutoComplete._isWithinLimit(message);
            if (withinLimit) {
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'json',
                    success: ZeptoAutoComplete._successHandler
                });
            } else {
                ZeptoAutoComplete.clearAutoCompleteResults();
            }
        },
        _isWithinLimit: function (message) {
            return message !== undefined && message.length > ZeptoAutoComplete.limit;
        },
        _successHandler: function (data) {
            if (data === undefined && data.length <= 0)
                return;

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
    $.extend($.fn, ZeptoAutoComplete);
})(Zepto);
