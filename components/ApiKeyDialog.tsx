import React from 'react';

interface ApiKeyDialogProps {
  onSelectKey: () => void;
}

export const ApiKeyDialog: React.FC<ApiKeyDialogProps> = ({ onSelectKey }) => {
  return (
    <div className="w-full max-w-md p-8 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 text-center">
      <h2 className="text-2xl font-bold mb-4 text-white">API Anahtarını Seç</h2>
      <p className="text-gray-400 mb-6">
        Bu uygulama, devam etmek için kendi API anahtarınızı seçmenizi gerektiren Google'ın Veo modelini kullanır. Seçiminiz API istekleri için kullanılacaktır.
      </p>
      <button
        onClick={onSelectKey}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
      >
        API Anahtarınızı Seçin
      </button>
      <p className="text-xs text-gray-500 mt-4">
        Faturalandırma hakkında daha fazla bilgi için lütfen{' '}
        <a
          href="https://ai.google.dev/gemini-api/docs/billing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline"
        >
          resmi belgeleri
        </a> ziyaret edin.
      </p>
    </div>
  );
};
