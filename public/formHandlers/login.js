

const appNotify = {
  el: document.getElementById('formToast'),
  iconBg: document.getElementById('toastIconBg'),
  icon: document.getElementById('toastIcon'),
  title: document.getElementById('toastTitle'),
  message: document.getElementById('toastMessage'),

  success: function(msg) {
      this.show(msg, "#10b981", "fa-check-circle", "Success");
  },

  error: function(msg) {
      this.show(msg, "#ef4444", "fa-exclamation-circle", "Error Detected");
  },

  info: function(msg) {
      this.show(msg, "#3b82f6", "fa-info-circle", "Requirement");
  },

  show: function(msg, color, iconClass, titleText) {
      // Configure styles
      this.message.innerText = msg;
      this.title.innerText = titleText;
      this.iconBg.style.backgroundColor = color;
      this.el.querySelector('.border-l-4').style.borderColor = color;
      this.icon.className = `fas ${iconClass} text-white`;

      // Animation: Slide Down & Fade In
      this.el.classList.remove('-translate-y-20', 'opacity-0', 'pointer-events-none');
      this.el.classList.add('translate-y-0', 'opacity-100');

      // Auto-hide after 5 seconds
      setTimeout(() => this.hide(), 5000);
  },

  hide: function() {
      this.el.classList.add('-translate-y-20', 'opacity-0', 'pointer-events-none');
      this.el.classList.remove('translate-y-0', 'opacity-100');
  }
};


document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  const submit_btn = document.getElementById('submit_btn')

  const email = form.email.value.trim();
  const password = form.password.value.trim();

  // Regular Expressions
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Strict Password: Min 6 chars, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char
 let passRegex = /^(?=.*[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{4,}$/;
    
  
  


  if (!emailRegex.test(email)) {
        appNotify.error("Please enter a valid administrative email");
        return;
    }

  

    if (!passRegex.test(password)) {
        appNotify.error("Access Key does not meet security requirements");
        // We stop here so the user can look at the indicators we built
        return;
    }






  

const formData = {
  email,
  password,
}
  submit_btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span class="ml-2 tracking-widest">Authorizing...</span>';
  submit_btn.disable = true
  // setTimeout(() => {
  //     appLoader.show()
  // }, 2000);
  // setTimeout(() => {
  //     appLoader.success()
  // }, 4000);


  fetch("/auth/admin-login", {
      method: "POST",
      headers:{
                'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData),
    })
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
  //     setTimeout(() => {
  //     appLoader.show()
  // }, 3000);
  setTimeout(() => {
    appNotify.success(data.success);
  }, 3000);

      setTimeout(() => {
      window.location.href = '/admin/dashboard'
      }, 7000);
    }
  
    if (data.error) {

       setTimeout(() => {
         submit_btn.innerHTML = `<span>Access Dashboard</span>
                    <i class="fas fa-arrow-right text-[9px] group-hover:translate-x-1 transition-transform ml-2"></i>`;
      appNotify.error(data.error);
      submit_btn.disable = false
        }, 3000);


        
    }



    
  });

});

