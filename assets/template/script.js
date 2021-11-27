$('.show-up').animateVisible({ up: true });
$('.show-up-small').animateVisible({ up: true });
$('.show-down').animateVisible({ up: true });

[...$('.show-up, .show-up-small, .show-down')].forEach(element => {
    element.classList.remove('show-end');
    element.addEventListener('animationend', () => {
        element.classList.add('show-end');
    });
});

window.onscroll = headerScroll;

function headerScroll() {
    if (window.scrollY > 0) {
        $('#header')[0].classList.remove("bg-transparent", "navbar-dark");
        $('#header')[0].classList.add("bg-light", "navbar-light", "shadow-bottom");
        $('#header .navbar-brand img')[0].src = "/assets/images/bootstrap-logo.svg";
        $('#nav-separator')[0].classList.remove("top");
    } else {
        $('#header')[0].classList.add("bg-transparent", "navbar-dark");
        $('#header')[0].classList.remove("bg-light", "navbar-light", "shadow-bottom");
        $('#header .navbar-brand img')[0].src = "/assets/images/bootstrap-logo-white.svg";
        $('#nav-separator')[0].classList.add("top");
    }
}

$('a[href^="\#"]').on("click", event => {
    event.preventDefault();
    if (event.target.hash == "") return window.scrollTo({ top: 0 });
    else if (!event.target.hash.match(/^#[A-Z]+$/ig)) return;
    $(event.target.hash)[0].scrollIntoView({ behavior: 'smooth', block: 'start' });

    if (checkParent($('#offmenu')[0], event.target)) $('#closeOffmenu').click();
});

$(document).ready(function() {
    window.innerWidth <= 768 ? $(document.body).scrollspy({ target: ".scrollspy2" }) : $(document.body).scrollspy({ target: ".scrollspy" });
    headerScroll();

    if (window.location.hash && window.location.hash != "") {
        $(window.location.hash)[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState("", document.title, window.location.pathname);
    }
});

function sleep(ms = 100) {
    return new Promise(r => setTimeout(r, ms));
}

function checkParent(parent, child) {
    if (parent.contains(child)) return true;
    else return false;
}

$('button').on("click", event => {
    if (event.target.attributes.href && (!event.target.attributes.dtarget || event.target.attributes.dtarget.nodeValue != "_blank")) window.location.href = event.target.attributes.href.nodeValue;
    else if (event.target.attributes.href && (event.target.attributes.dtarget && event.target.attributes.dtarget.nodeValue == "_blank")) window.open(event.target.attributes.href.nodeValue);
});