$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const inputFirst = $("#first-input");
  const inputLast = $("#last-input");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      firstName: inputFirst.val().trim(),
      lastName: inputLast.val().trim(),
      password: passwordInput.val().trim()
    };

    if (
      !userData.email ||
      !userData.firstName ||
      !userData.lastName ||
      !userData.password
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.password
    );
    emailInput.val("");
    inputFirst.val("");
    inputLast.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, firstName, lastName, password) {
    $.post("/api/signup", {
      email: email,
      first_name: firstName,
      last_name: lastName,
      password: password
    })
      .then(() => {
        window.location.replace("/members");

        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(err => {
        console.log(err);
      });
  }
});
