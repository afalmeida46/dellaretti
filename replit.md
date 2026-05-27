# Contabilidade Dellaretti

## Projeto
Site institucional da Contabilidade Dellaretti com landing page, área de pagamento integrada ao PagBank e assistente virtual via Voiceflow.

## Estrutura

### Artifacts
- **dellaretti** (`artifacts/dellaretti`) — Frontend React + Vite + TypeScript + Tailwind. Preview: `/`
- **api-server** (`artifacts/api-server`) — Backend Express + TypeScript. Preview: `/api`
- **mockup-sandbox** (`artifacts/mockup-sandbox`) — Servidor de preview de componentes. Preview: `/__mockup`

### Frontend — Páginas
- `/` — Home (Hero, About, Services, Contact, AppDownload)
- `/abra-sua-empresa` — Página para abertura de empresa com planos
- `/troque-de-contador` — Página para migração de contador
- `/pagamento` — Área de pagamento com PagBank (cartão recorrente + Pix)
- `/politica-de-privacidade` — Política de privacidade

### Backend — Rotas API
- `GET /api/healthz` — Health check
- `POST /api/leads` — Recebe leads dos formulários (Quiz Modal)
- `GET /api/leads?token=...` — Lista leads (admin)
- `POST /api/contato` — Recebe formulário de contato
- `POST /api/pagamento/checkout` — Processa pagamento via PagBank (Pix, cartão recorrente, ou consultoria one-shot)
- `GET /api/pagamento?token=...` — Lista pagamentos (admin)

## Funcionalidades

### Chatbot
- Voiceflow widget integrado no `index.html` (Project ID: `69b90020db48f3de12cf7f36`)
- Aparece como botão flutuante no canto inferior esquerdo

### Segurança Frontend
- Bloqueio de clique direito (contextmenu)
- Bloqueio de Ctrl+U (ver código-fonte)
- Bloqueio de F12 e DevTools via atalhos de teclado
- Detecção de DevTools aberto via diferença de dimensão de janela
- Redirecionamento para imagem de bloqueio ao detectar violação

### Pagamento (PagBank)
- Token armazenado como secret: `PAGBANK_TOKEN`
- Suporta Pix (geração de QR Code), Cartão de Crédito Recorrente (assinatura mensal) e Consultoria one-shot (pagamento único via /orders)
- Fluxo em 3 etapas: Escolha do plano → Método de pagamento → Dados pessoais/cartão
- Pagamentos armazenados em memória no API server e expostos no painel admin

### Painel Admin (`/admin`)
- Senha: `dellaretti@admin2024`
- Duas abas: Leads (formulários do site) e Pagamentos (sincronizados com PagBank)
- Mostra total recebido, status de cada pagamento (Pago, Aguardando, Recusado), método (Pix/Cartão) e ID do PagBank
- Botão de sincronizar atualiza ambos simultaneamente

### Mockup 3D do Celular
- Imagem `phone-mockup.png` exibida na seção "Aplicativos"
- Botões para App Store e Google Play

## Secrets / Variáveis de Ambiente
- `PAGBANK_TOKEN` — Token da API do PagBank (production)

## Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Wouter, shadcn/ui, Framer Motion
- **Backend**: Express 5, TypeScript, Pino (logging), esbuild
- **Pagamento**: PagBank API (`https://api.pagseguro.com`)
- **Chatbot**: Voiceflow Widget Next
