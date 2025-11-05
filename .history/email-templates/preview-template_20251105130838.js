import fs from "fs";
import handlebars from "handlebars";

// Helper function to convert local image to Base64
function imageToBase64(path) {
  const ext = path.split(".").pop(); // get file extension
  const data = fs.readFileSync(path); // read as Buffer
  return `data:image/${ext};base64,${data.toString("base64")}`;
}

// Convert local images to Base64
const logoBase64 = imageToBase64("./email-templates/images/logo.png");
const heroImageBase64 = imageToBase64(
  "./email-templates/images/happy-astonished-african-american-woman.png"
);

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
const bodyTemplate = fs.readFileSync("./email-templates/layouts/qualification-approved.hbs", "utf-8");

// Compile body first
const bodyCompiled = handlebars.compile(bodyTemplate);
const bodyHtml = bodyCompiled({
  clientName: "John Doe",
  ctaUrl: "https://visarocraft.com/get-started",
  imageUrl: heroImageBase64, // pass Base64 for the hero image
  main: "Congratulations!",
  subtitle: "You're Qualified for the",
  text: "EB-1A Petition"
});

// Compile main layout
const mainCompiled = handlebars.compile(mainLayout);
const html = mainCompiled({
  title: "Welcome Email",
  logoUrl: logoBase64,       // pass Base64 for the logo
  termsUrl: "https://yourdomain.com/terms",
  privacyUrl: "https://yourdomain.com/privacy",
  body: bodyHtml             // Insert body content dynamically
});

// Save preview
fs.writeFileSync("./email-templates/output.html", html);
console.log("✅ Preview ready! Open email-templates/output.html in your browser.");
