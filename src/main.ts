import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";

const languagesToChooseFrom = {
  "al": "AL",
  "actionscript": "Actionscript",
  "ada": "Ada",
  "agda": "Agda",
  "android": "Android",
  "appengine": "AppEngine",
  "appceleratortitanium": "AppceleratorTitanium",
  "archlinuxpackages": "ArchLinuxPackages",
  "autotools": "Autotools",
  "c++": "C++",
  "c": "C",
  "cfwheels": "CFWheels",
  "cmake": "CMake",
  "cuda": "CUDA",
  "cakephp": "CakePHP",
  "chefcookbook": "ChefCookbook",
  "clojure": "Clojure",
  "codeigniter": "CodeIgniter",
  "commonlisp": "CommonLisp",
  "composer": "Composer",
  "concrete5": "Concrete5",
  "coq": "Coq",
  "craftcms": "CraftCMS",
  "d": "D",
  "dm": "DM",
  "dart": "Dart",
  "delphi": "Delphi",
  "drupal": "Drupal",
  "episerver": "EPiServer",
  "eagle": "Eagle",
  "elisp": "Elisp",
  "elixir": "Elixir",
  "elm": "Elm",
  "erlang": "Erlang",
  "expressionengine": "ExpressionEngine",
  "extjs": "ExtJs",
  "fancy": "Fancy",
  "finale": "Finale",
  "flaxengine": "FlaxEngine",
  "forcedotcom": "ForceDotCom",
  "fortran": "Fortran",
  "fuelphp": "FuelPHP",
  "gwt": "GWT",
  "gcov": "Gcov",
  "gitbook": "GitBook",
  "go": "Go",
  "godot": "Godot",
  "gradle": "Gradle",
  "grails": "Grails",
  "haskell": "Haskell",
  "igorpro": "IGORPro",
  "idris": "Idris",
  "jboss": "JBoss",
  "jenkins_home": "JENKINS_HOME",
  "java": "Java",
  "jekyll": "Jekyll",
  "joomla": "Joomla",
  "julia": "Julia",
  "kicad": "KiCad",
  "kohana": "Kohana",
  "kotlin": "Kotlin",
  "labview": "LabVIEW",
  "laravel": "Laravel",
  "leiningen": "Leiningen",
  "lemonstand": "LemonStand",
  "lilypond": "Lilypond",
  "lithium": "Lithium",
  "lua": "Lua",
  "magento": "Magento",
  "maven": "Maven",
  "mercury": "Mercury",
  "metaprogrammingsystem": "MetaProgrammingSystem",
  "nanoc": "Nanoc",
  "nim": "Nim",
  "node": "Node",
  "ocaml": "OCaml",
  "objective-c": "Objective-C",
  "opa": "Opa",
  "opencart": "OpenCart",
  "oracleforms": "OracleForms",
  "packer": "Packer",
  "perl": "Perl",
  "phalcon": "Phalcon",
  "playframework": "PlayFramework",
  "plone": "Plone",
  "prestashop": "Prestashop",
  "processing": "Processing",
  "purescript": "PureScript",
  "python": "Python",
  "qooxdoo": "Qooxdoo",
  "qt": "Qt",
  "r": "R",
  "ros": "ROS",
  "racket": "Racket",
  "rails": "Rails",
  "raku": "Raku",
  "rhodesrhomobile": "RhodesRhomobile",
  "ruby": "Ruby",
  "rust": "Rust",
  "scons": "SCons",
  "sass": "Sass",
  "scala": "Scala",
  "scheme": "Scheme",
  "scrivener": "Scrivener",
  "sdcc": "Sdcc",
  "seamgen": "SeamGen",
  "sketchup": "SketchUp",
  "smalltalk": "Smalltalk",
  "stella": "Stella",
  "sugarcrm": "SugarCRM",
  "swift": "Swift",
  "symfony": "Symfony",
  "symphonycms": "SymphonyCMS",
  "tex": "TeX",
  "terraform": "Terraform",
  "textpattern": "Textpattern",
  "turbogears2": "TurboGears2",
  "twincat3": "TwinCAT3",
  "typo3": "Typo3",
  "unity": "Unity",
  "unrealengine": "UnrealEngine",
  "vvvv": "VVVV",
  "visualstudio": "VisualStudio",
  "waf": "Waf",
  "wordpress": "WordPress",
  "xojo": "Xojo",
  "yeoman": "Yeoman",
  "yii": "Yii",
  "zendframework": "ZendFramework",
  "zephir": "Zephir",
};

const templateOptions = new EnumType(Object.keys(languagesToChooseFrom));

async function donwloadFile(url: string) {
  const fileResponse = await fetch(url);
  if (fileResponse.status != 200) {
    console.error(fileResponse);
    Deno.exit(1);
  }
  if (fileResponse.body) {
    const textData = await fileResponse.text();
    console.log(`# ${url}`);
    console.log(textData);
  }
}

await new Command()
  .name("gitignore")
  .version("0.1.0-alpha")
  .description(
    "Get .gitignore templates from GitHub's .gitignore templates repo (https://github.com/github/gitignore).",
  )
  .type("template", templateOptions)
  .option("-l, --list [list:boolean]", "Show a list of available templates.", {
    standalone: true,
    action: () => {
      Object.keys(languagesToChooseFrom).forEach((lang) => {
        console.log(lang);
      });
      Deno.exit(0);
    },
  })
  .option(
    "-c, --commit [commit:string]",
    "Use the .gitignore from a specific commit. If you are using the gitignore CLI in a pipeline you may want to set this value to ensure reproducibility.",
    {
      default: "main",
    },
  )
  .arguments("<language:template>")
  .action(({ commit }, language: string) => {
    const langKey = language as keyof typeof languagesToChooseFrom;
    const langFile = `${languagesToChooseFrom[langKey]}.gitignore`;
    const baseUrl = `https://github.com/github/gitignore/raw/${commit}`;
    const url = `${baseUrl}/${langFile}`;
    donwloadFile(url);
  })
  .parse(Deno.args);
