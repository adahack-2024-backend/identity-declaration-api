# API do Formulário de Diversidade

A API do Formulário de Diversidade é responsável por fornecer as perguntas e opções de resposta para os formulários de diversidade de funcionários internos e candidatos externos.

## Endpoints para fornecimento de dados do formulário

### GET /diversity/questions

- **Descrição:** Fornece as perguntas do formulário de diversidade para funcionários internos.
- **Método HTTP:** GET
- **URL:** `api/diversity/questions`
- **Autenticação Requerida:** Sim
- **Parâmetros de Requisição:** Não aplicável.
- **Formato de Resposta Esperado:**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "Qual é sua faixa etária?",
      "options": [
        "Menos de 18 anos",
        "18-24 anos",
        "25-34 anos",
        "35-44 anos",
        "45-54 anos",
        "55-64 anos",
        "65 anos ou mais"
      ]
    },
    {
      "id": 2,
      "question": "Qual é a sua identidade de gênero auto declarada?",
      "options": [
        "Homem cisgênero",
        "Mulher cisgênero",
        "Homem transgênero",
        "Mulher transgênero",
        "Não-binário",
        "Prefiro não dizer",
        "Outro"
      ]
    },
    {
      "id": 3,
      "question": "Qual é a sua identidade étnica/racial auto declarada?",
      "options": [
        "Branco - Caucasiano",
        "Negro - Africano/Afro-americano",
        "Hispânico ou Latino",
        "Asiático",
        "Indígena",
        "Prefiro não dizer",
        "Outro"
      ]
    },
    {
      "id": 4,
      "question": "Você se identifica como LGBTQIAPN+?",
      "options": [
        "Sim",
        "Não",
        "Prefiro não dizer"
      ]
    },
    {
      "id": 5,
      "question": "Você é pai ou mãe?",
      "options": [
        "Sim",
        "Não",
        "Prefiro não dizer"
      ]
    },
    {
      "id": 6,
      "question": "Você é uma pessoa portadora de deficiência?",
      "options": [
        "Deficiência visual",
        "Deficiência auditiva",
        "Deficiência motora",
        "Deficiência intelectual",
        "Deficiência psicossocial",
        "Não possuo deficiência",
        "Prefiro não dizer",
        "Outra"
      ]
    }
  ]
}
```
- **Códigos de Resposta Possíveis: 200 (OK), 401 (Não Autorizado), 500 (Erro Interno do Servidor)**
##

### GET /diversity/questions

- **Descrição:** Fornece as perguntas do formulário de diversidade para candidatos externos.
- **Método HTTP:** GET
- **URL:** `api/diversity/questions`
- **Autenticação Requerida:** Não
- **Parâmetros de Requisição:** Não aplicável.
- **Formato de Resposta Esperado:**
```json
{
  "questions": [
    {
      "id": 1,
      "question": "Qual é sua faixa etária?",
      "options": [
        "Menos de 18 anos",
        "18-24 anos",
        "25-34 anos",
        "35-44 anos",
        "45-54 anos",
        "55-64 anos",
        "65 anos ou mais"
      ]
    },
    // ...
  ]
}
```
- **Códigos de Resposta Possíveis: 200 (OK), 500 (Erro Interno do Servidor)**
##

### POST /diversity/internal/submit

- **Descrição:** Permite a submissão de respostas do formulário de diversidade por funcionários internos.
- **Método HTTP:** POST
- **URL:** `api/diversity/internal/submit`
- **Autenticação Requerida:** Sim
- **Parâmetros de Requisição:**
```json
{
  "responses": {
    "ageGroupCode": "25-34",
    "genderCode": "non-binary",
    "ethnicityCode": "hispanic-latino",
    "disabilityCode": "visual-impairment",
    "lgbtqia": true,
    "parent": true,
    "isInternalResponse": true (opcional)
  }
}
```
- **Formato de Resposta Esperado:**
```json
{
  "status": "success",
  "message": "Respostas submetidas com sucesso."
}
```
- **Códigos de Resposta Possíveis: 200 (OK), 400 (Requisição Inválida), 401 (Não Autorizado), 500 (Erro Interno do Servidor)**
##

### POST /diversity/external/submit

- **Descrição:** Permite a submissão de respostas do formulário de diversidade por candidatos externos.
- **Método HTTP:** POST
- **URL:** `api/diversity/external/submit`
- **Autenticação Requerida:** Não
- **Parâmetros de Requisição:**
```json
{
  "responses": {
    "ageGroupCode": "25-34",
    "genderCode": "non-binary",
    "ethnicityCode": "hispanic-latino",
    "disabilityCode": "visual-impairment",
    "lgbtqia": true,
    "parent": true
  }
}
```
- **Formato de Resposta Esperado:**
```json
{
  "status": "success",
  "message": "Respostas submetidas com sucesso."
}
```
- **Códigos de Resposta Possíveis: 200 (OK), 400 (Requisição Inválida), 500 (Erro Interno do Servidor)**
##

## Autenticação

Funcionários precisam fornecer um `token` válido em cada requisição ao endpoint `api/diversity/internal/questions` e `api/diversity/internal/submit`. O token é obtido no login.

## Segurança HTTPS

A comunicação com a API deve ser feita usando HTTPS para garantir a segurança. Todas as práticas de segurança da indústria são seguidas, incluindo o armazenamento seguro de tokens e a criptografia de informações sensíveis.