import { Shield, Sword, Crown } from "lucide-react";

const LoadingMedieval = () => {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="medieval-card p-12 text-center max-w-md mx-4">
        <div className="relative mb-8">
          {/* Rotating shields animation */}
          <div className="relative w-24 h-24 mx-auto">
            <Shield 
              className="absolute inset-0 w-24 h-24 text-gold animate-spin" 
              style={{ animationDuration: '3s' }}
            />
            <Sword 
              className="absolute inset-2 w-20 h-20 text-bronze animate-pulse" 
            />
            <Crown 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-crimson animate-bounce" 
            />
          </div>
        </div>
        
        <h2 className="font-medieval text-2xl text-gold mb-4">
          Extraindo Legendas...
        </h2>
        
        <p className="text-muted-foreground font-medieval">
          Os escribas estão trabalhando em vossa solicitação
        </p>
        
        {/* Medieval progress indicator */}
        <div className="mt-6 w-full bg-muted rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold to-bronze animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingMedieval;