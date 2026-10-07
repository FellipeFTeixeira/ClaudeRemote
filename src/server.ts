import express, { Request, Response } from "express";
import { produtos } from "./data/produtos";
import { Categoria, NovoProduto, Produto } from "./types";

const app = express();
app.use(express.json());

const CATEGORIAS: Categoria[] = [
  "sala",
  "quarto",
  "cozinha",
  "escritorio",
  "jantar",
  "externo",
];

// GET /produtos?categoria=sala
app.get("/produtos", (req: Request, res: Response) => {
  const { categoria } = req.query;
  const resultado =
    typeof categoria === "string"
      ? produtos.filter((p) => p.categoria === categoria)
      : produtos;
  res.json(resultado);
});

// GET /produtos/:id
app.get("/produtos/:id", (req: Request, res: Response) => {
  const produto = produtos.find((p) => p.id === Number(req.params.id));
  if (!produto) {
    res.status(404).json({ erro: "Produto não encontrado" });
    return;
  }
  res.json(produto);
});

// POST /produtos
app.post("/produtos", (req: Request, res: Response) => {
  const erros = validar(req.body);
  if (erros.length > 0) {
    res.status(400).json({ erros });
    return;
  }

  const body = req.body as NovoProduto;
  const novo: Produto = {
    id: Math.max(0, ...produtos.map((p) => p.id)) + 1,
    nome: body.nome,
    descricao: body.descricao ?? "",
    categoria: body.categoria,
    preco: body.preco,
    material: body.material ?? "",
    cor: body.cor ?? "",
    dimensoes: body.dimensoes ?? { larguraCm: 0, alturaCm: 0, profundidadeCm: 0 },
    estoque: body.estoque ?? 0,
    imagemUrl: body.imagemUrl ?? "",
  };
  produtos.push(novo);
  res.status(201).json(novo);
});

function validar(body: any): string[] {
  const erros: string[] = [];
  if (!body || typeof body !== "object") return ["Corpo da requisição inválido"];
  if (typeof body.nome !== "string" || !body.nome.trim()) {
    erros.push("'nome' é obrigatório");
  }
  if (typeof body.preco !== "number" || body.preco <= 0) {
    erros.push("'preco' deve ser um número maior que zero");
  }
  if (!CATEGORIAS.includes(body.categoria)) {
    erros.push(`'categoria' deve ser uma de: ${CATEGORIAS.join(", ")}`);
  }
  if (
    body.estoque !== undefined &&
    (!Number.isInteger(body.estoque) || body.estoque < 0)
  ) {
    erros.push("'estoque' deve ser um inteiro >= 0");
  }
  return erros;
}

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`API de móveis rodando em http://localhost:${PORT}`);
});
