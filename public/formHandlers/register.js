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

document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submit_btn = document.getElementById('submit_btn');
    
    // 1. Gather input field parameters cleanly
    const full_name = form.full_name.value.trim();
    const email = form.email.value.trim();
    // const school_contact = form.school_contact.value.trim();
    const password = form.password.value.trim();

    // 2. Cryptographic and Pattern Regex Configurations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^(?:\+234|234|0)?(?:70|80|81|90|91|71|81)\d{8}$/;
    const passRegex = /^.{5,}$/; // Minimum 5 characters long

    // 3. Validation Guard Clauses
    if (!full_name) {
        appNotify.error("Full name cannot be empty");
        return;
    }

    if (!emailRegex.test(email)) {
        appNotify.error("Enter a valid email");
        return;
    }


    if (!passRegex.test(password)) {
        appNotify.error("Password must be at least 5 characters long");
        return;
    }

    // 4. Construct Data Payload
    const formData = {
        full_name,
        email,
        password,
    };

    // 5. IMMEDIATE UI LOCK: Trigger state updates BEFORE fetch starts
    submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ml-2 tracking-widest">Processing...</span>';
    submit_btn.disabled = true; // Fixed typo (disabled)
    
    
    try {
        // 6. Execute Network Request Pipeline
        const response = await fetch("/auth/admin-registration", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        // 7. HANDLE SUCCESS LIFECYCLE
        if (data.success) {
            // Trigger the OPay-style checkmark and confetti flower splash instantly
            appNotify.success("Administrative registration successfully committed to system infrastructure logs.");

            // Hold user on screen briefly to appreciate the visual splash before routing
            setTimeout(() => {
                window.location.href = '/login';
            }, 3000);
            return;
        }

        // 8. HANDLE APPLICATION SEMANTIC ERRORS (e.g., Email already exists)
        if (data.error) {
            // appLoader.hide(); // Clear full-screen loader away
            appNotify.error(data.error); // Display exact context error via slide toast
            
            // Re-enable interactive system buttons for input correction
            submit_btn.innerHTML = `Complete Enrollment`;
            submit_btn.disabled = false;
        }

    } catch (networkError) {
        // 9. COLD CATCH PIPELINE DISRUPTIONS (Server down, no internet)
        console.error("Infrastructure route failure:", networkError);
        appNotify.error("Network connection failure. Unable to reach institutional node router.");
        
        submit_btn.innerHTML = `Complete Enrollment`;
        submit_btn.disabled = false;
    }
});