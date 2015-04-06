---
layout: post
title: Usando a API do CPLEX para C++
published: True
---

Nesse artigo eu vou mostrar um pouco da API do CPLEX para o C++. Veja esse [post sobre como compilar usando o gcc](http://hassanbaalbakiblog.blogspot.com.br/2011/06/clean-makefile-for-c-project-using-ilog.html).

Eu resolvi o problema de mapeamento de redes virtuais dentro do meu projeto de mestrado. Para resolver esse problema eu desenvolvi, entre outros algoritmos, um algoritmo de geração de colunas. Esse projeto foi desenvolvido em C++ e para resolver os problemas lineares eu utilizei o [IBM ILOG CPLEX 12.5](http://www-01.ibm.com/software/commerce/optimization/cplex-optimizer/). Para utilizá-lo você precisa ou comprá-lo ou ter uma licença acadêmica. O meu caso foi o último.

Abaixo um código tirado diretamente do arquivo de exemplo `ilolpex1.cpp`. Esse programa resolve o seguinte modelo:

![Programa Matemático](/assets/lineq.png)

Na linha 5 definimos uma `IloRangeArray` que é um vetor de restrições. Já na linha 6, definimos uma `IloNumVarArray` que é um vetor de variáveis. Na linha 13 criamos a função objetivo. O CPLEX usa mágica-macro para fazer com que as equações possam ser adicionadas ao modelo de maneira intuitiva. Finalmente nas linhas 26 e 27 criamos o resolvedor e resolvemos o problema.

{% highlight cpp linenos %}
#include <ilcplex/ilocplex.h>

//...

IloRangeArray c(env);
IloNumVarArray x(env);

x.add(IloNumVar(env, 0.0, 40.0));
x.add(IloNumVar(env, 0.0));
x.add(IloNumVar(env, 0.0));

IloModel model(env);
model.add(IloMaximize(env, x[0] + 2 * x[1] + 3 * x[2]));

c.add( - x[0] +     x[1] + x[2] <= 20);
c.add(   x[0] - 3 * x[1] + x[2] <= 30);
model.add(c);

IloCplex cplex(model);
cplex.solve();
{% endhighlight %}

A saída do programa vai ser

    Tried aggregator 1 time.
    LP Presolve eliminated 0 rows and 1 columns.
    Reduced LP has 2 rows, 3 columns, and 6 nonzeros.
    Presolve time =    0.01 sec.

    Iteration log . . .
    Iteration:     1   Dual infeasibility =             0.000000
    Iteration:     2   Dual objective     =           202.500000

Que nos dá o valor da solução ótima.

Em geral os dados de entrada não vão estar no código, mas sim em algum arquivo. O código abaixo mostra uma maneira alternativa de definir a função objetivo do código visto:

{% highlight cpp linenos %}
IloNumArray d(env, 3, 1, 2, 3);
model.add(IloMaximize(env, IloScalProd(x, d)));
{% endhighlight %}

Existe muito mais coisas para explorar no CPLEX, mas nesse artigo eu só queria dar uma pequena amostra da API. A melhor maneira de aprender é explorar os exemplos que acompanham a biblioteca e a documentação padrão.
