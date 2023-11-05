// $(document).ready(function () {
//   const $contact = $("#contact");
//   const $gender = $contact.find('input[name="gender"]');
//   $gender.change(function () {
//     $contact.find('input[name="other"]').attr("hidden", this.value !== "other");
//   });
//   $("#contact").submit(function (event) {
//     event.preventDefault();
//     const $this = $(this);
//     const $f_name = $this.find('input[name="f_name"]');
//     const $s_name = $this.find('input[name="s_name"]');
//     const $address = $this.find('input[name="address"]');
//     const $city = $this.find('select[name="city"]');
//     $this.find(".is-invalid").removeClass("is-invalid");
//     if (!$f_name.val().trim()) {
//       $f_name.addClass("is-invalid");
//     }
//     if (!$s_name.val().trim()) {
//       $s_name.addClass("is-invalid");
//     }
//     if (!$address.val().trim()) {
//       $address.addClass("is-invalid");
//     }
//     console.log($city.find(":selected").val());
//     if (!$city.find(":selected").val()) {
//       $city.addClass("is-invalid");
//     }

// $(document).ready(function () {
//   const $contact = $("#contact");

//   // Prikazivanje/sakrivanje polja "other" na osnovu izbora polja "gender"
//   const $gender = $contact.find('input[name="gender"]');
//   $gender.change(function () {
//     $contact.find('input[name="other"]').attr("hidden", this.value !== "other");
//   });

//   // Slanje forme preko AJAX-a
//   $contact.submit(function (event) {
//     event.preventDefault();

//     // Prilagođena validacija
//     const $f_name = $("#f_name");
//     const f_nameValue = $f_name.val().trim();
//     if (f_nameValue === "") {
//       $f_name.addClass("is-invalid");
//       return;
//     } else {
//       $f_name.removeClass("is-invalid");
//     }

//     const $s_name = $("#s_name");
//     const s_nameValue = $s_name.val().trim();
//     if (s_nameValue === "") {
//       $s_name.addClass("is-invalid");
//       return;
//     } else {
//       $s_name.removeClass("is-invalid");
//     }

//     const $address = $("#address");
//     const addressValue = $address.val().trim();
//     if (addressValue === "") {
//       $address.addClass("is-invalid");
//       return;
//     } else {
//       $address.removeClass("is-invalid");
//     }

//     const $city = $("#city");
//     const cityValue = $city.val();
//     if (!cityValue) {
//       $city.addClass("is-invalid");
//       return;
//     } else {
//       $city.removeClass("is-invalid");
//     }

$(document).ready(function () {
  const $contact = $("#contact");
  const endpointURL = "http://localhost:3001/form"; // URL za  Express.js server

  // Prikazivanje/sakrivanje polja "other" na osnovu izbora polja "gender"
  const $gender = $contact.find('input[name="gender"]');
  $gender.change(function () {
    $contact.find('input[name="other"]').attr("hidden", this.value !== "other");
  });

  // Slanje forme preko AJAX-a
  $contact.submit(function (event) {
    event.preventDefault();

    // Prilagođena validacija za sva polja
    const $f_name = $contact.find('input[name="f_name"]');
    const $s_name = $contact.find('input[name="s_name"]');
    const $address = $contact.find('input[name="address"]');
    const $city = $contact.find('select[name="city"]');

    $contact.find(".is-invalid").removeClass("is-invalid");

    let isValid = true;

    if (!$f_name.val().trim()) {
      $f_name.addClass("is-invalid");
      isValid = false;
    }

    if (!$s_name.val().trim()) {
      $s_name.addClass("is-invalid");
      isValid = false;
    }

    if (!$address.val().trim()) {
      $address.addClass("is-invalid");
      isValid = false;
    }

    if (!$city.find(":selected").val()) {
      $city.addClass("is-invalid");
      isValid = false;
    }

    if (!isValid) {
      return; // prekid ako validacija nije prošla
    }

    // Ako je forma validna
    const formData = $contact.serialize();

    $.ajax({
      type: "POST",
      url: endpointURL,
      data: formData,
      dataType: "json",
      success: function (response) {
        console.log(response);

        // Sklonite formu i prikažite poruku za uspešno slanje
        $contact.hide();
        const successMessage =
          "Uspešno ste popunili formu. Ispod su vaši uneti podaci:<br>" +
          "Ime: " +
          response.formData.f_name +
          "<br>" +
          "Prezime: " +
          response.formData.s_name +
          "<br>" +
          "Pol: " +
          response.formData.gender +
          "<br>" +
          "Adresa: " +
          response.formData.address +
          "<br>" +
          "Grad: " +
          response.formData.city;

        $contact.after(
          '<div class="alert alert-success">' + successMessage + "</div>"
        );
      },
      error: function (err) {
        console.error(err);
      },
    });
  });
});
