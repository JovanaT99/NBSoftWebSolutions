$(document).ready(function () {
  const $contact = $("#contact");
  const endpointURL = "http://localhost:3001/form"; // URL za  Express.js server

  // Prikazivanje/sakrivanje polja "other" na osnovu izbora polja "gender"

  const $gender = $contact.find('input[name="gender"]');

  const $f_name = $contact.find('input[name="f_name"]');
  const $s_name = $contact.find('input[name="s_name"]');
  const $address = $contact.find('input[name="address"]');
  const $city = $contact.find('select[name="city"]');
  const $terms = $contact.find('input[name="terms"]');
  const $message = $contact.find('textarea[name="message"]');
  const $year = $contact.find('input[name="year"]');

  $year.datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years",
    autoclose: true,
  });

  $gender.change(function () {
    $contact.find('input[name="other"]').attr("hidden", this.value !== "other");
  });

  // Slanje forme preko AJAX-a
  $contact.submit(function (event) {
    event.preventDefault();
    $contact.find(".is-invalid").removeClass("is-invalid");

    const f_name = $f_name.val().trim();
    const s_name = $s_name.val().trim();
    const address = $address.val().trim();
    const city = $city.val();
    const year = parseInt($year.val());
    const gender = $('input[name="gender"]:checked').val();
    const gender_other = $('input[name="other"]').val().trim();
    const message = $message.val().trim();

    const data = {
      f_name,
      s_name,
      address,
      city,
      year,
      gender,
      gender_other,
      message,
    };
    console.log(data);

    // Prilagođena validacija za sva polja

    let isValid = true;

    if (!f_name) {
      $f_name.addClass("is-invalid");
      $("#f_name_error").html("Ovo polje je obavezno");
      isValid = false;
    } else if (!/\b([A-zÀ-ÿ][-,a-z. ']+[ ]*)+/.test(f_name)) {
      $f_name.addClass("is-invalid");
      $("#f_name_error").html("Nije validan unos");
      isValid = false;
    }

    if (!s_name) {
      $s_name.addClass("is-invalid");
      $("#s_name_error").html("Ovo polje je obavezno");
      isValid = false;
    } else if (!/\b([A-zÀ-ÿ][-,a-z. ']+[ ]*)+/.test(s_name)) {
      $s_name.addClass("is-invalid");
      $("#s_name_error").html("Nije validan unos");
      isValid = false;
    }

    if (!address) {
      $address.addClass("is-invalid");
      $("#address_error").html("Ovo polje je obavezno");
      isValid = false;
    } else if (address.length < 2) {
      $address.addClass("is-invalid");
      $("#address_error").html("Potrebno bar 2 karaktera");
      isValid = false;
    }

    if (!city) {
      $city.addClass("is-invalid");
      $("#city_error").html("Ovo polje je obavezno");
      isValid = false;
    }

    if (!$terms[0].checked) {
      $terms.addClass("is-invalid");
      $("#terms_error").html("Ovo polje je obavezno");
      isValid = false;
    }

    if (isNaN(year)) {
      $year.addClass("is-invalid");
      $("#year_error").html("Ovo polje je obavezno");
      isValid = false;
    } else if (year < 1900 || year > new Date().getFullYear()) {
      $year.addClass("is-invalid");
      $("#year_error").html("Godina rodjenja nije validna");
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
      data: data,
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
          "Godina: " +
          response.formData.year +
          "<br>" +
          "Pol: " +
          response.formData.gender +
          (response.formData.gender_other &&
          response.formData.gender_other.length > 0
            ? "Pol (drugo): " + response.formData.gender_other + "<br>"
            : "") +
          "<br>" +
          "Adresa: " +
          response.formData.address +
          "<br>" +
          "Grad: " +
          response.formData.city +
          (response.formData.message
            ? "Poruka: " + response.formData.message + "<br>"
            : "");

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
