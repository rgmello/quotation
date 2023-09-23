# Sistema de Auxílio à Decisão de Investimentos

Este é um projeto para criar um sistema que auxilia investidores em suas decisões de compra/venda de ativos financeiros. O sistema registra periodicamente a cotação atual de ativos da B3 (Bolsa de Valores do Brasil) e notifica os investidores por e-mail quando houver oportunidades de negociação.

## Funcionalidades

- Exposição de uma interface web para configurar os ativos a serem monitorados;
- Definição dos parâmetros de túnel de preço para cada ativo;
- Configuração da periodicidade da verificação de preços para cada ativo;
- Armazenamento das cotações dos ativos de fontes públicas;
- Consulta dos preços armazenados dos ativos cadastrados;
- Envio de e-mails sugerindo compra quando o preço cruza o limite inferior do túnel;
- Envio de e-mails sugerindo venda quando o preço cruza o limite superior do túnel.

## Tecnologias Utilizadas

- Python com Django (backend)
- React (frontend)
- SQLite (banco de dados)
- API não-sei-o-quê (consulta de cotação)
- Biblioteca não-sei-qual (envio de e-mails)

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório para a sua máquina local:
```
git clone https://github.com/vonkakarius/quotation.git
```

2. Crie um ambiente virtual para isolar as dependências do projeto:
```
cd backend && python -m venv venv
```

3. Ative o ambiente virtual:

- No Windows:
  ```
  venv\Scripts\activate
  ```

- No macOS e Linux:
  ```
  source venv/bin/activate
  ```

4. Instale as dependências do projeto:
```
pip install -r requirements.txt
```

5. Configure as variáveis de ambiente necessárias (por exemplo, configurações sensíveis) em um arquivo `.env`.

6. Execute as migrações para criar as tabelas do banco de dados:
```
python manage.py migrate
```

7. Inicie o servidor de desenvolvimento:
```
python manage.py runserver
```

8. Inicie o frontend React em outro terminal:
```
cd ../frontend
npm start
```

9. Acesse o sistema em `http://localhost:3000` no seu navegador.