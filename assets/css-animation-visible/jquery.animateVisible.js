;(function ($) {
    'use strict';

    // Name and default settings
    var pluginName = 'animateVisible';
    var resized = pluginName + 'ResizeDone';
    var win = $(window);
    var timeout = null;
    var state = 'animation-play-state';

    var defaults = {
        tolerance: 0.5,
        up: false,
    };

    // Construct
    var Plugin = function (element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        // Initialize
        this.init();
    };

    // Initialize
    Plugin.prototype.init = function () {
        var _this = this;
        var item = $(_this.element);
        var tolerance = _this.settings.tolerance;

        // Pause the animation until we are sure it is visible
        item.css(state, 'paused');

        // Play the animation?
        win.on(resized, function () {
            var height = item.height();
            var offset = item.offset().top;
            var scroll = win.scrollTop();

            // If the tolerance is less than 1, assume that it is a proportion
            // of the element height and not a pixel value.
            if (_this.settings.tolerance < 1) {
                tolerance = height * _this.settings.tolerance;
            }

            // Is the element above the bottom of the viewport?
            var visible = offset + tolerance < scroll + win.height();

            // If we are checking for visibility on scroll up as well, check
            // whether the element is below the top of the viewport.
            if (_this.settings.up) {
                visible = visible && offset + tolerance > scroll;
            }

            // If the element is visible, play the animation
            if (visible) {
                item.css(state, 'running');
            }
        });
    };

    // Add method to jQuery
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, pluginName)) {
                $.data(this, pluginName, new Plugin(this, options));
            }
        });
    };

    // Trigger event when resize and scroll complete
    win.on('resize scroll', function () {
        window.clearTimeout(timeout);

        timeout = window.setTimeout(function () {
            win.trigger(resized);
        });
    });

    // Trigger event on window load
    win.on('load', function () {
        win.trigger(resized);
    });
})(jQuery);
