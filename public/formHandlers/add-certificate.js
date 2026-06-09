const appNotify = {
    el: document.getElementById('formToast'),
    iconBg: document.getElementById('toastIconBg'),
    icon: document.getElementById('toastIcon'),
    title: document.getElementById('toastTitle'),
    message: document.getElementById('toastMessage'),

    success: function (msg) {
        this.show(msg, "#10b981", "fa-check-circle", "Success");
    },

    error: function (msg) {
        this.show(msg, "#ef4444", "fa-exclamation-circle", "Error Detected");
    },

    show: function (msg, color, iconClass, titleText) {
        this.message.innerText = msg;
        this.title.innerText = titleText;
        this.iconBg.style.backgroundColor = color;
        this.el.querySelector('.border-l-4').style.borderColor = color;
        this.icon.className = `fas ${iconClass} text-white`;

        this.el.classList.remove('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => this.hide(), 5000);
    },

    hide: function () {
        this.el.classList.add('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.remove('translate-y-0', 'opacity-100');
    }
};

// Form Submission logic
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const submit_btn = document.getElementById('submit_btn') || this.querySelector('button[type="submit"]');
    const form = e.target;

    // 1. Client-Side Input Extraction
    const fullName = form.fullName.value.trim();
    const matricNumber = form.matricNumber.value.trim();
    const department = form.department.value;
    const certificateFile = form.certificateFile.files[0];

    // 2. Strict Credential Validation Checks
    if (!fullName) {
        appNotify.error("Please enter the graduate's full name.");
        return;
    }

    if (!matricNumber) {
        appNotify.error("Please provide a valid matriculation index number.");
        return;
    }

    if (!department) {
        appNotify.error("Please select or search a valid departmental domain.");
        return;
    }

    if (!certificateFile) {
        appNotify.error("Please append the digital certificate file asset.");
        return;
    }

    // 3. Construct Multipart FormData Object for File Payload Handling
    const payload = new FormData();
    payload.append('fullName', fullName);
    payload.append('matricNumber', matricNumber);
    payload.append('department', department);
    payload.append('certificateFile', certificateFile);

    // 4. Update UI Loading State
    const originalBtnHTML = submit_btn.innerHTML;
    submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ml-2">Registering Record...</span>';
    submit_btn.disabled = true;

    // 5. Asynchronous Fetch Submission Loop
    fetch("/admin/upload-certificates", {
        method: "POST",
        // Note: Content-Type header must NOT be manually set when using FormData.
        // The browser will automatically assign the correct multipart/form-data boundary definitions.
        body: payload
    })
    .then((res) => {
        if (!res.ok) throw new Error("Server communication fault occurred.");
        return res.json();
    })
    .then((data) => {
        if (data.success) {
            appNotify.success(data.success);
            
            // Allow time for the admin to notice the success notification before refresh/redirect
            setTimeout(() => {
                window.location.href = '/admin/certificates';
            }, 2500);
        } else if (data.error) {
            appNotify.error(data.error);
            submit_btn.innerHTML = originalBtnHTML;
            submit_btn.disabled = false;
        }
    })
    .catch(err => {
        appNotify.error("Connection lost or node timeout. Please inspect administrative sync logs.");
        submit_btn.innerHTML = originalBtnHTML;
        submit_btn.disabled = false;
    });
});