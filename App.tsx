
import React, { useState, useEffect, useCallback } from 'react';
import { ApiKeyDialog } from './components/ApiKeyDialog';
import { ImageUploader } from './components/ImageUploader';
import { GenerationForm } from './components/GenerationForm';
import { Loader } from './components/Loader';
import { VideoResult } from './components/VideoResult';
import { generateVideo } from './services/geminiService';
// FIX: The global declaration for window.aistudio was moved to types.ts to prevent duplicate declaration errors.
// FIX: Removed unused AIStudio import as AIStudio is now a global type.
import type { AspectRatio } from './types';
import { loadingMessages } from './constants';
import { presetPrompts } from './prompts';

const IMAGE_OPTIONAL_PRESET_IDS = ['viral-animal', 'ai-asmr', 'cctv-faceless'];

const App: React.FC = () => {
  const [apiKeySelected, setApiKeySelected] = useState<boolean>(false);
  const [checkingApiKey, setCheckingApiKey] = useState<boolean>(true);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkApiKey = useCallback(async () => {
    if (window.aistudio) {
      setCheckingApiKey(true);
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setApiKeySelected(hasKey);
      setCheckingApiKey(false);
    } else {
        setApiKeySelected(true);
        setCheckingApiKey(false);
    }
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  // Lock aspect ratio to 16:9 when more than one image is uploaded, as required by the multi-image model
  useEffect(() => {
    if (imageFiles.length > 1) {
      setAspectRatio('16:9');
    }
  }, [imageFiles.length]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setLoadingMessage(loadingMessages[0]);
      let messageIndex = 0;
      interval = setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex]);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);
  
  const isImageRequired = !IMAGE_OPTIONAL_PRESET_IDS.includes(selectedPresetId);
  const isReady = prompt.trim().length > 0 && (!isImageRequired || imageFiles.length > 0);

  const handleGeneration = async () => {
    if (!isReady) {
       if (prompt.trim().length === 0) {
         setError('Lütfen bir prompt girin.');
       } else if (isImageRequired && imageFiles.length === 0) {
         setError('Bu stil için en az bir resim yüklemelisiniz.');
       }
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedVideoUrl(null);
    setTokenCount(null);

    try {
      const { videoUrl, tokenCount: count } = await generateVideo(imageFiles, prompt, aspectRatio);
      setGeneratedVideoUrl(videoUrl);
      setTokenCount(count);
    } catch (e: unknown) {
      const err = e as Error;
      console.error(err);
      if (err.message.includes("Requested entity was not found.")) {
        setError("API Anahtarı hatası. Lütfen API Anahtarınızı yeniden seçin.");
        setApiKeySelected(false); 
      } else {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setImageFiles([]);
    setPrompt('');
    setAspectRatio('16:9');
    setSelectedPresetId('');
    setGeneratedVideoUrl(null);
    setTokenCount(null);
    setError(null);
    setIsLoading(false);
  };
  
  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setApiKeySelected(true);
    }
  };

  const handlePresetChange = (presetId: string) => {
    setSelectedPresetId(presetId);
    const selectedPrompt = presetPrompts.find(p => p.id === presetId);
    setPrompt(selectedPrompt ? selectedPrompt.prompt : '');
  };

  const renderContent = () => {
    if (checkingApiKey) {
      return <Loader message="API Anahtarı kontrol ediliyor..." />;
    }
    if (!apiKeySelected) {
      return <ApiKeyDialog onSelectKey={handleSelectKey} />;
    }
    if (isLoading) {
      return <Loader message={loadingMessage} />;
    }
    if (generatedVideoUrl) {
      return <VideoResult videoUrl={generatedVideoUrl} onStartOver={handleStartOver} tokenCount={tokenCount} />;
    }
    return (
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <ImageUploader imageFiles={imageFiles} setImageFiles={setImageFiles} />
        <GenerationForm 
          prompt={prompt} 
          setPrompt={setPrompt} 
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          onGenerate={handleGeneration}
          isGenerating={isLoading}
          isReady={isReady}
          selectedPresetId={selectedPresetId}
          onPresetChange={handlePresetChange}
          isAspectRatioLocked={imageFiles.length > 1}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
          Yapay Zeka Video Oluşturucu
        </h1>
        <p className="text-lg text-gray-300">
          Ürün görsellerinizi hayata geçirin. Bir resim yükleyin, bir sahne tanımlayın ve yapay zekanın harika bir video oluşturmasına izin verin.
        </p>
      </div>

      {error && (
        <div className="w-full max-w-5xl mx-auto bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <main className="w-full flex-grow flex items-center justify-center">
        {renderContent()}
      </main>

      <footer className="w-full max-w-5xl mx-auto text-center text-gray-500 mt-8 py-4">
        <p>Google Gemini tarafından desteklenmektedir</p>
      </footer>
    </div>
  );
};

export default App;
