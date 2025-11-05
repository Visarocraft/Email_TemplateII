import fs from "fs";
import handlebars from "handlebars";

// Function to convert image to base64 data URL
function imageToDataUrl(imagePath) {
  try {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    // Determine MIME type based on file extension
    let mimeType = "image/png"; // default
    if (imagePath.endsWith(".jpg") || imagePath.endsWith(".jpeg")) {
      mimeType = "image/jpeg";
    } else if (imagePath.endsWith(".gif")) {
      //For the confetti
      mimeType = "image/gif";
    } else if (imagePath.endsWith(".svg")) {
      mimeType = "image/svg+xml";
    }

    return `data:${mimeType};base64,${base64Image}`;
  } catch (error) {
    console.error(`Error loading image ${imagePath}:`, error.message);
    // Fallback to placeholder
    return "https://via.placeholder.com/300x150/0e105b/ffffff?text=Image+Not+Found";
  }
}

// Register partials
handlebars.registerPartial(
  "header",
  fs.readFileSync("./email-templates/partials/header.hbs", "utf-8")
);
handlebars.registerPartial(
  "footer",
  fs.readFileSync("./email-templates/partials/footer.hbs", "utf-8")
);

// Convert images to data URLs
const logoDataUrl = imageToDataUrl("./email-templates/images/logo.png");
const celebrationDataUrl = imageToDataUrl(
  "./email-templates/images/happy-astonished-african-american-woman-silver-fashionable-dress-winning-first-prize-gladly-celebrating.png"
);

console.log(" Images converted to data URLs");

// Read templates
const mainLayout = fs.readFileSync(
  "./email-templates/layouts/main.hbs",
  "utf-8"
);
const bodyTemplate = fs.readFileSync(
  "./email-templates/layouts/weekFiveCompleted.hbs",
  "utf-8"
);  

//--------------------------------------------Depending on the type of text chnage the subtitle, main, and text.

// Compile body first
const bodyCompiled = handlebars.compile(bodyTemplate);
const bodyHtml = bodyCompiled({
  clientName: "John Doe",
  ctaUrl: "https://visarocraft.com/get-started",
});

// Compile main layout with data URLs
const mainCompiled = handlebars.compile(mainLayout);
const html = mainCompiled({
  title: "Welcome Email",
  logoUrl: logoDataUrl,
  imageUrl: celebrationDataUrl,
  main: "Congratulations",
  text: "Hello",
  subtitle: "Main text",
  // termsUrl: "https://yourdomain.com/terms",
  privacyUrl: "https://yourdomain.com/privacy",
  body: bodyHtml, 
});

// Save preview
fs.writeFileSync("./email-templates/output.html", html);
console.log(
  " Preview ready! Open email-templates/output.html in your browser."
);
