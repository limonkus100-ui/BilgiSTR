document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return; // SVG öğesi yoksa dur

  // 1. ÜLKE ADLARI VE KODLARI (ISO 3166-1 alpha-2)
  const countryNames = {
    "tr": "Türkiye", "us": "Amerika Birleşik Devletleri", "ca": "Kanada", "ir": "İran", "iq": "Irak", 
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

  // 2. ÜLKE BİLGİ METİNLERİ
  const countryTexts = {
    "tr": "Türkiye, Asya ve Avrupa kıtalarını birleştiren stratejik konumuyla bilinir. Zengin tarihi, kültürel çeşitliliği ve doğal güzellikleriyle öne çıkar. Başkenti Ankara'dır, ancak en büyük şehri ve kültür merkezi İstanbul'dur.",
    "us": "Amerika Birleşik Devletleri, 50 eyaletten oluşan federal bir cumhuriyettir. Dünya ekonomisinde, teknolojide ve kültürde önemli bir rol oynar. Başkenti Washington D.C.'dir.",
    "ca": "Kanada, yüzölçümü bakımından dünyanın ikinci en büyük ülkesidir. Doğal kaynakları ve geniş, vahşi doğası ile ünlüdür. Resmi dilleri İngilizce ve Fransızca'dır.",
    "ir": "İran, köklü Pers medeniyetinin mirasçısıdır. Zengin bir kültüre, sanata ve mimariye sahiptir. Başkenti Tahran'dır.",
    "iq": "Irak, Mezopotamya'nın kalbinde yer alır ve insanlık tarihinin en eski medeniyetlerine ev sahipliği yapmıştır. Başkenti Bağdat'tır.",
    "de": "Almanya, Avrupa Birliği'nin kurucu üyelerindendir ve kıtanın en büyük ekonomisine sahiptir. Başkenti Berlin'dir.",
    "fr": "Fransa, kültürü, sanatı, mutfağı ve modasıyla dünya çapında tanınır. Başkenti Paris, 'Işık Şehri' olarak bilinir.",
    "gb": "Birleşik Krallık; İngiltere, İskoçya, Galler ve Kuzey İrlanda'dan oluşur. Başkenti Londra, küresel bir finans merkezidir.",
    "es": "İspanya, zengin kültürü, Flamenko müziği ve dansı, boğa güreşleri ve Akdeniz mutfağıyla meşhurdur. Başkenti Madrid'dir.",
    "it": "İtalya, Roma İmparatorluğu'nun beşiği, Rönesans'ın doğum yeridir ve dünya sanat ve mimarisinin merkezlerindendir. Başkenti Roma'dır.",
    "ru": "Rusya, dünyanın en büyük ülkesidir ve geniş coğrafyası nedeniyle çok çeşitli iklim ve kültürlere sahiptir. Başkenti Moskova'dır.",
    "cn": "Çin Halk Cumhuriyeti, dünyanın en kalabalık ülkesidir ve binlerce yıllık kesintisiz bir tarihe sahiptir. Başkenti Pekin'dir.",
    "jp": "Japonya, Pasifik Okyanusu'nda bir ada ülkesidir. Yüksek teknoloji, geleneksel sanatlar ve eşsiz kültürüyle bilinir. Başkenti Tokyo'dur.",
    "au": "Avustralya, kendine has vahşi yaşamı ve geniş çölleriyle bilinen bir ada kıtasıdır. Başkenti Canberra'dır.",
    "br": "Brezilya, Güney Amerika'nın en büyük ülkesidir. Amazon yağmur ormanlarına, karnavallara ve futbol kültürüne sahiptir. Resmi dili Portekizce'dir.",
    "mx": "Meksika, antik Maya ve Aztek medeniyetlerinin mirasını taşır. Zengin bir mutfak ve canlı bir kültüre sahiptir. Başkenti Meksiko'dur.",
    "in": "Hindistan, dünyanın ikinci en kalabalık ülkesidir. Zengin manevi tarihi, kültürel çeşitliliği ve Bollywood sinemasıyla öne çıkar. Başkenti Yeni Delhi'dir.",
    "sa": "Suudi Arabistan, Arap Yarımadası'nda yer alır ve İslam'ın iki kutsal şehrine (Mekke ve Medine) ev sahipliği yapar. Başkenti Riyad'dır.",
    "eg": "Mısır, köklü antik uygarlığı ve Giza piramitleriyle ünlüdür. Nil Nehri ülkenin can damarıdır. Başkenti Kahire'dir.",
    "za": "Güney Afrika, çeşitli kültürleri, dilleri ve çarpıcı doğal güzellikleriyle 'Gökkuşağı Ulusu' olarak bilinir. Üç farklı başkenti (Pretoria, Cape Town, Bloemfontein) vardır.",

    // Diğer tüm ülkeler için varsayılan veya eklenmiş metinler buraya devam eder...
    "ad": "Andorra hakkında bilgi...", "ae": "Birleşik Arap Emirlikleri hakkında bilgi...", 
    // ...
  };


  // 3. Kod Düzeltme Haritası (fixMap) - SVG'deki yaygın isimleri ISO kodlarına eşler.
  // Bu blok, ABD'nin "United States" class'ını doğru kod olan "us" ile eşleştirir ve syntax hatasını düzeltir.
  const fixMap = {
    turkey: "tr", 
    usa: "us", 
    america: "us", 
    "united states": "us",
    "united_states": "us",
    "United States": "us", // <-- HATA GİDERİLDİ: Bu satırdan sonra virgül var
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

    // ID ve Class niteliklerini al
    const idAttr = (target.getAttribute("id") || "").toLowerCase();
    // Class niteliği, "United States" gibi büyük harf ve boşluk içerdiğinden orijinal haliyle de alınır.
    const classAttr = (target.getAttribute("class") || ""); 

    // Hem küçük harfli token'ları hem de orijinal class'ı arıyoruz
    const tokens = (idAttr + " " + classAttr.toLowerCase()).trim().split(/\s+/).filter(Boolean);
    tokens.push(classAttr); // Orijinal class'ı listeye ekle

    let foundToken = tokens.find(t => fixMap[t] || (t.length === 2 && countryNames[t]));
    
    let rawCode = foundToken || tokens[0] || "";
    
    // fixMap'ten veya doğrudan token'dan ülke kodunu belirle
    let countryCode = fixMap[rawCode] || rawCode.toLowerCase(); 
    
    if (!countryCode || !countryNames[countryCode]) {
        console.warn(`Ülke kodu bulunamadı veya tanınmadı. Tıklanan öğenin ID/Class: ${idAttr} / ${classAttr}`);
        return; 
    }

    const name = countryNames[countryCode];
    const text = countryTexts[countryCode] || `**${name}** için henüz detaylı bilgi metni girilmemiştir. Lütfen bu bilgiyi daha sonra kontrol edin.`; 

    // -------------------------------
    // Yeni Sekme Açma ve Pop-up Engeli Kontrolü
    // -------------------------------
    const newTab = window.open("", "_blank");
    
    // Eğer pop-up engellendi veya sekme açılamadıysa uyarı göster
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
    newTab.document.close();
  });

});
