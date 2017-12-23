---
layout: post
title: Navegando em grids em Python (desafios de programação)
---

No [problema de ontem do Advent of Code](http://adventofcode.com/2017/day/22), era preciso navegar em um grid infinito. Muitos problemas de desafios de programação envolvem navegar em um grid. 

Um grid é um tipo de grafo que representa um espaço 2D. Pode ser representada por uma matrix. Para acessar o elemento que está na posição `(x, y)` é só acessar o elemento `arr[y][x]` da matrix `arr`. Então as posições dos elementos no grid ficam dispostas da seguinte maneira:

|(0,0)|(1,0)|(2,0)|
|(0,1)|(1,1)|(2,1)|
|(0,2)|(1,2)|(2,2)|
||||

 Em geral só é possível andar em quatro direções, mas algumas vezes é possível andar diagonalmente também. Note que para representar como uma tabela nós invertemos os eixos. O y que é a linha da matrix cresce para baixo. Assim a posição acima do ponto `(x,y)` é `(x,y-1)`.

 No problema de ontem, o grid era infinito. Isso complica um pouco o problema. Se você sabe o tamanho máximo do grid é só criar uma tabela grande e navegar normalmente (listas em Python aceitam índices negativos, em outra linguagem é só usar o módulo).

 Para simplificar as coisas eu uso um dicionário para representar o grid. Assim as chaves no dicionário são tuplas. Para acessar o elemento que está na posição `(x, y)` é só acessar o elemento `dic[(x,y)]` do dicionário `dic`. Assim não precisamos saber o tamanho final que terá o dicionário. Se você precisar imprimir o grid na tela é só guardar o `x` e `y` mínimos que foram usados.

## Movendo-se no grid
Partindo de uma posição inicial `x,y` é possível se mover somando-se valores nessas coordenadas. Assim as quatro direções são:

```python
dirs = [(0,-1), (-1,0), (0,1), (1,0)]
```
Guardar as direções numa lista é útil também quando queremos pegar todos os vizinhos de uma certa posição:

```python
def neighbors(x, y): 
    return [ (x + x1, y + y1) for x1, y1 in [(0,-1), (-1,0), (0,1), (1,0)]]
```

## Virando a direita ou a esquerda
Se mantivermos as direções em uma lista ordenada é possível rotacionar a direção navegando na lista:
 ```python
dirs = [(0,-1), (-1,0), (0,1), (1,0)]
dir = 0 # direção inicial é para cima
# virando a direita (90 graus)
dir = (dir - 1) % 3
# virando a esquerda (270 graus)
dir = (dir + 1) % 3
# virando 180 graus
dir = (dir + 2) % 3
 ```

 Esse é o básico de como lidar com grids em desafios de programação, se você quiser ver mais posts como esse por aqui deixe um comentário.