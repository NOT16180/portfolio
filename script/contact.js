document
  .getElementById("contact-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const messageDiv = document.getElementById("form-message");
    const submitButton = form.querySelector("button[type='submit']");

    // État d'envoi
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    messageDiv.style.display = "none";

    try {
      const response = await fetch("https://formspree.io/f/mldjvjaq", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        messageDiv.textContent = "✓ Your message has been sent successfully!";
        messageDiv.className = "success";
        form.reset();
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      messageDiv.textContent = "✗ Error: Please try again later";
      messageDiv.className = "error";
      console.error("Form submission error:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send";
      messageDiv.style.display = "block";
    }
  });
