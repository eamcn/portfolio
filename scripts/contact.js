document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', function(ev) {
    ev.preventDefault();

    const data = new FormData(form);
    fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        form.reset();
        status.style.display = 'block';
        status.textContent = "Thanks for your message! I'll get back to you soon.";
      } else {
        response.json().then(data => {
          if (data.errors) {
            status.style.display = 'block';
            status.textContent = data.errors.map(error => error.message).join(", ");
          } else {
            status.style.display = 'block';
            status.textContent = "Oops! There was a problem submitting your form.";
          }
        });
      }
    }).catch(() => {
      status.style.display = 'block';
      status.textContent = "Oops! There was a problem submitting your form.";
    });
  });
});
