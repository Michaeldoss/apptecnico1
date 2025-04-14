
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Product, TaxInfo } from '@/types/product';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRow,
  FormSection,
  FormSectionTitle,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FileUp, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const formSchema = z.object({
  codigo: z.string().min(1, 'Código é obrigatório'),
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  categoria: z.string().min(1, 'Selecione uma categoria'),
  unidade: z.string().min(1, 'Selecione uma unidade'),
  estoque: z.coerce.number().min(0, 'Estoque não pode ser negativo'),
  preco: z.coerce.number().min(0, 'Preço não pode ser negativo'),
  descricao: z.string().optional(),
  desconto: z.coerce.number().min(0).max(100).optional(),
  emDestaque: z.boolean().default(false),
  ativo: z.boolean().default(true),
  codigoBarras: z.string().optional(),
  referencia: z.string().optional(),
  ncm: z.string().optional(),
  fornecedor: z.string().optional(),
  fabricante: z.string().optional(),
  marca: z.string().optional(),
  tipoProduto: z.string().optional(),
  origem: z.string().optional(),
  comissao: z.coerce.number().min(0).max(100).optional(),
  custoUltimaCompra: z.coerce.number().min(0).optional(),
  custoMedioAtual: z.coerce.number().min(0).optional(),
  custoMedioInicial: z.coerce.number().min(0).optional(),
  lucroDesejado: z.coerce.number().min(0).optional(),
  pesoKg: z.coerce.number().min(0).optional(),
  pesoLiqKg: z.coerce.number().min(0).optional(),
  altura: z.coerce.number().min(0).optional(),
  largura: z.coerce.number().min(0).optional(),
  comprimento: z.coerce.number().min(0).optional(),
  estoqueMinimo: z.coerce.number().min(0).optional(),
  estoqueMaximo: z.coerce.number().min(0).optional(),
  enderecoProduto: z.string().optional(),
  departamento: z.string().optional(),
  informacoesNutricionais: z.boolean().default(false),
});

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: z.infer<typeof formSchema>) => void;
  onCancel: () => void;
  categories: string[];
}

