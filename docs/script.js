document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return; // SVG öğesi yoksa dur

  // 1. GENİŞLETİLMİŞ ÜLKE ADLARI VE KODLARI (Hepsi küçük harf ISO 3166-1 alpha-2)
  const countryNames = {
    // Türkiye, ABD, Kanada, Irak ve İran gibi sıklıkla sorun çıkaran kodlar dahil
    "tr": "Türkiye", "us": "Amerika Birleşik Devletleri", "ca": "Kanada", "ir": "İran", "iq": "Irak", 
    // Diğer tüm kodlar
    "ad": "Andorra", "ae": "Birleşik Arap Emirlikleri", "af": "Afganistan", "ag": "Antigua ve Barbuda", "ai": "Anguilla", "al": "Arnavutluk", "am": "Ermenistan", "ao": "Angola", "aq": "Antarktika", "ar": "Arjantin", "as": "Amerikan Samoası", "at": "Avusturya", "au": "Avustralya", "aw": "Aruba", "ax": "Aland Adaları", "az": "Azerbaycan",
    "ba": "Bosna-Hersek", "bb": "Barbados", "bd": "Bangladeş", "be": "Belçika", "bf": "Burkina Faso", "bg": "Bulgaristan", "bh": "Bahreyn", "bi": "Burundi", "bj": "Benin", "bl": "Saint Barthelemy", "bm": "Bermuda", "bn": "Brunei", "bo": "Bolivya", "bq": "Karayip Hollandası", "br": "Brezilya", "bs": "Bahamalar", "bt": "Bhutan", "bv": "Bouvet Adası", "bw": "Botsvana", "by": "Belarus", "bz": "Belize",
    "cc": "Cocos (Keeling) Adaları", "cd": "Kongo Demokratik Cumhuriyeti", "cf": "Orta Afrika Cumhuriyeti", "cg": "Kongo", "ch": "İsviçre", "ci": "Fildişi Sahili", "ck": "Cook Adaları", "cl": "Şili", "cm": "Kamerun", "cn": "Çin", "co": "Kolombiya", "cr": "Kosta Rika", "cu": "Küba", "cv": "Cape Verde", "cw": "Curaçao", "cx": "Christmas Adası", "cy": "Kıbrıs", "cz": "Çekya",
    "de": "Almanya", "dj": "Cibuti", "dk": "Danimarka", "dm": "Dominika", "do": "Dominik Cumhuriyeti", "dz": "Cezayir",
    "ec": "Ekvador", "ee": "Estonya", "eg": "Mısır", "eh": "Batı Sahra", "er": "Eritre", "es": "İspanya", "et": "Etiyopya",
    "fi": "Finlandiya", "fj": "Fiji", "fk": "Falkland Adaları", "fm": "Mikronezya", "fo": "Faroe Adaları", "fr": "Fransa",
    "ga": "Gabon", "gb": "Birleşik Krallık", "gd": "Grenada", "ge": "Gürcistan", "gf": "Fransız Guyanası", "gg": "Guernsey", "gh": "Gana", "gi": "Cebelitarık", "gl": "Grönland", "gm": "Gambiya", "gn": "Gine", "gp": "Guadeloupe", "gq": "Ekvator Ginesi", "gr": "Yunanistan", "gs": "Güney Georgia ve Güney Sandwich Adaları", "gt": "Guatemala", "gu": "Guam", "gw": "Gine-Bissau", "gy": "Guyana",
    "hk": "Hong Kong", "hm": "Heard Adası ve McDonald Adaları", "hn": "Honduras", "hr": "Hırvatistan", "ht": "Haiti", "hu": "Macaristan",
    "id": "Endonezya", "ie": "İrlanda", "il": "İsrail", "im": "Man Adası", "in": "Hindistan", "io": "Britanya Hint Okyanusu Toprakları", "is": "İzlanda", "it": "İtalya",
    "je": "Jersey", "jm": "Jamaika", "jo": "Ürdün", "jp": "Japonya",
    "ke": "Kenya", "kg": "Kırgızistan", "kh": "Kamboçya", "ki": "Kiribati", "km": "Komorlar", "kn": "Saint Kitts ve Nevis", "kp": "Kuzey Kore", "kr": "Güney Kore", "kw": "Kuveyt", "ky": "Cayman Adaları", "kz": "Kazakistan",
    "la": "Laos", "lb": "Lübnan", "lc": "Saint Lucia", "li": "Lihtenştayn", "lk": "Sri Lanka", "lr": "Liberya", "ls": "Lesoto", "lt": "Litvanya", "lu": "Lüksemburg", "lv": "Letonya", "ly": "Libya",
    "ma": "Fas", "mc": "Monako", "md": "Moldova", "me": "Karadağ", "mf": "Saint Martin (Fransız Bölgesi)", "mg": "Madagaskar", "mh": "Marshall Adaları", "mk": "Kuzey Makedonya", "ml": "Mali", "mm": "Myanmar", "mn": "Moğolistan", "mo": "Makao", "mp": "Kuzey Mariana Adaları", "mq": "Martinik", "mr": "Moritanya", "ms": "Montserrat", "mt": "Malta", "mu": "Mauritius", "mv": "Maldivler", "mw": "Malavi", "mx": "Meksika", "my": "Malezya", "mz": "Mozambik",
    "na": "Namibya", "nc": "Yeni Kaledonya", "ne": "Nijer", "nf": "Norfolk Adası", "ng": "Nijerya", "ni": "Nikaragua", "nl": "Hollanda", "no": "Norveç", "np": "Nepal", "nr": "Nauru", "nu": "Niue", "nz": "Yeni Zelanda",
    "om": "Umman",
    "pa": "Panama", "pe": "Peru", "pf": "Fransız Polinezyası", "pg": "Papua Yeni Gine", "ph": "Filipinler", "pk": "Pakistan", "pl": "Polonya", "pm": "Saint Pierre ve Miquelon", "pn": "Pitcairn Adaları", "pr": "Porto Riko", "ps": "Filistin", "pt": "Portekiz", "pw": "Palau", "py": "Paraguay",
    "qa": "Katar",
    "re": "Reunion", "ro": "Romanya", "rs": "Sırbistan", "ru": "Rusya Federasyonu", "rw": "Ruanda",
    "sa": "Suudi Arabistan", "sb": "Solomon Adaları", "sc": "Seyşeller", "sd": "Sudan", "se": "İsveç", "sg": "Singapur", "sh": "Saint Helena, Ascension ve Tristan da Cunha", "si": "Slovenya", "sj": "Svalbard ve Jan Mayen", "sk": "Slovakya", "sl": "Sierra Leone", "sm": "San Marino", "sn": "Senegal", "so": "Somali", "sr": "Surinam", "ss": "Güney Sudan", "st": "Sao Tome ve Principe", "sv": "El Salvador", "sx": "Sint Maarten (Hollanda Bölgesi)", "sy": "Suriye", "sz": "Esvatini",
    "tc": "Turks ve Caicos Adaları", "td": "Çad", "tf": "Fransız Güney Toprakları", "tg": "Togo", "th": "Tayland", "tj": "Tacikistan", "tk": "Tokelau", "tl": "Doğu Timor", "tm": "Türkmenistan", "tn": "Tunus", "to": "Tonga", "tv": "Tuvalu", "tw": "Tayvan", "tz": "Tanzanya",
    "ua": "Ukrayna", "ug": "Uganda", "um": "ABD Küçük Dış Adaları", "uy": "Uruguay", "uz": "Özbekistan",
    "va": "Vatikan", "vc": "Saint Vincent ve Grenadinler", "ve": "Venezuela", "vg": "Britanya Virjin Adaları", "vi": "ABD Virjin Adaları", "vn": "Vietnam", "vu": "Vanuatu",
    "wf": "Wallis ve Futuna", "ws": "Samoa",
    "ye": "Yemen", "yt": "Mayotte",
    "za": "Güney Afrika", "zm": "Zambiya", "zw": "Zimbabve"
  };

  // 2. ÜLKE BİLGİ METİNLERİ (Sizin sağladığınız metinler)
  const countryTexts = {
    // Örnek Metinler (Tüm metinleriniz buraya eklenmelidir.)
    "tr": "Türkiye hakkında detaylı bilgi ve video içeriği.",
    "us": "Amerika Birleşik Devletleri hakkında bilgi.",
    "ir": "İran hakkında bilgi ve video.",
    "iq": "Irak hakkında bilgi ve video.",
    // ... Diğer tüm ülkeler için metinler
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
    
    const tokens = (idAttr + " " + classAttr).trim().split(/\s+/).filter(Boolean);
    
    let foundToken = tokens.find(t => fixMap[t] || (t.length === 2 && countryNames[t]));
    
    let rawCode = foundToken || tokens[0] || "";
    
    let countryCode = fixMap[rawCode] || rawCode; 
    
    if (!countryCode || !countryNames[countryCode]) {
        console.warn(`Ülke kodu bulunamadı veya tanınmadı. Tıklanan öğenin ID/Class: ${idAttr} / ${classAttr}`);
        return; 
    }

    const name = countryNames[countryCode];
    const text = countryTexts[countryCode] || 
                 `**${name}** için henüz detaylı bilgi metni girilmemiştir. Lütfen bu bilgiyi daha sonra kontrol edin.`;

    // -------------------------------
    // Yeni Sekme Açma İşlemi
    // -------------------------------
    const newTab = window.open("", "_blank");
    
    if (!newTab || newTab.closed || typeof newTab.closed == 'undefined') {
        alert("Tarayıcınız pop-up pencerelerini engelledi. Lütfen bu site için izin verin.");
        return;
    }

    // Video dosya adı varsayılan olarak ISO kodunu kullanır (örn: tr.mp4)
    const videoFileName = countryCode; 

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
            <source src="video/${videoFileName}.mp4" type="video/mp4">
            Tarayıcınız video etiketini desteklemiyor veya video dosyası bulunamadı: **video/${videoFileName}.mp4**
          </video>
        </div>
      </body>
      </html>
    `);
  });

});

