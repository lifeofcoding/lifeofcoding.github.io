$(document).ready(function() {

  setTimeout(function() {
    $('#particles-background').addClass('change');
  }, 3000);
  // Add smooth scrolling to all links in navbar + footer link
  $(".navbar a, footer a[href='#home']").on('click', function(event) {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top - 100
    }, 600, function() {

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });

  // ============ parallax background scrolling =================
  // cache the window object
  $window = $(window);

  $('[data-type="background"]').each(function() {
    // declare the variable to affect the defined data-type
    var $scroll = $(this);

    $(window).scroll(function() {
      // HTML5 proves useful for helping with creating JS functions!
      // also, negative value because we're scrolling upwards
      var yPos = -(($window.scrollTop() - $scroll.offset().top) / $scroll.data('speed'));

      // background position
      var coords = '50% calc(50% + ' + yPos + 'px)';

      // move the background
      $scroll.css({
        backgroundPosition: coords
      });
    }); // end window scroll
  }); // end section function

  // ============= contact form =============
  // https://webdesign.tutsplus.com/tutorials/building-a-bootstrap-contact-form-using-php-and-ajax--cms-23068
  $("#contact-form").validator().on("submit", function(event) {
    if (event.isDefaultPrevented()) {
      // handle the invalid form...
    } else {
      // everything looks good!
      event.preventDefault();
      formSuccess();
    }
  });

  function submitForm() {
    // Initiate Variables With Form Content
    var name = $("#name").val();
    var email = $("#email").val();
    var message = $("#message").val();

    $.ajax({
      type: "POST",
      url: "/send",
      data: "name=" + name + "&email=" + email + "&message=" + message,
      success: function(text) {
        if (text == "success") {
          formSuccess();
        }
      }
    });
  }

  function formSuccess() {
    $("#form-feedback").css({
      opacity: 1,
      marginRight: "20px"
    });
  }

});
