async function createModal(title, body, yes_text, yes_bttype, yes_function, no_text = "Close", no_bttype = "secondary") {
    var button = document.createElement("button");
    button.classList.add("d-none");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#exampleModal");
    var modal = '<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="staticBackdropLabel">' + title + '</h5><button type="button" class="btn-close btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body">' + body + '</div><div class="modal-footer" id="modal-buttons"><button type="button" class="btn btn-' + no_bttype + '" data-bs-dismiss="modal">' + no_text + '</button></div></div></div></div>';
    $('#modals')[0].innerHTML = modal;
    var ok_btn = document.createElement("button");
    ok_btn.classList.add("btn", "btn-" + yes_bttype);
    ok_btn.setAttribute("type", "button");
    //ok_btn.setAttribute("data-bs-dismiss", "modal");
    ok_btn.innerHTML = yes_text;
    ok_btn.addEventListener("click", async function() {
        ok_btn.innerHTML = '<div class="spinner-border" role="status" style="height: 1.5rem;width: 1.5rem;"><span class="visually-hidden">Loading...</span></div>';
        ok_btn.setAttribute("disabled", "");
        await yes_function();
        $('#exampleModal').modal('hide');
    });
    $('#modal-buttons')[0].appendChild(ok_btn);
    $('#modals')[0].appendChild(button);
    await button.click();
    button.remove();
    $("#exampleModal").on("hidden.bs.modal", function() {
        $('#exampleModal')[0].remove();
    });
}

var toastid = 0;
async function createToast(body, background, duration = 1000, canremove = true) {
    if (duration < 0) duration = 0;
    var toast = document.createElement("div");
    toast.id = "toast-" + toastid;
    toastid++;
    toast.classList.add("toast", "align-items-center", "bg-" + background, "border-0", "user-select-none");
    background == "light" ? toast.classList.add("text-dark") : toast.classList.add("text-white");
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assetive");
    toast.setAttribute("aria-atomic", "true");
    toast.style.transition = "opacity 0.2s";
    toast.innerHTML = '<div class="d-flex"><div class="toast-body">' + body.replace("{{toastid}}", toastid - 1) + '</div>' + (canremove == true ? '<button type="button" onclick="removeToast(this.parentElement.parentElement.id, true)" class="btn-close ' + (background == "light" ? "btn-close" : "btn-close-white") + ' me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' : '') + '</div>';
    await $('#toasts')[0].appendChild(toast);
    if (duration > 0) {
        setTimeout(() => {
            removeToast(toast.id, true);
        }, duration);
    }
    toast.classList.add("show");
    return toastid - 1;
}

async function updateToast(id, body, background = null, duration = null) {
    var toast = await document.getElementById("toast-" + id);
    if (toast == null) console.log(id, toast);
    toast.querySelector("div.toast-body").innerHTML = body;
    if (background != null && !toast.classList.contains("bg-" + background)) {
        var classes = JSON.parse(JSON.stringify(toast.classList));
        for (key in classes) {
            if (classes.hasOwnProperty(key)) {
                if (classes[key].startsWith("bg-")) {
                    toast.classList.remove(classes[key]);
                }
            }
        }
        toast.classList.add("bg-" + background);
    }
    if (duration != null && typeof duration == "number" && duration > 0) {
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => { toast.remove(); }, 200);
        }, duration);
    }
}

async function removeToast(id, fullId = false) {
    var toast = await document.getElementById((fullId == false ? "toast-" : "") + id);
    toast.classList.remove("show");
    setTimeout(() => { toast.remove(); }, 200);
}