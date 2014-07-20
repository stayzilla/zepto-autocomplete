;
(function ($) {
    var ZeptoAutocomplete = {
        limit: 2,
        autoCompleteURL: '',
        searchTerm: '',
        init: function (limit, autoCompleteURL) {
            var searchTextField = $('.autocomplete-input');
            this.autoCompleteURL = autoCompleteURL;
            this.searchTerm = searchTextField.data('search-key');
            this.limit = limit;
        },
        isValidDataSource: function (options) {
            return typeof options !== "undefined" &&
                typeof options.datasource !== "undefined" &&
                options.datasource !== "" &&
                options.datasource;
        },
        autocomplete: function (options) {
            if (!ZeptoAutocomplete.isValidDataSource(options)) {
                return;
            }
            if (options.datasource === 'local') {
                ZeptoAutocomplete.autoCompleteLocal(options.limit, options.data);
                return;
            }
            if (options.datasource === 'remote') {
                ZeptoAutocomplete.autoCompleteRemote(options.limit, options.data);
            }
        },
        autoCompleteRemote: function (limit, autoCompleteURL) {
            ZeptoAutocomplete.init(limit, autoCompleteURL);
            var searchTextField = $('.autocomplete-input');
            searchTextField.bind("keyup", $.proxy(ZeptoAutocomplete._handleSearch, this));
        },
        autoCompleteLocal: function (limit, data) {
            ZeptoAutocomplete.init(limit);
            var searchTextField = $('.autocomplete-input');
            searchTextField.bind("input paste keyup", function () {
                var message = searchTextField.val();
                if (!ZeptoAutocomplete._isWithinLimit(message)) {
                    ZeptoAutocomplete.clearAutoCompleteResults();
                    return;
                }
                ZeptoAutocomplete._successHandler(data.filter(function (i) {
                    return i.indexOf(message) > -1;
                }));
            });
        },
        clearAutoCompleteResults: function () {
            var resultContainer = $('.auto-complete-result');
            resultContainer.html('');
            resultContainer.hide();
        },
        _handleSearch: function (evt) {
            var message = $('.autocomplete-input').val();
            var url = ZeptoAutocomplete.autoCompleteURL + '?' + ZeptoAutocomplete.searchTerm + '=' + message;
            if (!ZeptoAutocomplete._isWithinLimit(message)) {
                ZeptoAutocomplete.clearAutoCompleteResults();
                return;
            }
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                success: ZeptoAutocomplete._successHandler
            });
        },
        _isWithinLimit: function (message) {
            return message !== undefined && message.length > ZeptoAutocomplete.limit;
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
    $.extend($.fn, ZeptoAutocomplete);
})(Zepto);
