const message = document.getElementById("message");


function alter_components(id, component, action) {

  // const component_id = id

  // alert('question_id')

  if (id == null || id ==undefined || id == '' || component == '' || action == '') {
    message.hidden = false
    message.classList.add("error-message");
    message.innerHTML = 'something went wrong, try again'

    setTimeout(() => {
      message.hidden = true
      message.classList.remove("error-message");
    }, 3000);
    throw Error('something went wrong, try again')

  }

  // throw new Error()


  formData = {
    id,
    component,
    action
  }


  fetch("/admin/alter_components", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // alert(data.success)
       
        message.hidden = false;
        message.innerHTML = data.success;
        message.classList.add("success-message");
        
       
        setInterval(() => {


           if (data.is_deleted) {
          window.location.href = `/admin/accounts`
          
        }else{

          message.classList.remove("success-message");
          window.location.reload()
        }
        }, 3000);
        
       
      }

      if (data.error) {
        alert(data.error)
        message.hidden = false;
        message.innerHTML = data.error;
        // message.style.backgroundColor = "red";
        message.style.color = "red";
        // message.style.padding = 10;
        // message.style.width = 40;

        setTimeout(() => {
          message.hidden = true;
        }, 3000);
      }
    })
    .catch((err) => {});

}

function sort_table() {
  let transaction_type = document.getElementById('transaction_type');

  let sort_value = transaction_type.value

  setInterval(() => {
     window.location.href = `transactions?q=${sort_value}`
  }, 2000);
}

async function verify_account() {
  const account_number = document.getElementById('account_number').value
  const account_name = document.getElementById('account_name')


    account_name.value = 'Fetching account ...'
      // if (account_number.length > 8) {
        
        console.log(account_number)


        const formData ={
          account_number
        }
        await fetch("/account/verify_account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
    .then((response) => response.json())
    .then((data) => {
       
        if (data.user) {
          console.log();
          
          account_name.value = data.user.full_name.toUpperCase()
        }
       

     if (data.error) {
            message.hidden = false
            message.innerHTML = data.error;
            message.classList.add("error-message");

            setTimeout(() => {
              message.classList.remove("error-message");
              message.hidden = true;
            }, 5000);

          }
    })
    .catch((err) => {});
  }
// }














