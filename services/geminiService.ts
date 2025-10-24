import { GoogleGenAI, VideoGenerationReferenceImage, VideoGenerationReferenceType } from "@google/genai";
import type { AspectRatio } from '../types';

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
}

export const generateVideo = async (
  imageFiles: File[],
  prompt: string,
  aspectRatio: AspectRatio,
): Promise<{ videoUrl: string; tokenCount: number | null }> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY ortam değişkeni ayarlanmadı");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let operation;

  if (imageFiles.length === 0) {
    // Case 0: Text-to-video
    console.log("Metinden video oluşturma başlıyor...");
    operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio,
      }
    });
  } else if (imageFiles.length === 1) {
    // Case 1: Single image reference
    console.log("Tek resimden video oluşturma başlıyor...");
    const imageBase64 = await fileToBase64(imageFiles[0]);
    operation = await ai.models.generateVideos({
      model: 'veo-3.1-fast-generate-preview',
      prompt: prompt,
      image: {
        imageBytes: imageBase64,
        mimeType: imageFiles[0].type,
      },
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: aspectRatio,
      }
    });
  } else {
    // Case 2: Multiple image references (2 or 3)
    console.log("Çoklu resimden video oluşturma başlıyor...");
    const referenceImagesPayload: VideoGenerationReferenceImage[] = await Promise.all(
      imageFiles.map(async (file) => ({
        image: {
          imageBytes: await fileToBase64(file),
          mimeType: file.type,
        },
        referenceType: VideoGenerationReferenceType.ASSET,
      }))
    );

    operation = await ai.models.generateVideos({
      model: 'veo-3.1-generate-preview', // This model is required for multi-image
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        referenceImages: referenceImagesPayload,
        resolution: '720p',
        aspectRatio: '16:9' // This model requires 16:9 for multi-image
      }
    });
  }


  console.log("Video sonucu için yoklama yapılıyor...");
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    try {
        const pollerAi = new GoogleGenAI({ apiKey: process.env.API_KEY });
        operation = await pollerAi.operations.getVideosOperation({ operation: operation });
    } catch (e) {
        console.error("Yoklama sırasında hata:", e);
        throw new Error("Video oluşturma durumu alınamadı.");
    }
  }

  console.log("İşlem tamamlandı. Sonuç kontrol ediliyor...");

  // Check if the operation finished with an error
  if (operation.error) {
    console.error("Video oluşturma işlemi bir hatayla sonuçlandı:", JSON.stringify(operation.error, null, 2));
    throw new Error(`Video oluşturma başarısız oldu: ${operation.error.message || 'Bilinmeyen bir sunucu hatası.'}`);
  }

  // Check for safety filtering response
  if (operation.response?.raiMediaFilteredCount && operation.response.raiMediaFilteredCount > 0) {
    console.error("Video oluşturma güvenlik filtreleri tarafından engellendi:", JSON.stringify(operation.response, null, 2));
    
    let detailedReason = "";
    const apiReasons = operation.response.raiMediaFilteredReasons;
    if (apiReasons && apiReasons.length > 0) {
        const firstReason = apiReasons[0].toLowerCase();
        if (firstReason.includes("audio")) {
            detailedReason = " Hata, isteminizdeki sesle ilgili bir sorundan kaynaklanıyor gibi görünüyor.";
        }
    }

    throw new Error(`İsteğiniz güvenlik filtrelerini tetiklediği için video oluşturulamadı.${detailedReason} Lütfen isteminizi değiştirip tekrar deneyin. (Bu deneme için ücretlendirilmediniz)`);
  }

  // Check if the response structure is as expected
  if (!operation.response?.generatedVideos?.[0]?.video?.uri) {
    console.error("Video oluşturma tamamlandı ancak yanıtta URI bulunamadı:", JSON.stringify(operation.response, null, 2));
    throw new Error("Video oluşturma geçerli bir çıktı üretemedi. Yanıt, beklenen video verisini içermiyor.");
  }
  
  const downloadLink = operation.response.generatedVideos[0].video.uri;
  console.log("Video URI'den alınıyor:", downloadLink);

  const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  if (!videoResponse.ok) {
    const errorText = await videoResponse.text();
    console.error("Video indirilemedi:", errorText);
    throw new Error(`Oluşturulan video indirilemedi. Durum: ${videoResponse.status}`);
  }

  const videoBlob = await videoResponse.blob();
  const videoUrl = URL.createObjectURL(videoBlob);
  
  const tokenCount = null;

  return { videoUrl, tokenCount };
};