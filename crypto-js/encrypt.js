import CryptoJS from "crypto-js";
 
 function generateKey() {
    let key = CryptoJS.lib.WordArray.random(32);
    return CryptoJS.enc.Hex.stringify(key);
 } 

 function generateIv() {
    let key = CryptoJS.lib.WordArray.random(16);
    return CryptoJS.enc.Hex.stringify(key);
 }
 
function encrypt(text, keyString, ivString) {

    let iv = CryptoJS.enc.Hex.parse(ivString);

    let key = CryptoJS.enc.Hex.parse(keyString);

    const options = {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    };

    let cipherBytes = CryptoJS.AES.encrypt(text, key, options);
    return cipherBytes.toString();
}

function decrypt(encryptedText, keyString, ivString) {
    let iv = CryptoJS.enc.Hex.parse(ivString);

    let key = CryptoJS.enc.Hex.parse(keyString);

    const options = {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    };

    let cipherBytes = CryptoJS.AES.decrypt(encryptedText, key, options);
    return cipherBytes.toString(CryptoJS.enc.Utf8);
}

function encryptHex(text, keyString, ivString) {

    let iv = CryptoJS.enc.Hex.parse(ivString);

    let key = CryptoJS.enc.Hex.parse(keyString);

    const options = {
        iv,
        format: CryptoJS.format.Hex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    };

    let cipherBytes = CryptoJS.AES.encrypt(text, key, options);
    return cipherBytes.toString();
}

function decryptHex(encryptedText, keyString, ivString) {
    let iv = CryptoJS.enc.Hex.parse(ivString);

    let key = CryptoJS.enc.Hex.parse(keyString);

    const options = {
        iv,
        format: CryptoJS.format.Hex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    };

    let cipherBytes = CryptoJS.AES.decrypt(encryptedText, key, options);
    return cipherBytes.toString(CryptoJS.enc.Utf8);
}

function encryptProgressive(textArray, keyString, ivString) {

    let iv = CryptoJS.enc.Hex.parse(ivString);

    let key = CryptoJS.enc.Hex.parse(keyString);

    const options = {
        iv,
        format: CryptoJS.format.Hex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    };

    var aesEncryptor = CryptoJS.algo.AES.createEncryptor(key, options);

    let cipherBytes = textArray.map(text => aesEncryptor.process(text))

    cipherBytes.push(aesEncryptor.finalize());
    
    return cipherBytes;
}

function decryptProgressive(cipherBytes, keyString, ivString) {

    let iv = CryptoJS.enc.Hex.parse(ivString);

    let key = CryptoJS.enc.Hex.parse(keyString);

    const options = {
        iv,
        format: CryptoJS.format.Hex,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    };

    var aesDecryptor = CryptoJS.algo.AES.createDecryptor(key, options);

    let textArray = cipherBytes.map(cipher => aesDecryptor.process(cipher).toString(CryptoJS.enc.Utf8));

    textArray.push(aesDecryptor.finalize().toString(CryptoJS.enc.Utf8));

    return textArray;

}

function testEncryption() {

    const key = generateKey();

    const iv = generateIv();

    const text = "Hello Blackslate"
    
    let encryptedText = encrypt(text, key, iv);
    console.log("Encrypted Text: " + encryptedText);
    
    let decryptedText = decrypt(encryptedText, key, iv);
    console.log("Decrypted Text: " + decryptedText);
}

function testEncryptionHex() {

    const key = generateKey();

    const iv = generateIv();

    const text = "Hello Blackslate"
    
    let encryptedText = encryptHex(text, key, iv);
    console.log("Encrypted Text: " + encryptedText);

    let decryptedText = decryptHex(encryptedText, key, iv);
    console.log("Decrypted Text: " + decryptedText);
}

function testEncryptionProgressive() {

    const key = generateKey();

    const iv = generateIv();

    const text = [] 
    text.push("Hello Blackslate")
    text.push("Open source")
    
    let encryptedText = encryptProgressive(text, key, iv);
    console.log("Encrypted Text: " + encryptedText.join(" "));
    
    let decryptedText = decryptProgressive(encryptedText, key, iv);
    console.log("Decrypted Text: " + decryptedText.join(" "));
}

function main() {

    testEncryption();

    testEncryptionHex();

    testEncryptionProgressive();

}

main();