#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const readline_1 = __importDefault(require("readline"));
const configPath = path_1.default.join(os_1.default.homedir(), '.svg2ico-config.json');
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}
async function setPngSize() {
    const pngSize = await askQuestion("Enter the new default PNG size (e.g., 256 for 256x256): ");
    const config = fs_1.default.existsSync(configPath) ? JSON.parse(fs_1.default.readFileSync(configPath, 'utf-8')) : { inputFolder: '', outputFolder: '', pngSize: 256, useTimeout: false };
    config.pngSize = parseInt(pngSize.trim(), 10) || 256;
    fs_1.default.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(`PNG size updated to ${config.pngSize} in ${configPath}`);
    rl.close();
}
setPngSize();
