#!/usr/bin/env bash
set -e

echo "==> Instalando dependências do workspace..."
pnpm install --no-frozen-lockfile

echo "==> Buildando o frontend..."
PORT=5000 BASE_PATH=/ pnpm --filter @workspace/dellaretti run build

echo "==> Build concluído em artifacts/dellaretti/dist/public"
