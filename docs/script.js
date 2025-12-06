document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return; // SVG öğesi yoksa dur

  // 1. GENİŞLETİLMİŞ ÜLKE ADLARI VE KODLARI (Hepsi küçük harf)
  const countryNames = {
    // A Harfi
    "ad": "Andorra", "ae": "Birleşik Arap Emirlikleri", "af": "Afganistan", "ag": "Antigua ve Barbuda", 
    "ai": "Anguilla", "al": "Arnavutluk", "am": "Ermenistan", "ao": "Angola", "aq": "Antarktika", 
    "ar": "Arjantin", "as": "Amerikan Samoası", "at": "Avusturya", "au": "Avustralya", "aw": "Aruba", 
    "ax": "Aland Adaları", "az": "Azerbaycan",
    
    // B Harfi
    "ba": "Bosna-Hersek", "bb": "Barbados", "bd": "Bangladeş", "be": "Belçika", "bf": "Burkina Faso", 
    "bg": "Bulgaristan", "bh": "Bahreyn", "bi": "Burundi", "bj": "Benin", "bl": "Saint Barthelemy", 
    "bm": "Bermuda", "bn": "Brunei", "bo": "Bolivya", "bq": "Karayip Hollandası", "br": "Brezilya", 
    "bs": "Bahamalar", "bt": "Bhutan", "bv": "Bouvet Adası", "bw": "Botsvana", "by": "Belarus", 
    "bz": "Belize",
    
    // C - Ç Harfleri
    "ca": "Kanada", "cc": "Cocos (Keeling) Adaları", "cd": "Kongo Demokratik Cumhuriyeti", 
    "cf": "Orta Afrika Cumhuriyeti", "cg": "Kongo", "ch": "İsviçre", "ci": "Fildişi Sahili", 
    "ck": "Cook Adaları", "cl": "Şili", "cm": "Kamerun", "cn": "Çin", "co": "Kolombiya", 
    "cr": "Kosta Rika", "cu": "Küba", "cv": "Cape Verde", "cw": "Curaçao", 
    "cx": "Christmas Adası", "cy": "Kıbrıs", "cz": "Çekya",
    
    // D Harfi
    "de": "Almanya", "dj": "Cibuti", "dk": "Danimarka", "dm": "Dominika", "do": "Dominik Cumhuriyeti", 
    "dz": "Cezayir",
    
    // E Harfi
    "ec": "Ekvador", "ee": "Estonya", "eg": "Mısır", "eh": "Batı Sahra", "er": "Eritre", 
    "es": "İspanya", "et": "Etiyopya",
    
    // F Harfi
    "fi": "Finlandiya", "fj": "Fiji", "fk": "Falkland Adaları", "fm": "Mikronezya", 
    "fo": "Faroe Adaları", "fr": "Fransa",
    
    // G Harfi
    "ga": "Gabon", "gb": "Birleşik Krallık", "gd": "Grenada", "ge": "Gürcistan", 
    "gf": "Fransız Guyanası", "gg": "Guernsey", "gh": "Gana", "gi": "Cebelitarık", 
    "gl": "Grönland", "gm": "Gambiya", "gn": "Gine", "gp": "Guadeloupe", 
    "gq": "Ekvator Ginesi", "gr": "Yunanistan", "gs": "Güney Georgia ve Güney Sandwich Adaları", 
    "gt": "Guatemala", "gu": "Guam", "gw": "Gine-Bissau", "gy": "Guyana",
    
    // H Harfi
    "hk": "Hong Kong", "hm": "Heard Adası ve McDonald Adaları", "hn": "Honduras", 
    "hr": "Hırvatistan", "ht": "Haiti", "hu": "Macaristan",
    
    // I - İ Harfleri
    "id": "Endonezya", "ie": "İrlanda", "il": "İsrail", "im": "Man Adası", "in": "Hindistan", 
    "io": "Britanya Hint Okyanusu Toprakları", "iq": "Irak", "ir": "İran", "is": "İzlanda", 
    "it": "İtalya",
    
    // J Harfi
    "je": "Jersey", "jm": "Jamaika", "jo": "Ürdün", "jp": "Japonya",
    
    // K Harfi
    "ke": "Kenya", "kg": "Kırgızistan", "kh": "Kamboçya", "ki": "Kiribati", "km": "Komorlar", 
    "kn": "Saint Kitts ve Nevis", "kp": "Kuzey Kore", "kr": "Güney Kore", "kw": "Kuveyt", 
    "ky": "Cayman Adaları", "kz": "Kazakistan",
    
    // L Harfi
    "la": "Laos", "lb": "Lübnan", "lc": "Saint Lucia", "li": "Lihtenştayn", "lk": "Sri Lanka", 
    "lr": "Liberya", "ls": "Lesoto", "lt": "Litvanya", "lu": "Lüksemburg", "lv": "Letonya", 
    "ly": "Libya",
    
    // M Harfi
    "ma": "Fas", "mc": "Monako", "md": "Moldova", "me": "Karadağ", "mf": "Saint Martin (Fransız Bölgesi)", 
    "mg": "Madagaskar", "mh": "Marshall Adaları", "mk": "Kuzey Makedonya", "ml": "Mali", "mm": "Myanmar", 
    "mn": "Moğolistan", "mo": "Makao", "mp": "Kuzey Mariana Adaları", "mq": "Martinik", 
    "mr": "Moritanya", "ms": "Montserrat", "mt": "Malta", "mu": "Mauritius", "mv": "Maldivler", 
    "mw": "Malavi", "mx": "Meksika", "my": "Malezya", "mz": "Mozambik",
    
    // N Harfi
    "na": "Namibya", "nc": "Yeni Kaledonya", "ne": "Nijer", "nf": "Norfolk Adası", 
    "ng": "Nijerya", "ni": "Nikaragua", "nl": "Hollanda", "no": "Norveç", "np": "Nepal", 
    "nr": "Nauru", "nu": "Niue", "nz": "Yeni Zelanda",
    
    // O Harfi
    "om": "Umman",
    
    // P Harfi
    "pa": "Panama", "pe": "Peru", "pf": "Fransız Polinezyası", "pg": "Papua Yeni Gine", 
    "ph": "Filipinler", "pk": "Pakistan", "pl": "Polonya", "pm": "Saint Pierre ve Miquelon", 
    "pn": "Pitcairn Adaları", "pr": "Porto Riko", "ps": "Filistin", "pt": "Portekiz", 
    "pw": "Palau", "py": "Paraguay",
    
    // Q Harfi
    "qa": "Katar",
    
    // R Harfi
    "re": "Reunion", "ro": "Romanya", "rs": "Sırbistan", "ru": "Rusya Federasyonu", "rw": "Ruanda",
    
    // S Harfi
    "sa": "Suudi Arabistan", "sb": "Solomon Adaları", "sc": "Seyşeller", "sd": "Sudan", 
    "se": "İsveç", "sg": "Singapur", "sh": "Saint Helena, Ascension ve Tristan da Cunha", 
    "si": "Slovenya", "sj": "Svalbard ve Jan Mayen", "sk": "Slovakya", "sl": "Sierra Leone", 
    "sm": "San Marino", "sn": "Senegal", "so": "Somali", "sr": "Surinam", "ss": "Güney Sudan", 
    "st": "Sao Tome ve Principe", "sv": "El Salvador", "sx": "Sint Maarten (Hollanda Bölgesi)", 
    "sy": "Suriye", "sz": "Esvatini",
    
    // T Harfi
    "tc": "Turks ve Caicos Adaları", "td": "Çad", "tf": "Fransız Güney Toprakları", "tg": "Togo", 
    "th": "Tayland", "tj": "Tacikistan", "tk": "Tokelau", "tl": "Doğu Timor", "tm": "Türkmenistan", 
    "tn": "Tunus", "to": "Tonga", "tr": "Türkiye", "tt": "Trinidad ve Tobago", "tv": "Tuvalu", 
    "tw": "Tayvan", "tz": "Tanzanya",
    
    // U Harfi
    "ua": "Ukrayna", "ug": "Uganda", "um": "ABD Küçük Dış Adaları", "us": "Amerika Birleşik Devletleri", 
    "uy": "Uruguay", "uz": "Özbekistan",
    
    // V Harfi
    "va": "Vatikan", "vc": "Saint Vincent ve Grenadinler", "ve": "Venezuela", "vg": "Britanya Virjin Adaları", 
    "vi": "ABD Virjin Adaları", "vn": "Vietnam", "vu": "Vanuatu",
    
    // W Harfi
    "wf": "Wallis ve Futuna", "ws": "Samoa",
    
    // Y Harfi
    "ye": "Yemen", "yt": "Mayotte",
    
    // Z Harfi
    "za": "Güney Afrika", "zm": "Zambiya", "zw": "Zimbabve"
  };

  // 2. ÜLKE BİLGİ METİNLERİ (Anahtarlar küçük harfe dönüştürülmüştür)
  // BURAYA GİRDİĞİNİZ TÜM METİNLER KORUNMUŞTUR.
  const countryTexts = {
    "ad": "Andorra hakkında bilgi ve video.",
    "ae": "Birleşik Arap Emirlikleri hakkında bilgi ve video.",
    "af": "Afganistan hakkında bilgi ve video.",
    "ag": "Antigua ve Barbuda hakkında bilgi ve video.",
    "ai": "Anguilla hakkında bilgi ve video.",
    "al": "Arnavutluk hakkında bilgi ve video.",
    "am": "Ermenistan hakkında bilgi ve video.",
    "ao": "Angola hakkında bilgi ve video.",
    "aq": "Antarktika hakkında bilgi ve video.",
    "ar": "Arjantin hakkında bilgi ve video.",
    "as": "Amerikan Samoası hakkında bilgi ve video.",
    "at": "Avusturya hakkında bilgi ve video.",
    "au": "Avustralya hakkında bilgi ve video.",
    "aw": "Aruba hakkında bilgi ve video.",
    "ax": "Aland Adaları hakkında bilgi ve video.",
    "az": "Azerbaycan hakkında bilgi ve video.",
    "ba": "Bosna-Hersek hakkında bilgi ve video.",
    "bb": "Barbados hakkında bilgi ve video.",
    "bd": "Bangladeş hakkında bilgi ve video.",
    "be": "Belçika hakkında bilgi ve video.",
    "bf": "Burkina Faso hakkında bilgi ve video.",
    "bg": "Bulgaristan hakkında bilgi ve video.",
    "bh": "Bahreyn hakkında bilgi ve video.",
    "bi": "Burundi hakkında bilgi ve video.",
    "bj": "Benin hakkında bilgi ve video.",
    "bl": "Saint Barthelemy hakkında bilgi ve video.",
    "bm": "Bermuda hakkında bilgi ve video.",
    "bn": "Brunei hakkında bilgi ve video.",
    "bo": "Bolivya hakkında bilgi ve video.",
    "bq": "Karayip Hollandası (Bonaire, Sint Eustatius ve Saba) hakkında bilgi ve video.",
    "br": "Brezilya hakkında bilgi ve video.",
    "bs": "Bahamalar hakkında bilgi ve video.",
    "bt": "Bhutan hakkında bilgi ve video.",
    "bv": "Bouvet Adası hakkında bilgi ve video.",
    "bw": "Botsvana hakkında bilgi ve video.",
    "by": "Belarus hakkında bilgi ve video.",
    "bz": "Belize hakkında bilgi ve video.",
    "ca": "Kanada hakkında bilgi ve video.",
    "cc": "Cocos (Keeling) Adaları hakkında bilgi ve video.",
    "cd": "Kongo Demokratik Cumhuriyeti hakkında bilgi ve video.",
    "cf": "Orta Afrika Cumhuriyeti hakkında bilgi ve video.",
    "cg": "Kongo hakkında bilgi ve video.",
    "ch": "İsviçre hakkında bilgi ve video.",
    "ci": "Fildişi Sahili hakkında bilgi ve video.",
    "ck": "Cook Adaları hakkında bilgi ve video.",
    "cl": "Şili hakkında bilgi ve video.",
    "cm": "Kamerun hakkında bilgi ve video.",
    "cn": "Çin hakkında bilgi ve video.",
    "co": "Kolombiya hakkında bilgi ve video.",
    "cr": "Kosta Rika hakkında bilgi ve video.",
    "cu": "Küba hakkında bilgi ve video.",
    "cv": "Cape Verde hakkında bilgi ve video.",
    "cw": "Curaçao hakkında bilgi ve video.",
    "cx": "Christmas Adası hakkında bilgi ve video.",
    "cy": "Kıbrıs hakkında bilgi ve video.",
    "cz": "Çekya hakkında bilgi ve video.",
    "de": "Almanya hakkında bilgi ve video.",
    "dj": "Cibuti hakkında bilgi ve video.",
    "dk": "Danimarka hakkında bilgi ve video.",
    "dm": "Dominika hakkında bilgi ve video.",
    "do": "Dominik Cumhuriyeti hakkında bilgi ve video.",
    "dz": "Cezayir hakkında bilgi ve video.",
    "ec": "Ekvador hakkında bilgi ve video.",
    "ee": "Estonya hakkında bilgi ve video.",
    "eg": "Mısır hakkında bilgi ve video.",
    "eh": "Batı Sahra hakkında bilgi ve video.",
    "er": "Eritre hakkında bilgi ve video.",
    "es": "İspanya hakkında bilgi ve video.",
    "et": "Etiyopya hakkında bilgi ve video.",
    "fi": "Finlandiya hakkında bilgi ve video.",
    "fj": "Fiji hakkında bilgi ve video.",
    "fk": "Falkland Adaları hakkında bilgi ve video.",
    "fm": "Mikronezya hakkında bilgi ve video.",
    "fo": "Faroe Adaları hakkında bilgi ve video.",
    "fr": "Fransa hakkında bilgi ve video.",
    "ga": "Gabon hakkında bilgi ve video.",
    "gb": "Birleşik Krallık hakkında bilgi ve video.",
    "gd": "Grenada hakkında bilgi ve video.",
    "ge": "Gürcistan hakkında bilgi ve video.",
    "gf": "Fransız Guyanası hakkında bilgi ve video.",
    "gg": "Guernsey hakkında bilgi ve video.",
    "gh": "Gana hakkında bilgi ve video.",
    "gi": "Cebelitarık hakkında bilgi ve video.",
    "gl": "Grönland hakkında bilgi ve video.",
    "gm": "Gambiya hakkında bilgi ve video.",
    "gn": "Gine hakkında bilgi ve video.",
    "gp": "Guadeloupe hakkında bilgi ve video.",
    "gq": "Ekvator Ginesi hakkında bilgi ve video.",
    "gr": "Yunanistan hakkında bilgi ve video.",
    "gs": "Güney Georgia ve Güney Sandwich Adaları hakkında bilgi ve video.",
    "gt": "Guatemala hakkında bilgi ve video.",
    "gu": "Guam hakkında bilgi ve video.",
    "gw": "Gine-Bissau hakkında bilgi ve video.",
    "gy": "Guyana hakkında bilgi ve video.",
    "hk": "Hong Kong hakkında bilgi ve video.",
    "hm": "Heard Adası ve McDonald Adaları hakkında bilgi ve video.",
    "hn": "Honduras hakkında bilgi ve video.",
    "hr": "Hırvatistan hakkında bilgi ve video.",
    "ht": "Haiti hakkında bilgi ve video.",
    "hu": "Macaristan hakkında bilgi ve video.",
    "id": "Endonezya hakkında bilgi ve video.",
    "ie": "İrlanda hakkında bilgi ve video.",
    "il": "İsrail hakkında bilgi ve video.",
    "im": "Man Adası hakkında bilgi ve video.",
    "in": "Hindistan hakkında bilgi ve video.",
    "io": "Britanya Hint Okyanusu Toprakları hakkında bilgi ve video.",
    "iq": "Irak hakkında bilgi ve video.",
    "ir": "İran hakkında bilgi ve video.",
    "is": "İzlanda hakkında bilgi ve video.",
    "it": "İtalya hakkında bilgi ve video.",
    "je": "Jersey hakkında bilgi ve video.",
    "jm": "Jamaika hakkında bilgi ve video.",
    "jo": "Ürdün hakkında bilgi ve video.",
    "jp": "Japonya hakkında bilgi ve video.",
    "ke": "Kenya hakkında bilgi ve video.",
    "kg": "Kırgızistan hakkında bilgi ve video.",
    "kh": "Kamboçya hakkında bilgi ve video.",
    "ki": "Kiribati hakkında bilgi ve video.",
    "km": "Komorlar hakkında bilgi ve video.",
    "kn": "Saint Kitts ve Nevis hakkında bilgi ve video.",
    "kp": "Kuzey Kore hakkında bilgi ve video.",
    "kr": "Güney Kore hakkında bilgi ve video.",
    "kw": "Kuveyt hakkında bilgi ve video.",
    "ky": "Cayman Adaları hakkında bilgi ve video.",
    "kz": "Kazakistan hakkında bilgi ve video.",
    "la": "Laos hakkında bilgi ve video.",
    "lb": "Lübnan hakkında bilgi ve video.",
    "lc": "Saint Lucia hakkında bilgi ve video.",
    "li": "Lihtenştayn hakkında bilgi ve video.",
    "lk": "Sri Lanka hakkında bilgi ve video.",
    "lr": "Liberya hakkında bilgi ve video.",
    "ls": "Lesoto hakkında bilgi ve video.",
    "lt": "Litvanya hakkında bilgi ve video.",
    "lu": "Lüksemburg hakkında bilgi ve video.",
    "lv": "Letonya hakkında bilgi ve video.",
    "ly": "Libya hakkında bilgi ve video.",
    "ma": "Fas hakkında bilgi ve video.",
    "mc": "Monako hakkında bilgi ve video.",
    "md": "Moldova hakkında bilgi ve video.",
    "me": "Karadağ hakkında bilgi ve video.",
    "mf": "Saint Martin (Fransız Bölgesi) hakkında bilgi ve video.",
    "mg": "Madagaskar hakkında bilgi ve video.",
    "mh": "Marshall Adaları hakkında bilgi ve video.",
    "mk": "Kuzey Makedonya hakkında bilgi ve video.",
    "ml": "Mali hakkında bilgi ve video.",
    "mm": "Myanmar hakkında bilgi ve video.",
    "mn": "Moğolistan hakkında bilgi ve video.",
    "mo": "Makao hakkında bilgi ve video.",
    "mp": "Kuzey Mariana Adaları hakkında bilgi ve video.",
    "mq": "Martinik hakkında bilgi ve video.",
    "mr": "Moritanya hakkında bilgi ve video.",
    "ms": "Montserrat hakkında bilgi ve video.",
    "mt": "Malta hakkında bilgi ve video.",
    "mu": "Mauritius hakkında bilgi ve video.",
    "mv": "Maldivler hakkında bilgi ve video.",
    "mw": "Malavi hakkında bilgi ve video.",
    "mx": "Meksika hakkında bilgi ve video.",
    "my": "Malezya hakkında bilgi ve video.",
    "mz": "Mozambik hakkında bilgi ve video.",
    "na": "Namibya hakkında bilgi ve video.",
    "nc": "Yeni Kaledonya hakkında bilgi ve video.",
    "ne": "Nijer hakkında bilgi ve video.",
    "nf": "Norfolk Adası hakkında bilgi ve video.",
    "ng": "Nijerya hakkında bilgi ve video.",
    "ni": "Nikaragua hakkında bilgi ve video.",
    "nl": "Hollanda hakkında bilgi ve video.",
    "no": "Norveç hakkında bilgi ve video.",
    "np": "Nepal hakkında bilgi ve video.",
    "nr": "Nauru hakkında bilgi ve video.",
    "nu": "Niue hakkında bilgi ve video.",
    "nz": "Yeni Zelanda hakkında bilgi ve video.",
    "om": "Umman hakkında bilgi ve video.",
    "pa": "Panama hakkında bilgi ve video.",
    "pe": "Peru hakkında bilgi ve video.",
    "pf": "Fransız Polinezyası hakkında bilgi ve video.",
    "pg": "Papua Yeni Gine hakkında bilgi ve video.",
    "ph": "Filipinler hakkında bilgi ve video.",
    "pk": "Pakistan hakkında bilgi ve video.",
    "pl": "Polonya hakkında bilgi ve video.",
    "pm": "Saint Pierre ve Miquelon hakkında bilgi ve video.",
    "pn": "Pitcairn Adaları hakkında bilgi ve video.",
    "pr": "Porto Riko hakkında bilgi ve video.",
    "ps": "Filistin hakkında bilgi ve video.",
    "pt": "Portekiz hakkında bilgi ve video.",
    "pw": "Palau hakkında bilgi ve video.",
    "py": "Paraguay hakkında bilgi ve video.",
    "qa": "Katar hakkında bilgi ve video.",
    "re": "Reunion hakkında bilgi ve video.",
    "ro": "Romanya hakkında bilgi ve video.",
    "rs": "Sırbistan hakkında bilgi ve video.",
    "ru": "Rusya Federasyonu hakkında bilgi ve video.",
    "rw": "Ruanda hakkında bilgi ve video.",
    "sa": "Suudi Arabistan hakkında bilgi ve video.",
    "sb": "Solomon Adaları hakkında bilgi ve video.",
    "sc": "Seyşeller hakkında bilgi ve video.",
    "sd": "Sudan hakkında bilgi ve video.",
    "se": "İsveç hakkında bilgi ve video.",
    "sg": "Singapur hakkında bilgi ve video.",
    "sh": "Saint Helena, Ascension ve Tristan da Cunha hakkında bilgi ve video.",
    "si": "Slovenya hakkında bilgi ve video.",
    "sj": "Svalbard ve Jan Mayen hakkında bilgi ve video.",
    "sk": "Slovakya hakkında bilgi ve video.",
    "sl": "Sierra Leone hakkında bilgi ve video.",
    "sm": "San Marino hakkında bilgi ve video.",
    "sn": "Senegal hakkında bilgi ve video.",
    "so": "Somali hakkında bilgi ve video.",
    "sr": "Surinam hakkında bilgi ve video.",
    "ss": "Güney Sudan hakkında bilgi ve video.",
    "st": "Sao Tome ve Principe hakkında bilgi ve video.",
    "sv": "El Salvador hakkında bilgi ve video.",
    "sx": "Sint Maarten (Hollanda Bölgesi) hakkında bilgi ve video.",
    "sy": "Suriye hakkında bilgi ve video.",
    "sz": "Esvatini hakkında bilgi ve video.",
    "tc": "Turks ve Caicos Adaları hakkında bilgi ve video.",
    "td": "Çad hakkında bilgi ve video.",
    "tf": "Fransız Güney Toprakları hakkında bilgi ve video.",
    "tg": "Togo hakkında bilgi ve video.",
    "th": "Tayland hakkında bilgi ve video.",
    "tj": "Tacikistan hakkında bilgi ve video.",
    "tk": "Tokelau hakkında bilgi ve video.",
    "tl": "Doğu Timor hakkında bilgi ve video.",
    "tm": "Türkmenistan hakkında bilgi ve video.",
    "tn": "Tunus hakkında bilgi ve video.",
    "to": "Tonga hakkında bilgi ve video.",
    "tr": "Türkiye hakkında bilgi ve video.",
    "tt": "Trinidad ve Tobago hakkında bilgi ve video.",
    "tv": "Tuvalu hakkında bilgi ve video.",
    "tw": "Tayvan hakkında bilgi ve video.",
    "tz": "Tanzanya hakkında bilgi ve video.",
    "ua": "Ukrayna hakkında bilgi ve video.",
    "ug": "Uganda hakkında bilgi ve video.",
    "um": "Amerika Birleşik Devletleri Küçük Dış Adaları hakkında bilgi ve video.",
    "us": "Amerika Birleşik Devletleri hakkında bilgi ve video.",
    "uy": "Uruguay hakkında bilgi ve video.",
    "uz": "Özbekistan hakkında bilgi ve video.",
    "va": "Vatikan hakkında bilgi ve video.",
    "vc": "Saint Vincent ve Grenadinler hakkında bilgi ve video.",
    "ve": "Venezuela hakkında bilgi ve video.",
    "vg": "Britanya Virjin Adaları hakkında bilgi ve video.",
    "vi": "Amerika Birleşik Devletleri Virjin Adaları hakkında bilgi ve video.",
    "vn": "Vietnam hakkında bilgi ve video.",
    "vu": "Vanuatu hakkında bilgi ve video.",
    "wf": "Wallis ve Futuna hakkında bilgi ve video.",
    "ws": "Samoa hakkında bilgi ve video.",
    "ye": "Yemen hakkında bilgi ve video.",
    "yt": "Mayotte hakkında bilgi ve video.",
    "za": "Güney Afrika hakkında bilgi ve video.",
    "zm": "Zambiya hakkında bilgi ve video.",
    "zw": "Zimbabve hakkında bilgi ve video.",
  };

  // 3. Kod Düzeltme Haritası (SVG'deki yaygın isimleri ISO kodlarına eşler)
  const fixMap = {
    turkey: "tr", usa: "us", france: "fr", germany: "de", england: "gb", uk: "gb",
  };

  // 4. SVG Tıklama Olayı Dinleyicisi
  svg.addEventListener("click", function (e) {
    let target = e.target.closest("path, polygon, g");
    if (!target) return;

    const idAttr = (target.getAttribute("id") || "").toLowerCase();
    const classAttr = (target.getAttribute("class") || "").toLowerCase();
    
    // ID ve Class'taki olası ülke kodlarını/isimlerini arar
    const tokens = (idAttr + " " + classAttr).trim().split(/\s+/).filter(Boolean);
    
    // fixMap'ten veya countryNames'ten eşleşen 2 haneli kodu bulur
    let foundToken = tokens.find(t => fixMap[t] || countryNames[t]);
    
    let rawCode = foundToken || tokens[0] || "";
    
    // SVG ID'si "france" ise "fr" kodu elde edilir
    let countryCode = fixMap[rawCode] || rawCode; 
    
    // Geçerli bir kod yoksa veya metin listesinde tanımlı değilse dur
    if (!countryCode || !countryNames[countryCode]) return;

    const name = countryNames[countryCode];
    
    // Metin listesinden bilgiyi çeker.
    const text = countryTexts[countryCode] || 
                 `${name} için henüz detaylı bilgi metni girilmemiştir. Lütfen bu bilgiyi daha sonra kontrol edin.`;

    // -------------------------------
    // Yeni Sekme Aç ve Video Otomatik Başlat
    // -------------------------------
    const newTab = window.open("", "_blank");

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
            <source src="video/${countryCode}.mp4" type="video/mp4">
            Tarayıcınız video etiketini desteklemiyor veya video dosyası bulunamadı: **video/${countryCode}.mp4**
          </video>
        </div>
      </body>
      </html>
    `);

  });

});


