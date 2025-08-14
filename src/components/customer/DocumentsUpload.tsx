import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  File, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Eye, 
  Trash2,
  Download,
  FileText,
  Image,
  FileX
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Document {
  id: string;
  name: string;
  type: 'cnpj' | 'ie' | 'contrato-social' | 'comprovante-endereco' | 'referencias' | 'outros';
  file?: File;
  url?: string;
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  uploadDate: Date;
  size: number;
  mimeType: string;
}

interface DocumentsUploadProps {
  documents?: Document[];
  onSave?: (documents: Document[]) => void;
  onCancel?: () => void;
  onDocumentsChange?: (documents: any[]) => void;
}

const DocumentsUpload: React.FC<DocumentsUploadProps> = ({ documents, onSave, onCancel, onDocumentsChange }) => {
  const [uploadedDocuments, setUploadedDocuments] = useState<Document[]>(documents || []);
  const [uploading, setUploading] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const requiredDocuments = [
    { type: 'cnpj', label: 'CNPJ', required: true },
    { type: 'ie', label: 'Inscrição Estadual', required: false },
    { type: 'contrato-social', label: 'Contrato Social', required: true },
    { type: 'comprovante-endereco', label: 'Comprovante de Endereço', required: true },
    { type: 'referencias', label: 'Referências Comerciais', required: false },
    { type: 'outros', label: 'Outros Documentos', required: false },
  ];

  const getStatusBadge = (status: Document['status']) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800 border-green-300"><CheckCircle className="h-3 w-3 mr-1" />Aprovado</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-300"><FileX className="h-3 w-3 mr-1" />Rejeitado</Badge>;
      case 'under-review':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300"><Clock className="h-3 w-3 mr-1" />Em Análise</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300"><AlertCircle className="h-3 w-3 mr-1" />Pendente</Badge>;
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return <Image className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const handleFileUpload = async (file: File, documentType: string) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 10MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(documentType);

    try {
      // Simular upload
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newDocument: Document = {
        id: Date.now().toString(),
        name: file.name,
        type: documentType as any,
        file,
        status: 'under-review',
        uploadDate: new Date(),
        size: file.size,
        mimeType: file.type,
      };

      setUploadedDocuments(prev => [
        ...prev.filter(doc => doc.type !== documentType),
        newDocument
      ]);

      toast({
        title: "Documento enviado!",
        description: `${file.name} foi enviado para análise.`,
      });
    } catch (error) {
      toast({
        title: "Erro no upload",
        description: "Não foi possível enviar o arquivo. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setUploading(null);
    }
  };

  const removeDocument = (documentId: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== documentId));
    toast({
      title: "Documento removido",
      description: "O documento foi removido da lista.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompletionPercentage = () => {
    const requiredDocs = requiredDocuments.filter(doc => doc.required);
    const uploadedRequired = requiredDocs.filter(doc => 
      uploadedDocuments.some(uploaded => uploaded.type === doc.type)
    );
    return Math.round((uploadedRequired.length / requiredDocs.length) * 100);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onSave(uploadedDocuments);
      toast({
        title: "Documentos salvos!",
        description: "Seus documentos foram enviados para análise.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar os documentos.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Upload de Documentos</h3>
        <div className="text-right">
          <div className="text-sm text-gray-600">Progresso</div>
          <div className="flex items-center gap-2">
            <Progress value={completionPercentage} className="w-20 h-2" />
            <span className="text-sm font-medium">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {requiredDocuments.map((docType) => {
          const uploadedDoc = uploadedDocuments.find(doc => doc.type === docType.type);
          const isUploading = uploading === docType.type;

          return (
            <Card key={docType.type} className="border border-gray-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {docType.label}
                    {docType.required && <span className="text-red-500">*</span>}
                  </CardTitle>
                  {uploadedDoc && getStatusBadge(uploadedDoc.status)}
                </div>
              </CardHeader>
              <CardContent>
                {uploadedDoc ? (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getFileIcon(uploadedDoc.mimeType)}
                      <div>
                        <p className="font-medium text-sm">{uploadedDoc.name}</p>
                        <p className="text-xs text-gray-500">
                          {formatFileSize(uploadedDoc.size)} • {new Date(uploadedDoc.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive" 
                        onClick={() => removeDocument(uploadedDoc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {isUploading && (
                      <div className="space-y-2">
                        <Progress value={75} className="w-full" />
                        <p className="text-sm text-gray-600 text-center">Enviando arquivo...</p>
                      </div>
                    )}
                    
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        Clique para enviar ou arraste o arquivo aqui
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Formatos aceitos: PDF, JPG, PNG (máx. 10MB)
                      </p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleFileUpload(file, docType.type);
                          }
                        }}
                        className="hidden"
                        id={`upload-${docType.type}`}
                        disabled={isUploading}
                      />
                      <Button 
                        asChild 
                        size="sm" 
                        variant="outline"
                        disabled={isUploading}
                      >
                        <label htmlFor={`upload-${docType.type}`} className="cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Selecionar Arquivo
                        </label>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {uploadedDocuments.length > 0 && (
        <Card className="border border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-900 mb-1">
                {uploadedDocuments.length} documento(s) enviado(s)
              </h4>
              <p className="text-sm text-blue-700">
                Seus documentos estão sendo analisados. Você receberá uma notificação quando a análise for concluída.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex gap-4 justify-end pt-4 border-t">
        <Button onClick={onCancel} variant="outline">
          <FileX className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          <Download className="h-4 w-4 mr-2" />
          {saving ? 'Salvando...' : 'Salvar Documentos'}
        </Button>
      </div>
    </div>
  );
};

export default DocumentsUpload;