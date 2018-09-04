ARQUITETURA
===========

### Environments (.env)

| NAME                 | DEFAULT    | REQUIRED | DESCRIPTION               |
|----------------------|------------|----------|---------------------------|
| REACT_APP_ENV        | production | false    | production or development |
| REACT_APP_API_HOST   |            | true     |                           |
| REACT_APP_SENTRY_KEY |            | false    | DNS public from sentry.io |

### Scripts do package.json

| Comando         | Descrição                                      | Quem usa                           |
|-----------------|------------------------------------------------|------------------------------------|
| dev             | inicia o react-scripts-ts                      | Docker (dev) / desenvolvedor       |
| build           | gera os arquivos transpilados                  | Docker (durante build de produção) |
| eject           | ejeta os arquivos do webpack (não recomendado) | desenvolvedor                      |
| webpack-analyze | use para verificar o tamanho o bundle final    | devensolvedor                      |
| update-base     | use atualizar a base do app                    | devensolvedor                      |

### Sistema de pastas

* assets: pasta aonde contem as imagens, o css global e a configuração do tema.
* components: componentes do React.
    * Abstract: componentes abstratos que servem como base para outros.
    * Dialogs: componentes de dialogs gerais do sistema.
    * Layout: componentes que servem como base estrutura para o layout.
    * Pages: componentes que são as tela separadas pelas áreas.
    * Router: componente responsável pelas rotas.
    * Shared: components genéricos para auxiliar.
* declarations: custom typings para o Typescript.
* decorators: decorators para aplicar os HOC (Higher-Order Components), pois assim não afetará o typescript.
* errors: classes de erro.
* formatters: funções para formatar dado.
* helpers: funções genéricas que auxiliam na tarefa.
* interfaces: interfaces gerais.
* rxjs-operators: operadores do RxJs criados para o projeto.
* services: responsável pela lógica de nogocio e a comunicação com o servidor.

---

Se um component precisar de um sub-component este deve ficar na mesma pasta/subpasta do component pai.

```bash
# Estrura de pasta de componens
component1
  - index.tsx
  - subcomponent1.1.tsx
  - subcomponent1.2
    - index.ts
    - subcomponent1.2.1.tsx
component2
```

### Router

O router foi configurado para gerenciar todas as rotas, verificar acesso e montar as url.  

A configuração começa no arquivo **routes.tsx**, ele dá a base das rotas, se o component
tiver uma propriedade estática chamada **routes** ela será utilizada para criar uma sub-rota
e assim por diante.

Todas as rotas devem implementar a interface **IAppRoute**, com ela é possível dizer se o item deve
aparecer no menu ou não e quais *roles* terão acesso a essa rotas específica. Uma rota apenas aparecerá
no menu se tiver a propriedade **sideDrawer** e, se for uma sub-rota, seu pai tiver também.

### Boas práticas e pontos a serem observados

* O serviços são responsáveis pela **lógica de negócio, comunicação do servidor e guardar o estado geral**.
* Usar **arrow function para methods dos components** ajudam a melhorar a performance e evita render desnecessários, 
  salvo os de livescycle do react.
* Sempre que utilizar um RxJs Observable, utilize o operator **logError**, caso de um erro ele logará esse erro 
  no sentry.io, **mas ele não tratará o erro**.
* Se utilizar um serviço que retorne um RxJs Observable, utilizar o operator **bindComponent**, ele serve para dar
  unsubscribe quando o component não for mais utilizado (componentWillUnmount)
* Utilize a principio um **PureComponent** para um component pois ele é mais rapido que um **Component**.