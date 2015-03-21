---
layout: post
title: Deployment Contínuo
---

É o processo de teste de cada mudança feita no código frequentemente e o mais cedo possível.

Por diversos motivos o código pode deixar de funcionar durante um ciclo. Ou um programador inseriu um erro na base de código. Ou uma API deixou de ser suportada por um terceiro. É aí que o deployment contínuo entra em ação. Quanto mais tempo para detectar um erro, mais custoso esse erro vai ser.

Código é por natureza incremental. Imagina que um erro ou de lógica ou de usabilidade seja inserido na base de código. Se o ciclo de deployment tem uma duração de duas semanas, significa que por todo esse tempo os outros membros do time vão construir código sobre essa peça ruim. Agora só no final das duas semanas o erro vai ser detectado. O que vai ter um custo bem maior de consertar do que se o problema tivesse sido detectado no mesmo dia. É mais ou menos como levantar uma parede com um tijolo com problema: para arrumar tudo vai ser preciso remover todos os tijolos que estão em cima.

O deployment deve ser além de frequente, automatizado. Onde existe ações de humanos existe a) ações não-documentadas b) erros. Os dois podem ser reduzidos através da automação de tudo que pode ser automatizado no processo de desenvolvimento. 
