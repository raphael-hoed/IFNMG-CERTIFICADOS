#IFNMG - CADASTRO DE CERTIFICADOS NO IFNMG

##PREPARANDO PARA RODAR A APLICAÇÃO
Siga os passos abaixo antes de rodar sua aplicação de cadastro de certificados
- Clone o repositório IFNMG-CERTIFICADOS para para a sua máquina usando o comando: git clone https://github.com/raphael-hoed/IFNMG-CERTIFICADOS
- Para rodar sua aplicação você precisará do NPM e Node.js. Certifique-se de tê-los instalados antes de rodar a aplicação.
- Abra o ser terminal de comandos. 
- Navegue até o diretório raiz da sua aplicação de Certificados IFNMG e rode o comando: npm install gulp
- Você poderá rodar a sua aplicação com o comando node app.js
- Ao rodar o comando acima, uma mensagem de erro pode ser retornada requerindo alguns módulos. Nesse caso, instale os módulos a seguir:

        > npm install express
		> npm install express-session
		> npm install compression
        > npm install serve-static
		> npm install path
		> npm install cookie-parser
		> npm install body-parser
		> npm install cors
		> npm install jade
		> npm install cf-deployment-tracker-client
		> npm install async
		> npm install ws
		> npm install ibm-blockchain-js
		> npm install morgan
		
***

##USANDO O APLICATIVO
- Após os passos acima e instalação dos módulos requeridos, você poderá rodar a sua aplicação com o comando:
        > node app.js
- Se tudo der certo você verá uma mensagem:
        > ------------------------------------------ Websocket Up ------------------------------------------
- Para abrir a aplicação, vá até o seu browser e digite: localhost:3000		
- No menu CADASTRAR CERTIFICADO você poderá cadastrar os dados do aluno diplomado. 
- No canto inferior esquerdo você poderá ver as transações armazenadas no blockchain. Após fazer um cadastro, pode ser necessário aguardar um tempo até que o pedido de cadastro recém feito seja armazenado no Blockchain (normalmente menos de um minuto). Caso o cadastro feito não esteja aparecendo, atualize a sua página com F5

