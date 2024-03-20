const passwordInput = document.querySelector('#password');
const usernameInput = document.querySelector('#username').value.target;
const emailInput = document.querySelector('#email');
const fullNameInput = document.querySelector('#fullName');
const passwordStrengthIndicator = document.querySelector(
  '.password-strength-indicator'
);
const submitBtn = document.querySelector('button');

passwordInput.addEventListener('input', (event) => {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let hasNumber = false;
  numbers.forEach((number) => {
    if (event.target.value.includes(number)) {
      hasNumber = true;
    }
  });
  if (event.target.value.length > 8 && hasNumber) {
    passwordStrengthIndicator.innerText = 'stark!';
  } else if (event.target.value.length > 8 || hasNumber) {
    passwordStrengthIndicator.innerText = 'medium';
  } else {
    passwordStrengthIndicator.innerText = 'låg';
  }
});

var url = window.location.search;
const queries = url.split('&');

if (url !== '') {
  alert(
    `Du skapade en ny användare med följande uppgifter: ${queries[0]}\n${queries[1]}\n${queries[2]}\n${queries[3]}}`
  );
}
