let toggle = document.querySelector(".toggle");
let main = document.querySelector(".main");
let navbar = document.querySelector(".navbar");


toggle.addEventListener('click',()=>{
      // alert('hhi')

      main.classList.toggle('active')
      navbar.classList.toggle('active')
})

let list = document.querySelectorAll(".navbar li");

function activeList() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => {
  item.addEventListener("mouseover", activeList);
});