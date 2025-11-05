import fs from "fs";
import handlebars from "handlebars";

// Read the template (you can change this to "qualification-approval.hbs" to preview that one)
const templateFile = fs.readFileSync("./email-templates/welcome.hbs", "utf-8");

// Compile the template
const template = handlebars.compile(templateFile);

// Provide test data for the variables used in the template
const html = template({ clientName: "John Doe" });

// Save the result so you can open it in your browser
fs.writeFileSync("./email-templates/output.html", html);

console.log("✅ Preview ready! Open email-templates/output.html in your browser.");
email-templates/preview-template.js