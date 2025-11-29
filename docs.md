# src\index.ts


## Function: ensureOutput
- Params: None
- Returns: Void
- Description: ------------------------------------------------------------- CONFIGURATION ------------------------------------------------------------- These will eventually be replaced with CLI flags: --out <dir> --root <srcDir> --pattern <glob> / const SOURCE_GLOB = LiveDocsConfig.pattern; const OUTPUT_DIR = LiveDocsConfig.outputDir; const OUTPUT_FILE = LiveDocsConfig.outputFile; /** Ensures the docs directory + file exist. Later: this becomes a reusable util function.



## Function: generateAllDocs
- Params: None
- Returns: Void




## Function: startWatchMode
- Params: None
- Returns: Void




## Function: run
- Params: None
- Returns: Void




# src\cli.ts


## Function: parseCLIArgs
- Params: None
- Returns: Void
- Description: Helper to parse CLI flags



# src\utils\dedent.ts


## Function: dedent
- Params: str: string
- Returns: Void




# src\types\Types.ts


# src\test\person.ts


## Function: greet
- Params: name: string
- Returns: string
- Description: Returns a greeting for the given name



## Function: add
- Params: a: number, b: number
- Returns: number
- Description: Adds two numbers together



## Function: hello
- Params: None
- Returns: Void
- Description: Logs "Hello World" to the console



## Function: isAdult
- Params: age: number
- Returns: boolean
- Description: Checks if a person is an adult based on age



## Function: getPersonSummary
- Params: name: string, age: number
- Returns: string
- Description: Returns a formatted string with a person's info including name and age



## Function: stringLength
- Params: str: string | null
- Returns: number
- Description: Returns the length of a string, or 0 if null



# src\test\example.ts


## Function: greet
- Params: name: string
- Returns: string
- Description: Greets a user



## Function: add
- Params: a: number, b: number
- Returns: number
- Description: Adds two numbers



## Function: hello
- Params: None
- Returns: Void
- Description: Logs hello world



## Function: foo
- Params: None
- Returns: Void
- Description: foo bar baz



# src\parsing\parseTS.ts


## Function: parseAndGenerateDocs
- Params: filePath: string, code: string
- Returns: Void




## Function: cleanComment
- Params: raw: string
- Returns: string




## Class: const




# src\parsing\parseSourceFile.ts


# src\parsing\parseJS.ts


# src\parsing\extractComments.ts


# src\parsing\astTypes.ts


# src\fs\fileWatcher.ts


        ## Function: startWatcher
        - Params: 
pattern: string,
onChange: (filePath: string, content: string
        - Returns: Void
        
    


# src\fs\fileCollector.ts


## Function: collectFiles
- Params: pattern: string
- Returns: string[]




# src\fs\fileCache.ts


## Class: FileCache




# src\docs\templates.ts


# src\docs\markdownWriter.ts


# src\docs\docGenerator.ts


## Function: generateMarkdown
- Params: filePath: string, items: Item[]
- Returns: string




# src\docs\docBuilder.ts


# src\core\config.ts


