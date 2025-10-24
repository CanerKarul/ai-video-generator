import React from 'react';

interface VideoResultProps {
  videoUrl: string;
  onStartOver: () => void;
  tokenCount: number | null;
}

export const VideoResult: React.FC<VideoResultProps> = ({ videoUrl, onStartOver, tokenCount }) => {
  return (
    <div className="w-full max-w-3xl flex flex-col items-center gap-6">
      <div className="w-full aspect-video bg-black rounded-2xl shadow-lg overflow-hidden border border-gray-700">
        <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain">
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      </div>

      <div className="w-full max-w-sm text-center text-gray-400 bg-gray-800/50 border border-gray-700 px-4 py-2 rounded-lg">
        {tokenCount !== null ? (
          <p>Kullanılan Token: <span className="font-bold text-white">{tokenCount}</span></p>
        ) : (
          <p>Kullanılan Token: Bilgi mevcut değil</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <a
          href={videoUrl}
          download="olusturulan-video.mp4"
          className="w-full sm:w-1/2 text-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-green-600 hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-green-500"
        >
          Videoyu İndir
        </a>
        <button
          onClick={onStartOver}
          className="w-full sm:w-1/2 px-6 py-3 border border-gray-600 text-base font-medium rounded-lg shadow-sm text-gray-300 bg-gray-700 hover:bg-gray-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
        >
          Baştan Başla
        </button>
      </div>
    </div>
  );
};
