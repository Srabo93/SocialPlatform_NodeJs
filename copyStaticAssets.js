const shell = require("shelljs");
const fs = require("fs");

// directory to check if exists
const dir = "./build/public/";

// check if directory exists
if (fs.existsSync(dir)) {
  console.log("Public Directory exists, will be deleted and rebuild");
  shell.rm("-rf", dir);
  shell.cp("-R", "src/public/", "build/public/");
} else {
  console.log("Public Directory not found, is getting created!");
  shell.cp("-R", "src/public/", "build/public/");
}
