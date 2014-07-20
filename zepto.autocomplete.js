;
(function ($) {
    var ZeptoAutocomplete = {
        limit: 2,
        data: '',
        init: function (limit, data) {
            this.limit = limit;
            this.data = data;
        },
        autocomplete: function (options) {
            if (!ZeptoAutocomplete._isDataSourceDefined(options)) {
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
        _isDataSourceDefined: function (options) {
            return typeof options !== "undefined" &&
                typeof options.datasource !== "undefined" &&
                options.datasource !== "" &&
                options.datasource;
        },
        _isRemote: function (options) {
            return options.datasource === 'remote' && typeof options.data !== "undefined" && options.data;
        },
        _isLocal: function (options) {
            return options.datasource === 'local' && typeof options.data !== "undefined" && $.isArray(options.data);
        },
        _initLocal: function (limit, data) {
            ZeptoAutocomplete.init(limit, data);
            var searchTextField = $('.autocomplete-input');
            searchTextField.bind("input paste keyup", function () {
                var message = searchTextField.val();
                if (!ZeptoAutocomplete._isWithinLimit(message)) {
                    ZeptoAutocomplete._clearResults();
                    return;
                }
                ZeptoAutocomplete._successHandler(data.filter(function (i) {
                    return i.indexOf(message) > -1;
                }));
            });
        },
        _initRemote: function (limit, data) {
            ZeptoAutocomplete.init(limit, data);
            var searchTextField = $('.autocomplete-input');
            searchTextField.bind("keyup", $.proxy(ZeptoAutocomplete._handleSearch, this));
        },
        _isWithinLimit: function (message) {
            return message !== undefined && message.length > ZeptoAutocomplete.limit;
        },
        _handleSearch: function (evt) {
            var message = $('.autocomplete-input').val();
            var url = ZeptoAutocomplete.data + message;
            console.log(url);
            if (!ZeptoAutocomplete._isWithinLimit(message)) {
                ZeptoAutocomplete._clearResults();
                return;
            }
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                success: ZeptoAutocomplete._successHandler
            });
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
        },
        _clearResults: function () {
            var resultContainer = $('.auto-complete-result');
            resultContainer.html('');
            resultContainer.hide();
        }
    };
    $.extend($.fn, ZeptoAutocomplete);
})(Zepto);