import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Upload, FileText, CheckCircle, X, Eye } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  file?: File;
  url?: string;
  uploaded: boolean;
  required: boolean;
}

interface DocumentUploadProps {
  userType: 'client' | 'technician' | 'store';
  onDocumentsChange: (documents: Document[]) => void;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  userType,
  onDocumentsChange
}) => {
  const getRequiredDocuments = (): Document[] => {
    const baseDocuments = [
      { id: 'rg', name: 'RG (frente e verso)', uploaded: false, required: true },
      { id: 'cpf', name: 'CPF', uploaded: false, required: true },
      { id: 'addressProof', name: 'Comprovante de Endereço', uploaded: false, required: true },
    ];

    const additionalDocs = {
      technician: [
        { id: 'certificate', name: 'Certificados Técnicos', uploaded: false, required: false },
        { id: 'experience', name: 'Comprovantes de Experiência', uploaded: false, required: false },
      ],
      store: [
        { id: 'cnpj', name: 'Cartão CNPJ', uploaded: false, required: true },
        { id: 'license', name: 'Licença de Funcionamento', uploaded: false, required: false },
      ],
      client: []
    };

    return [...baseDocuments, ...additionalDocs[userType]];
  };

  const [documents, setDocuments] = useState<Document[]>(getRequiredDocuments());

  const handleFileChange = (documentId: string, file: File | null) => {
    if (!file) return;

    // Verificar tipo de arquivo
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Tipo de arquivo inválido",
        description: "Aceitos apenas: JPG, PNG ou PDF",
      });
      return;
    }

    // Verificar tamanho (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB",
      });
      return;
    }

    const updatedDocuments = documents.map(doc => {
      if (doc.id === documentId) {
        return {
          ...doc,
          file,
          url: URL.createObjectURL(file),
          uploaded: true
        };
      }
      return doc;
    });

    setDocuments(updatedDocuments);
    onDocumentsChange(updatedDocuments);

    toast({
      title: "Documento enviado",
      description: `${documents.find(d => d.id === documentId)?.name} foi adicionado com sucesso.`,
    });
  };

  const handleRemoveDocument = (documentId: string) => {
    const updatedDocuments = documents.map(doc => {
      if (doc.id === documentId) {
        if (doc.url) URL.revokeObjectURL(doc.url);
        return {
          ...doc,
          file: undefined,
          url: undefined,
          uploaded: false
        };
      }
      return doc;
    });

    setDocuments(updatedDocuments);
    onDocumentsChange(updatedDocuments);
  };

  const handlePreview = (document: Document) => {
    if (document.url) {
      window.open(document.url, '_blank');
    }
  };

  const getUploadedCount = () => {
    return documents.filter(doc => doc.uploaded).length;
  };

  const getRequiredCount = () => {
    return documents.filter(doc => doc.required).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Upload de Documentos</h3>
        <div className="text-sm text-muted-foreground">
          {getUploadedCount()}/{documents.length} documentos enviados
        </div>
      </div>

      <div className="grid gap-4">
        {documents.map((document) => (
          <div
            key={document.id}
            className={`p-4 border rounded-lg ${
              document.uploaded ? 'bg-green-50 border-green-200' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <Label className="text-sm font-medium">
                  {document.name}
                  {document.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              </div>
              {document.uploaded && (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(document.id, e.target.files?.[0] || null)}
                className="hidden"
                id={`file-${document.id}`}
              />
              
              <Label htmlFor={`file-${document.id}`} className="cursor-pointer">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  asChild
                >
                  <span>
                    <Upload className="h-4 w-4" />
                    {document.uploaded ? 'Alterar' : 'Enviar'}
                  </span>
                </Button>
              </Label>

              {document.uploaded && (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handlePreview(document)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    Ver
                  </Button>
                  
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveDocument(document.id)}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                    Remover
                  </Button>
                </>
              )}
            </div>

            {document.file && (
              <p className="text-xs text-muted-foreground mt-1">
                {document.file.name} ({(document.file.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="text-xs text-muted-foreground">
        <p>• Formatos aceitos: JPG, PNG, PDF</p>
        <p>• Tamanho máximo: 10MB por arquivo</p>
        <p>• Documentos com * são obrigatórios para verificação</p>
      </div>
    </div>
  );
};