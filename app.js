const functions = require("./functions");
const serveBuildFolderWithLiveReload = functions.serveBuildFolderWithLiveReload;
const watchAndBuildMustacheTemplatesOnChange =
  functions.watchAndBuildMustacheTemplatesOnChange;
const buildAllMustacheTemplates = functions.buildAllMustacheTemplates;

buildAllMustacheTemplates();
watchAndBuildMustacheTemplatesOnChange();
serveBuildFolderWithLiveReload();
