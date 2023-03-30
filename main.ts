import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

const languagesToChooseFrom = [
  "AL",
  "Actionscript",
  "Ada",
  "Agda",
  "Android",
  "AppEngine",
  "AppceleratorTitanium",
  "ArchLinuxPackages",
  "Autotools",
  "C++",
  "C",
  "CFWheels",
  "CMake",
  "CUDA",
  "CakePHP",
  "ChefCookbook",
  "Clojure",
  "CodeIgniter",
  "CommonLisp",
  "Composer",
  "Concrete5",
  "Coq",
  "CraftCMS",
  "D",
  "DM",
  "Dart",
  "Delphi",
  "Drupal",
  "EPiServer",
  "Eagle",
  "Elisp",
  "Elixir",
  "Elm",
  "Erlang",
  "ExpressionEngine",
  "ExtJs",
  "Fancy",
  "Finale",
  "FlaxEngine",
  "ForceDotCom",
  "Fortran",
  "FuelPHP",
  "GWT",
  "Gcov",
  "GitBook",
  "Go",
  "Godot",
  "Gradle",
  "Grails",
  "Haskell",
  "IGORPro",
  "Idris",
  "JBoss",
  "JENKINS_HOME",
  "Java",
  "Jekyll",
  "Joomla",
  "Julia",
  "KiCad",
  "Kohana",
  "Kotlin",
  "LabVIEW",
  "Laravel",
  "Leiningen",
  "LemonStand",
  "Lilypond",
  "Lithium",
  "Lua",
  "Magento",
  "Maven",
  "Mercury",
  "MetaProgrammingSystem",
  "Nanoc",
  "Nim",
  "Node",
  "OCaml",
  "Objective-C",
  "Opa",
  "OpenCart",
  "OracleForms",
  "Packer",
  "Perl",
  "Phalcon",
  "PlayFramework",
  "Plone",
  "Prestashop",
  "Processing",
  "PureScript",
  "Python",
  "Qooxdoo",
  "Qt",
  "R",
  "ROS",
  "Racket",
  "Rails",
  "Raku",
  "RhodesRhomobile",
  "Ruby",
  "Rust",
  "SCons",
  "Sass",
  "Scala",
  "Scheme",
  "Scrivener",
  "Sdcc",
  "SeamGen",
  "SketchUp",
  "Smalltalk",
  "Stella",
  "SugarCRM",
  "Swift",
  "Symfony",
  "SymphonyCMS",
  "TeX",
  "Terraform",
  "Textpattern",
  "TurboGears2",
  "TwinCAT3",
  "Typo3",
  "Unity",
  "UnrealEngine",
  "VVVV",
  "VisualStudio",
  "Waf",
  "WordPress",
  "Xojo",
  "Yeoman",
  "Yii",
  "ZendFramework",
  "Zephir",
];

const templateOptions = new EnumType(languagesToChooseFrom);

async function donwloadFile(url: string, fileName: string, append: boolean | undefined) {
  const fileResponse = await fetch(url);
  if (fileResponse.status != 200) {
    console.error(fileResponse);
    Deno.exit(1);
  }
  if (fileResponse.body) {
    if (append) {
      const file = await Deno.open(fileName, { create: true, append: true });
      await fileResponse.body.pipeTo(file.writable);
    } else {
      const file =  await Deno.open(fileName,{ create: true, write: true, truncate: true });
      await fileResponse.body.pipeTo(file.writable);
    }
  }
}

await new Command()
  .name("gitignore")
  .version("0.1.0")
  .description(
    "Get .gitignore templates from GitHub's .gitignore templates repo (https://github.com/github/gitignore).",
  )
  .type("template", templateOptions)
  .option("-l, --list [list:boolean]", "Show a list of available templates.", {
    standalone: true,
    action: () => {
      languagesToChooseFrom.forEach((lang) => {
        console.log(lang);
      });
      Deno.exit(0);
    },
  })
  .option(
    "-o, --output [output:string]",
    "Choose a file to write the template to.",
    { default: "./.gitignore" },
  )
  .option(
    "-a, --append",
    "If true the template will be appended to your existing .gitignore. Otherwise will be overwritten.",
  )
  .arguments("<language:template>")
  .action(({ output, append }, language: string) => {
    const baseUrl = "https://github.com/github/gitignore/raw/main";
    const url = `${baseUrl}/${language}.gitignore`;
    donwloadFile(url, `${output}`, append);
    console.log(
      `Succfully created a ${language} .gitignore template in ${output}`,
    );
  })
  .parse(Deno.args);
