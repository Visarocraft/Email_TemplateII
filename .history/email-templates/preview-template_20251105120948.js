import fs from "fs";
import handlebars from "handlebars";

// 🔹 Register partials (header & footer)
handlebars.registerPartial(
  "header",
  fs.readFileSync("./email-templates/partials/header.hbs", "utf-8")
);

handlebars.registerPartial(
  "footer",
  fs.readFileSync("./email-templates/partials/footer.hbs", "utf-8")
);

// 🔹 Read the main layout (welcome.hbs or whichever)
const templateFile = fs.readFileSync("./email-templates/layouts/welcome.hbs", "utf-8");

// 🔹 Compile the template
const template = handlebars.compile(templateFile);

// 🔹 Provide test data (mock data)
const html = template({
  main: "Welcome to VisaroCraft!",
  subtitle: "Your account has been successfully created.",
  text: "Get Started",
  logoUrl: "https://yourdomain.com/logo.png",
  imageUrl: "https://yourdomain.com/banner.png",
  body: "<p>We’re glad to have you on board! Here’s what you can do next...</p>",
  termsUrl: "https://yourdomain.com/terms",
  facebookUrl: "https://facebook.com/visarocraft",
  twitterUrl: "https://twitter.com/visarocraft",
  instagramUrl: "https://instagram.com/visarocraft",
  linkedinUrl: "https://linkedin.com/company/visarocraft",
});

// 🔹 Save & preview
fs.writeFileSync("./email-templates/output.html", html);
console.log("✅ Preview ready! Open email-templates/output.html in your browser.");
