const fs = require("fs");
const vm = require("vm");

const data = vm.runInNewContext(fs.readFileSync("General_1000_Vocabulary_Pre_Data.js", "utf8") + "; preData");
console.log("preData", data.categories[0], data.categories.length, data.records.length, Object.keys(data.records[0]).join(","));

for (const item of data.records) {
  for (const lang of ["en", "es", "vn"]) {
    if (!item[lang] || !item[lang].word || !item[lang].ipa || !item[lang].meaning || item[lang].examples.length !== 3) {
      throw new Error(`Bad ${lang} data for record ${item.id}`);
    }
  }
}

for (const file of [
  "General_English_1000_Vocabulary.html",
  "Test_General_English_1000_Vocabulary.html",
  "General_Spanish_1000_Vocabulary.html",
  "Test_General_Spanish_1000_Vocabulary.html",
  "General_Vietnamese_1000_Vocabulary.html",
  "Test_General_Vietnamese_1000_Vocabulary.html",
]) {
  const html = fs.readFileSync(file, "utf8");
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    new Function(match[1]);
  }
  console.log("ok", file, "translate=" + /translateSelect/.test(html), "voice=" + /voiceSelect/.test(html));
}
