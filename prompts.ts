import type { PresetPrompt } from './types';

export const presetPrompts: PresetPrompt[] = [
  {
    id: 'ugc-try-on',
    title: 'Giyip Deneme UGC',
    prompt: 'Genç bir kadın, elinde bir şapka tutarak kameraya bakıyor. Şapkayı başına takar, doğal ışıkta samimi bir UGC çekimi gibi konuşur ve şunu söyler: ‘Bu şapka gerçekten harika! TikTok’tan aldım ve bu Kasım indiriminde %50 indirimliydi.'
  },
  {
    id: 'ugc-location',
    title: 'Mekanlar için UGC',
    prompt: 'Adam kamerayı selfie tarzında tutuyor ve şöyle diyor: “Herkese merhaba, Sydney’de 13 Darling Point’e hoş geldiniz… piyasada şu anda çok nadir bir fırsat.” Ev arkada planda görünüyor.'
  },
  {
    id: 'ugc-handheld',
    title: 'Elde Tutulan Ürünler için UGC',
    prompt: 'Diyalog: “Yeni bu çantayı aldım—çok güzel, değil mi? Brunch için ya da okuldan alma sırasında mükemmel… Renklerine bayılıyorum!”; Ses türü: Tagalog aksanı, sıcak, zarif kadın sesi; Duygu: samimi, gururlu; Karakter: Sahne 0 ile aynı; Mekân: aydınlık, ferah, şık dekorlu mutfak; Kamera: amatör iPhone selfie, 16:9, rahat tutuş ve el hareketleri; Kamera hareketi: sabit, yumuşak doğal ışık.'
  },
  {
    id: 'food-videography',
    title: 'Yemek Videografisi',
    prompt: 'Bir el bıçakla pastayı dilimliyor; görüntü iştah açıcı, çok leziz görünüyor.'
  },
  {
    id: 'product-glamour',
    title: 'Ürün Tanıtımı – Glamour',
    prompt: '{"product_name":"Our Way Intense","product_image":"file_00000000e3dc620886b8a9f7cb76f89a","brand_colors":["#f8b6c4","#0c0c3a"],"style":{"realism":"ultra_realistic","resolution":"8K","hdr":true,"aspect_ratio":"1:1","depth_of_field":"shallow","camera":{"lens":"35mm prime","shot":"hero close three-quarters","angle":"eye_level\'dan biraz yukarı","movement":"hafif içeri dolly"}},"environment":{"background_mode":"auto_minimal_contextual","surface":"temiz yansıtıcı yüzey","weather":"none","extras":[]},"lighting":{"mode":"adaptive_magic","primary_key":"yüksek Kelvin yumuşak ana ışık (parlak vurgu için)","rim":"yumuşak kenar ışığı","fill":"yumuşak difüz dolgu","accents":["cam kenarlarında ayna yansımaları","altın halka ve kapakta mikro parıltı"]},"magic_touch":{"type":"contextual","rules":["glass_or_liquid -> hafif parçacıklar + yoğunlaşma + nazik parıltı","metal_or_chrome -> neon kenar ışığı + yıldız parlaması"],"intensity":"medium","keep_it_classy":true},"composition":{"framing":"merkezde ürün baskın","negative_space":"dengeli","reflections":"ince ve gerçeğe yakın yansıma","shadows":"yere oturan yumuşak/sert karışık gölgeler","no_text_overlays":true,"no_extra_props":true},"output":{"num_images":1,"seed":"auto","consistency_note":"aydınlatma ve arka plan ruh hali, ürün malzemesi ve marka renkleriyle uyumlu olmalı"},"prompt":"Our Way Intense — dosyadaki gerçek parfüm şişesinin (file_00000000e3dc620886b8a9f7cb76f89a) ultra gerçekçi kahraman çekimi; temiz yansıtıcı bir yüzeyin üzerinde, yumuşak sinematik ışıklarla merkezde. Arka plan minimal ve pembe cam ile lacivert kapağı tamamlıyor. #f8b6c4 ve #0c0c3a tonlarını ince vurgu olarak kullan. Net yansımalar, keskin cam kenarları, altın detaylar..."}'
  },
  {
    id: 'product-sports',
    title: 'Ürün Tanıtımı – Spor',
    prompt: 'Gelecekçi siyah ve krom bir spor ayakkabının hiper-gerçekçi ürün fotoğrafı; pürüzsüz nötr fonda aerodinamik kıvrımları ve parlak yansımaları vurgulayan dramatik stüdyo ışıkları; mesh dokular + yansıtıcı metal paneller kontrastı; keskin odak, sinematik gölgeler, yüksek detay, premium minimal estetik.'
  },
  {
    id: 'studio-ecommerce',
    title: 'Stüdyo Çekimleri – E-ticaret',
    prompt: 'Kadın stüdyo aydınlatmasında bir stüdyoda; üzerindekileri göstermek için dönerek poz verir.'
  },
  {
    id: 'studio-apparel',
    title: 'Stüdyo Çekimleri – Giyim',
    prompt: 'Woman under studio lights turning and showing her dress'
  },
  {
    id: 'editorial-shoot',
    title: 'Editoryal Çekim',
    prompt: 'Eklediğim fotoğraftaki kişinin editöryel çekimi: Yüz sahneye kusursuz otursun, ışık/gölge ve renk tonlaması sahne ve beden rengiyle eşleşsin; özgüvenli ve profesyonel hava; modern kesim mavi blazer, dar gri pantolon, loafer ve beyaz gömlek; siyah metal dokulu ve ahşap plakalı minimal yüksek yuvarlak stüdyo sandalyesinde rahat oturuş; mavi→açık mavi gradyan arka plan; Hasselblad H6D-100c + XCD 85mm f/1.8, moody ışık; ince doku ve doğal cilt detayları.'
  },
  {
    id: 'commercial-film',
    title: 'Reklam Filmi (Commercial)',
    prompt: 'Bu görüntüyü bir reklam filmi gibi canlandır.'
  },
  {
    id: 'vfx-ads',
    title: 'VFX Reklamları',
    prompt: 'Sinematik reklam çekimi: Akışkan çikolata dalgaları parlak sarı “Macro Mike Premium Almond Protein – Coco Pops” paketinin etrafında şekillenir; kamera yavaşça çikolata girdaplarında süzülür; maskot gülümser ve kaşıkla içine dalar; neşeli bir ses “Proteinle dolu ve lezzet fışkırıyor—şimdiye kadarki en pürüzsüz kaşığın!” der; arka planda hareketli, pozitif müzik.'
  },
  {
    id: 'viral-animal',
    title: 'Viral Hayvan Videoları',
    prompt: 'Orman yolunda minik bir motosiklet süren sevimli hamster; siyah kasklı; sinematik perspektif, gerçekçi kürk detayları, dinamik hareket, alan derinliği; 8K ultra gerçekçi; fotogerçekçi; tatlı ve komik.'
  },
  {
    id: 'ai-asmr',
    title: 'Yapay Zekâ ASMR',
    prompt: 'Sevimli, tüylü Pikachu’nun yakın plan ASMR çekimi; mikrofonu yüzüne yaklaştırıp sürter ve “Pika pika” der.'
  },
  {
    id: 'cctv-faceless',
    title: 'CCTV Yüzsüz İçerik',
    prompt: '{"style":"Gece görüşü CCTV gerçekçiliği, monokrom düşük ışık gren, sabit güvenlik kamerası perspektifi","shot":{"duration":8,"composition":"statik ultra-geniş kadraj, ≈9 m yükseğe monte CCTV (28 mm eşdeğeri), tüm saha kadrajda—eşek + babun kırpılmadan","camera_motion":"yok (kilitli)","frame_rate":"24 fps","resolution":"960×540 simüle besleme","film_grain":"kalın dijital gürültü, düşük ışık lekelenmesi"},"timeline":[{"time":"0–2 sn","action":"Gri eşek soldan sakin adımlarla girer; zeytin renkli babun kürek kemiklerinin arkasında dik oturur, boyundaki kısa ipe tutunur."},{"time":"2–6 sn","action":"İkili boş pompaların önünden geçer; eşeğin sırtında hafif çökme ve yanal salınım; babun kuyruk ve gövde mikro hareketleriyle dengeler; ara sıra markete bakar."},{"time":"6–8 sn","action":"Sağdan çıkarlar; saçak ışığı uzun ikili gölge oluşturur; kamera boş sahayı iki vuruş tutar."}],"subject":{"donkey":{"appearance":"orta boy gri eşek, tozlu tüy, sakin","physics":"toynaklar betona gerçekçi ritimle basar; ~25 kg yüke orantılı hafif omurga dalışı"},"baboon":{"appearance":"yetişkin zeytin babun (~25 kg), dik oturuş, iki elle ipe tutunmuş","physics":"dik duruş; kuyruk dengeleyici; gövde mikro kaymaları adım döngüsüyle senkron"}},"scene":{"location":"ıssız benzin istasyonu sahası; pompalar kapalı, market kepenkli","time_of_day":"02:30","atmosphere":"sakin hava, hafif çöp hışırtısı, uzaktan otoyol uğultusu"},"lighting":{"primary":"saçak altı floresanlar (6000 K)","secondary":"arka sağ tek sokak lambası; uzun ikili gölge"},"overlay":{"timestamp":"2025-07-27 02:30:15","position":"sol üst","style":"beyaz monospace rakamlar, %70 yarı saydam"},"audio":{"ambient":"kapalı (CCTV mikrofon yok)"},"color_palette":{"mode":"desatüre gri tonlar, hafif yeşil CCD tonu"},"visual_rules":{"prohibited_elements":["babunun inmesi ya da yanında yürümesi","eşeğin şahlanması/tırısa/dörtnala çıkması","kırpılmış silüetler","ekstra insan/araç/UI bindirmeleri","parlak reklam grafikleri"]}}'
  },
  {
    id: 'animation',
    title: 'Animasyon',
    prompt: 'Karakterler Paris’te; “Paris’teyiz!” derler.'
  },
  {
    id: 'character-profile',
    title: 'Karakter Profili',
    prompt: 'Karakter iyi aydınlatılmış bir stüdyoda nötr arka planda 360° kendi etrafında döner; vücudunun ve kıyafetinin her açısı görünür; diyalog ve ekstra hareket yok; pürüzsüz, kesintisiz dönüş.'
  },
  {
    id: 'logo-animation',
    title: 'Logo Animasyonu',
    prompt: 'Bu logoyu animasyonlu hale getir.'
  },
  {
    id: 'lower-thirds',
    title: 'Alt Bant Grafikler (Lower Thirds)',
    prompt: 'Bu görüntüleri sabit kamera ile motion graphics/VFX kullanarak canlandır.'
  },
  {
    id: 'mograph-simple',
    title: 'Uygulama Hareketli Grafikler – Basit',
    prompt: 'Bu görseli canlandır.'
  },
  {
    id: 'mograph-intro',
    title: 'Uygulama Hareketli Grafikler – Giriş Animasyonu',
    prompt: 'Öğeler modüler, minimalist bir stilde belirir.'
  },
  {
    id: 'mograph-complex-3d',
    title: 'Karmaşık 3D Hareketli Grafikler',
    prompt: 'Telefon, akıcı bir hareketle yana kayarak Skyscanner logosunu ortaya çıkarır.'
  }
];
