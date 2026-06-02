

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

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^.{5,}$/;
  
  


  if (!emailRegex.test(email)) {
      appNotify.error("Enter a valid school email");
      return;
  }




if (!passRegex.test(password)) {
  appNotify.error("Password must be at least 5 characters long with no spaces");
  return;
}

  

const formData = {
  school_email,
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


  fetch("/auth/school-login", {
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
        submit_btn.innerHTML = `<span>Login</span>
        <i class="fas fa-shield-alt transition-transform ml-2" style="color: var(--app-yellow);"></i>`;
      appNotify.error(data.error);
      submit_btn.disable = false
        }, 3000);
      

       
    }



    
  });

});

