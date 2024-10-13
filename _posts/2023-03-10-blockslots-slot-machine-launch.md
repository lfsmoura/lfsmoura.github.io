---
layout: post
title: "Introducing BlockSlots"
tag:
---

It has been a year since I started my crypto journey. I've wanted to build a full dAPP to practice my skills since then. I've wanted to make something cool but with a limited scope that would allow me to ship a working product. Since crypto is ripe with gamblers I've decided to create a fully decentralized slot machine.

I am excited to announce the launch of [BlockSlots](https://blockslots.xyz/) - a decentralized application (dAPP) on the Polygon network that lets users bet tokens and win big with an exciting slot machine!

My main goal with BlockSlots was to provide users with a safe, secure, and fair gaming experience. To ensure that, I used Chainlink's verifiable random function (VRF) technology, which guarantees that every spin on our slot machine is completely random and tamper-proof.

I selected the Polygon network to avoid high gas fees and slow transaction times.

## The Stack

To develop, test, and deploy my smart contracts, I used [Foundry](https://book.getfoundry.sh/). I've chosen Foundry because it's much more intuitive to write code and tests in the same language. According to their own benchmarks, it's also blazingly fast, providing multiple digit speedup compared to Hardhat.

To generate random numbers for the slot machine I've used [Chainlink's VRF](https://chain.link/vrf). For funding I selected the [subscription method](https://docs.chain.link/vrf/v2/subscription).

For the frontend, I'm using [Wagmi](https://wagmi.sh/), [RainbowKit](https://www.rainbowkit.com/), React with the Next Framework, and hosting it all on [Vercel](https://vercel.com/).

## Future work

I'm pleased with the results so far, but I'm always looking for ways to improve. My next steps will be to enhance the UI, particularly for mobile devices, and improve the UX by handling errors and unexpected conditions more effectively. Currently, tokens are being distributed freely, but I plan to create a marketplace for them soon.

[BlockSlots](https://blockslots.xyz/) is now live on the Polygon Mumbai testnet. This means that users can start playing with test tokens and experience the thrill of betting and winning without having to risk real money.I am continuously working to improve and enhance the BlockSlots experience and look forward to receiving feedback as I move towards the mainnet launch.
