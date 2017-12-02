const signIn = () => {
  axios.get('/googleSignUp').then((response) => {
    window.location(response.data);
  });
};

$(document).ready(() => {
  $('#signIn').click(() => {
    signIn();
  });
});
