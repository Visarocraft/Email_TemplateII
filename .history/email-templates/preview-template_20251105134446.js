import fs from "fs";
import handlebars from "handlebars";

// Register partials
handlebars.registerPartial(
  "header",
  fs.readFileSync("./email-templates/partials/header.hbs", "utf-8")
);
handlebars.registerPartial(
  "footer",
  fs.readFileSync("./email-templates/partials/footer.hbs", "utf-8")
);

//email-templates\layouts\qualification-approved.hbs
// Read templates
const mainLayout = fs.readFileSync("./email-templates/layouts/main.hbs", "utf-8");
const bodyTemplate = fs.readFileSync("./email-templates/layouts/weekFiveCompleted.hbs", "utf-8");

// Compile body first
const bodyCompiled = handlebars.compile(bodyTemplate);
const bodyHtml = bodyCompiled({
  clientName: "John Doe",
  ctaUrl: "https://visarocraft.com/get-started",
});

// Compile main layout
const mainCompiled = handlebars.compile(mainLayout);
const html = mainCompiled({
  title: "Welcome Email",
  logoUrl: "email-templates/images/logo.png",
  imageUrl: "",
  termsUrl: "https://yourdomain.com/terms",
  privacyUrl: "https://yourdomain.com/privacy",
  body: bodyHtml, // Insert body content dynamically
});

// Save preview
fs.writeFileSync("./email-templates/output.html", html);
console.log("✅ Preview ready! Open email-templates/output.html in your browser.");


//email-templates\layouts\

// email-templates/preview-template.js
//email-templates\layouts\qualification-not-approved.hbs