---
layout: post
title: Dissertação de Mestrado
comments: true
---

Nesse artigo vou dar uma breve descrição da minha dissertação de mestrado. Ela foi realizada de 2013 a 2015 na UFRGS. O tema foi um Branch & Price para o problema de mapeamento de redes virtuais. O *problema de mapeamento de redes virtuais* (VNEP) é um dos principais problemas de *Virtualização de Redes* e tem ganhado notoriedade nos últimos anos. *Virtualização de redes* consiste em dividir uma mesma rede física entre múltiplas redes virtuais. O VNEP consiste em atribuir recursos físicos dessas redes para as diversas redes virtuais que dividem o substrato físico.

Nas figuras abaixo (retiradas de minha dissertação) estão uma instância e a solução desse problema.

![Instância de exemplo.](/assets/graph.png)

Esse problema é muito desafiante, foi provado como NP-Difícil e empiricamente mostrou-se difícil de se resolver. Na literatura científica, diversos autores resolveram versões simplificadas do problema (relaxando algumas restrições). Outros autores resolveram o problema de forma heurística utilizando-se de métodos construtivos ou meta-heurísticas.


No meu trabalho, resolvi o problema de forma exata utilizando programação matemática. A técnica de geração de colunas foi utilizada. Essa técnica resolve problemas com muitas variáveis que são impossíveis de resolver usando métodos tradicionais.

O método desenvolvido se mostrou muito mais eficiente na prática do que uma implementação tradicional usando o CPLEX. Esse método foi capaz de resolver instâncias muito maiores do que as que eram possíveis de resolver anteriormente, mostrando que métodos exatos também podem ser usados para resolver esse tipo de problema.

Se você quiser saber mais sobre o meu trabalho, ele [está disponível na íntegra no lume](http://hdl.handle.net/10183/115213).
