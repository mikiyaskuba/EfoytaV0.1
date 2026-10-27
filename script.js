// Efoyta investor showcase interactions.
// IMPORTANT: Replace the recipient below with Efoyta's real business email before publishing.
const EFOYTA_RECIPIENT_EMAIL = "bigdream070707@gmail.com";

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const form = document.getElementById("investor-form");
const status = document.getElementById("form-status");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (EFOYTA_RECIPIENT_EMAIL.includes("REPLACE-WITH-YOUR-EMAIL")) {
      status.textContent = "The inquiry form is ready, but Efoyta's real recipient email has not been configured yet. Update EFOYTA_RECIPIENT_EMAIL in script.js before publishing.";
      status.scrollIntoView({ behavior: "smooth", block: "nearest" });
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent("Efoyta investor inquiry — " + data.get("interest"));
    const body = encodeURIComponent(
      "Efoyta investor inquiry\n\n" +
      "Name: " + data.get("name") + "\n" +
      "Organization: " + (data.get("organization") || "Not provided") + "\n" +
      "Email: " + data.get("email") + "\n" +
      "Phone / WhatsApp: " + (data.get("phone") || "Not provided") + "\n" +
      "Interest: " + data.get("interest") + "\n\n" +
      "Message:\n" + data.get("message")
    );
    window.location.href = "mailto:" + EFOYTA_RECIPIENT_EMAIL + "?subject=" + subject + "&body=" + body;
    status.textContent = "Your email app should open with the inquiry prepared. Please send it from your email app.";
  });
}
