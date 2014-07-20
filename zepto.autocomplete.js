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
        autocomplete: function (options) {
            if (!ZeptoAutocomplete._isValidDataSource(options)) {
                return;
            }
            if (ZeptoAutocomplete._isLocal(options)) {
                ZeptoAutocomplete._initLocal(options.limit, options.data);
                return;
            }
            if (ZeptoAutocomplete._isRemote(options)) {
                ZeptoAutocomplete._initRemote(options.limit, options.data);
            }
        },
        _isValidDataSource: function (options) {
            return typeof options !== "undefined" &&
                typeof options.datasource !== "undefined" &&
                options.datasource !== "" &&
                options.datasource;
        },
        _isRemote: function (options) {
            return options.datasource === 'remote';
        },
        _isLocal: function (options) {
            return options.datasource === 'local';
        },
        _initLocal: function (limit, data) {
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
        _initRemote: function (limit, autoCompleteURL) {
            ZeptoAutocomplete.init(limit, autoCompleteURL);
            var searchTextField = $('.autocomplete-input');
            searchTextField.bind("keyup", $.proxy(ZeptoAutocomplete._handleSearch, this));
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
