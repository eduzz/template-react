ARQUITETURA
===========

### Environments (.env)

| NAME                 | DEFAULT    | REQUIRED | DESCRIPTION               |
|----------------------|------------|----------|---------------------------|
| REACT_APP_ENV        | production | false    | production or development |
| REACT_APP_API_HOST   |            | true     |                           |
| REACT_APP_SENTRY_KEY |            | false    | DNS public from sentry.io |

### Scripts do package.json

| Comando         | Descrição                                      | Quem usa                              |
|-----------------|------------------------------------------------|---------------------------------------|
| dev             | inicia o react-scripts-ts                      | Docker (dev) / desenvolvedor          |
| build           | gera os arquivos transpilados                  | Docker (durante build de produção)    |
| eject           | ejeta os arquivos do webpack (não recomendado) | desenvolvedor                         |
| docker:release  | build e da push na nova imagem do docker       | devensolvedor                         |
| docker:build    | build a nova imagem do docker                  | script docker:release / devensolvedor |
| docker:push     | dá push na nova imagem do docker               | script docker:release / devensolvedor |
| webpack-analyze | use para verificar o tamanho o bundle final    | devensolvedor                         |

### Sistema de pastas

### Premissas e Responsábilidades

### Boas práticas e pontos a serem observados
