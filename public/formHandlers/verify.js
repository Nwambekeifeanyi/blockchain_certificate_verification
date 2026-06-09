const appNotify = {
    el: document.getElementById('formToast'),
    iconBg: document.getElementById('toastIconBg'),
    icon: document.getElementById('toastIcon'),
    title: document.getElementById('toastTitle'),
    message: document.getElementById('toastMessage'),

    success: function (msg) {
        this.show(msg, "#10b981", "fa-check-circle", "Verification Passed");
    },

    error: function (msg) {
        this.show(msg, "#ef4444", "fa-exclamation-circle", "Verification Failed");
    },

    show: function (msg, color, iconClass, titleText) {
        // Fallback protection if DOM components are omitted from certain view layouts
        if (!this.el) return;
        
        this.message.innerText = msg;
        this.title.innerText = titleText;
        this.iconBg.style.backgroundColor = color;
        
        const sideBorder = this.el.querySelector('.border-l-4');
        if (sideBorder) sideBorder.style.borderColor = color;
        
        this.icon.className = `fas ${iconClass} text-white`;

        this.el.classList.remove('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.add('translate-y-0', 'opacity-100');

        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.hide(), 5000);
    },

    hide: function () {
        if (!this.el) return;
        this.el.classList.add('-translate-y-20', 'opacity-0', 'pointer-events-none');
        this.el.classList.remove('translate-y-0', 'opacity-100');
    }
};

/**
 * Dynamic Modal Component Injection Engine
 * Generates an overlay viewport summarizing identity query hits instantly
 */
const verificationModal = {
    show: function (studentData) {
        let modal = document.getElementById('successModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'successModal';
            modal.className = 'fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="bg-white max-w-md w-full rounded-3xl p-6 md:p-8 border border-slate-100 shadow-2xl transform scale-95 transition-transform duration-300 text-center relative">
                <div class="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 text-2xl animate-bounce">
                    <i class="fa-solid fa-award"></i>
                </div>
                <h3 class="text-lg font-black text-slate-900 tracking-tight">Authentic Document Verified</h3>
                <p class="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest font-mono">Status: Ledger Match Confirmed</p>
                
                <div class="mt-6 border border-slate-100 bg-slate-50/60 rounded-2xl p-4 text-left space-y-3 text-xs">
                    <div>
                        <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Graduate Full Name</span>
                        <span class="font-bold text-slate-800">${studentData.fullName}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <div>
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Matric Number</span>
                            <span class="font-mono font-bold text-slate-700">${studentData.matricNumber || 'Direct File Query'}</span>
                        </div>
                        <div>
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Department Domain</span>
                            <span class="font-bold text-slate-700">${studentData.department}</span>
                        </div>
                    </div>
                </div>

                <button onclick="document.getElementById('successModal').classList.add('opacity-0', 'pointer-events-none')" class="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-3 rounded-xl transition-colors cursor-pointer">
                    Dismiss Record Manifest
                </button>
            </div>
        `;

        modal.classList.remove('opacity-0', 'pointer-events-none');
        // Delayed trigger yields smooth entry scale interpolations
        setTimeout(() => modal.firstElementChild.classList.remove('scale-95'), 10);
    }
};

// Form Submission logic
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const submit_btn = this.querySelector('button[type="submit"]');
    const form = e.target;

    // 1. Extract inputs safely from either verification vector
    const matricNumber = form.matricNumber ? form.matricNumber.value.trim() : "";
    const certificateFile = form.certificateFile ? form.certificateFile.files[0] : null;

    // 2. Verification Criteria Pre-flight Check
    if (!matricNumber && !certificateFile) {
        appNotify.error("Please supply a matriculation entry code or append a target document file.");
        return;
    }

    // 3. Assemble Multi-part Boundary Request Payload
    const payload = new FormData();
    if (matricNumber) payload.append('matricNumber', matricNumber);
    if (certificateFile) payload.append('certificateFile', certificateFile);

    // 4. Update UI Loading State
    const originalBtnHTML = submit_btn.innerHTML;
    submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin text-brand-cyan"></i> <span class="ml-2">Interrogating Verification Nodes...</span>';
    submit_btn.disabled = true;

    // 5. Connect to the public query verification endpoint
    fetch("/verify", {
        method: "POST",
        body: payload
    })
    .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Verification mismatch flagged on active registry lookup.");
        return data;
    })
    .then((data) => {
        appNotify.success(data.success || "Database record sync resolved.");
        
        // Populate and reveal identity container cards on successful responses
        if (data.data) {
            setTimeout(() => {
                verificationModal.show(data.data);
            }, 500);
        }

        // 6. Graceful Form Reset and Staging State Restore
        form.reset();
        
        const promptState = document.getElementById('prompt-state');
        const successState = document.getElementById('success-state');
        const dropzone = document.getElementById('dropzone');

        if (promptState) promptState.classList.remove('hidden');
        if (successState) successState.classList.add('hidden');
        if (dropzone) {
            dropzone.className = "relative border-2 border-dashed border-slate-200 hover:border-brand-teal bg-brand-slate rounded-2xl p-6 text-center transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[140px]";
        }
    })
    .catch(err => {
        appNotify.error(err.message || "Connection timeout or route error encountered.");
    })
    .finally(() => {
        // Re-enable interactive trigger points
        submit_btn.innerHTML = originalBtnHTML;
        submit_btn.disabled = false;
    });
});