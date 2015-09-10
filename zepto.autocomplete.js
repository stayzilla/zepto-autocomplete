/*!
 * ZeptoAutocomplete v0.0.1
 * Stayzilla.com
 * MIT license
 * @preserve
 */
var ZeptoAutocomplete = {
    init: function (limit, data, caseSensitive, showFunc, hideFunc) {
        this.limit = limit;
        this.data = data;
        this.remoteTimeout = 3000;
        this.resultContainer = $('.autocomplete-result');
        this.caseSensitive = typeof caseSensitive !== 'undefined' ? caseSensitive : true;
        this.showFunction = typeof showFunc == 'function' ? showFunc : function(){ resultContainer.show(); };
        this.hideFunction = typeof hideFunc == 'function' ? hideFunc : function(){ resultContainer.hide(); };
        this._setSelectionRange();
    },
    _clear: function () {
        this.limit = 2;
        this.data = '';
        this.remoteTimeout = 3000;
    },
    _setSelectionRange: function () {
        $('.autocomplete-input').click(function (event) {
            this.setSelectionRange(0, this.value.length);
        });
    },
    autocomplete: function (options) {
        this._clear();
        if (!this._isDataSourceDefined(options)) {
            return;
        }
        if (this._isLocal(options)) {
            this._initLocal(options.limit, options.data, options.caseSensitive, options.show, options.hide);
            return;
        }
        if (this._isRemote(options)) {
            this._initRemote(options.limit, options.data, options.caseSensitive, options.show, options.hide);
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
    _initLocal: function (limit, data, caseSensitive, showFunc, hideFunc) {
        this.init(limit, data, caseSensitive, showFunc, hideFunc);
        var searchTextField = $('.autocomplete-input');
        var _this = this;
        searchTextField.bind("keyup", $.proxy(this._handleLocalSearch, _this));
    },
    _initRemote: function (limit, data, caseSensitive, showFunc, hideFunc) {
        this.init(limit, data, caseSensitive, showFunc, hideFunc);
        var searchTextField = $('.autocomplete-input');
        var _this = this;
        searchTextField.bind("keyup", $.proxy(this._handleRemoteSearch, _this));
    },
    _isWithinLimit: function (message) {
        return message !== undefined && message.length > this.limit;
    },
    _handleLocalSearch: function () {
        var message = $('.autocomplete-input').val();
        if (!this._isWithinLimit(message)) {
            this._clearResults();
            return;
        }
        this._successHandler(this.data.filter(function (i) {
            if( !this.caseSensitive ) {
                return i.toLowerCase().indexOf( message.toLowerCase() ) > -1;
            } else {
                return i.indexOf( message ) > -1;
            }
            
        }));
    },
    _handleRemoteSearch: function (evt) {
        var message = $('.autocomplete-input').val();
        var url = this.data + message;
        if (!this._isWithinLimit(message)) {
            this._clearResults();
            return;
        }
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: $.proxy(this._successHandler, this),
            error: function (err) {
                console.log('Request failed to load suggestions.');
            },
            timeout: this.remoteTimeout
        });
    },
    _successHandler: function (data) {
        if (data === undefined && data.length <= 0)
            return;
        var autocompleteHTML = "<ol>";
        $.map(data, function (listItem) {
            autocompleteHTML += "<li>" + listItem + "</li>";
        });
        autocompleteHTML += "</ol>";
        this.resultContainer.html(autocompleteHTML);
        var _this = this;
        $('.autocomplete-result li').on('click', function (evt) {
            var selectedValue = $(this).text();
            $('.autocomplete-input').val(selectedValue);
            _this._clearResults();
        });
        this.showFunction();
    },
    _clearResults: function () {
        this.resultContainer.html('');
        this.hideFunction();
    }
};
(function ($) {
    $.extend($.fn, ZeptoAutocomplete);
    $.autocomplete = $.fn.autocomplete;
})(Zepto);