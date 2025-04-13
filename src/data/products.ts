
import { Product } from "@/types/product";

export const products: Product[] = [
  {
    codigo: "8004",
    nome: "ACESSO REMOTO",
    unidade: "UN",
    estoque: 0,
    preco: 0.01,
    ncm: "07095200",
    categoria: "Serviços"
  },
  {
    codigo: "8282",
    nome: "ADESIVO DO PAINEL – POLAR",
    unidade: "UN",
    estoque: 1,
    preco: 330,
    categoria: "Peças de Reposição"
  },
  {
    codigo: "8006",
    nome: "BOMBA DE TINTA 100/200ML",
    unidade: "PC",
    estoque: 14,
    preco: 155,
    ncm: "84141000",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8007",
    nome: "BOMBA DE TINTA 300/400ML",
    unidade: "PC",
    estoque: 22,
    preco: 205,
    ncm: "84141000",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8008",
    nome: "BOMBA DE TINTA PERISTÁLTICA",
    unidade: "PC",
    estoque: 5,
    preco: 432,
    ncm: "84141000",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "222240",
    nome: "BOTÃO ON/OFF - XULI - POLAR",
    unidade: "UN",
    estoque: 3,
    preco: 90,
    categoria: "Peças de Reposição"
  },
  {
    codigo: "222153",
    nome: "BULK 1,5L PRETO UV COM ALARME",
    unidade: "UN",
    estoque: 0,
    preco: 380,
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8009",
    nome: "BULK TINTA UV 1,5L",
    unidade: "PC",
    estoque: 4,
    preco: 350,
    ncm: "84439929",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8368",
    nome: "BULK TRANSPARENTE 1,5L",
    unidade: "UN",
    estoque: 2,
    preco: 204,
    ncm: "84439929",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8229",
    nome: "BULK UV COM MISTURADOR",
    unidade: "UN",
    estoque: 1,
    preco: 500,
    ncm: "84439929",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8010",
    nome: "CABEÇA DE IMPRESSÃO 4720",
    unidade: "PC",
    estoque: 0,
    preco: 8904,
    ncm: "84439912",
    categoria: "Cabeças de Impressão"
  },
  {
    codigo: "221723",
    nome: "CABEÇA DE IMPRESSÃO 4720 2º BLOQUEIO C/ PLACA DECODER",
    unidade: "UN",
    estoque: 0,
    preco: 7600,
    ncm: "39269090",
    categoria: "Cabeças de Impressão"
  },
  {
    codigo: "8249",
    nome: "CABEÇA DE IMPRESSÃO 4720 PRIMEIRO BLOQUEIO",
    unidade: "UN",
    estoque: 0,
    preco: 9000,
    ncm: "39269090",
    categoria: "Cabeças de Impressão"
  },
  {
    codigo: "8189",
    nome: "CABEÇA DE IMPRESSÃO 5113 PRIMEIRO BLOQUEIO",
    unidade: "PC",
    estoque: 0,
    preco: 7200,
    ncm: "84439912",
    categoria: "Cabeças de Impressão"
  },
  {
    codigo: "8179",
    nome: "CABEÇA DE IMPRESSÃO DX4",
    unidade: "PC",
    estoque: 0,
    preco: 4286,
    ncm: "84439912",
    categoria: "Cabeças de Impressão"
  },
  {
    codigo: "8033",
    nome: "DAMPER 4720",
    unidade: "PC",
    estoque: 121,
    preco: 60,
    ncm: "84439912",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "221685",
    nome: "DAMPER 4720 UV",
    unidade: "UN",
    estoque: 32,
    preco: 60,
    ncm: "84439912",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8034",
    nome: "DAMPER DX5 PONTA QUADRADA",
    unidade: "PC",
    estoque: 66,
    preco: 60,
    ncm: "84439912",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8220",
    nome: "DAMPER DX5 PONTA QUADRADA UV",
    unidade: "UN",
    estoque: 16,
    preco: 70,
    ncm: "84439912",
    categoria: "Componentes de Impressão"
  },
  {
    codigo: "8035",
    nome: "DAMPER DX7",
    unidade: "PC",
    estoque: 33,
    preco: 60,
    ncm: "84439912",
    categoria: "Componentes de Impressão"
  }
];

// Extrair categorias únicas dos produtos
export const getUniqueCategories = () => {
  const categories = [...new Set(products.map(product => product.categoria))];
  return categories;
};

// Obter contagem de produtos por categoria
export const getProductCountByCategory = (categoria: string) => {
  return products.filter(product => product.categoria === categoria).length;
};

// Filtrar produtos por categoria
export const getProductsByCategory = (categoria: string) => {
  return products.filter(product => product.categoria === categoria);
};