const ProductForm = ({
  initialData,
  onSubmit,
  onCancel,
  categories = [],
}: ProductFormProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.imagem || null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codigo: initialData?.codigo || '',
      nome: initialData?.nome || '',
      categoria: initialData?.categoria || '',
      unidade: initialData?.unidade || 'UN',
      estoque: initialData?.estoque || 0,
      preco: initialData?.preco || 0,
      descricao: initialData?.descricao || '',
      desconto: initialData?.desconto || 0,
      emDestaque: initialData?.emDestaque || false,
      ativo: initialData?.ativo !== false,
      codigoBarras: initialData?.codigoBarras || '',
      referencia: initialData?.referencia || '',
      ncm: initialData?.ncm || '',
      fornecedor: initialData?.fornecedor || '',
      fabricante: initialData?.fabricante || '',
      marca: initialData?.marca || '',
      tipoProduto: initialData?.tipoProduto || '',
      origem: initialData?.origem || 'Nacional',
      comissao: initialData?.comissao || 0,
      custoUltimaCompra: initialData?.custoUltimaCompra || 0,
      custoMedioAtual: initialData?.custoMedioAtual || 0,
      custoMedioInicial: initialData?.custoMedioInicial || 0,
      lucroDesejado: initialData?.lucroDesejado || 0,
      pesoKg: initialData?.pesoKg || 0,
      pesoLiqKg: initialData?.pesoLiqKg || 0,
      altura: initialData?.altura || 0,
      largura: initialData?.largura || 0,
      comprimento: initialData?.comprimento || 0,
      estoqueMinimo: initialData?.estoqueMinimo || 0,
      estoqueMaximo: initialData?.estoqueMaximo || 0,
      enderecoProduto: initialData?.enderecoProduto || '',
      departamento: initialData?.departamento?.toString() || '',
      informacoesNutricionais: initialData?.informacoesNutricionais || false,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      // Prepare data for submission (would include image upload in a real app)
      const productData = {
        ...data,
        imagem: imagePreview // In a real implementation, this would be a URL after upload
      };
      
      onSubmit(productData);
      toast.success('Produto salvo com sucesso!');
    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error('Erro ao salvar produto. Tente novamente.');
    }
  };

  const unidades = [
    'UN', 'PC', 'KG', 'LT', 'MT', 'CX', 'GL', 'FD', 'RL', 'PT', 'CJ'
  ];

  const tiposProduto = [
    'Mercadoria para revenda',
    'Matéria-prima',
    'Embalagem',
    'Produto em Processo',
    'Produto Acabado',
    'Subproduto',
    'Produto Intermediário',
    'Material de Uso e Consumo',
    'Ativo Imobilizado',
    'Serviços',
    'Outros'
  ];

  const origens = [
    'Nacional',
    'Estrangeira - Importação Direta',
    'Estrangeira - Adquirida no Mercado Interno',
    'Nacional - Conteúdo de Importação superior a 40%',
    'Nacional - Produzida via Lei de Incentivo'
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{initialData ? 'Editar Produto' : 'Novo Produto'}</h2>
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              <X className="mr-2 h-4 w-4" /> Cancelar
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Salvar
            </Button>
          </div>
        </div>

        <Tabs defaultValue="geral" className="w-full">
          <div className="border-b mb-6">
            <TabsList className="w-full flex justify-start h-auto p-0 bg-transparent overflow-x-auto">
              <TabsTrigger value="geral" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                Geral
              </TabsTrigger>
              <TabsTrigger value="impostos" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                Impostos
              </TabsTrigger>
              <TabsTrigger value="cfops" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                CFOPs
              </TabsTrigger>
              <TabsTrigger value="avancado" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                Avançado
              </TabsTrigger>
              <TabsTrigger value="estoque" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                Estoque
              </TabsTrigger>
              <TabsTrigger value="controle" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                Controle
              </TabsTrigger>
              <TabsTrigger value="balanca" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                Balança
              </TabsTrigger>
              <TabsTrigger value="pautas" className="py-3 px-4 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none bg-transparent">
                Pautas
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Content - Geral */}
          <TabsContent value="geral" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <FormRow>
                  <FormField
                    control={form.control}
                    name="codigo"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Código *</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="codigoBarras"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Código de Barras</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormRow>

                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome *</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormRow>
                  <FormField
                    control={form.control}
                    name="categoria"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Categoria *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map(cat => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="unidade"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Unidade *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {unidades.map(un => (
                              <SelectItem key={un} value={un}>{un}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormRow>

                <FormRow>
                  <FormField
                    control={form.control}
                    name="estoque"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Estoque</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preco"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Preço (R$) *</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormRow>

                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-6">
                <FormRow>
                  <FormField
                    control={form.control}
                    name="ativo"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Ativo</FormLabel>
                          <FormDescription>
                            Produto disponível para vendas
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="emDestaque"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Em Destaque</FormLabel>
                          <FormDescription>
                            Mostrar na seção de destaque
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </FormRow>

                <FormField
                  control={form.control}
                  name="referencia"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Referência</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="ncm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NCM</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormRow>
                  <FormField
                    control={form.control}
                    name="fornecedor"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Fornecedor</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormRow>

                <FormField
                  name="imagem"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imagem do Produto</FormLabel>
                      <div className="mt-2">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                          {imagePreview ? (
                            <div className="mb-4">
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="w-40 h-40 object-contain" 
                              />
                            </div>
                          ) : (
                            <div className="text-center mb-4 text-gray-500">
                              <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                              <p className="mt-1">Nenhuma imagem selecionada</p>
                            </div>
                          )}
                          
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              id="product-image"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <label 
                              htmlFor="product-image"
                              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium"
                            >
                              {imagePreview ? 'Alterar imagem' : 'Upload de imagem'}
                            </label>
                            
                            {imagePreview && (
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setImagePreview(null);
                                  setSelectedImage(null);
                                }}
                              >
                                Remover
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                      <FormDescription>
                        Formatos suportados: JPG, PNG, GIF. Tamanho máximo: 5MB
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </TabsContent>

          {/* Tab Content - Impostos */}
          <TabsContent value="impostos" className="space-y-6">
            <FormSection>
              <FormSectionTitle>Dados Fiscais</FormSectionTitle>
              <FormRow>
                <FormField
                  control={form.control}
                  name="ncm"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>NCM</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="origem"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Origem</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {origens.map((origem) => (
                            <SelectItem key={origem} value={origem}>
                              {origem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>

              {/* Tributação simplificada */}
              <FormSection>
                <FormSectionTitle>Tributação ICMS</FormSectionTitle>
                <FormRow>
                  <FormItem className="flex-1">
                    <FormLabel>Situação Tributária</FormLabel>
                    <Select>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="tributado">Tributado</SelectItem>
                        <SelectItem value="isento">Isento</SelectItem>
                        <SelectItem value="nao_tributado">Não Tributado</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                  <FormItem className="flex-1">
                    <FormLabel>% ICMS</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" />
                    </FormControl>
                  </FormItem>
                </FormRow>
              </FormSection>
            </FormSection>
          </TabsContent>

          {/* Tab Content - CFOPs */}
          <TabsContent value="cfops" className="space-y-6">
            <FormSection>
              <FormSectionTitle>CFOPs de Entrada</FormSectionTitle>
              <FormRow>
                <FormItem className="flex-1">
                  <FormLabel>CFOP interna de entrada</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1101">1101 - Compra para industrialização</SelectItem>
                      <SelectItem value="1102">1102 - Compra para comercialização</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem className="flex-1">
                  <FormLabel>CFOP externa de entrada</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="2101">2101 - Compra para industrialização</SelectItem>
                      <SelectItem value="2102">2102 - Compra para comercialização</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              </FormRow>
            </FormSection>

            <FormSection>
              <FormSectionTitle>CFOPs de Saída</FormSectionTitle>
              <FormRow>
                <FormItem className="flex-1">
                  <FormLabel>CFOP interna de saída</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5101">5101 - Venda de produção do estabelecimento</SelectItem>
                      <SelectItem value="5102">5102 - Venda de mercadoria adquirida</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem className="flex-1">
                  <FormLabel>CFOP externa de saída</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6101">6101 - Venda de produção do estabelecimento</SelectItem>
                      <SelectItem value="6102">6102 - Venda de mercadoria adquirida</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              </FormRow>
            </FormSection>
          </TabsContent>

          {/* Tab Content - Avançado */}
          <TabsContent value="avancado" className="space-y-6">
            <FormSection>
              <FormSectionTitle>Informações Avançadas</FormSectionTitle>
              <FormRow>
                <FormField
                  control={form.control}
                  name="tipoProduto"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Tipo de Produto</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tiposProduto.map((tipo) => (
                            <SelectItem key={tipo} value={tipo}>
                              {tipo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>
              
              <FormSectionTitle>Características Físicas</FormSectionTitle>
              <FormRow>
                <FormField
                  control={form.control}
                  name="pesoKg"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Peso Bruto (Kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="pesoLiqKg"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Peso Líquido (Kg)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>

              <FormRow>
                <FormField
                  control={form.control}
                  name="altura"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Altura (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="largura"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Largura (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="comprimento"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Comprimento (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>
            </FormSection>

            <FormSection>
              <FormSectionTitle>Informações de Custo</FormSectionTitle>
              <FormRow>
                <FormField
                  control={form.control}
                  name="custoUltimaCompra"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Custo Última Compra</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="custoMedioAtual"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Custo Médio Atual</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lucroDesejado"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>% Lucro Desejado</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>
            </FormSection>
          </TabsContent>

          {/* Tab Content - Estoque */}
          <TabsContent value="estoque" className="space-y-6">
            <FormSection>
              <FormSectionTitle>Controle de Estoque</FormSectionTitle>
              <FormRow>
                <FormField
                  control={form.control}
                  name="enderecoProduto"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Endereço do Produto</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Localização do produto no estoque
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>

              <FormRow>
                <FormField
                  control={form.control}
                  name="estoqueMinimo"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Quantidade Mínima</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estoqueMaximo"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Quantidade Máxima</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>

              <FormRow>
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Alertar estoque fora dos limites</FormLabel>
                  </div>
                </FormItem>
              </FormRow>
            </FormSection>
          </TabsContent>

          {/* Tab Content - Controle */}
          <TabsContent value="controle" className="space-y-6">
            <FormSection>
              <FormSectionTitle>Informações para Controle</FormSectionTitle>
              <FormField
                control={form.control}
                name="departamento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departamento</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormRow>
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Imprime data validade</FormLabel>
                  </div>
                </FormItem>

                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Imprime data embalagem</FormLabel>
                  </div>
                </FormItem>
              </FormRow>

              <FormField
                control={form.control}
                name="informacoesNutricionais"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Informações nutricionais</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </FormSection>

            {form.watch('informacoesNutricionais') && (
              <FormSection>
                <FormSectionTitle>Tabela Nutricional</FormSectionTitle>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <FormItem>
                    <FormLabel>Valor Energético</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Carboidratos</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Proteínas</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Fibra Alimentar</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Gorduras Totais</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Gorduras Saturadas</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Gorduras Trans</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0" />
                    </FormControl>
                  </FormItem>
                  <FormItem>
                    <FormLabel>Sódio</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0" />
                    </FormControl>
                  </FormItem>
                </div>
              </FormSection>
            )}

            <FormSection>
              <FormSectionTitle>Campos Extras</FormSectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <FormItem key={num}>
                    <FormLabel>Campo extra {num}</FormLabel>
                    <FormControl>
                      <Input />
                    </FormControl>
                  </FormItem>
                ))}
              </div>
            </FormSection>
          </TabsContent>

          {/* Tab Content - Balança */}
          <TabsContent value="balanca" className="space-y-6">
            <FormSection>
              <FormSectionTitle>Informações para Balança</FormSectionTitle>
              <FormRow>
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Conferir peso</FormLabel>
                  </div>
                </FormItem>

                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Não exportar</FormLabel>
                  </div>
                </FormItem>
              </FormRow>

              <FormRow>
                <FormItem className="flex-1">
                  <FormLabel>Tipo de porção</FormLabel>
                  <Select>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="g">Gramas</SelectItem>
                      <SelectItem value="ml">Mililitros</SelectItem>
                      <SelectItem value="un">Unidades</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
                <FormItem className="flex-1">
                  <FormLabel>Porção</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" />
                  </FormControl>
                </FormItem>
              </FormRow>
            </FormSection>
          </TabsContent>

          {/* Tab Content - Pautas */}
          <TabsContent value="pautas" className="space-y-8">
            <FormSection>
              <FormSectionTitle>Pauta de preço 1</FormSectionTitle>
              <FormRow>
                <FormField
                  control={form.control}
                  name="comissao"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>% Comissão</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormRow>
            </FormSection>

            <FormSection>
              <FormSectionTitle>Pauta de preço 2</FormSectionTitle>
              <FormRow>
                <FormItem className="flex-1">
                  <FormLabel>% Comissão</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" />
                  </FormControl>
                </FormItem>
              </FormRow>
            </FormSection>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
};

export default ProductForm;
