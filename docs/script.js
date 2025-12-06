document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return; // SVG öğesi yoksa dur

  // 1. GENİŞLETİLMİŞ ÜLKE ADLARI VE KODLARI (ISO 3166-1 alpha-2, hepsi küçük harf)
  // Bu liste harita öğesinin (path, g, polygon) tıklanılan ülkenin ismini bulmak için kullanılır.
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

  // 2. ÜLKE BİLGİ METİNLERİ (Sizin en son sağladığınız metinler baz alınarak)
  // BURAYA HER ÜLKE İÇİN İSTEDİĞİNİZ BİLGİ METNİNİ GİREBİLİRSİNİZ.
  const countryTexts = {
    // NOT: Metinleri güncelledikçe buradaki varsayılan metinleri kaldırıp 
    // yerlerine gerçek bilgileri yazmanız gerekmektedir.
    "AD": "Andorra hakkında bilgi ve video.",
    "AE": "Birleşik Arap Emirlikleri hakkında bilgi ve video.",
    "AF": "Afganistan hakkında bilgi ve video.",
    "AG": "Antigua ve Barbuda hakkında bilgi ve video.",
    "AI": "Anguilla hakkında bilgi ve video.",
    "AL": "Arnavutluk hakkında bilgi ve video.",
    "AM": "Ermenistan hakkında bilgi ve video.",
    "AO": "Angola hakkında bilgi ve video.",
    "AQ": "Antarktika hakkında bilgi ve video.",
    "AR": "Arjantin hakkında bilgi ve video.",
    "AS": "Amerikan Samoası hakkında bilgi ve video.",
    "AT": "Avusturya hakkında bilgi ve video.",
    "AU": "Avustralya hakkında bilgi ve video.",
    "AW": "Aruba hakkında bilgi ve video.",
    "AX": "Aland Adaları hakkında bilgi ve video.",
    "AZ": "Azerbaycan hakkında bilgi ve video.",
    "BA": "Bosna-Hersek hakkında bilgi ve video.",
    "BB": "Barbados hakkında bilgi ve video.",
    "BD": "Bangladeş hakkında bilgi ve video.",
    "BE": "Belçika hakkında bilgi ve video.",
    "BF": "Burkina Faso hakkında bilgi ve video.",
    "BG": "Bulgaristan hakkında bilgi ve video.",
    "BH": "Bahreyn hakkında bilgi ve video.",
    "BI": "Burundi hakkında bilgi ve video.",
    "BJ": "Benin hakkında bilgi ve video.",
    "BL": "Saint Barthelemy hakkında bilgi ve video.",
    "BM": "Bermuda hakkında bilgi ve video.",
    "BN": "Brunei hakkında bilgi ve video.",
    "BO": "Bolivya hakkında bilgi ve video.",
    "BQ": "Karayip Hollandası (Bonaire, Sint Eustatius ve Saba) hakkında bilgi ve video.",
    "BR": "Brezilya hakkında bilgi ve video.",
    "BS": "Bahamalar hakkında bilgi ve video.",
    "BT": "Bhutan hakkında bilgi ve video.",
    "BV": "Bouvet Adası hakkında bilgi ve video.",
    "BW": "Botsvana hakkında bilgi ve video.",
    "BY": "Belarus hakkında bilgi ve video.",
    "BZ": "Belize hakkında bilgi ve video.",
    "CA": "Kanada hakkında bilgi ve video.",
    "CC": "Cocos (Keeling) Adaları hakkında bilgi ve video.",
    "CD": "Kongo Demokratik Cumhuriyeti hakkında bilgi ve video.",
    "CF": "Orta Afrika Cumhuriyeti hakkında bilgi ve video.",
    "CG": "Kongo hakkında bilgi ve video.",
    "CH": "İsviçre hakkında bilgi ve video.",
    "CI": "Fildişi Sahili hakkında bilgi ve video.",
    "CK": "Cook Adaları hakkında bilgi ve video.",
    "CL": "Şili hakkında bilgi ve video.",
    "CM": "Kamerun hakkında bilgi ve video.",
    "CN": "Çin hakkında bilgi ve video.",
    "CO": "Kolombiya hakkında bilgi ve video.",
    "CR": "Kosta Rika hakkında bilgi ve video.",
    "CU": "Küba hakkında bilgi ve video.",
    "CV": "Cape Verde hakkında bilgi ve video.",
    "CW": "Curaçao hakkında bilgi ve video.",
    "CX": "Christmas Adası hakkında bilgi ve video.",
    "CY": "Kıbrıs hakkında bilgi ve video.",
    "CZ": "Çekya hakkında bilgi ve video.",
    "DE": "Almanya hakkında bilgi ve video.",
    "DJ": "Cibuti hakkında bilgi ve video.",
    "DK": "Danimarka hakkında bilgi ve video.",
    "DM": "Dominika hakkında bilgi ve video.",
    "DO": "Dominik Cumhuriyeti hakkında bilgi ve video.",
    "DZ": "Cezayir hakkında bilgi ve video.",
    "EC": "Ekvador hakkında bilgi ve video.",
    "EE": "Estonya hakkında bilgi ve video.",
    "EG": "Mısır hakkında bilgi ve video.",
    "EH": "Batı Sahra hakkında bilgi ve video.",
    "ER": "Eritre hakkında bilgi ve video.",
    "ES": "İspanya hakkında bilgi ve video.",
    "ET": "Etiyopya hakkında bilgi ve video.",
    "FI": "Finlandiya hakkında bilgi ve video.",
    "FJ": "Fiji hakkında bilgi ve video.",
    "FK": "Falkland Adaları hakkında bilgi ve video.",
    "FM": "Mikronezya hakkında bilgi ve video.",
    "FO": "Faroe Adaları hakkında bilgi ve video.",
    "FR": "Fransa hakkında bilgi ve video.",
    "GA": "Gabon hakkında bilgi ve video.",
    "GB": "Birleşik Krallık hakkında bilgi ve video.",
    "GD": "Grenada hakkında bilgi ve video.",
    "GE": "Gürcistan hakkında bilgi ve video.",
    "GF": "Fransız Guyanası hakkında bilgi ve video.",
    "GG": "Guernsey hakkında bilgi ve video.",
    "GH": "Gana hakkında bilgi ve video.",
    "GI": "Cebelitarık hakkında bilgi ve video.",
    "GL": "Grönland hakkında bilgi ve video.",
    "GM": "Gambiya hakkında bilgi ve video.",
    "GN": "Gine hakkında bilgi ve video.",
    "GP": "Guadeloupe hakkında bilgi ve video.",
    "GQ": "Ekvator Ginesi hakkında bilgi ve video.",
    "GR": "Yunanistan hakkında bilgi ve video.",
    "GS": "Güney Georgia ve Güney Sandwich Adaları hakkında bilgi ve video.",
    "GT": "Guatemala hakkında bilgi ve video.",
    "GU": "Guam hakkında bilgi ve video.",
    "GW": "Gine-Bissau hakkında bilgi ve video.",
    "GY": "Guyana hakkında bilgi ve video.",
    "HK": "Hong Kong hakkında bilgi ve video.",
    "HM": "Heard Adası ve McDonald Adaları hakkında bilgi ve video.",
    "HN": "Honduras hakkında bilgi ve video.",
    "HR": "Hırvatistan hakkında bilgi ve video.",
    "HT": "Haiti hakkında bilgi ve video.",
    "HU": "Macaristan hakkında bilgi ve video.",
    "ID": "Endonezya hakkında bilgi ve video.",
    "IE": "İrlanda hakkında bilgi ve video.",
    "IL": "İsrail hakkında bilgi ve video.",
    "IM": "Man Adası hakkında bilgi ve video.",
    "IN": "Hindistan hakkında bilgi ve video.",
    "IO": "Britanya Hint Okyanusu Toprakları hakkında bilgi ve video.",
    "IQ": "Irak hakkında bilgi ve video.",
    "IR": "İran hakkında bilgi ve video.",
    "IS": "İzlanda hakkında bilgi ve video.",
    "IT": "İtalya hakkında bilgi ve video.",
    "JE": "Jersey hakkında bilgi ve video.",
    "JM": "Jamaika hakkında bilgi ve video.",
    "JO": "Ürdün hakkında bilgi ve video.",
    "JP": "Japonya hakkında bilgi ve video.",
    "KE": "Kenya hakkında bilgi ve video.",
    "KG": "Kırgızistan hakkında bilgi ve video.",
    "KH": "Kamboçya hakkında bilgi ve video.",
    "KI": "Kiribati hakkında bilgi ve video.",
    "KM": "Komorlar hakkında bilgi ve video.",
    "KN": "Saint Kitts ve Nevis hakkında bilgi ve video.",
    "KP": "Kuzey Kore hakkında bilgi ve video.",
    "KR": "Güney Kore hakkında bilgi ve video.",
    "KW": "Kuveyt hakkında bilgi ve video.",
    "KY": "Cayman Adaları hakkında bilgi ve video.",
    "KZ": "Kazakistan hakkında bilgi ve video.",
    "LA": "Laos hakkında bilgi ve video.",
    "LB": "Lübnan hakkında bilgi ve video.",
    "LC": "Saint Lucia hakkında bilgi ve video.",
    "LI": "Lihtenştayn hakkında bilgi ve video.",
    "LK": "Sri Lanka hakkında bilgi ve video.",
    "LR": "Liberya hakkında bilgi ve video.",
    "LS": "Lesoto hakkında bilgi ve video.",
    "LT": "Litvanya hakkında bilgi ve video.",
    "LU": "Lüksemburg hakkında bilgi ve video.",
    "LV": "Letonya hakkında bilgi ve video.",
    "LY": "Libya hakkında bilgi ve video.",
    "MA": "Fas hakkında bilgi ve video.",
    "MC": "Monako hakkında bilgi ve video.",
    "MD": "Moldova hakkında bilgi ve video.",
    "ME": "Karadağ hakkında bilgi ve video.",
    "MF": "Saint Martin (Fransız Bölgesi) hakkında bilgi ve video.",
    "MG": "Madagaskar hakkında bilgi ve video.",
    "MH": "Marshall Adaları hakkında bilgi ve video.",
    "MK": "Kuzey Makedonya hakkında bilgi ve video.",
    "ML": "Mali hakkında bilgi ve video.",
    "MM": "Myanmar hakkında bilgi ve video.",
    "MN": "Moğolistan hakkında bilgi ve video.",
    "MO": "Makao hakkında bilgi ve video.",
    "MP": "Kuzey Mariana Adaları hakkında bilgi ve video.",
    "MQ": "Martinik hakkında bilgi ve video.",
    "MR": "Moritanya hakkında bilgi ve video.",
    "MS": "Montserrat hakkında bilgi ve video.",
    "MT": "Malta hakkında bilgi ve video.",
    "MU": "Mauritius hakkında bilgi ve video.",
    "MV": "Maldivler hakkında bilgi ve video.",
    "MW": "Malavi hakkında bilgi ve video.",
    "MX": "Meksika hakkında bilgi ve video.",
    "MY": "Malezya hakkında bilgi ve video.",
    "MZ": "Mozambik hakkında bilgi ve video.",
    "NA": "Namibya hakkında bilgi ve video.",
    "NC": "Yeni Kaledonya hakkında bilgi ve video.",
    "NE": "Nijer hakkında bilgi ve video.",
    "NF": "Norfolk Adası hakkında bilgi ve video.",
    "NG": "Nijerya hakkında bilgi ve video.",
    "NI": "Nikaragua hakkında bilgi ve video.",
    "NL": "Hollanda hakkında bilgi ve video.",
    "NO": "Norveç hakkında bilgi ve video.",
    "NP": "Nepal hakkında bilgi ve video.",
    "NR": "Nauru hakkında bilgi ve video.",
    "NU": "Niue hakkında bilgi ve video.",
    "NZ": "Yeni Zelanda hakkında bilgi ve video.",
    "OM": "Umman hakkında bilgi ve video.",
    "PA": "Panama hakkında bilgi ve video.",
    "PE": "Peru hakkında bilgi ve video.",
    "PF": "Fransız Polinezyası hakkında bilgi ve video.",
    "PG": "Papua Yeni Gine hakkında bilgi ve video.",
    "PH": "Filipinler hakkında bilgi ve video.",
    "PK": "Pakistan hakkında bilgi ve video.",
    "PL": "Polonya hakkında bilgi ve video.",
    "PM": "Saint Pierre ve Miquelon hakkında bilgi ve video.",
    "PN": "Pitcairn Adaları hakkında bilgi ve video.",
    "PR": "Porto Riko hakkında bilgi ve video.",
    "PS": "Filistin hakkında bilgi ve video.",
    "PT": "Portekiz hakkında bilgi ve video.",
    "PW": "Palau hakkında bilgi ve video.",
    "PY": "Paraguay hakkında bilgi ve video.",
    "QA": "Katar hakkında bilgi ve video.",
    "RE": "Reunion hakkında bilgi ve video.",
    "RO": "Romanya hakkında bilgi ve video.",
    "RS": "Sırbistan hakkında bilgi ve video.",
    "RU": "Rusya Federasyonu hakkında bilgi ve video.",
    "RW": "Ruanda hakkında bilgi ve video.",
    "SA": "Suudi Arabistan hakkında bilgi ve video.",
    "SB": "Solomon Adaları hakkında bilgi ve video.",
    "SC": "Seyşeller hakkında bilgi ve video.",
    "SD": "Sudan hakkında bilgi ve video.",
    "SE": "İsveç hakkında bilgi ve video.",
    "SG": "Singapur hakkında bilgi ve video.",
    "SH": "Saint Helena, Ascension ve Tristan da Cunha hakkında bilgi ve video.",
    "SI": "Slovenya hakkında bilgi ve video.",
    "SJ": "Svalbard ve Jan Mayen hakkında bilgi ve video.",
    "SK": "Slovakya hakkında bilgi ve video.",
    "SL": "Sierra Leone hakkında bilgi ve video.",
    "SM": "San Marino hakkında bilgi ve video.",
    "SN": "Senegal hakkında bilgi ve video.",
    "SO": "Somali hakkında bilgi ve video.",
    "SR": "Surinam hakkında bilgi ve video.",
    "SS": "Güney Sudan hakkında bilgi ve video.",
    "ST": "Sao Tome ve Principe hakkında bilgi ve video.",
    "SV": "El Salvador hakkında bilgi ve video.",
    "SX": "Sint Maarten (Hollanda Bölgesi) hakkında bilgi ve video.",
    "SY": "Suriye hakkında bilgi ve video.",
    "SZ": "Esvatini hakkında bilgi ve video.",
    "TC": "Turks ve Caicos Adaları hakkında bilgi ve video.",
    "TD": "Çad hakkında bilgi ve video.",
    "TF": "Fransız Güney Toprakları hakkında bilgi ve video.",
    "TG": "Togo hakkında bilgi ve video.",
    "TH": "Tayland hakkında bilgi ve video.",
    "TJ": "Tacikistan hakkında bilgi ve video.",
    "TK": "Tokelau hakkında bilgi ve video.",
    "TL": "Doğu Timor hakkında bilgi ve video.",
    "TM": "Türkmenistan hakkında bilgi ve video.",
    "TN": "Tunus hakkında bilgi ve video.",
    "TO": "Tonga hakkında bilgi ve video.",
    "TR": "Türkiye hakkında bilgi ve video.",
    "TT": "Trinidad ve Tobago hakkında bilgi ve video.",
    "TV": "Tuvalu hakkında bilgi ve video.",
    "TW": "Tayvan hakkında bilgi ve video.",
    "TZ": "Tanzanya hakkında bilgi ve video.",
    "UA": "Ukrayna hakkında bilgi ve video.",
    "UG": "Uganda hakkında bilgi ve video.",
    "UM": "Amerika Birleşik Devletleri Küçük Dış Adaları hakkında bilgi ve video.",
    "US": "Amerika Birleşik Devletleri hakkında bilgi ve video.",
    "UY": "Uruguay hakkında bilgi ve video.",
    "UZ": "Özbekistan hakkında bilgi ve video.",
    "VA": "Vatikan hakkında bilgi ve video.",
    "VC": "Saint Vincent ve Grenadinler hakkında bilgi ve video.",
    "VE": "Venezuela hakkında bilgi ve video.",
    "VG": "Britanya Virjin Adaları hakkında bilgi ve video.",
    "VI": "Amerika Birleşik Devletleri Virjin Adaları hakkında bilgi ve video.",
    "VN": "Vietnam hakkında bilgi ve video.",
    "VU": "Vanuatu hakkında bilgi ve video.",
    "WF": "Wallis ve Futuna hakkında bilgi ve video.",
    "WS": "Samoa hakkında bilgi ve video.",
    "YE": "Yemen hakkında bilgi ve video.",
    "YT": "Mayotte hakkında bilgi ve video.",
    "ZA": "Güney Afrika hakkında bilgi ve video.",
    "ZM": "Zambiya hakkında bilgi ve video.",
    "ZW": "Zimbabve hakkında bilgi ve video.",
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
    
    const tokens = (idAttr + " " + classAttr).trim().split(/\s+/).filter(Boolean);
    
    let foundToken = tokens.find(t => fixMap[t] || countryNames[t]);
    
    let rawCode = foundToken || tokens[0] || "";
    
    let countryCode = fixMap[rawCode] || rawCode;
    
    // Geçerli bir kod bulunmazsa veya isim/metin listesinde yoksa dur
    if (!countryCode || !countryNames[countryCode]) return;

    const name = countryNames[countryCode];
    // Metin yoksa veya boşsa varsayılan mesaj kullan
    const text = countryTexts[countryCode.toUpperCase()] || 
                 `${name} için henüz bilgi metni girilmemiştir. Lütfen bu bilgiyi daha sonra kontrol edin.`;

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

