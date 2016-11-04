---
layout: post
title: Percorrendo árvores com generators e com o iteradores em ES6
---

Iteradores é uma nova feature do Javascript que permite que vários tipos de coleções possam ser percorridos de maneira uniforme. É uma implementação do famoso [padrão de projeto](https://en.wikipedia.org/wiki/Iterator_pattern).

Se um objeto possui a chave `Symbol.iterator`, é possível percorrê-lo usando `for...of` ou usando `...`. Veja o código abaixo, temos um objeto que possui uma lista de `items` e um iterador.

``` js
var threeItemObject = {
	items: [1,2,3],
	[Symbol.iterator]() {
		let i = 0;
		return {
			next: () => ({
				value: this.items[i],
				done: ++i > 3
			})
		};
	}
};
```

Assim podemos usar tanto:

```js
for (let item of threeItemObject) {
  console.log(item);
}
// 1
// 2
// 3
```

Quanto,

```
> ...[threeItemObject]
1 2 3
```

O objeto só precisa ter uma função associada a `Symbol.iterator` que retorna um objeto que implementa uma função `next`. Essa função precisa retornar um objeto que tenha as chaves `value` que é o valor do item corrente e `done` que é um booleano que indica se o iterador já terminou.

Assim podemos percorrer qualquer tipo de objeto da mesma maneira que percorremos arrays.

## Exemplo com árvores

Árvores são estruturas de dados bem loucas. Podem ser utilizadas para representar diversas coisas,
como por exemplo sistemas de arquivos ou hierarquias de classes.

As vezes queremos percorrer essas árvores. Por exemplo, se mantermos algumas
propriedades em nosso árvore, é possível percorrer os itens da árvore de forma ordenada.

Veja a árvore abaixo, por exemplo:

``` js
var tree = {
	data: 4,
	left: {
		data: 2,
		left: { data: 1 },
		right: { data: 3 }
	},
	right: {
		data: 5
	},
}
```

Toda a subárvore da esquerda de qualquer nodo tem valores menores que o nodo. Assim é possível achar um item da árvore em tempo `O(log n)` se a árvore estiver bem balanceada. E é possível obter a lista de itens ordenada em tempo `O(n)` a qualquer momento.

O algoritmo clássico para percorrer a árvore está apresentado abaixo. É um algoritmo recursivo, se a árvore não for vazia, retornamos uma array com todos os filhos da esquerda, seguidos pelo nodo atual, seguidos pelos filhos da direita. Esse algoritmo é chamado de `in-order traversal`.

```js
function inOrderRecursive(tree) {
	if (!tree) {
		return [];
	}
	return [...inOrderRecursive(tree.left),
      tree.data, ...inOrderRecursive(tree.right)];
}
```

Esse algoritmo recursivo é bem simples de ser implementado. Mas eu queria implementar um iterador de árvores com a nova construção da linguagem. Para simular o comportamento recursivo de maneira iterativa, eu utilizo uma pilha. Essa pilha é inicializada com a raiz da árvore. Cada vez que ela é chamada, ela empilha todos os nodos da direita e os pais até encontrar um nodo que não tem filhos na esquerda.

``` js
tree[Symbol.iterator] = function() {
	let stack = [this];
	function seekNext(node) {
		if (node.right) {
			stack.push(node.right);
		}
		if (node.left) {
			stack.push({ data: node.data });
			return seekNext(node.left);
		}
		return node.data;
	}

	return {
		next() {
			if (stack.length === 0) {
				return { done: true };
			}
			let node = stack.pop();
			return {
				value: seekNext(node)
			};
		}
	};
};
```

Veja o que acontece se usarmos o `...` nessa nossa função:

```
> ...tree
1 2 3 4 5
```

A maior vantagem de usar um iterator ao invés de construir uma array é que podemos percorrer a árvore de maneira iterativa. Por exemplo é possível obter o próximo item da árvore sempre que o usuário clica um botão. Além disso uniformizamos o acesso à nossa estrutura de dados, se o cliente quiser converter a árvore em uma array com o `Array.from()`, ele pode usar nossa estrutura.

## Generators

O único problema é que para coisas naturalmente recursivas, como árvores, a implementação do iterador é pouco direta. Tivemos que usar uma pilha e simular o comportamento recursivo. O código fica bem menos simples e por consequência fica difícil de modificar. Para resolver isso podemos usar `generators`.

Generators são funções que permitem que o fluxo de controle da função pause e continue depois de um tempo. Assim podemos implementar o iterator de maneira recursiva.

Para marcar que uma função é um generator, é preciso declarar a função com um asterisco: `function*()`. Assim podemos usar o `yield` ao invés de `return` para interromper o fluxo.

Vejamos como implementar a iteração com generators abaixo:

``` js
 function* inOrder(tree) {
	if (tree.left) {
		yield* inOrder(tree.left);
	}
	yield tree.data;
	if (tree.right) {
		yield* inOrder(tree.right);
	}
}
```
O algoritmo ficou igual a versão recursiva. Note que tivemos que usar o `yield*` que aceita um gerador também.

É possível agora usar esse gerador como se tivessmos implementado um iterador:

```
> ...inOrder(tree)
1 2 3 4 5
```

E para que tenhamos a mesma interface que antes é só modificar o iterador:

```js
tree[Symbol.iterator] = function() {
	return inOrder(this);
}
```
```
> ...tree
1 2 3 4 5
```
