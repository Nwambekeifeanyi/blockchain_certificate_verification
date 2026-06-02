// ===================== search bar =========================
let searchInput = document.getElementById("searchInput");
let table = document.getElementById("table");

searchInput.addEventListener("input", () => {
  // alert('hi')
  // noresult.style.display = "none";
  let row = table.getElementsByTagName("tr");
  for (let i = 0; i < row.length; i++) {
    let searchValue = searchInput.value.toLowerCase();
    let data = row[i].innerText.toLowerCase();
    // let noresult = document.getElementById("noresult");
    if (data.includes(searchValue)) {
      // noresult.style.display = "none";
      row[i].style.display = "";
      row[0].style.display = "";
    } else {
      row[0].style.display = "";

      row[i].style.display = "none";
      // noresult.style.display = "";
      // noresult.innerHTML = 'no resul fo'
    }
  }
});
