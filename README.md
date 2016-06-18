#IFNMG - CADASTRO DE CERTIFICADOS NO IFNMG

##PREPARANDO PARA RODAR A APLICAÇÃO
Siga os passos abaixo antes de rodar sua aplicação de cadastro de certificados
- Clone o repositório IFNMG-CERTIFICADOS para para a sua máquina usando o comando: 

        > git clone https://github.com/raphael-hoed/IFNMG-CERTIFICADOS

- Para rodar sua aplicação você precisará do NPM, Node.js, GoLang Environment (disponível para download em https://golang.org/dl/). Certifique-se de tê-los instalados antes de prosseguir. Se você estiver usando o sistema operacional Windows, você pode instalar o Cygwin  para usar o comando npm.
- Abra o seu terminal de comandos. 
- Navegue até o diretório raiz da sua aplicação de Certificados IFNMG e rode o comando: 

        > npm install
        
***

##USANDO O APLICATIVO
- Após os passos acima, você poderá rodar a sua aplicação com o comando:

        > node app.js

- Uma série de mensagens irá aparecer na janela do terminal. Se tudo der certo, após carremento, você verá a seguinte mensagem:

        > ------------------------------------------ SERVIDOR OK -----------------------------------
- Após visualizar essa imagem você já poderá usar a aplicação. ATENÇÃO: NÃO FECHE O TERMINAL DE COMANDOS ONDE FORAM REALIZADOS TODOS OS PASSOS ANTERIORES. Apenas minimize-o.
- Para abrir a aplicação, vá até o seu browser e digite: localhost:3000. O seu aplicativo será aberto conforme imagem a seguir:

![](/tutorial_imagens/imagem1.png)
		
- Após clicar no menu CREATE você poderá cadastrar os dados do aluno diplomado:

![](/tutorial_imagens/imagem2.png)
 
- Clicando no canto inferior esquerdo você poderá ver as transações armazenadas no blockchain. Após fazer um cadastro, pode ser necessário aguardar um tempo até que o pedido de cadastro recém feito seja armazenado no Blockchain (normalmente menos de um minuto).

![](/tutorial_imagens/imagem3.png)

- Você poderá observar que cada transação salva no blockchain possui um ID. Esse ID é único para cada certificado salvo no blockchain.

![](/tutorial_imagens/imagem4.png)

- Clicando no botão imprimir, você poderá imprimir o certificado digital. O formato será parecido com o da imagem abaixo:

![](/tutorial_imagens/imagem6.png) 

- O campo formulário CREATE deverá ser futuramente, de acesso restrito para funcionários do IFNMG. Apenas funcionários autorizados poderão cadastrar os certificados digitais.

***

##CASO ENCONTRE ALGUM PROBLEMA...

- Se ao abrir a aplicação você visualizar o aviso abaixo (no canto superior direito), aguarde até um minuto para que o seu servidor se conecte ao blockchain.

![](/tutorial_imagens/imagem5.png)

- Se mesmo seguindo os procedimentos anteriores você não conseguir rodar a sua aplicação, entre em contato com o desenvolvedor pelo endereço de e-email: raphael.hoed@gmail.com
