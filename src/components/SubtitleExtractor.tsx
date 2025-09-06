import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Link, Scroll, Crown, Shield } from "lucide-react";
import LoadingMedieval from "./LoadingMedieval";
import { useToast } from "@/hooks/use-toast";
import medievalOrnament from "@/assets/medieval-ornament.jpg";

const SubtitleExtractor = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      toast({
        title: "Arquivo Selecionado",
        description: `${file.name} foi carregado com sucesso.`,
      });
    }
  };

  const handleExtractSubtitles = async () => {
    if (!youtubeUrl && !videoFile) {
      toast({
        title: "Erro",
        description: "Por favor, forneça um link do YouTube ou selecione um arquivo.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setExtractedText(
        "Este é um exemplo de legenda extraída do vídeo. " +
        "Em uma implementação real, aqui apareceria o texto das legendas " +
        "extraído do vídeo do YouTube ou do arquivo enviado. " +
        "O texto seria processado por algoritmos de reconhecimento de fala " +
        "ou extraído de legendas existentes no vídeo."
      );
      toast({
        title: "Sucesso!",
        description: "Legendas extraídas com êxito.",
      });
    }, 3000);
  };

  return (
    <>
      {isLoading && <LoadingMedieval />}
      
      <div className="min-h-screen parchment-bg flex flex-col">
        {/* Header with ornamental design */}
        <header className="relative py-16 overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-background/50 to-transparent opacity-30"
            style={{
              backgroundImage: `url(${medievalOrnament})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="flex items-center justify-center mb-6 animate-ornament-float">
              <Shield className="w-16 h-16 text-gold mr-6 animate-medieval-glow" />
              <div>
                <h1 className="font-medieval text-5xl md:text-7xl text-gold drop-shadow-lg">
                  Extrator de Legendas
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mt-2"></div>
              </div>
              <Shield className="w-16 h-16 text-gold ml-6 animate-medieval-glow" />
            </div>
            <p className="font-medieval text-xl text-muted-foreground max-w-2xl mx-auto drop-shadow">
              Uma plataforma majestosa para extrair legendas de vídeos com a elegância da era medieval
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            {/* Extraction Form */}
            <Card className="medieval-card mb-8">
              <CardHeader>
                <CardTitle className="font-medieval text-2xl text-center flex items-center justify-center">
                  <Scroll className="w-6 h-6 text-gold mr-2" />
                  Configure a Extração
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* YouTube URL Input */}
                <div className="space-y-2">
                  <Label htmlFor="youtube-url" className="font-medieval text-lg flex items-center">
                    <Link className="w-5 h-5 text-crimson mr-2" />
                    Link do YouTube
                  </Label>
                  <Input
                    id="youtube-url"
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="medieval-input"
                  />
                </div>

                <div className="text-center font-medieval text-muted-foreground">
                  OU
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label htmlFor="video-file" className="font-medieval text-lg flex items-center">
                    <Upload className="w-5 h-5 text-crimson mr-2" />
                    Selecionar Arquivo de Vídeo
                  </Label>
                  <Input
                    id="video-file"
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="medieval-input"
                  />
                  {videoFile && (
                    <p className="text-sm text-muted-foreground font-medieval">
                      Arquivo selecionado: {videoFile.name}
                    </p>
                  )}
                </div>

                {/* Extract Button */}
                <div className="text-center pt-4">
                  <Button
                    onClick={handleExtractSubtitles}
                    disabled={isLoading}
                    className="medieval-button text-xl px-12 py-6"
                  >
                    <Scroll className="w-6 h-6 mr-3" />
                    EXTRAIR LEGENDA
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            {extractedText && (
              <Card className="medieval-card">
                <CardHeader>
                  <CardTitle className="font-medieval text-2xl text-center flex items-center justify-center">
                    <Scroll className="w-6 h-6 text-gold mr-2" />
                    Texto Extraído
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="ornamental-border p-6 rounded-lg">
                    <div className="bg-parchment/20 p-6 rounded-lg border-2 border-bronze/30">
                      <p className="font-medieval text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                        {extractedText}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default SubtitleExtractor;