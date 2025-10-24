import React from 'react';
import type { AspectRatio } from '../types';
import { presetPrompts } from '../prompts';

interface GenerationFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  isReady: boolean;
  selectedPresetId: string;
  onPresetChange: (presetId: string) => void;
  isAspectRatioLocked: boolean;
}

export const GenerationForm: React.FC<GenerationFormProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  onGenerate,
  isGenerating,
  isReady,
  selectedPresetId,
  onPresetChange,
  isAspectRatioLocked
}) => {
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPresetChange(e.target.value);
  };

  return (
    <div className="w-full bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col gap-6">
      <div>
        <label htmlFor="preset-prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Adım 2: Bir stil seçin
        </label>
        <select
          id="preset-prompt"
          name="preset-prompt"
          className="block w-full bg-gray-900 border-gray-600 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white p-3"
          value={selectedPresetId}
          onChange={handlePresetChange}
        >
          <option value="">Kendi prompt'umu yazacağım</option>
          {presetPrompts.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Adım 3: Videoyu açıklayın (veya seçtiğiniz stili düzenleyin)
        </label>
        <textarea
          id="prompt"
          name="prompt"
          rows={5}
          className="block w-full bg-gray-900 border-gray-600 rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm text-white placeholder-gray-500 p-3"
          placeholder="Örn: Ürünün gün batımında bir kumsalda, dalgaların yavaşça kıyıya vurduğu sinematik bir çekimi."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-300 mb-2">Adım 4: En Boy Oranını Seçin</h3>
        <div className="flex gap-4">
          {(['16:9', '9:16'] as AspectRatio[]).map((ratio) => (
            <button
              key={ratio}
              type="button"
              onClick={() => setAspectRatio(ratio)}
              disabled={isAspectRatioLocked && ratio !== '16:9'}
              className={`flex-1 py-3 px-4 border rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500 ${
                aspectRatio === ratio
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
              } ${isAspectRatioLocked && ratio !== '16:9' ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {ratio} ({ratio === '16:9' ? 'Yatay' : 'Dikey'})
            </button>
          ))}
        </div>
        {isAspectRatioLocked && <p className="text-xs text-gray-500 mt-2">Çoklu resim modu için en boy oranı 16:9 olmalıdır.</p>}
      </div>

      <button
        onClick={onGenerate}
        disabled={!isReady || isGenerating}
        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-purple-500"
      >
        {isGenerating ? 'Sihir yaratılıyor...' : 'Video Oluştur'}
      </button>
    </div>
  );
};