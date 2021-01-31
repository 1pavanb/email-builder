var liveServer = require("live-server");
const Chokidar = require("chokidar");
const Mustache = require("mustache");
const fs = require("fs");
const fsExtra = require("fs-extra");

const outputDir = "preview/";

function serveBuildFolderWithLiveReload() {
  var params = {
    port: 8123,
    host: "0.0.0.0",
    root: outputDir,
    open: false,
    // ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    // file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
    // wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    // mount: [['/public', './node_modules']], // Mount a directory to a route.
    logLevel: 1,
    middleware: [
      function (req, res, next) {
        next();
      },
    ],
  };
  // console.log(
  //   "Server started at : http://localhost:" + params["port"]
  // );
  liveServer.start(params);
}

function watchAndBuildMustacheTemplatesOnChange() {
  Chokidar.watch("src").on("change", (event, path) => {
    buildAllMustacheTemplates();
  });
}

function buildAllMustacheTemplates() {
  fsExtra.emptyDirSync(outputDir);
  const templateDir = "src/mustache-template-and-data/";

  const templateExtension = ".html"; // Can be changed if desired.
  const matchesTemplateExtension = RegExp("\\" + templateExtension + "$", "i");

  const files = fs.readdirSync(templateDir);

  files.forEach((file) => {
    if (file.endsWith(templateExtension)) {
      let filePath = templateDir + file;
      let dataFilePath = filePath.replace(matchesTemplateExtension, ".json");
      let outputPath =
        outputDir + file.replace(matchesTemplateExtension, ".html");

      try {
        let template = fs.readFileSync(filePath, "utf8");
        let data = fs.readFileSync(dataFilePath, "utf8");
        let output = Mustache.render(template, JSON.parse(data));

        let writeStream = fs.createWriteStream(outputPath);
        writeStream.write(output, "utf8");
        writeStream.end();
      } catch (e) {
        console.log("Error:", e.stack);
      }
    }
  });
}

module.exports = {
  watchAndBuildMustacheTemplatesOnChange,
  buildAllMustacheTemplates,
  serveBuildFolderWithLiveReload,
};
