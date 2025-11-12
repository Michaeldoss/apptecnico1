import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Upload, User, Check, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfilePhotoUploadProps {
  currentPhoto: string | null;
  userName: string;
  onPhotoChange: (file: File | null, imageUrl: string | null) => void;
}

const AVATAR_OPTIONS = [
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Max',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucy',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
];

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({ 
  currentPhoto, 
  userName,
  onPhotoChange 
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [showAvatars, setShowAvatars] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "A foto deve ter no máximo 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onPhotoChange(file, result);
        setSelectedAvatar(null);
        toast({
          title: "Foto carregada!",
          description: `Arquivo "${file.name}" foi carregado com sucesso.`,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    onPhotoChange(null, avatarUrl);
    setShowAvatars(false);
    toast({
      title: "Avatar selecionado!",
      description: "Seu avatar foi atualizado com sucesso.",
    });
  };

  const handleRemovePhoto = () => {
    onPhotoChange(null, null);
    setSelectedAvatar(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    toast({
      title: "Foto removida",
      description: "A foto do perfil foi removida.",
    });
  };

  const displayPhoto = currentPhoto || selectedAvatar;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl font-bold">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
            <Camera className="h-5 w-5 text-white" />
          </div>
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Foto do Perfil
          </span>
        </CardTitle>
        <CardDescription className="text-base text-foreground/80">
          Escolha uma foto que represente você profissionalmente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Preview da foto */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative group">
            <Avatar className="h-40 w-40 border-4 border-primary/20 shadow-2xl ring-4 ring-primary/10 transition-all duration-300 group-hover:scale-105">
              <AvatarImage 
                src={displayPhoto || ""} 
                alt={userName}
                className="object-cover"
              />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white font-bold">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {displayPhoto && (
              <Button
                size="icon"
                variant="destructive"
                className="absolute -top-2 -right-2 rounded-full h-10 w-10 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={handleRemovePhoto}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground max-w-sm">
            Fotos profissionais aumentam a confiança dos clientes em até 40%
          </p>
        </div>

        {/* Opções de upload */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Câmera */}
          <div className="space-y-2">
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              onClick={() => cameraInputRef.current?.click()}
              className="w-full h-auto flex-col gap-3 py-6 bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Camera className="h-8 w-8" />
              <div className="text-center">
                <p className="font-bold">Tirar Foto</p>
                <p className="text-xs opacity-90">Usar câmera</p>
              </div>
            </Button>
          </div>

          {/* Galeria */}
          <div className="space-y-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-auto flex-col gap-3 py-6 bg-gradient-to-br from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Upload className="h-8 w-8" />
              <div className="text-center">
                <p className="font-bold">Enviar Foto</p>
                <p className="text-xs opacity-90">Do celular/PC</p>
              </div>
            </Button>
          </div>

          {/* Avatar */}
          <div className="space-y-2">
            <Button
              onClick={() => setShowAvatars(!showAvatars)}
              className="w-full h-auto flex-col gap-3 py-6 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <User className="h-8 w-8" />
              <div className="text-center">
                <p className="font-bold">Usar Avatar</p>
                <p className="text-xs opacity-90">Escolher ilustração</p>
              </div>
            </Button>
          </div>
        </div>

        {/* Grid de avatares */}
        {showAvatars && (
          <div className="animate-fade-in">
            <div className="border-t border-border pt-6 mt-4">
              <h4 className="text-sm font-semibold text-foreground mb-4">Escolha um avatar:</h4>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {AVATAR_OPTIONS.map((avatarUrl, index) => (
                  <button
                    key={index}
                    onClick={() => handleAvatarSelect(avatarUrl)}
                    className={`relative rounded-full overflow-hidden border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                      selectedAvatar === avatarUrl 
                        ? 'border-primary ring-4 ring-primary/30 scale-110' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img 
                      src={avatarUrl} 
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {selectedAvatar === avatarUrl && (
                      <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                        <Check className="h-6 w-6 text-white drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Informações */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            Dicas para uma boa foto:
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1 ml-6 list-disc">
            <li>Use boa iluminação natural ou artificial</li>
            <li>Mantenha o rosto visível e centralizado</li>
            <li>Evite fundos confusos ou poluídos</li>
            <li>Tamanho máximo: 5MB</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePhotoUpload;
