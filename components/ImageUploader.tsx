
import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  imageFiles: File[];
  // FIX: Updated the type of setImageFiles to React.Dispatch<React.SetStateAction<File[]>> to correctly support functional updates and fix type errors.
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const MAX_FILES = 3;

export const ImageUploader: React.FC<ImageUploaderProps> = ({ imageFiles, setImageFiles }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = useCallback((files: FileList | null) => {
    if (files) {
      setImageFiles(currentFiles => {
        const newFiles = Array.from(files);
        const combined = [...currentFiles, ...newFiles];
        if (combined.length > MAX_FILES) {
          alert(`En fazla ${MAX_FILES} resim yükleyebilirsiniz.`);
          return combined.slice(0, MAX_FILES);
        }
        return combined;
      });
    }
  }, [setImageFiles]);


  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const onRemoveImage = (indexToRemove: number) => {
    setImageFiles(currentFiles => currentFiles.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full flex flex-col items-center">
       <label className="block text-sm font-medium text-gray-300 mb-2 self-start">
          Adım 1: Resim yükleyin (en fazla 3)
        </label>
        {imageFiles.length > 0 && (
            <div className="w-full grid grid-cols-3 gap-2 mb-2">
                {imageFiles.map((file, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-700">
                        <img src={URL.createObjectURL(file)} alt={`Önizleme ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                          onClick={() => onRemoveImage(index)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80 transition-opacity"
                          aria-label={`Resim ${index + 1}'i kaldır`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                    </div>
                ))}
            </div>
        )}
      <div className={`w-full ${imageFiles.length > 0 ? 'aspect-video' : 'h-48'} bg-gray-800 rounded-2xl shadow-lg border border-dashed border-gray-600 flex items-center justify-center relative overflow-hidden`}>
          {imageFiles.length < MAX_FILES && (
            <label
                htmlFor="file-upload"
                className={`w-full h-full flex flex-col items-center justify-center cursor-pointer transition-colors ${isDragging ? 'bg-gray-700' : 'hover:bg-gray-700/50'}`}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDragOver={onDragEnter}
                onDrop={onDrop}
            >
                <div className="text-center p-8">
                <svg className="mx-auto h-12 w-12 text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                </svg>
                <p className="mt-2 text-sm text-gray-400">
                    <span className="font-semibold text-purple-400">{imageFiles.length > 0 ? 'Daha fazla ekle' : 'Bir dosya yükle'}</span> veya sürükleyip bırak
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF</p>
                </div>
                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" multiple onChange={onFileSelect} />
            </label>
            )}
            {imageFiles.length >= MAX_FILES && (
                <div className="text-center p-8">
                    <p className="text-sm text-gray-400">Resim limitine ulaşıldı.</p>
                </div>
            )}
      </div>
    </div>
  );
};