# jQuery Animate Visible

Extremely simple jQuery plugin that pauses CSS animations on page load and plays them when the animated element appears in the viewport as a result of page load, scroll, or resize. The CSS animation itself is up to you. For example, you might use the following to have an element fade in:

~~~ css
@keyframes fade-in {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fade-in {
    animation-name: fade-in;
    animation-duration: 2s;
}
~~~

Now you can use Animate Visible to delay the animation until the animated element becomes visible:

~~~ javascript
$('.fade-in').animateVisible();
~~~

By default, the animations will only be delayed and triggered on scroll down. You can also trigger animations on scroll up by setting the `up` parameter:

~~~ javascript
$('.fade-in').animateVisible({
    up: true
});
~~~

By default, the animations will be triggered when half the element has scrolled into the viewport. You can change this behaviour using the `tolerance` parameter:

~~~ javascript
$('.fade-in').animateVisible({
    tolerance: 0.25
});
~~~

Whole number values will treated as pixel values; numbers less than one will be treated as proportions of the height of the animated element.
