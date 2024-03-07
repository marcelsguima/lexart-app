## Execução do projeto

# Execução local

Para executar o front-end do projeto localmente, executar o comandos "npm install", depois "npm start" na pasta raíz do projeto.
De dentro da pasta /api executar npm start para executar a API.
Fazer o cadastro de um usuário para gerar um token em http://localhost:3001/users/login com o body da requisição:

{
"email": "seuemail@email.com",
"password": "sua senha"
}

Com o token no gerado, será possível acessar todas as todas da aplicação utilizando o header "Authorization": {token}.

# Execução No Vercel

De dentro da pasta /api executar npm start para executar a API.
Fazer o cadastro de um usuário para gerar um token em http://localhost:3001/users/login com o body da requisição:

{
"email": "seuemail@email.com",
"password": "sua senha"
}

Com o token no gerado, será possível acessar todas as todas da aplicação utilizando o header "Authorization": {token}.

https://lexart-frontend.vercel.app/login

## Lista de Rotas

# Gerenciar telefones:

GET - /getAll: http://localhost:3001/phone/getAll
GET - /get/:id: http://localhost:3001/phone/get/:id
POST - /create: http://localhost:3001/phone/create
PATCH - /update/:id: http://localhost:3001/phone/update/:id
DELETE - /delete/:id: http://localhost:3001/phone/delete/:id

# Usuários

POST - /register http://localhost:3001/users/register
POST - /login http://localhost:3001/users/login
