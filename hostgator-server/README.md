# Dellaretti API — Deploy no Render

## Passo a passo

### 1. Suba o código para o GitHub

Crie um repositório no GitHub e faça upload **apenas** do conteúdo desta pasta (`hostgator-server/`).  
Não inclua o arquivo `.env` — as variáveis ficam no painel do Render.

```
/
├── server.js
├── package.json
├── render.yaml
└── README.md
```

### 2. Crie o serviço no Render

1. Acesse [render.com](https://render.com) e faça login
2. Clique em **"New → Web Service"**
3. Conecte ao seu repositório GitHub
4. Configure:
   - **Name:** `dellaretti-api`
   - **Region:** Oregon (US West)
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### 3. Configure as variáveis de ambiente

No painel do serviço → **"Environment"** → adicione:

| Variável | Valor |
|---|---|
| `DB_HOST` | `localhost` ou IP externo do MySQL |
| `DB_USER` | `contabilidade` |
| `DB_PASS` | sua senha do banco |
| `DB_NAME` | `contabil_wp520` |
| `ADMIN_TOKEN` | `dellaretti@admin2024` |
| `PAGBANK_TOKEN` | seu token do PagBank |
| `DISCORD_WEBHOOK_URL` | (opcional) webhook do Discord |

### 4. Deploy

Clique em **"Create Web Service"**. O Render fará o build e iniciará o servidor.  
Após o deploy, você receberá uma URL no formato:

```
https://dellaretti-api.onrender.com
```

### 5. Atualize o frontend

No Replit, atualize a variável `VITE_API_URL` do frontend com a URL do Render.

### 6. Teste

```
https://dellaretti-api.onrender.com/api/healthz
```

Resposta esperada: `{"status":"ok"}`

---

## Banco de dados MySQL externo (Hostgator)

Para conectar o Render ao MySQL da Hostgator, a Hostgator precisa permitir conexões externas.

No cPanel da Hostgator → **"MySQL Remoto"** → adicione o IP do Render (ou `%` para permitir todos).

Depois, use no `.env`:
```
DB_HOST=SEU_IP_OU_HOSTNAME_HOSTGATOR
```
