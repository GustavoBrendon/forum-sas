# 💬 Projeto Fórum React

Este repositório contém um projeto de <a href="https://github.com/GustavoBrendon/forum-react">fórum online</a> com algumas medidas de segurança implementadas para o trabalho acadêmico na matéria de Segurança e Auditoria de Sistemas. 

## 📌 Objetivo

O objetivo do projeto foi aplicar princípios fundamentais e técnicas modernas de segurança da informação para proteger o processo de autenticação de um sistema crítico, simulando o ambiente de uma plataforma sensível como um fórum administrativo.

## 🚀 Métodos Utilizados

- Teclado virtual com teclas embaralhadas (conhecido como Randomized On-Screen Keyboard).
- Account Lockout (Bloqueio Temporário de Conta): Após um número definido de tentativas de login mal-sucedidas, a conta do usuário é temporariamente bloqueada, impedindo novas tentativas por um período determinado (por exemplo, 5 minutos). Isso reduz significativamente a eficácia de ataques automatizados que tentam adivinhar senhas.
- Exponential Backoff (Atraso Progressivo entre Tentativas): A cada tentativa falha de login, o sistema aumenta o tempo de espera antes de permitir uma nova tentativa, de forma exponencial (por exemplo: 1s, 2s, 4s, 8s...). Essa técnica dificulta ataques automatizados e força bruta, tornando-os demorados e ineficientes.

## ⚙️ Como Executar

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:

   ```bash
   git clone https://github.com/GustavoBrendon/forum-sas.git
   ```
   ```bash
   cd forum-sas
   ```
   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor backend:

   ```bash
   npm start ou npm run dev
   ```

4. Abra outro terminal:

   ```bash
   cd forum-sas
   ```
   ```bash
   cd frontend
   ```
   ```bash
   cd forum-frontend
   ```

5. Instale as dependências:

   ```bash
   npm install
   ```

6. Inicie o frontend:

   ```bash
   npm start ou npm run dev
   ```

7. Acesse `http://localhost:5173` no seu navegador.
