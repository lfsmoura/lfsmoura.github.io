---
layout: page
title: Head First Design Patterns
---

Livro bem didático, ideal para quem nunca ouviu falar de padrões de projeto. Ao invés de
listar os padrões em um catálogo, ele introduz aplicações e quais os problemas que podem surgir ao usar orientação a objetos, como
por exemplo a multiplicação da hierarquia de objetos ou o acoplamento entre módulos. O livro desenvolve cada padrão acompanhado de um problema e explica quais os princípios que motivam o uso desses padrões. Além disso ele apresenta aplicações ruins de padrões e quais os custos de cada padrão.

Os exemplos que levam aos problemas são em geral bem bobos (como um simulador de patos). Mas isso também ajuda na didática. Os código do livro são em _Java_, mas os conceitos são universais o suficiente para ser aplicados em outras linguagens, inclusiva as de tipagem dinâmica, como _javascript_.

Além de apresentar os padrões de projeto, _Head First Design Patterns_ introduz princípios e boas práticas de orientação a objetos, os ligando aos padrões. _Priorizar composição sobre herança_ é demonstrado com _Strategy_. O _princípio do conhecimento mínimo_, com _Facade_. O padrão _Iterator_ ilustra o _princípio da responsabilidade única_. Além dos outros padrões mais usados que são apresentados.

O livro mostra que nenhuma das ditas "regras" de OOP são escritas em pedra. Muitas das decisões de design são trade-offs entre necessidades. Em geral uma arquitetura mais flexível é mais difícil de entender para pessoas novas no projeto por exemplo. O padrão _Decorator_ por exemplo, quebra o princípio de _priorizar composição sobre herança_, já que um _Decorator_ deve herdar da interface que deseja expandir, mas faz isso para evitar modificar códigos antigos.

Recomendo como um primeiro contato com padrões de projeto. Mas mesmo para desenvolvedores mais experientes o livro pode ser muito útil para afiar a programação orientada a objetos. E se você já lidou com os problemas que são exemplificados no livro, possivelmente vai aprender muito mais e pode até mesmo aplicar nos seus projetos.
