---
layout: post
title: Trocando make por rake
---

    sed 's/Make/Rake/g'

Comecei a aprender Rails. Estava lendo sobre Rakefile e achei a ideia excelente. Sempre usei Make mas encontrava muitas limitações. Resolvi aprender rake.

Eu tenho um projeto de escrever um livro técnico e como bom programador comecei a fazer o script de build antes de escrever o livro. Escrevi usando o make e pandoc para gerar os artefatos. Ficou assim:

    CC=pandoc
    BROWSER=google-chrome 
    CFLAGS=—highlight-style pygments
    MDFILES:= $(wildcard src/*.md)
    HTMLFILES:= $(addprefix out/,$(notdir $(MDFILES:.md=.html)))

    all:  $(HTMLFILES)
     echo $<

    epub: src/introducao.md
     $(CC) -S $(CFLAGS) -o out/book.epub src/title.txt $<
     ls out

    out/%.html: src/%.md  
     $(CC) -s $(CFLAGS) -o $@ -i $<
     $(BROWSER) $@

    clean:  
     rm -f out/*.html

*Obs: repara os nomes de variáveis anacontextuais.*

Achei um tutorial sobre rake e para minha surpresa ele fazia exatamente a mesmo coisa que eu estava fazendo com o make, o que tornou minha tarefa mais simples. Meu Rakefile ficou assim:

{% highlight ruby %}
source_files = FileList.new("src/*.md")

task :default => :html
task :html => source_files.pathmap("out/%n.html")

rule ".html" => ->(f){source_for_html(f)} do |task|
 mkdir_p task.name.pathmap("%d") # ensure that the path exist
 sh "pandoc -s —highlight-style pygments -o #{task.name} #{task.source}"
 sh "google-chrome #{task.name}"
end

task :clean do
 rm_rf "out"
end

def source_for_html(html_file)
 html_file.pathmap("src/%n.md")
end
{% endhighlight %}

Eu ainda não sei se essa é a melhor maneira de fazer. Com o tempo eu pretendo melhorar esse Rakefile. Eu especialmente não gosto de usar o `source_for_html`.

Existem várias vantagens de usar rake ao invés de make (principalmente para projetos não C/C++):

* É possível usar ruby para fazer coisas mais complexas em cada regra;
* Não é preciso se preocupar com tabs, espaços e as regras malucas do make;
* É muito mais fácil de depurar o Rakefile;
* Rake é mais moderno e suportado, então é possível achar resoluções para novos problemas que surgem.

Se tu quiseres saber mais eu recomendo a [série de vídeos de Avdi Grimm](https://github.com/ruby/rake) e o [artigo do Martin Fowler sobre rake](http://martinfowler.com/articles/rake.html).
