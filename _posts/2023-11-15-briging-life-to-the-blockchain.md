---
layout: post
title: Bringing Life to the Blockchain
---

The Game of Life, or just 'Life' for short, was created by John Conway, a British mathematician, back in 1970. Its name can be deceiving because it's not what most would call a game. You don't really play it in the traditional sense. Instead, you set it up initially and then just watch how it unfolds on its own. You start by setting up some initial patterns and then see how they evolve over time. What's cool about it is that it's Turing complete, meaning it can perform some pretty complex computations, like running a calculator or even ChatGPT.

Here's what it looks like:

<div style="display: flex; justify-content: center">
<table style='border-collapse: collapse; border: 1px solid black; max-width: 300px'>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: black; background-color: black'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>    
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: black; background-color: black'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: black; background-color: black'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: black; background-color: black'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: black; background-color: black'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
  </tr>
    <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
  </tr>
    <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; color: white'>0</td>
  </tr>
</table>
</div>

The game runs on a two-dimensional board. Each cell is either ALIVE (black in the image above) or DEAD (white in the image above). The game progresses in steps. At each step, based on simple rules, cells can come to life, or they can die. There are actually just four rules:

1. **Lonely Cells Don't Survive**: If a cell has fewer than two neighbors around, it gets lonely and doesn't make it.
2. **The Sweet Spot of Friendship**: If a cell has two or three neighbors, it's in the perfect social circle. Not too crowded, nor too lonely. Just the right amount of friends to keep going strong.
3. **Too Many Friends, Too Much Drama**: Now, if a cell has more than three neighbors, it's like being in a super crowded place. Too many people, too much drama, and our cell just can't handle it. It gets overwhelmed and, well, it's game over for that cell.
4. **The Magic of Three for New Beginnings**: Imagine a cell that's not active (like it's taking a nap). If exactly three active cells come around it, they wake it up! It's like having three friends come over and say, "Hey, join the party!" And the cell is back in the game, ready to live it up.

With just those simple rules, very complex behavior emerges. If you believe we will reach AGI someday, it could even demonstrate intelligence.

## Life Collection

I have been fascinated by this game for over ten years. The other day, I was in the swimming club's locker room when the idea struck me: each 'Life' seed is a world of its own.

There are an infinite number of possible seeds. Some of them create very interesting patterns, while others just disappear in a couple of steps.
What if we could catalog all the interesting patterns and name them? Similar to what scientists do with stars and constellations.
What if you could own the game of life? People would discover patterns that please them, catalog them, and name them. We could crowdsource the cataloging of interesting patterns.

This idea excited me a lot. Could we start a new trend: extending the notion of digital ownership to the mathematical domain? Could you own mathematical objects? We could create a new appreciation for those objects and "turn them into concrete things." So, I rolled up my sleeves and started creating [Life Collection](https://lifecollection.org/), a mathematical NFT.

## Representing a Seed in the Smart Contract

To reduce the scope of the project, we are only dealing with finite seeds. A seed could be represented as an `N x N` matrix, where `N` is the number of columns. Each cell has a `1` for a live cell and a `0` for a dead cell. Here's an example seed:

<div style="display: flex; justify-content: center">
<table style='border-collapse: collapse; border: 1px solid black; max-width: 300px'>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; background-color: #eef'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; background-color: #eef'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; background-color: #eef'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; background-color: #eef'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px; background-color: #eef'>1</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
  </tr>
  <tr>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
    <td style='border: 1px solid black; text-align: center; padding: 5px;'>0</td>
  </tr>
</table>
</div>

Storing data on the blockchain is expensive, so creating an array of arrays of numbers would be unnecessarily costly. Instead, what I did was to first concatenate all zeros and ones into a single vector. Each line is concatenated with the next one like so:

```
0000000000000000000100000000100000111000000000000000000000000000
```

Next, I simply convert that string to a binary number, so with an `uint64` we can store an `8 x 8` seed:

```
17627485306880
```

Want to see it live? You can [play around on the editor](https://lifecollection.org/editor) right now to see what number each seed is converted to.

## The Advantages of This Approach

There are a couple of advantages to doing it this way:

- **Compactness and ease of uniqueness verification**: Comparing matrices is cumbersome and costly. Comparing numbers is easy. Saving computation almost always pays off when creating smart contracts.
- **Storing minted seeds for transparency and uniqueness**: It's easy to check for unique seeds and whether a seed was already minted.

Do you want to own these marvelous mathematical constructs? [Follow me on x.com](https://twitter.com/lfsmoura) and on [friend.tech](https://www.friend.tech/) where I post the latest news about this and all my projects!
