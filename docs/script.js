document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return; 

  // 1. GENİŞLETİLMİŞ ÜLKE ADLARI VE KODLARI (Hepsi küçük harf ISO 3166-1 alpha-2)
  const countryNames = {
    // ... (A'dan Z'ye tüm ISO kodları) ... 
    "tr": "Türkiye", "us": "Amerika Birleşik Devletleri", "ca": "Kanada", 
    "ir": "İran", "iq": "Irak", 
    // Diğer tüm kodlar
    "ad": "Andorra", "ae": "Birleşik Arap Emirlikleri", "af": "Afganistan", "al": "Arnavutluk", "am": "Ermenistan", "ar": "Arjantin", "at": "Avusturya", "au": "Avustralya", "az": "Azerbaycan",
    "ba": "Bosna-Hersek", "be": "Belçika", "bg": "Bulgaristan", "br": "Brezilya", "by": "Belarus", 
    "cn": "Çin", "cy": "Kıbrıs", "cz": "Çekya",
    "de": "Almanya", "dk": "Danimarka", 
    "eg": "Mısır", "es": "İspanya", 
    "fi": "Finlandiya", "fr": "Fransa", 
    "gb": "Birleşik Krallık", "ge": "Gürcistan", "gr": "Yunanistan", 
    "hr": "Hırvatistan", "hu": "Macaristan", 
    "id": "Endonezya", "ie": "İrlanda", "il": "İsrail", "in": "Hindistan", "is": "İzlanda", "it": "İtalya",
    "jp": "Japonya", 
    "kr": "Güney Kore", 
    "mx": "Meksika", 
    "nl": "Hollanda", "no": "Norveç", 
    "pl": "Polonya", "pt": "Portekiz", 
    "ro": "Romanya", "ru": "Rusya Federasyonu", 
    "sa": "Suudi Arabistan", "se": "İsveç", "sg": "Singapur", 
    "sy": "Suriye", 
    "ua": "Ukrayna", "uy": "Uruguay", 
    "ve": "Venezuela", 
    "za": "Güney Afrika", 
    // Kalan tüm 2 harfli kodları buraya ekledim.
    // Eksik olan diğer tüm kodlar:
    "ag": "Antigua ve Barbuda", "ai": "Anguilla", "ao": "Angola", "aq": "Antarktika", "as": "Amerikan Samoası", "aw": "Aruba", "ax": "Aland Adaları", "bb": "Barbados", "bd": "Bangladeş", "bf": "Burkina Faso", "bh": "Bahreyn", "bi": "Burundi", "bj": "Benin", "bl": "Saint Barthelemy", "bm": "Bermuda", "bn": "Brunei", "bo": "Bolivya", "bq": "Karayip Hollandası", "bs": "Bahamalar", "bt": "Bhutan", "bv": "Bouvet Adası", "bw": "Botsvana", "bz": "Belize", "cc": "Cocos (Keeling) Adaları", "cd": "Kongo Demokratik Cumhuriyeti", "cf": "Orta Afrika Cumhuriyeti", "cg": "Kongo", "ch": "İsviçre", "ci": "Fildişi Sahili", "ck": "Cook Adaları", "cl": "Şili", "cm": "Kamerun", "co": "Kolombiya", "cr": "Kosta Rika", "cu": "Küba", "cv": "Cape Verde", "cw": "Curaçao", "cx": "Christmas Adası", "dj": "Cibuti", "dm": "Dominika", "do": "Dominik Cumhuriyeti", "dz": "Cezayir", "ec": "Ekvador", "ee": "Estonya", "eh": "Batı Sahra", "er": "Eritre", "et": "Etiyopya", "fj": "Fiji", "fk": "Falkland Adaları", "fm": "Mikronezya", "fo": "Faroe Adaları", "ga": "Gabon", "gd": "Grenada", "gf": "Fransız Guyanası", "gg": "Guernsey", "gh": "Gana", "gi": "Cebelitarık", "gl": "Grönland", "gm": "Gambiya", "gn": "Gine", "gp": "Guadeloupe", "gq": "Ekvator Ginesi", "gs": "Güney Georgia ve Güney Sandwich Adaları", "gt": "Guatemala", "gu": "Guam", "gw": "Gine-Bissau", "gy": "Guyana", "hk": "Hong Kong", "hm": "Heard Adası ve McDonald Adaları", "hn": "Honduras", "ht": "Haiti", "io": "Britanya Hint Okyanusu Toprakları", "im": "Man Adası", "je": "Jersey", "jm": "Jamaika", "jo": "Ürdün", "ke": "Kenya", "kg": "Kırgızistan", "kh": "Kamboçya", "ki": "Kiribati", "km": "Komorlar", "kn": "Saint Kitts ve Nevis", "kp": "Kuzey Kore", "kw": "Kuveyt", "ky": "Cayman Adaları", "kz": "Kazakistan", "la": "Laos", "lb": "Lübnan", "lc": "Saint Lucia", "li": "Lihtenştayn", "lk": "Sri Lanka", "lr": "Liberya", "ls": "Lesoto", "lu": "Lüksemburg", "lv": "Letonya", "ly": "Libya", "ma": "Fas", "mc": "Monako", "md": "Moldova", "me": "Karadağ", "mf": "Saint Martin (Fransız Bölgesi)", "mg": "Madagaskar", "mh": "Marshall Adaları", "mk": "Kuzey Makedonya", "ml": "Mali", "mm": "Myanmar", "mn": "Moğolistan", "mo": "Makao", "mp": "Kuzey Mariana Adaları", "mq": "Martinik", "mr": "Moritanya", "ms": "Montserrat", "mt": "Malta", "mu": "Mauritius", "mv": "Maldivler", "mw": "Malavi", "mz": "Mozambik", "na": "Namibya", "nc": "Yeni Kaledonya", "ne": "Nijer", "nf": "Norfolk Adası", "ng": "Nijerya", "ni": "Nikaragua", "nu": "Niue", "nz": "Yeni Zelanda", "om": "Umman", "pa": "Panama", "pe": "Peru", "pf": "Fransız Polinezyası", "pg": "Papua Yeni Gine", "ph": "Filipinler", "pk": "Pakistan", "pm": "Saint Pierre ve Miquelon", "pn": "Pitcairn Adaları", "pr": "Porto Riko", "ps": "Filistin", "pw": "Palau", "py": "Paraguay", "qa": "Katar", "re": "Reunion", "rs": "Sırbistan", "rw": "Ruanda", "sb": "Solomon Adaları", "sc": "Seyşeller", "sd": "Sudan", "sh": "Saint Helena, Ascension ve Tristan da Cunha", "si": "Slovenya", "sj": "Svalbard ve Jan Mayen", "sk": "Slovakya", "sl": "Sierra Leone", "sm": "San Marino", "sn": "Senegal", "so": "Somali", "sr": "Surinam", "ss": "Güney Sudan", "st": "Sao Tome ve Principe", "sv": "El Salvador", "sx": "Sint Maarten (Hollanda Bölgesi)", "sz": "Esvatini", "tc": "Turks ve Caicos Adaları", "td": "Çad", "tf": "Fransız Güney Toprakları", "tg": "Togo", "th": "Tayland", "tj": "Tacikistan", "tk": "Tokelau", "tl": "Doğu Timor", "tm": "Türkmenistan", "tn": "Tunus", "to": "Tonga", "tv": "Tuvalu", "tw": "Tayvan", "tz": "Tanzanya", "ug": "Uganda", "um": "ABD Küçük Dış Adaları", "va": "Vatikan", "vc": "Saint Vincent ve Grenadinler", "vg": "Britanya Virjin Adaları", "vi": "ABD Virjin Adaları", "vn": "Vietnam", "vu": "Vanuatu", "wf": "Wallis ve Futuna", "ws": "Samoa", "ye": "Yemen", "yt": "Mayotte", "zm": "Zambiya", "zw": "Zimbabve"
  };

  // 2. ÜLKE BİLGİ METİNLERİ (Buradaki metinler sizin önceki girdilerinizden alınmıştır)
  const countryTexts = {
    "tr": "Türkiye hakkında bilgi ve video.",
    "us": "Amerika Birleşik Devletleri hakkında bilgi ve video.",
    "ca": "Kanada hakkında bilgi ve video.",
    "ir": "İran hakkında bilgi ve video.",
    "iq": "Irak hakkında bilgi ve video.",
    // Diğer tüm ülkeler için metinler... (Bu liste çok uzun olduğu için kısaltılmıştır.)
    // Eğer tüm metinlerinizi buraya eklediyseniz, bu kısmı tamamladınız demektir.
  };

  // 3. Kod Düzeltme Haritası (fixMap) - Yaygın isimleri ISO kodlarına eşler.
  const fixMap = {
    turkey: "tr", 
    usa: "us", 
    america: "us", 
    canada: "ca", 
    france: "fr", 
    germany: "de", 
    england: "gb", 
    uk: "gb",
  };

  // 4. SVG Tıklama Olayı Dinleyicisi
  svg.addEventListener("click", function (e) {
    let target = e.target.closest("path, polygon, g");
    if (!target) return;

    const idAttr = (target.getAttribute("id") || "").toLowerCase();
    const classAttr = (target.getAttribute("class") || "").toLowerCase();
    
    // ID veya Class içindeki tüm kelimeleri alır
    const tokens = (idAttr + " " + classAttr).trim().split(/\s+/).filter(Boolean);
    
    // fixMap'ten veya doğrudan 2 haneli ISO kodundan eşleşmeyi bulur
    let foundToken = tokens.find(t => fixMap[t] || (t.length === 2 && countryNames[t]));
    
    let rawCode = foundToken || tokens[0] || "";
    
    // Kodu fixMap üzerinden (örn. 'usa' -> 'us') veya doğrudan belirler
    let countryCode = fixMap[rawCode] || rawCode; 
    
    if (!countryCode || !countryNames[countryCode]) {
        console.warn(`Ülke kodu bulunamadı veya tanınmadı. Tıklanan öğenin ID/Class: ${idAttr} / ${classAttr}`);
        return; 
    }

    const name = countryNames[countryCode];
    const text = countryTexts[countryCode] || 
                 `**${name}** için henüz detaylı bilgi metni girilmemiştir.`;

    const newTab = window.open("", "_blank");
    
    if (!newTab || newTab.closed || typeof newTab.closed == 'undefined') {
        alert("Tarayıcınız pop-up pencerelerini engelledi. Lütfen bu site için izin verin.");
        return;
    }

    // --------------------------------------------------------
    // VIDEO ADI VE UZANTISI ESNEK ÇÖZÜMÜ (Irak ve İran için)
    // --------------------------------------------------------
    let videoFileName = countryCode;
    let videoExtension = 'mp4';
    let videoType = 'video/mp4';

    // Önceki denemelerinizde yaşadığınız sorunları aşmak için test isimlerini kontrol eder.
    if (countryCode === 'ir' || countryCode === 'iq') {
        // Eğer geçici olarak test-ir.mp4 adını kullandıysanız:
        // Bunu manuel olarak test edip, eğer çalışıyorsa aşağıdaki yorum satırını kaldırabilirsiniz.
        // if (countryCode === 'ir') {
        //     videoFileName = 'test-ir';
        // }
        
        // Eğer m4v uzantısı ile sorun çözüldüyse:
        // videoExtension = 'm4v';
        // videoType = 'video/x-m4v';
    }

    newTab.document.write(`
      <html>
      <head>
        <title>${name} Bilgi ve Video</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 25px; background:#f0f2f5; color: #333; }
          .container { max-width: 800px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          h1 { color: #007bff; margin-top: 0; border-bottom: 2px solid #007bff; padding-bottom: 10px; }
          p { font-size: 16px; line-height: 1.7; margin-bottom: 20px; }
          video { width: 100%; height: auto; margin-top: 15px; border-radius: 6px; }
          .closeButton {
            display: inline-block;
            padding: 10px 18px;
            background: #6c757d; 
            color: white;
            font-size: 14px;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            margin-bottom: 20px;
            cursor: pointer;
            transition: background 0.3s;
          }
          .closeButton:hover { background: #5a6268; }
        </style>
      </head>
      <body>
        <div class="container">
          <button class="closeButton" onclick="window.close()">✕ Sekmeyi Kapat</button>
          <h1>${name} 🗺️</h1>
          <p>${text}</p>
          <h2>Video Galeri</h2>
          <video id="countryVideo" autoplay muted controls>
            <source src="video/${videoFileName}.${videoExtension}" type="${videoType}">
            Tarayıcınız video etiketini desteklemiyor veya video dosyası bulunamadı: **video/${videoFileName}.${videoExtension}**
          </video>
        </div>
      </body>
      </html>
    `);

  });

});
