import fs from "fs";
import handlebars from "handlebars";

// Your Base64 image string (truncated here for brevity, but use the full string)
const heroImageBase64 = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgH..."; // use the full string

// If you also have a logo, you can use Base64 for it as well
const logoBase64 = heroImageBase64; // or another Base64 string for your logo

// Register partials
handlebars.registerPartial(
  "header",
  fs.readFileSync("./email-templates/partials/header.hbs", "utf-8")
);
handlebars.registerPartial(
  "footer",
  fs.readFileSync("./email-templates/partials/footer.hbs", "utf-8")
);

// Read templates
const mainLayout = fs.readFileSync("./email-templates/layouts/main.hbs", "utf-8");
const bodyTemplate = fs.readFileSync("./email-templates/layouts/welcome.hbs", "utf-8");

// Compile body template
const bodyCompiled = handlebars.compile(bodyTemplate);
const bodyHtml = bodyCompiled({
  clientName: "John Doe",
  ctaUrl: "https://visarocraft.com/get-started",
  imageUrl: heroImageBase64, // Base64 for hero image
  main: "Congratulations!",
  subtitle: "You're Qualified for the",
  text: "EB-1A Petition"
});

// Compile main layout
const mainCompiled = handlebars.compile(mainLayout);
const html = mainCompiled({
  title: "Welcome Email",
  logoUrl: logoBase64, // Base64 for the logo
  termsUrl: "https://yourdomain.com/terms",
  privacyUrl: "https://yourdomain.com/privacy",
  body: bodyHtml
});

// Save preview
fs.writeFileSync("./email-templates/output.html", html);
console.log("✅ Preview ready! Open email-templates/output.html in your browser.");
