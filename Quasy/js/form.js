/* Quasy - enquiry form validation and response (Part 3) */
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const responseBox = document.getElementById("form-response");
  const fields = form.querySelectorAll("input, select, textarea");

  /* Validation rules - each returns an error message, or "" if valid */
  const rules = {
    name: (v) => {
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Your name must be at least 2 characters.";
      if (!/^[A-Za-z\u00C0-\u024F' -]+$/.test(v))
        return "Your name can only contain letters, spaces, hyphens and apostrophes.";
      return "";
    },
    email: (v) => {
      if (!v) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
        return "Please enter a valid email address (e.g. name@example.com).";
      return "";
    },
    enquiryType: (v) => (v ? "" : "Please choose an enquiry type."),
    message: (v) => {
      if (!v) return "Please enter your message.";
      if (v.length < 10) return "Your message must be at least 10 characters.";
      return "";
    },
    consent: (checked) => (checked ? "" : "You must agree to be contacted."),
  };

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true; // optional fields have no rule

    const value = field.type === "checkbox" ? field.checked : field.value.trim();
    const error = rule(value);

    document.getElementById(field.id + "-error").textContent = error;
    field.classList.toggle("invalid", Boolean(error));
    field.classList.toggle("valid", !error);
    field.setAttribute("aria-invalid", String(Boolean(error)));
    return !error;
  }

  /* Feedback while the user fills in the form */
  fields.forEach((field) => {
    const type = field.tagName === "SELECT" || field.type === "checkbox" ? "change" : "blur";
    field.addEventListener(type, () => validateField(field));
    field.addEventListener("input", () => {
      if (field.classList.contains("invalid")) validateField(field);
    });
  });

  /* Response shown after a valid submission */
  const replyTimes = {
    general: "I will answer your question within 2 working days.",
    hire: "I will review your project details and reply within 1 working day.",
    collab: "I will look at your collaboration idea and reply within 3 working days.",
    feedback: "Thank you for helping me improve! I will read your feedback within 3 working days.",
  };

  function showResponse(data) {
    responseBox.className = "form-status success";
    responseBox.innerHTML = "";

    const title = document.createElement("strong");
    title.textContent = `Thank you, ${data.name}! Your enquiry has been received.`;

    const ref = document.createElement("p");
    ref.textContent = `Reference number: ${data.reference}`;

    const reply = document.createElement("p");
    reply.textContent = `${replyTimes[data.enquiryType]} A reply will be sent to ${data.email}.`;

    responseBox.append(title, ref, reply);
    if (data.copy) {
      const copy = document.createElement("p");
      copy.textContent = "A copy of your enquiry will be sent to you.";
      responseBox.appendChild(copy);
    }
    responseBox.focus();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    responseBox.className = "form-status";
    responseBox.textContent = "";

    let firstInvalid = null;
    fields.forEach((field) => {
      if (!validateField(field) && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      responseBox.textContent = "Please fix the errors above and try again.";
      responseBox.classList.add("fail");
      return;
    }

    showResponse({
      reference: "QSY-" + Date.now().toString().slice(-6),
      name: form.elements["name"].value.trim(),
      email: form.elements["email"].value.trim(),
      enquiryType: form.elements["enquiryType"].value,
      copy: form.elements["copy"].checked,
    });

    form.reset();
    fields.forEach((f) => {
      f.classList.remove("valid", "invalid");
      f.removeAttribute("aria-invalid");
    });
  });
});
