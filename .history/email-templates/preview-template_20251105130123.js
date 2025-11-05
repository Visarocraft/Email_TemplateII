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

// ✅ NEW: Add a clear console log to confirm which file is being read
const templatePath = "./email-templates/layouts/qualification-approved.hbs";
console.log("🧩 Reading template:", templatePath);

// ✅ Make sure you’re reading the correct file
if (!fs.existsSync(templatePath)) {
  console.error("❌ Template file not found:", templatePath);
  process.exit(1);
}

// Read templates
const mainLayout = fs.readFileSync("./email-templates/layouts/main.hbs", "utf-8");
const bodyTemplate = fs.readFileSync(templatePath, "utf-8");

// ✅ Log template content to confirm (only first few lines)
console.log("📄 Template preview:\n", bodyTemplate.slice(0, 200));

// Compile body first
const bodyCompiled = handlebars.compile(bodyTemplate);
const bodyHtml = bodyCompiled({
  clientName: "John Doe",
  ctaUrl: "https://visarocraft.com/get-started",
  imageUrl: heroImageBase64,
  main: "Congratulations!",
  subtitle: "You're Qualified for the",
  text: "EB-1A Petition",
});

// Compile main layout
const mainCompiled = handlebars.compile(mainLayout);
const html = mainCompiled({
  title: "Qualification Approved",
  logoUrl: logoBase64,
  termsUrl: "https://yourdomain.com/terms",
  privacyUrl: "https://yourdomain.com/privacy",
  body: bodyHtml,
});

// Save preview
fs.writeFileSync("./email-templates/output.html", html);
console.log("✅ Preview ready! Open email-templates/output.html in your browser.");
