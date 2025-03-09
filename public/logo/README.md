<a href="http://www.equilibriumweb.com" style="width:100%margin:30px 0px" target="_blank">
<img alt="EquilibriumWeb" src="http://www.equilibriumweb.com/2015/wp-content/themes/equilibriumweb/img/logo.png" width="280" />
</a>

# backend

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configurando e Subindo Projeto](#subindo-aplicacao)
  - [Intellij IDEA](#intellij)
  - [Spring Tools](#springtools)

## Tecnologias Utilizadas

| Tecnologia                   | Descrição                                                                                                                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Java 16                      | Linguagem de programação orientada a objetos. Versão recomendada: [download](https://docs.aws.amazon.com/corretto/latest/corretto-16-ug/downloads-list.html) |
| Apache Maven                 | Gerenciador de dependências do projeto. [download](http://maven.apache.org/download.cgi)                                                                     |
| Docker e Docker Compose      | Conteinerização do projeto. [download](https://docs.docker.com/get-docker/)                                                                                  |
| Intellij IDEA ou SpringTools | Ambientes de desenvolvimento recomendados. [download-intellij](https://www.jetbrains.com/idea/download/), [download-sts](https://spring.io/tools)            |
| Git                          | Versionamento de código. [download](https://git-scm.com/downloads)                                                                                           |
| Redis                        | Sistema de armazenamento de dados em memória de código aberto, de estrutura de dados-chave-valor, usado como banco de dados, cache e broker de mensagens.    |
| Keycloak                     | Solução de código aberto para autenticação, autorização e gestão de identidades, frequentemente utilizada em aplicações web e serviços RESTful.              |

## Configurando e Subindo Projeto

1. Configure as variáveis de ambiente do Java e Maven
2. Realize o clone do Projeto na sua workspace: git clone https://gitlab.equilibriumweb.com/eqweb/projeto-eqprev/backend.git

## Antes de buildar as aplicações

1. Na raiz do projeto existe um settings.xml, você deve adicionar esse arquivo na sua pasta .m2
2. Geralmente essa pasta fica em _C:\Users\seu-usuario\.m2_

## Intellij IDEA

1. Realize a importação do projeto na ide clicando em Open e buscando a pasta onde você realizou o clone do projeto.
2. Selecione a versão do JDK para o projeto em: File > Project Structure > SDK (Selecione o JDK16 instalado), após clique em OK.
3. Faça checkout para a branch de desenvolvimento.

#### Build dos Starters

##### Build por Linha de Comando

1. Acesse a pasta equilibrium-springboot-starters: cd equilibrium-springboot-starters
2. Dentro dessa pasta execute: mvn clean install OBS: É necessário estar com a versão do JAVA 16 configurada em sua máquina, caso contrário ocorrerar erro no build.
   OBS: Caso algum starter não seja buildado, rode o comando dentro da pasta específica do starter.

##### Build pela Configuração do Intellij

1. Clique em: Current File > Edit Configurations... > + Add new Configuration > Maven
2. Em name dê o nome de sua prefência. Após, clique em run e digite o comando: clean install.
3. Em Working Directory selecione o diretório, ex: ~\IdeaProjects\backend\equilibrium-springboot-starters
4. Execute o build do maven clicando no botão de play.

#### Build dos Microsservices

1. Execute o script compile.sh ou execute os passos executados em _Build pela Configuração do Intellij_ para realizar o Build pela Configuração do Intellij

#### Configuração dos Microservices

1. Clique em Edit Configuration, após no botão de + para incluir uma nova configuração.
2. Selecione o tipo Application insira o nome, exemplo, service-discovery
3. Selecione o módulo, por exemplo: service-discovery
4. Selecione a Main Class do módulo: com.equilibrium.eqprev.Application
5. Em Environment variables, adicione as variáveis de ambientes para o serviço: ATENTACLOUD*ATIVO_EQPREV=true;ATENTACLOUD_HOST_EQPREV=http://10.4.6.185/;ATENTACLOUD_HOST_EXTERNO_EQPREV=https://beneficiario.igeprev.pa.gov.br/tcloud/;ATENTACLOUD_LOGIN_EQPREV=eprev;ATENTACLOUD_SENHA_EQPREV=inteligente42;DB_DRIVER_EQPREV=oracle.jdbc.OracleDriver;DB_PASS_EQPREV=_UepDv2@21*;DB_URL_EQPREV=jdbc:oracle:thin:@(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = 144.22.196.88)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED) (SERVICE_NAME = eqprev_pdb1.sub.redeequilibrium.oraclevcn.com)));DB_USER_EQPREV=EPREVDEV
   Repita o processo para cada serviço da aplicação.
6. Starte os serviços começando sempre pelo service-discovery, api-gateway e security-service. Caso tenha dúvida sobre as dependências entre os serviços, verifique o arquivo docker-compose.yml

#### Start do Keycloak

1. Basta acessar a pasta keycloak e rodar o script start-keycloak.sh

#### Comando para subir o redis

1. Acessar o módulo micro-services
2. docker network create eqprev-network
3. docker run -p 6379:6379 --expose 6379 -v /cache:/data --add-host=host.docker.internal:172.17.0.1 --network eqprev-network --env-file eqprev.env redis
