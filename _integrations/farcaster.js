const {
  FarcasterEpochTimestamp,
  HubRestAPIClient,
} = require("@standard-crypto/farcaster-js-hub-rest");

const re = new RegExp(/(https?:\/\/leomoura\.org\/[^\s]+)/g);
const client = new HubRestAPIClient();

(async () => {
  const casts = client.listCastsByFid(189714);
  for await (const cast of casts) {
    const text = cast.data.castAddBody?.text;
    const hash = cast.hash;
    if (text && text.match(re)) {
      console.log(`Found URL in cast ${hash}: ${text}`);
    }

    // TODO: write hashes in file _data/farcaster-discussions.yaml
    // TODO2: read responses and write in a file
  }
})();
