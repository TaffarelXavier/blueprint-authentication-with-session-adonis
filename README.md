# Aplicativo de Autenticação com Sessão Usando Adonis

Este é o padrão completo do AdonisJs, vem pré-configurado com:

1. Bodyparser
2. Sessão
3. Autenticação
4. Middleware de segurança da Web
5. CORS
6. Mecanismo de modelo de borda
7. Lucid ORM
8. Migrations and seeds

## Configuração
Use o comando ``adonis`` para instalar o blueprint

adonis novo critério
ou clonar manualmente o repositório e depois executar ``npm install``.

## Migrações
Execute o seguinte comando para executar migrações de inicialização.

``adonis migration:run``

## Frontend

Entrar na pasta __``client``__ e abrir o arquivo __``index.html``__.

Não precisa fazer nada nesse arquivo, somente executar as funções como:

1. Registrar
2. Login
3. Mostrar Usuário logado.