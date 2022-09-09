/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showTrigonometryMenu() {
    document.getElementById("buttonsDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.button-dropTrigonometry') && 
  !event.target.matches('.btn-2nd') && 
  !event.target.matches('.btn-hyp')) {

    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}