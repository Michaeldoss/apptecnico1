
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, File, Image, Video, FileText, Trash2, Eye, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  size: string;
  uploadDate: string;
  clientName?: string;
  serviceId?: string;
}

const FileUploadSection = () => {
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: '',
      type: 'image',
      size: '2.3 MB',
      uploadDate: '2024-01-15',
      clientName: 'Cliente A',
      serviceId: 'SRV-001'
    },
    {
      id: '2',
      name: 'relatorio_mensal_dezembro.pdf',
      type: 'document',
      size: '1.8 MB',
      uploadDate: '2024-01-10'
    }
  ]);
  
  const [storageUsed] = useState(1.2); // GB
  const [storageTotal] = useState(5); // GB
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles) return;

    Array.from(uploadedFiles).forEach(file => {
      // Verificar tamanho total
      if (storageUsed >= storageTotal) {
        toast({
          title: "Espaço insuficiente",
          description: "Você atingiu o limite de armazenamento. Exclua alguns arquivos ou faça upgrade.",
          variant: "destructive"
        });
        return;
      }

      const newFile: FileItem = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 
              file.type.startsWith('video/') ? 'video' : 'document',
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        uploadDate: new Date().toISOString().split('T')[0]
      };

      setFiles(prev => [...prev, newFile]);
      
      toast({
        title: "Arquivo carregado",
        description: `${file.name} foi adicionado com sucesso.`
      });
    });
  };

  const deleteFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast({
      title: "Arquivo excluído",
      description: "O arquivo foi removido com sucesso."
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="h-4 w-4 text-blue-600" />;
      case 'video': return <Video className="h-4 w-4 text-purple-600" />;
      case 'document': return <FileText className="h-4 w-4 text-green-600" />;
      default: return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Arquivos por Cliente
        </CardTitle>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Armazenamento: {storageUsed.toFixed(1)}GB / {storageTotal}GB
          </p>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(storageUsed / storageTotal) * 100}%` }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <Label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">
              Clique para carregar arquivos ou arraste aqui
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Imagens, vídeos, PDFs até 10MB cada
            </p>
          </Label>
        </div>

        <div className="space-y-2">
          {files.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {getFileIcon(file.type)}
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.uploadDate}</span>
                    {file.clientName && (
                      <>
                        <span>•</span>
                        <Badge variant="outline" className="text-xs">
                          {file.clientName}
                        </Badge>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
                </Button>
                {file.serviceId && (
                  <Button size="sm" variant="ghost">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => deleteFile(file.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
