//= require rails-ujs
//= require jquery
//= require jquery-ui
//= require turbolinks
//= require budget_form
//= require nested_form_fields
//= require_tree .



// BULMA NAVBAR HAMBURGER TOGGLE
document.addEventListener('DOMContentLoaded', function () {

  // Get all "navbar-burger" elements
  var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {

    // Add a click event on each of them
    $navbarBurgers.forEach(function ($el) {
      $el.addEventListener('click', function () {

        // Get the target from the "data-target" attribute
        var target = $el.dataset.target;
        var $target = document.getElementById(target);

        // Toggle the class on both the "navbar-burger" and the "navbar-menu"
        $el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

});

//Bulma hide notification
$(document).on('click', '.notification > button.delete', function() {
    $(this).parent().animate({
      top: '-20px',
      opacity: '0'
    }, 200, function() {
      $(this).remove();
      return false;
    })
});

function transaction_check() {
  if ($("#transaction_amount").data('sub') == true) {
    var amount = $("#transaction_amount").val();
    $("#transaction_amount").val(amount * -1);
  }
}