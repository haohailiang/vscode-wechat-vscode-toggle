'use strict';
import * as vscode from 'vscode';
import copypaste = require('copy-paste');

export function activate(context: vscode.ExtensionContext) {

    console.log('Extension "wechat-vscode-toggle" is now active!');

    // command to copy workspace relative path and line number of active file
    let relPathAndLineCopy = vscode.commands.registerCommand('wechat-vscode-toggle.recordInfo', () => {

        if(!vscode.workspace.rootPath) {
            // notify the user nothing can be done without open folder
            vscode.window.showErrorMessage('No folder opened, cannot do anything.');
            return;            
        }

        // Get the current text editor
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            // notify the user nothing can be done without active editor
            vscode.window.showErrorMessage('No active editor found, cannot do anything.');
            return;
        }

        let doc = editor.document;

        if(doc.isUntitled) {
            // notify the user nothing can be done when file isn't saved yet
            vscode.window.showErrorMessage('Active file not saved yet, cannot do anything.');
            return;
        }

        // get workspace relative path
        let relPath = vscode.workspace.asRelativePath(doc.fileName);

        /**
        const activeEditor = vscode.window.activeTextEditor;
        let totalLines = 0;
        if (activeEditor) {
            const doc = activeEditor.document;
            totalLines = (doc.getText().match(/\n/g) || '').length;
        }
         */

        // get cursor line number, zero index so add 1
        let curLineIndex = editor.selection.active.line
        let cursorLinePos = curLineIndex + 1;
        let nextLine = curLineIndex + 1;
        let next2Line = curLineIndex + 2;
        let curLineContent = editor.document.lineAt(curLineIndex).text

        // let copyPathLine = relPath + ':' + cursorLinePos + '\n\t' + curLineContent + '\n';
        let copyPathLine = relPath + ':' + cursorLinePos;

        /**
        if (totalLines >= next2Line) {
            let nextLineContent = editor.document.lineAt(nextLine).text
            let next2LineContent = editor.document.lineAt(next2Line).text
            copyPathLine = relPath + ':' + cursorLinePos + '\n\t' + curLineContent + '\n\t' + nextLineContent + '\n\t' + next2LineContent + '\n';
        } else if (totalLines >= nextLine) {
            let nextLineContent = editor.document.lineAt(nextLine).text
            copyPathLine = relPath + ':' + cursorLinePos + '\n\t' + curLineContent + '\n\t' + nextLineContent + '\n';
        }
         */



        copypaste.copy(copyPathLine, res => {
            if(res != null) {
                // something went wrong...
                vscode.window.showErrorMessage('Could not copy: '+res);
            }
        });
    });

    // context.subscriptions.push(relPathCopy);
    context.subscriptions.push(relPathAndLineCopy);
}

export function deactivate() {
}