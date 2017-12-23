---
layout: post
title: Python Cheat Sheet
---

Profissionalmente eu uso C++. Mas para desafios de programação como o [Project Euler](https://projecteuler.net/) e [Advent of Code](http://adventofcode.com/), eu costumo usar Python. O problema é mudar de contexto e lembrar como fazer as coisas em python. Por isso eu fiz essa pequena cola de Python para uso pessoal. Espero que isso possa ajudar alguém também.

Com o tempo eu vou editar e adicionar mais coisas a essa lista.

## Estrututras de dados
O `Defaultdict` é um dicionário que não lança uma exceção quando não acha alguma chave, ele retorna um valor padrão:
```python
from collections import defaultdict

dd = defaultdict(int)
```

Flat de uma matriz (um nível):
```python
list(itertools.chain.from_iterable([[1,2], [3]])) # [1,2,3]
```

Rotacionar uma matrix:
```python
def rotate(m): return list(map(list, zip(*list(m)[::-1])))

rotate([[1,2],[3,4]]) # [[3, 1], [4, 2]]
```

Tamanho de únicos em uma lista:
``` python
len(set([1,2,2])) == 2
```

Contar elementos:
``` python
[1,2,2].count(2) == 2
```

Percorrer lista com índices:
``` python
for i, value in enumerate([1,2]): print(i, value)
```

Percorrer dicionário:
``` python
for key, value in d.items(): print(key, value)
```

## Strings

```python
','.join([1,2,3]) == '1,2,3'
```

Detectando se uma string é um inteiro
```python
# não detecta números negativos
"12".isdigit()
# pode ser substituído por float
try:
    return int(y)
except ValueError:
    # faz outra coisa
```

## Lendo a entrada
```python
import sys
sys.stdin.readlines()
```

```python
input() # read string
eval(input()) #parse next argument
```

```python
# lê entrada pa/53
p = re.search(r'p([a-p])/(\d+)', move)
a, b = p.group(1), p.group(2)
```

## Funcional
```python
from functools import reduce

reduce(lambda s, x: s + x], [1,2,3], 0) == 6
```

