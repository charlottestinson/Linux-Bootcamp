'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
/**
 * Run the command in the terminal, if term exists otherwise
 * create
 * @param term
 * @param script
 */
function runOnTerminal(term, script) {
    // run the script!
    if (!term) {
        term = vscode.window.createTerminal('file-script-runner');
    }
    term.show();
    term.sendText(script, true);
    return term;
}
/**
 * Format functionality for script, if needs
 * replacing
 * @param script
 * @param filePath
 */
function formatScript(script, filePath) {
    let formattedScript = `${script} ${filePath}`;
    // if it contains file path placeholder
    if (script.includes('$f')) {
        formattedScript = script.replace('$f', filePath);
    }
    return formattedScript;
}
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    let term;
    let isListenerSet = false;
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "file-script-runner" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.run', (m) => {
        // The code you place here will be executed every time your command is executed
        let runScript;
        // Display a message box to the user
        const filePath = m.path;
        const settings = vscode.workspace.getConfiguration('fileScriptRunner');
        if (!settings.script || !settings.script.length) {
            vscode.window.showErrorMessage('File Script Runner: Please setup a script to run.');
            return;
        }
        // setup listener (once)
        if (!isListenerSet) {
            vscode.window.onDidCloseTerminal((activeTerminal) => {
                if (activeTerminal._id === term._id) {
                    term.dispose();
                    term = null;
                }
            });
            isListenerSet = true;
        }
        const config = settings.script;
        const defaultScriptConfig = config.find((c) => !!c.default);
        // if found the default script
        if (defaultScriptConfig) {
            runScript = formatScript(defaultScriptConfig.script, filePath);
            // run the script
            term = runOnTerminal(term, runScript);
            return;
        }
        /**
         * If you have multiple scripts configured
         * and dont have a default one set, then give user
         * option
         */
        const quickPickItems = config.map((configItem, ix) => {
            let label = configItem.label;
            if (!label) {
                label = `Script ${ix}`;
                configItem.name = label;
            }
            return { label };
        });
        // show the picker
        vscode.window.showQuickPick(quickPickItems).then((item) => {
            const configScript = config.find((c) => c.name === item.label);
            if (configScript) {
                runScript = formatScript(configScript.script, filePath);
                // run the script
                term = runOnTerminal(term, runScript);
            }
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map