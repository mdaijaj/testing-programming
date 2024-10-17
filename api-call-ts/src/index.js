"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const app = express();
app.use(express.json());
app.get('/non_blocking', (req, res) => {
    return res.send({ message: "API is testing" });
});
const sum = (a, b) => a + b;
const multiply = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const result = a * b;
            resolve(result);
        }, 5000);
    });
};
app.get('/blocking', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const multiplicationResult = yield multiply(25, 30);
        console.log(multiplicationResult);
        const sumResult = sum(20, 30);
        console.log(sumResult);
        return res.json({
            multiply: multiplicationResult,
            sum: sumResult
        });
    }
    catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    }
}));
const port = 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
