const fs = require("fs");
const jwt = require("jsonwebtoken");
const base64url = require("base64url");

// Server has a private key used for signing JWT
const privateKey = fs.readFileSync("private.pem");

const token = jwt.sign(
  { exp: Math.floor(Date.now() / 1000) + 60 * 60, foo: "bar", sub: "user1" },
  privateKey,
  { algorithm: "RS256" }
);

// A different server only has access to the public key
// and is able to verify/validate the signature

const publicKey = fs.readFileSync("public.pem");

const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });

console.log("[Valid]", decoded);

// Try to forge the token

let parts = token.split("."); // header.payload.signature
let payload = JSON.parse(base64url.decode(parts[1]));
payload.sub = "user2"; // change user
parts[1] = base64url.encode(JSON.stringify(payload));

const newToken = parts.join(".");

console.log("[New token - forged]", newToken);

const verify2 = jwt.verify(
  newToken,
  publicKey,
  { algorithms: ["RS256"] },
  function (err, decoded) {
    console.log("[Invalid signature]", err.name, err.message);
  }
);

// Expired token

const expired = jwt.sign(
  { exp: Math.floor(Date.now() / 1000) - 100, foo: "bar", sub: "user1" },
  privateKey,
  { algorithm: "RS256" }
);

const verify3 = jwt.verify(
  expired,
  publicKey,
  { algorithms: ["RS256"] },
  function (err, decoded) {
    console.log("[Expired]", err.name, err.message);
  }
);
