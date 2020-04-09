const path = require("path");
const PDFDocument = require("pdfkit");

function createDoc() {
  const doc = new PDFDocument({
    autoFirstPage: false,
  });

  const config = {
    margin: 35,
    fontSize: 15,
    defaultColor: "#231F20",
  };

  doc.registerFont(
    "OpenSans-Bold",
    path.join(__dirname, "assets/fonts/OpenSans-Bold.ttf")
  );
  doc.registerFont(
    "OpenSans-BoldItalic",
    path.join(__dirname, "assets/fonts/OpenSans-BoldItalic.ttf")
  );
  doc.registerFont(
    "OpenSans-ExtraBold",
    path.join(__dirname, "assets/fonts/OpenSans-ExtraBold.ttf")
  );
  doc.registerFont(
    "OpenSans-Italic",
    path.join(__dirname, "assets/fonts/OpenSans-Italic.ttf")
  );
  doc.registerFont(
    "OpenSans-Light",
    path.join(__dirname, "assets/fonts/OpenSans-Light.ttf")
  );
  doc.registerFont(
    "OpenSans-LightItalic",
    path.join(__dirname, "assets/fonts/OpenSans-LightItalic.ttf")
  );
  doc.registerFont(
    "OpenSans-Regular",
    path.join(__dirname, "assets/fonts/OpenSans-Regular.ttf")
  );
  doc.registerFont(
    "OpenSans-Semibold",
    path.join(__dirname, "assets/fonts/OpenSans-Semibold.ttf")
  );
  doc.registerFont(
    "OpenSans-SemiboldItalic",
    path.join(__dirname, "assets/fonts/OpenSans-SemiboldItalic.ttf")
  );
  doc.registerFont(
    "WhitneyHTF-MediumSC",
    path.join(__dirname, "assets/fonts/WhitneyHTF-MediumSC.otf")
  );
  doc.registerFont(
    "WhitneyHTF-LightItalicSC",
    path.join(__dirname, "assets/fonts/WhitneyHTF-LightItalicSC.otf")
  );
  doc.registerFont(
    "WhitneyHTF-BoldSC",
    path.join(__dirname, "assets/fonts/WhitneyHTF-BoldSC.otf")
  );

  return doc;
}

module.exports = {
  createDoc,
};
