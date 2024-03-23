---
title: Frame Game on Base
date: 2024-03-23
layout: project
permalink: /frame-game-on-base
status: finished
type: web
---

As soon as frames were launched on Farcaster, I got interested in implementing one. I wanted to make something that I could finish in a week and that would challenge me. I decided to go for a game.

![Frame running on Warpcast](/assets/projects/frame1.png)

The game is pretty simpl: you choose a number. The smallest number that no one else picks is the winner and gets the prize. The prize? 0.01 ETH.

The first challenge was that at the time, text input was not supported. So I implemented a terrible number selector: you start with the number 1 and you have 4 buttons (frames can have at most 4): +1, +10, +100, mint.

After you are happy with the number, you can click mint and you'll get an NFT on your wallet. Check the [full list].

There are 255 spots available. After everyone mints, the winner can take their prize.

You can still play it [here](https://warpcast.com/lfsmoura/0x60600180).

I will write more about the technical implementation soon.

[full list]: https://airstack.xyz/token-holders?address=0xd745f53ee8eef805700a9205c3a8e88df8d7bc9b&tokenType=ERC721&rawInput=%23%E2%8E%B10xd745f53ee8eef805700a9205c3a8e88df8d7bc9b%E2%8E%B1%280xd745f53ee8eef805700a9205c3a8e88df8d7bc9b+ADDRESS+ethereum+null%29&inputType=ADDRESS&activeView=&activeTokenInfo=&activeSnapshotInfo=&tokenFilters=&activeViewToken=&activeViewCount=&blockchainType=&sortOrder=&spamFilter=&mintFilter=&resolve6551=&activeSocialInfo=&activeENSInfo=
