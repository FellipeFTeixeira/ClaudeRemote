# API de Móveis

API simples em TypeScript + Express com produtos moveleiros (dados em memória).

## Rodar

```bash
npm install
npm run dev      # desenvolvimento (recarrega ao salvar)
# ou
npm run build && npm start
```

Porta padrão: `3000` (altere com `PORT`).

## Endpoints

| Método | Rota | Descrição |
|---|---|---|
| GET | `/produtos` | Lista todos os produtos (filtro opcional `?categoria=sala`) |
| GET | `/produtos/:id` | Retorna um produto (404 se não existir) |
| POST | `/produtos` | Cria um produto (201) |

Categorias: `sala`, `quarto`, `cozinha`, `escritorio`, `jantar`, `externo`.

Exemplo de POST:

```bash
curl -X POST http://localhost:3000/produtos \
  -H 'content-type: application/json' \
  -d '{"nome":"Poltrona Lia","preco":799.9,"categoria":"sala"}'
```

Campos obrigatórios: `nome`, `preco` (> 0) e `categoria`.
