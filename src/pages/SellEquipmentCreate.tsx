
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Camera, Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { equipmentTypeLabels } from '@/types/equipment';
import { equipmentConditionLabels } from '@/types/sellEquipment';
import { useNavigate } from 'react-router-dom';

const sellEquipmentSchema = z.object({
  title: z.string().min(10, {
    message: "O título deve ter pelo menos 10 caracteres.",
  }).max(100, {
    message: "O título não pode exceder 100 caracteres.",
  }),
  type: z.string().min(1, {
    message: "Selecione o tipo do equipamento.",
  }),
  brand: z.string().min(2, {
    message: "A marca deve ter pelo menos 2 caracteres.",
  }),
  model: z.string().min(2, {
    message: "O modelo deve ter pelo menos 2 caracteres.",
  }),
  year: z.string().optional(),
  condition: z.enum(['novo', 'seminovo', 'usado', 'para-pecas'], {
    required_error: "Selecione o estado do equipamento.",
  }),
  price: z.string().min(1, {
    message: "O preço é obrigatório.",
  }),
  description: z.string().min(50, {
    message: "A descrição deve ter pelo menos 50 caracteres.",
  }).max(1000, {
    message: "A descrição não pode exceder 1000 caracteres.",
  }),
  city: z.string().min(2, {
    message: "A cidade é obrigatória.",
  }),
  state: z.string().length(2, {
    message: "Informe a sigla do estado (ex: SP).",
  }),
  contactName: z.string().min(3, {
    message: "O nome do contato é obrigatório.",
  }),
  contactPhone: z.string().min(10, {
    message: "O telefone deve ter pelo menos 10 dígitos.",
  }),
  contactEmail: z.string().email({
    message: "E-mail inválido.",
  }),
  contactWhatsapp: z.string().optional(),
});

type SellEquipmentFormValues = z.infer<typeof sellEquipmentSchema>;

const SellEquipmentCreate = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const form = useForm<SellEquipmentFormValues>({
    resolver: zodResolver(sellEquipmentSchema),
    defaultValues: {
      title: "",
      type: "",
      brand: "",
      model: "",
      year: "",
      condition: undefined,
      price: "",
      description: "",
      city: "",
      state: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      contactWhatsapp: "",
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    
    if (selectedImages.length + files.length > 6) {
      toast({
        variant: "destructive",
        title: "Limite excedido",
        description: "Você pode adicionar no máximo 6 fotos.",
      });
      return;
    }

    const newImages = [...selectedImages, ...files];
    setSelectedImages(newImages);

    // Create previews
    const newPreviews = [...imagePreviews];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        if (newPreviews.length === newImages.length) {
          setImagePreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
  };

  const onSubmit = async (data: SellEquipmentFormValues) => {
    if (selectedImages.length === 0) {
      toast({
        variant: "destructive",
        title: "Fotos obrigatórias",
        description: "Adicione pelo menos uma foto do equipamento.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      console.log('Dados do anúncio:', data);
      console.log('Imagens selecionadas:', selectedImages);
      
      // Simulando upload e criação do anúncio
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Anúncio criado com sucesso!",
        description: "Seu equipamento foi adicionado à plataforma.",
      });
      
      navigate('/sell-equipment');
    } catch (error) {
      console.error('Erro ao criar anúncio:', error);
      toast({
        variant: "destructive",
        title: "Erro ao criar anúncio",
        description: "Ocorreu um erro. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (value: string) => {
    // Remove non-digits
    const numbers = value.replace(/\D/g, '');
    // Add thousands separators
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Anunciar Equipamento
            </h1>
            <p className="text-gray-600">
              Preencha as informações abaixo para criar seu anúncio
            </p>
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Informações Básicas */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">
                    Informações do Equipamento
                  </h2>
                  
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Título do Anúncio</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ex: Plotter Roland VersaCAMM VS-640i Seminovo"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Seja específico e inclua marca, modelo e características principais
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de Equipamento</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(equipmentTypeLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o estado" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Object.entries(equipmentConditionLabels).map(([value, label]) => (
                                <SelectItem key={value} value={value}>
                                  {label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="brand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Marca</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Roland, Epson, HP" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="model"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Modelo</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: VersaCAMM VS-640i" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="year"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ano (Opcional)</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="2023" 
                              min="1990"
                              max={new Date().getFullYear()}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preço (R$)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="50.000"
                            value={field.value}
                            onChange={(e) => {
                              const formatted = formatPrice(e.target.value);
                              field.onChange(formatted);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Digite apenas números (ex: 50000 para R$ 50.000)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Descrição</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Descreva detalhadamente o equipamento, estado de conservação, acessórios inclusos, histórico de uso, motivo da venda, etc."
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Seja detalhado para atrair mais interessados
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Fotos */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Fotos</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          <Camera className="h-4 w-4" />
                          Adicionar Fotos
                        </div>
                      </label>
                      <span className="text-sm text-gray-500">
                        {selectedImages.length}/6 fotos
                      </span>
                    </div>

                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                            {index === 0 && (
                              <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                Principal
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <strong>Dicas para boas fotos:</strong>
                        <ul className="mt-1 list-disc list-inside space-y-1">
                          <li>Use boa iluminação natural</li>
                          <li>Mostre diferentes ângulos do equipamento</li>
                          <li>Inclua fotos dos detalhes e possíveis defeitos</li>
                          <li>A primeira foto será a principal do anúncio</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Localização */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Localização</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cidade</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: São Paulo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Estado</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="SP" 
                              maxLength={2}
                              style={{ textTransform: 'uppercase' }}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Contato */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold border-b pb-2">Informações de Contato</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do Contato</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="seu@email.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone</FormLabel>
                          <FormControl>
                            <Input placeholder="(11) 99999-9999" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactWhatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>WhatsApp (Opcional)</FormLabel>
                          <FormControl>
                            <Input placeholder="11999999999" {...field} />
                          </FormControl>
                          <FormDescription>
                            Apenas números (ex: 11999999999)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate('/sell-equipment')}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Publicando...
                      </span>
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Publicar Anúncio
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellEquipmentCreate;
