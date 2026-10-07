export type Categoria =
  | "sala"
  | "quarto"
  | "cozinha"
  | "escritorio"
  | "jantar"
  | "externo";

export interface Dimensoes {
  larguraCm: number;
  alturaCm: number;
  profundidadeCm: number;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  categoria: Categoria;
  preco: number;
  material: string;
  cor: string;
  dimensoes: Dimensoes;
  estoque: number;
  imagemUrl: string;
}

export type NovoProduto = Omit<Produto, "id">;
