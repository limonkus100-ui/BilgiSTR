document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return; // SVG öğesi yoksa dur

  // 1. ÜLKE ADLARI VE KODLARI (ISO 3166-1 alpha-2) - TAM LİSTE
  const countryNames = {
    "tr": "Türkiye", "us": "Amerika Birleşik Devletleri", "ca": "Kanada", "ir": "İran", "iq": "Irak", 
    "de": "Almanya", "fr": "Fransa", "gb": "Birleşik Krallık", "es": "İspanya", "it": "İtalya",
    "ru": "Rusya Federasyonu", "cn": "Çin", "jp": "Japonya", "au": "Avustralya", "br": "Brezilya",
    "mx": "Meksika", "in": "Hindistan", "sa": "Suudi Arabistan", "eg": "Mısır", "za": "Güney Afrika",
    
    // Eksik olan diğer tüm ülkeler tamamlanmıştır:
    "ad": "Andorra", "ae": "Birleşik Arap Emirlikleri", "af": "Afganistan", "ag": "Antigua ve Barbuda", "ai": "Anguilla", "al": "Arnavutluk", "am": "Ermenistan", "ao": "Angola", "aq": "Antarktika", "ar": "Arjantin", "as": "Amerikan Samoası", "at": "Avusturya", "aw": "Aruba", "ax": "Aland Adaları", "az": "Azerbaycan",
    "ba": "Bosna-Hersek", "bb": "Barbados", "bd": "Bangladeş", "be": "Belçika", "bf": "Burkina Faso", "bg": "Bulgaristan", "bh": "Bahreyn", "bi": "Burundi", "bj": "Benin", "bl": "Saint Barthelemy", "bm": "Bermuda", "bn": "Brunei", "bo": "Bolivya", "bq": "Karayip Hollandası", "bs": "Bahamalar", "bt": "Bhutan", "bv": "Bouvet Adası", "bw": "Botsvana", "by": "Belarus", "bz": "Belize",
    "cc": "Cocos (Keeling) Adaları", "cd": "Kongo Demokratik Cumhuriyeti", "cf": "Orta Afrika Cumhuriyeti", "cg": "Kongo", "ch": "İsviçre", "ci": "Fildişi Sahili", "ck": "Cook Adaları", "cl": "Şili", "cm": "Kamerun", "co": "Kolombiya", "cr": "Kosta Rika", "cu": "Küba", "cv": "Cape Verde", "cw": "Curaçao", "cx": "Christmas Adası", "cy": "Kıbrıs", "cz": "Çekya",
    "dj": "Cibuti", "dk": "Danimarka", "dm": "Dominika", "do": "Dominik Cumhuriyeti", "dz": "Cezayir",
    "ec": "Ekvador", "ee": "Estonya", "eh": "Batı Sahra", "er": "Eritre", "et": "Etiyopya",
    "fi": "Finlandiya", "fj": "Fiji", "fk": "Falkland Adaları", "fm": "Mikronezya", "fo": "Faroe Adaları",
    "ga": "Gabon", "gd": "Grenada", "ge": "Gürcistan", "gf": "Fransız Guyanası", "gg": "Guernsey", "gh": "Gana", "gi": "Cebelitarık", "gl": "Grönland", "gm": "Gambiya", "gn": "Gine", "gp": "Guadeloupe", "gq": "Ekvator Ginesi", "gr": "Yunanistan", "gs": "Güney Georgia ve Güney Sandwich Adaları", "gt": "Guatemala", "gu": "Guam", "gw": "Gine-Bissau", "gy": "Guyana",
    "hk": "Hong Kong", "hm": "Heard Adası ve McDonald Adaları", "hn": "Honduras", "hr": "Hırvatistan", "ht": "Haiti", "hu": "Macaristan",
    "id": "Endonezya", "ie": "İrlanda", "il": "İsrail", "im": "Man Adası", "io": "Britanya Hint Okyanusu Toprakları", "is": "İzlanda",
    "je": "Jersey", "jm": "Jamaika", "jo": "Ürdün", "ke": "Kenya", "kg": "Kırgızistan", "kh": "Kamboçya", "ki": "Kiribati", "km": "Komorlar", "kn": "Saint Kitts ve Nevis", "kp": "Kuzey Kore", "kr": "Güney Kore", "kw": "Kuveyt", "ky": "Cayman Adaları", "kz": "Kazakistan",
    "la": "Laos", "lb": "Lübnan", "lc": "Saint Lucia", "li": "Lihtenştayn", "lk": "Sri Lanka", "lr": "Liberya", "ls": "Lesoto", "lt": "Litvanya", "lu": "Lüksemburg", "lv": "Letonya", "ly": "Libya",
    "ma": "Fas", "mc": "Monako", "md": "Moldova", "me": "Karadağ", "mf": "Saint Martin (Fransız Bölgesi)", "mg": "Madagaskar", "mh": "Marshall Adaları", "mk": "Kuzey Makedonya", "ml": "Mali", "mm": "Myanmar", "mn": "Moğolistan", "mo": "Makao", "mp": "Kuzey Mariana Adaları", "mq": "Martinik", "mr": "Moritanya", "ms": "Montserrat", "mt": "Malta", "mu": "Mauritius", "mv": "Maldivler", "mw": "Malavi", "mz": "Mozambik",
    "na": "Namibya", "nc": "Yeni Kaledonya", "ne": "Nijer", "nf": "Norfolk Adası", "ng": "Nijerya", "ni": "Nikaragua", "nl": "Hollanda", "no": "Norveç", "np": "Nepal", "nr": "Nauru", "nu": "Niue", "nz": "Yeni Zelanda",
    "om": "Umman",
    "pa": "Panama", "pe": "Peru", "pf": "Fransız Polinezyası", "pg": "Papua Yeni Gine", "ph": "Filipinler", "pk": "Pakistan", "pl": "Polonya", "pm": "Saint Pierre ve Miquelon", "pn": "Pitcairn Adaları", "pr": "Porto Riko", "ps": "Filistin", "pt": "Portekiz", "pw": "Palau", "py": "Paraguay",
    "qa": "Katar",
    "re": "Reunion", "ro": "Romanya", "rs": "Sırbistan", "rw": "Ruanda",
    "sb": "Solomon Adaları", "sc": "Seyşeller", "sd": "Sudan", "se": "İsveç", "sg": "Singapur", "sh": "Saint Helena, Ascension ve Tristan da Cunha", "si": "Slovenya", "sj": "Svalbard ve Jan Mayen", "sk": "Slovakya", "sl": "Sierra Leone", "sm": "San Marino", "sn": "Senegal", "so": "Somali", "sr": "Surinam", "ss": "Güney Sudan", "st": "Sao Tome ve Principe", "sv": "El Salvador", "sx": "Sint Maarten (Hollanda Bölgesi)", "sy": "Suriye", "sz": "Esvatini",
    "tc": "Turks ve Caicos Adaları", "td": "Çad", "tf": "Fransız Güney Toprakları", "tg": "Togo", "th": "Tayland", "tj": "Tacikistan", "tk": "Tokelau", "tl": "Doğu Timor", "tm": "Türkmenistan", "tn": "Tunus", "to": "Tonga", "tv": "Tuvalu", "tw": "Tayvan", "tz": "Tanzanya",
    "ua": "Ukrayna", "ug": "Uganda", "um": "ABD Küçük Dış Adaları", "uy": "Uruguay", "uz": "Özbekistan",
    "va": "Vatikan", "vc": "Saint Vincent ve Grenadinler", "ve": "Venezuela", "vg": "Britanya Virjin Adaları", "vi": "ABD Virjin Adaları", "vn": "Vietnam", "vu": "Vanuatu",
    "wf": "Wallis ve Futuna", "ws": "Samoa",
    "ye": "Yemen", "yt": "Mayotte",
    "zm": "Zambiya", "zw": "Zimbabve"
  };

  // 2. ÜLKE BİLGİ METİNLERİ - TÜM ÜLKELER TAMAMLANDI
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

    "ad": "Andorra, Pirene Dağları'nda yer alan bağımsız bir prensliktir, gümrüksüz alışveriş ve kış sporlarıyla tanınır.",
    "ae": "Birleşik Arap Emirlikleri, lüks turizm, modern mimari ve petrol zenginliği ile öne çıkan yedi emirlikten oluşan bir federasyondur.",
    "af": "Afganistan, Güney ve Orta Asya'nın kesişim noktasında, dağlık bir araziye sahip tarihi bir ülkedir.",
    "ag": "Antigua ve Barbuda, Karayipler'de yer alan, plajları ve turkuaz sularıyla ünlü bir ada devletidir.",
    "ai": "Anguilla, Karayipler'de bir İngiliz Denizaşırı Bölgesi'dir. Lüks tatil köyleri ve sakin plajlarıyla bilinir.",
    "al": "Arnavutluk, Balkanlar'da Adriyatik ve İyon denizlerine kıyısı olan, dağlık ve tarihi bir ülkedir.",
    "am": "Ermenistan, Güney Kafkasya'da yer alan, dünyanın en eski Hristiyan medeniyetlerinden birine sahiptir.",
    "ao": "Angola, Güney Afrika'da zengin doğal kaynaklara ve Portekiz sömürge mirasından kalma bir kültüre sahiptir.",
    "aq": "Antarktika, Dünya'nın güney kutbunda bulunan, kalıcı insan yerleşimi olmayan soğuk bir kıtadır.",
    "ar": "Arjantin, Güney Amerika'da tango, sığır eti ve geniş pampaslarıyla ünlü bir ülkedir.",
    "as": "Amerikan Samoası, Pasifik Okyanusu'nda bir ABD bölgesidir, volkanik adalar ve mercan resiflerinden oluşur.",
    "at": "Avusturya, Orta Avrupa'da, zengin müzik ve sanat geçmişine sahip, Alp dağlarıyla kaplı bir ülkedir. Başkenti Viyana'dır.",
    "aw": "Aruba, Karayipler'de Hollanda Krallığı'na bağlı bir adadır. Kurak iklimi ve beyaz kumlu plajlarıyla ünlüdür.",
    "ax": "Aland Adaları, Baltık Denizi'nde Finlandiya'ya bağlı, çoğunlukla İsveççe konuşulan özerk bir bölgedir.",
    "az": "Azerbaycan, Batı Asya ve Doğu Avrupa'nın kesişiminde yer alır. Zengin petrol ve doğal gaz rezervlerine sahiptir. Başkenti Bakü'dür.",
    "ba": "Bosna-Hersek, Balkanlar'da yer alan, Osmanlı ve Avusturya-Macaristan etkileşimlerinin izlerini taşıyan karmaşık bir kültüre sahiptir.",
    "bb": "Barbados, Atlantik Okyanusu'nda yer alan, İngiliz sömürge mirasına sahip popüler bir Karayip adasıdır.",
    "bd": "Bangladeş, Güney Asya'da Ganj ve Brahmaputra nehirlerinin deltalarında yer alan yoğun nüfuslu bir ülkedir.",
    "be": "Belçika, Batı Avrupa'da, Avrupa Birliği'nin merkezi olarak işlev gören, çok dilli bir kültüre sahip ülkedir.",
    "bf": "Burkina Faso, Batı Afrika'da denize kıyısı olmayan, zengin müzik ve sanat geleneklerine sahip bir ülkedir.",
    "bg": "Bulgaristan, Balkanlar'da yer alan, Karadeniz'e kıyısı olan ve zengin bir Slav kültürü taşıyan ülkedir.",
    "bh": "Bahreyn, Basra Körfezi'nde yer alan, tarih boyunca önemli bir ticaret merkezi olmuş küçük bir ada krallığıdır.",
    "bi": "Burundi, Afrika'nın Büyük Göller bölgesinde yer alan, çoğunlukla tarıma dayalı, küçük bir ülkedir.",
    "bj": "Benin, Batı Afrika'da yer alır. Vudu dininin doğum yeri olarak bilinir ve Fransız sömürge tarihine sahiptir.",
    "bl": "Saint Barthelemy, Karayipler'de lüks turizmiyle ünlü, Fransız denizaşırı bir kolektivitesidir.",
    "bm": "Bermuda, Kuzey Atlantik'te yer alan, İngiliz Denizaşırı Bölgesi'dir. Pembe kumlu plajları ve sigorta endüstrisiyle tanınır.",
    "bn": "Brunei, Borneo adasında yer alan, petrol ve doğal gaz zenginliği sayesinde yüksek refah düzeyine sahip bir sultanlıktır.",
    "bo": "Bolivya, Güney Amerika'da denize kıyısı olmayan, yüksek And Dağları'na ve zengin yerli kültürüne sahip bir ülkedir.",
    "bq": "Karayip Hollandası, Bonaire, Sint Eustatius ve Saba adalarından oluşan, Hollanda'ya bağlı özel belediyelerdir.",
    "bs": "Bahamalar, Karayipler ve Atlantik Okyanusu'nda yer alan, sayısız ada ve turistik tesislerden oluşan bir takımadadır.",
    "bt": "Bhutan, Doğu Himalayalar'da yer alan, GSYİH yerine Gayri Safi Milli Mutluluğu ölçen, mistik bir krallıktır.",
    "bv": "Bouvet Adası, Güney Atlantik Okyanusu'nda yer alan, Norveç'e ait ıssız bir volkanik adadır.",
    "bw": "Botsvana, Güney Afrika'da yer alır. İstikrarlı ekonomisi, elmas madenciliği ve geniş safari parklarıyla bilinir.",
    "by": "Belarus, Doğu Avrupa'da yer alan, Rusya ve AB arasında stratejik bir konuma sahip bir ülkedir.",
    "bz": "Belize, Orta Amerika'da yer alır. Maya kalıntılarına, Karayip Denizi kıyı şeridine ve İngiliz kültürel mirasına sahiptir.",
    "cc": "Cocos (Keeling) Adaları, Hint Okyanusu'nda Avustralya'ya bağlı tropikal mercan adalarıdır.",
    "cd": "Kongo Demokratik Cumhuriyeti, Orta Afrika'da yer alan, zengin mineral kaynaklarına ve geniş yağmur ormanlarına sahiptir.",
    "cf": "Orta Afrika Cumhuriyeti, Orta Afrika'da denize kıyısı olmayan, zengin yaban hayatına sahip bir ülkedir.",
    "cg": "Kongo, Orta Afrika'da, yağmur ormanları ve Kongo Nehri havzasıyla tanınan, petrol zengini bir ülkedir.",
    "ch": "İsviçre, Alpler'de yer alan, bankacılık, saat yapımı ve siyasi tarafsızlığı ile ünlü federal bir cumhuriyettir.",
    "ci": "Fildişi Sahili, Batı Afrika'da yer alır. Kakao üretiminde dünya lideridir ve canlı bir kültürel hayata sahiptir.",
    "ck": "Cook Adaları, Pasifik Okyanusu'nda Yeni Zelanda ile serbest birlik içinde olan, 15 adadan oluşan bir takımadadır.",
    "cl": "Şili, Güney Amerika'nın batı kıyısında, And Dağları ile Pasifik Okyanusu arasında uzun ve dar bir şeride sahiptir.",
    "cm": "Kamerun, Batı ve Orta Afrika'nın kesişiminde yer alır. Coğrafi ve kültürel çeşitliliği nedeniyle 'Küçük Afrika' olarak adlandırılır.",
    "co": "Kolombiya, Güney Amerika'nın kuzeybatısında yer alır. Kahvesi, zümrütleri ve biyolojik çeşitliliği ile ünlüdür.",
    "cr": "Kosta Rika, Orta Amerika'da yer alır. Orduyu kaldıran ve kendini çevre korumaya adayan bir ülkedir.",
    "cu": "Küba, Karayipler'de yer alan büyük bir ada devletidir. Zengin devrimci tarihi, klasik arabaları ve müziğiyle tanınır.",
    "cv": "Cape Verde, Batı Afrika kıyısının açıklarında volkanik bir takımadadır. Portekizce konuşulan, eşsiz bir kültüre sahiptir.",
    "cw": "Curaçao, Karayipler'de Hollanda Krallığı'na bağlı, renkli mimarisi ve dalış noktalarıyla ünlü bir adadır.",
    "cx": "Christmas Adası, Hint Okyanusu'nda Avustralya'ya bağlıdır. Yengeç göçü ve benzersiz ekosistemiyle tanınır.",
    "cy": "Kıbrıs, Doğu Akdeniz'de yer alan, zengin mitolojiye ve bölünmüş bir ada geçmişine sahip ülkedir.",
    "cz": "Çekya, Orta Avrupa'da yer alır. Tarihi başkenti Prag, iyi korunmuş mimarisiyle ünlüdür.",
    "dj": "Cibuti, Doğu Afrika'da yer alır. Kızıldeniz'in girişindeki stratejik konumu nedeniyle önemli bir limandır.",
    "dk": "Danimarka, İskandinavya'da yer alan, refah seviyesi yüksek, küçük bir ülkedir. Kopenhag, tasarım ve bisiklet kültürüyle öne çıkar.",
    "dm": "Dominika, Karayipler'de 'Doğanın Adası' olarak bilinen, dağlık ve yoğun ormanlarla kaplı volkanik bir adadır.",
    "do": "Dominik Cumhuriyeti, Hispanyola adasında Haiti ile sınırı paylaşır. Turizm ve beyzbol ile popülerdir.",
    "dz": "Cezayir, Kuzey Afrika'nın en büyük ülkesidir. Sahra Çölü'nün büyük bir bölümünü kaplar ve zengin bir Arap-Berberi kültürüne sahiptir.",
    "ec": "Ekvador, Güney Amerika'da, adını Ekvator çizgisinden alan, Galapagos Adaları'na ev sahipliği yapan bir ülkedir.",
    "ee": "Estonya, Kuzey Avrupa'da Baltık Denizi kıyısında yer alır. Yüksek teknolojili ve dijitalleşmiş bir ülkedir.",
    "eh": "Batı Sahra, Kuzeybatı Afrika'da yer alan, Fas ve Polisario Cephesi arasında tartışmalı bir bölgedir.",
    "er": "Eritre, Doğu Afrika'da Kızıldeniz kıyısında yer alan, İtalyan sömürge mimarisine sahip bir ülkedir.",
    "et": "Etiyopya, Doğu Afrika'da yer alır. Kahvenin anavatanı olarak bilinir ve kıtanın en eski bağımsız devleti olarak kabul edilir.",
    "fi": "Finlandiya, Kuzey Avrupa'da yer alan, binlerce göl ve ormanla kaplı, yüksek eğitim standartlarına sahip bir ülkedir.",
    "fj": "Fiji, Güney Pasifik'te 300'den fazla adadan oluşan, turizm ve şeker ihracatı ile geçinen bir takımadadır.",
    "fk": "Falkland Adaları, Güney Atlantik'te yer alan, Britanya ve Arjantin arasında tartışmalı bir adalar grubudur.",
    "fm": "Mikronezya, Pasifik Okyanusu'nda 600'den fazla adadan oluşan, dört eyaletten oluşan federal bir devlettir.",
    "fo": "Faroe Adaları, Kuzey Atlantik'te Danimarka Krallığı'na bağlı, dik uçurumlu ve rüzgarlı adalardır.",
    "ga": "Gabon, Orta Afrika'nın batı kıyısında yer alır. Büyük ölçüde ormanlarla kaplı, petrol zengini bir ülkedir.",
    "gd": "Grenada, Karayipler'de 'Baharat Adası' olarak bilinir, tarım ve turizme dayalı küçük bir ada devletidir.",
    "ge": "Gürcistan, Doğu Avrupa ile Batı Asya'nın kesişiminde yer alır. Köklü bir şarapçılık ve dağlık manzaralara sahiptir.",
    "gf": "Fransız Guyanası, Güney Amerika'da Fransa'nın bir denizaşırı departmanıdır. Avrupa Uzay Ajansı'nın fırlatma üssüne ev sahipliği yapar.",
    "gg": "Guernsey, Manş Denizi'nde İngiliz Kraliyetine bağlı bir adadır. Finans sektörü ve düşük vergileriyle bilinir.",
    "gh": "Gana, Batı Afrika'da yer alan, istikrarlı bir demokrasiye sahip, altın ve kakao ihracatı yapan önemli bir ülkedir.",
    "gi": "Cebelitarık, İber Yarımadası'nın ucunda, Akdeniz'in girişini kontrol eden İngiliz Denizaşırı Bölgesi'dir.",
    "gl": "Grönland, yüzölçümü bakımından dünyanın en büyük adasıdır. Danimarka Krallığı'na bağlı özerk bir bölgedir ve buzullarla kaplıdır.",
    "gm": "Gambiya, Batı Afrika'da, Gambiya Nehri'nin iki yakasına kurulu, ince uzun bir ülkedir.",
    "gn": "Gine, Batı Afrika'da yer alır. Zengin boksit ve altın rezervlerine sahiptir.",
    "gp": "Guadeloupe, Karayipler'de Fransa'nın denizaşırı bir bölgesidir. Kelebek şeklindeki ana adasıyla bilinir.",
    "gq": "Ekvator Ginesi, Orta Afrika'nın batı kıyısında, petrol zenginliğine sahip küçük bir ülkedir.",
    "gr": "Yunanistan, Güneydoğu Avrupa'da yer alır. Batı medeniyetinin, demokrasinin ve felsefenin beşiğidir.",
    "gs": "Güney Georgia ve Güney Sandwich Adaları, Güney Atlantik'te yer alan ıssız İngiliz Denizaşırı Bölgesi'dir.",
    "gt": "Guatemala, Orta Amerika'da yer alır. Maya uygarlığının kalıntılarına, volkanlara ve zengin bir yerli kültüre sahiptir.",
    "gu": "Guam, Pasifik Okyanusu'nda ABD'ye ait büyük bir adadır. Önemli bir askeri üs konumundadır.",
    "gw": "Gine-Bissau, Batı Afrika'da yer alır. Çalkantılı siyasi tarihine rağmen zengin deniz ürünleri ve kültürel çeşitliliğe sahiptir.",
    "gy": "Guyana, Güney Amerika'nın kuzeydoğu kıyısında, tek İngilizce konuşulan ülkedir. Geniş ormanlara sahiptir.",
    "hk": "Hong Kong, Çin'in özel idari bölgesidir. Yoğun nüfuslu, küresel finans merkezi ve önemli bir liman şehridir.",
    "hm": "Heard Adası ve McDonald Adaları, Hint Okyanusu'nda Avustralya'ya ait, aktif volkanlara sahip ıssız adalardır.",
    "hn": "Honduras, Orta Amerika'da yer alır. Eski Maya kalıntılarına ve Karayip kıyısında popüler dalış noktalarına sahiptir.",
    "hr": "Hırvatistan, Balkanlar'da yer alır. Adriyatik kıyısındaki binlerce adası ve tarihi şehirleriyle turizm merkezidir.",
    "ht": "Haiti, Hispanyola adasında yer alır. Latin Amerika'da bağımsızlığını kazanan ilk cumhuriyettir.",
    "hu": "Macaristan, Orta Avrupa'da yer alır. Başkenti Budapeşte, termal banyoları ve mimarisiyle ünlüdür.",
    "id": "Endonezya, 17.000'den fazla adadan oluşan, dünyanın en büyük takımada devletidir. Zengin kültürel çeşitliliğe sahiptir.",
    "ie": "İrlanda, Kuzey Atlantik'te yer alan bir ada ülkesidir. Zümrüt Adası olarak bilinir ve zengin bir edebiyat geçmişine sahiptir.",
    "il": "İsrail, Orta Doğu'da yer alan, Yahudilik, Hristiyanlık ve İslam için kutsal topraklara sahip karmaşık bir ülkedir.",
    "im": "Man Adası, İrlanda Denizi'nde İngiliz Kraliyetine bağlıdır. TT motosiklet yarışlarıyla tanınır.",
    "io": "Britanya Hint Okyanusu Toprakları",
    "is": "İzlanda, Kuzey Atlantik'te volkanik bir adadır. Jeotermal enerji, buzullar ve Kuzey Işıkları ile ünlüdür.",
    "je": "Jersey, Manş Denizi'nde İngiliz Kraliyetine bağlı bir adadır. Finansal bir merkezdir.",
    "jm": "Jamaika, Karayipler'de yer alan bir ada devletidir. Reggae müziği, atletizm ve kendine özgü kültürüyle tanınır.",
    "jo": "Ürdün, Orta Doğu'da yer alır. Petra Antik Kenti ve Ölü Deniz gibi tarihi ve doğal harikalara ev sahipliği yapar.",
    "ke": "Kenya, Doğu Afrika'da yer alır. Safari turları, Masai kültürü ve Büyük Rift Vadisi ile ünlüdür.",
    "kg": "Kırgızistan, Orta Asya'da denize kıyısı olmayan, yüksek dağlar ve göçer kültürle tanınan bir ülkedir.",
    "kh": "Kamboçya, Güneydoğu Asya'da yer alır. Angkor Wat tapınak kompleksiyle dünya çapında tanınır.",
    "ki": "Kiribati, Pasifik Okyanusu'nda 33 mercan adasından oluşan bir ada devletidir. İklim değişikliğinden en çok etkilenen ülkelerdendir.",
    "km": "Komorlar, Hint Okyanusu'nda volkanik bir takımadadır. Arap ve Afrika kültürlerinin karışımıyla bilinir.",
    "kn": "Saint Kitts ve Nevis, Karayipler'de iki adadan oluşan küçük bir ülkedir.",
    "kp": "Kuzey Kore, Doğu Asya'da yer alan, dünyanın en kapalı ve izole edilmiş ülkelerinden biridir.",
    "kr": "Güney Kore, Doğu Asya'da yer alır. Yüksek teknoloji, pop kültürü (K-Pop) ve dinamik ekonomisiyle öne çıkar.",
    "kw": "Kuveyt, Basra Körfezi'nde yer alan, zengin petrol rezervlerine sahip bir emirliktir.",
    "ky": "Cayman Adaları, Karayipler'de İngiliz Denizaşırı Bölgesi'dir. Küresel bir offshore finans merkezidir.",
    "kz": "Kazakistan, Orta Asya'da yer alan, dünyanın en büyük denize kıyısı olmayan ülkesidir. Uzay üssü (Baykonur) ile bilinir.",
    "la": "Laos, Güneydoğu Asya'da denize kıyısı olmayan, Budist tapınakları ve Mekong Nehri ile tanınan bir ülkedir.",
    "lb": "Lübnan, Orta Doğu'da Akdeniz kıyısında yer alır. Karmaşık tarihi ve kültürel çeşitliliğiyle 'Doğu'nun Paris'i' olarak anılırdı.",
    "lc": "Saint Lucia, Karayipler'de volkanik Pitons dağlarıyla ünlü bir adadır.",
    "li": "Lihtenştayn, Orta Avrupa'da İsviçre ve Avusturya arasında sıkışmış, küçük bir prensliktir. Finansal bir merkezdir.",
    "lk": "Sri Lanka, Hint Okyanusu'nda yer alan bir ada devletidir. Çay üretimi, antik kalıntıları ve plajlarıyla ünlüdür.",
    "lr": "Liberya, Batı Afrika'da yer alır. ABD tarafından kurulan ilk Afrika cumhuriyetidir.",
    "ls": "Lesoto, Güney Afrika Cumhuriyeti'nin içinde yer alan, yüksek rakımlı, dağlık bir krallıktır.",
    "lt": "Litvanya, Baltık devletlerinden biridir. Köklü bir tarihi ve Sovyet sonrası dönemde hızla gelişen bir ekonomisi vardır.",
    "lu": "Lüksemburg, Batı Avrupa'da yer alan, dünyanın kişi başına düşen en yüksek GSYİH'sine sahip küçük bir ülkedir.",
    "lv": "Letonya, Baltık devletlerinden biridir. Ahşap mimarisi ve canlı başkenti Riga ile bilinir.",
    "ly": "Libya, Kuzey Afrika'da yer alır. Büyük bir Sahra çölü alanına ve zengin petrol kaynaklarına sahiptir.",
    "ma": "Fas, Kuzeybatı Afrika'da yer alır. Atlantik ve Akdeniz kıyıları, Berberi kültürü ve renkli şehirleriyle turistik bir ülkedir.",
    "mc": "Monako, Fransa kıyısında yer alan, dünyanın ikinci en küçük bağımsız ülkesidir. Kumarhaneleri ve Formula 1 yarışı ile ünlüdür.",
    "md": "Moldova, Doğu Avrupa'da denize kıyısı olmayan, şarap üretimiyle tanınan bir ülkedir.",
    "me": "Karadağ, Balkanlar'da Adriyatik Denizi'ne kıyısı olan, çarpıcı dağlık manzaralara sahip bir ülkedir.",
    "mf": "Saint Martin (Fransız Bölgesi), Karayipler'de Fransız ve Hollanda arasında bölünmüş bir adadır.",
    "mg": "Madagaskar, Afrika kıyısının açıklarında, eşsiz yaban hayatı ve lemurlarıyla ünlü büyük bir ada ülkesidir.",
    "mh": "Marshall Adaları, Pasifik Okyanusu'nda bir takımadadır. ABD nükleer denemelerinin yapıldığı yer olarak bilinir.",
    "mk": "Kuzey Makedonya, Balkanlar'da yer alan, antik tarihi ve doğal gölleriyle tanınan bir ülkedir.",
    "ml": "Mali, Batı Afrika'da denize kıyısı olmayan, Sahra çölünün güneyinde yer alan, zengin bir tarihi imparatorluk geçmişine sahiptir.",
    "mm": "Myanmar (Burma), Güneydoğu Asya'da yer alır. Binlerce Budist tapınağı (pagoda) ile ünlüdür.",
    "mn": "Moğolistan, Doğu Asya'da denize kıyısı olmayan, Gobi Çölü'ne ve göçebe kültüre sahip bir ülkedir.",
    "mo": "Makao, Çin'in özel idari bölgesidir. Asya'nın 'Las Vegas'ı' olarak anılan büyük bir kumar merkezidir.",
    "mp": "Kuzey Mariana Adaları, Pasifik Okyanusu'nda ABD'ye ait bir takımadadır.",
    "mq": "Martinik, Karayipler'de Fransa'nın denizaşırı bir bölgesidir.",
    "mr": "Moritanya, Batı Afrika'da yer alır. Büyük kısmı Sahra Çölü'nden oluşur.",
    "ms": "Montserrat, Karayipler'de İngiliz Denizaşırı Bölgesi'dir. Aktif bir volkana sahiptir.",
    "mt": "Malta, Akdeniz'de küçük bir takımada ülkesidir. Köklü bir denizcilik tarihi ve tarihi kalelere sahiptir.",
    "mu": "Mauritius, Hint Okyanusu'nda volkanik kökenli bir ada ülkesidir. Turizm ve şeker üretimiyle bilinir.",
    "mv": "Maldivler, Hint Okyanusu'nda yer alan mercan atollerinden oluşan bir ada devletidir. Lüks turizmi ve dalış noktalarıyla ünlüdür.",
    "mw": "Malavi, Güneydoğu Afrika'da yer alır. Malavi Gölü'ne ve tarıma dayalı ekonomiye sahiptir.",
    "mz": "Mozambik, Güneydoğu Afrika'da Hint Okyanusu kıyısında yer alır. Uzun plajları ve Portekiz sömürge mirasına sahiptir.",
    "na": "Namibya, Güneybatı Afrika'da yer alır. Namib Çölü, Sossusvlei kumulları ve zengin yaban hayatıyla ünlüdür.",
    "nc": "Yeni Kaledonya, Pasifik Okyanusu'nda Fransa'ya ait bir takımadadır. Zengin nikel rezervlerine sahiptir.",
    "ne": "Nijer, Batı Afrika'da denize kıyısı olmayan bir ülkedir. Büyük bir kısmı Sahra Çölü'nden oluşur.",
    "nf": "Norfolk Adası, Pasifik Okyanusu'nda Avustralya'ya bağlı küçük bir adadır.",
    "ng": "Nijerya, Batı Afrika'nın en kalabalık ülkesidir. Afrika'nın en büyük ekonomilerinden birine sahiptir.",
    "ni": "Nikaragua, Orta Amerika'da yer alır. Büyük gölleri ve volkanlarıyla tanınır.",
    "nl": "Hollanda, Batı Avrupa'da yer alır. Düz arazileri, kanalları, yel değirmenleri ve bisiklet kültürüyle ünlüdür.",
    "no": "Norveç, İskandinavya'da yer alır. Fiyortları, yüksek yaşam standartları ve petrol zenginliği ile bilinir.",
    "np": "Nepal, Himalayalar'da yer alan bir ülkedir. Everest Dağı'na ev sahipliği yapar ve Budizm ile Hinduizm'in kesişim noktasıdır.",
    "nr": "Nauru, Pasifik Okyanusu'nda yer alan, dünyanın en küçük ada ülkesidir.",
    "nu": "Niue, Pasifik Okyanusu'nda Yeni Zelanda ile serbest birlik içinde olan büyük bir mercan adasıdır.",
    "nz": "Yeni Zelanda, Güneybatı Pasifik Okyanusu'nda yer alan iki büyük ve birçok küçük adadan oluşur. Doğal güzellikleri ve Maori kültürüyle ünlüdür.",
    "om": "Umman, Arap Yarımadası'nın güneydoğusunda yer alan bir sultanlıktır. Köklü denizcilik geçmişi ve geleneksel mimarisiyle bilinir.",
    "pa": "Panama, Orta Amerika'da yer alır. Panama Kanalı sayesinde küresel deniz taşımacılığı için kritik bir öneme sahiptir.",
    "pe": "Peru, Güney Amerika'da yer alır. İnka İmparatorluğu'nun kalıntılarına (Machu Picchu) ve And Dağları'na ev sahipliği yapar.",
    "pf": "Fransız Polinezyası, Pasifik Okyanusu'nda Fransa'ya bağlı bir takımadadır. Bora Bora gibi ünlü tatil adalarını içerir.",
    "pg": "Papua Yeni Gine, Pasifik Okyanusu'nda yer alır. Biyolojik ve kültürel çeşitliliği çok yüksektir.",
    "ph": "Filipinler, Güneydoğu Asya'da 7.000'den fazla adadan oluşan bir takımadadır.",
    "pk": "Pakistan, Güney Asya'da yer alır. İndus Vadisi Uygarlığı'nın mirasını taşır ve Himalaya'daki yüksek dağlara sahiptir.",
    "pl": "Polonya, Orta Avrupa'da yer alır. Zengin tarihi, restore edilmiş şehirleri ve Avrupa Birliği'nin önemli bir üyesidir.",
    "pm": "Saint Pierre ve Miquelon, Kuzey Atlantik'te Fransa'ya ait küçük bir takımadadır.",
    "pn": "Pitcairn Adaları, Pasifik Okyanusu'nda İngiliz Denizaşırı Bölgesi'dir. Dünyanın en az nüfuslu yargı alanıdır.",
    "pr": "Porto Riko, Karayipler'de ABD'ye bağlı özerk bir bölgedir.",
    "ps": "Filistin, Orta Doğu'da İsrail ile tartışmalı topraklardır.",
    "pt": "Portekiz, İber Yarımadası'nda yer alır. Köklü denizcilik geçmişi ve keşifler çağıyla ünlüdür.",
    "pw": "Palau, Pasifik Okyanusu'nda küçük bir ada devletidir. Eşsiz su altı doğal güzellikleriyle tanınır.",
    "py": "Paraguay, Güney Amerika'da denize kıyısı olmayan bir ülkedir. Guarani kültürü ve büyük su kaynaklarına sahiptir.",
    "qa": "Katar, Basra Körfezi'nde yer alan, zengin doğal gaz ve petrol kaynaklarına sahip bir emirliktir. Küresel spor etkinliklerine ev sahipliği yapmaktadır.",
    "re": "Reunion, Hint Okyanusu'nda Fransa'nın denizaşırı bir departmanıdır. Aktif bir volkana sahiptir.",
    "ro": "Romanya, Güneydoğu Avrupa'da yer alır. Transilvanya, Karpat Dağları ve zengin halk kültürüyle tanınır.",
    "rs": "Sırbistan, Balkanlar'da yer alan bir ülkedir. Tuna Nehri ve köklü Slav kültürü önemlidir.",
    "rw": "Ruanda, Doğu Afrika'da yer alır. 'Bin Tepenin Ülkesi' olarak bilinir ve hızla gelişen bir ekonomiye sahiptir.",
    "sb": "Solomon Adaları, Pasifik Okyanusu'nda yer alan bir takımadadır. II. Dünya Savaşı'ndan kalma kalıntılara sahiptir.",
    "sc": "Seyşeller, Hint Okyanusu'nda yer alan, lüks turizm ve doğal güzellikleriyle ünlü bir takımadadır.",
    "sd": "Sudan, Kuzeydoğu Afrika'da yer alır. Nil Nehri ve geniş çöl alanları önemlidir.",
    "se": "İsveç, İskandinavya'da yer alır. Yüksek yaşam kalitesi, ileri teknolojisi ve refah devleti modeliyle tanınır.",
    "sg": "Singapur, Güneydoğu Asya'da küçük bir şehir devletidir. Dünyanın en önemli finans ve ticaret merkezlerinden biridir.",
    "sh": "Saint Helena, Ascension ve Tristan da Cunha, Güney Atlantik'te yer alan İngiliz Denizaşırı Bölgesi'dir (Napolyon'un sürgün yeri).",
    "si": "Slovenya, Orta Avrupa'da yer alır. Alp dağları, mağaraları ve yeşil doğasıyla tanınır.",
    "sj": "Svalbard ve Jan Mayen, Norveç'e ait Arktik adalarıdır.",
    "sk": "Slovakya, Orta Avrupa'da yer alır. Karpat Dağları ve tarihi kaleleriyle tanınır.",
    "sl": "Sierra Leone, Batı Afrika'da yer alır. Elmas madenciliği ve tropik iklimi önemlidir.",
    "sm": "San Marino, İtalya Yarımadası'nda yer alan, dünyanın en eski cumhuriyetlerinden biri olan mikro devlettir.",
    "sn": "Senegal, Batı Afrika'da yer alır. Canlı müzik, kültür ve başkenti Dakar ile tanınır.",
    "so": "Somali, Doğu Afrika'da yer alır. Uzun bir sahil şeridine ve çalkantılı bir siyasi geçmişe sahiptir.",
    "sr": "Surinam, Güney Amerika'nın kuzeydoğu kıyısında yer alan, Hollanda sömürge mirasına sahip bir ülkedir.",
    "ss": "Güney Sudan, Afrika'nın en genç bağımsız ülkesidir. Nil Nehri ve petrol kaynakları önemlidir.",
    "st": "Sao Tome ve Principe, Gine Körfezi'nde yer alan bir ada devletidir. Kakao üretimiyle tanınır.",
    "sv": "El Salvador, Orta Amerika'da yer alır. Volkanları ve Pasifik kıyı şeridi önemlidir.",
    "sx": "Sint Maarten (Hollanda Bölgesi), Karayipler'de Fransız ve Hollanda arasında bölünmüş bir adadır.",
    "sy": "Suriye, Orta Doğu'da yer alır. Köklü bir tarihi ve medeniyet geçmişine sahiptir.",
    "sz": "Esvatini (Svaziland), Güney Afrika'da yer alan küçük bir krallıktır.",
    "tc": "Turks ve Caicos Adaları, Karayipler'de İngiliz Denizaşırı Bölgesi'dir. Lüks turizmi ve plajlarıyla ünlüdür.",
    "td": "Çad, Orta Afrika'da denize kıyısı olmayan, Sahra Çölü'nün büyük bir kısmını kaplayan bir ülkedir.",
    "tf": "Fransız Güney Toprakları, Hint Okyanusu'nda Fransa'ya ait ıssız adalardır.",
    "tg": "Togo, Batı Afrika'da küçük bir ülkedir. Fransız sömürge mirası ve sahilleri önemlidir.",
    "th": "Tayland, Güneydoğu Asya'da yer alır. Budist tapınakları, plajları ve dinamik başkenti Bangkok ile turizm merkezidir.",
    "tj": "Tacikistan, Orta Asya'da denize kıyısı olmayan, yüksek dağlar (Pamir) ve Fars kültürüyle tanınır.",
    "tk": "Tokelau, Pasifik Okyanusu'nda Yeni Zelanda'ya bağlı bir takımadadır.",
    "tl": "Doğu Timor, Güneydoğu Asya'da yer alan genç bir ülkedir. Portekiz ve Endonezya sömürge tarihinden izler taşır.",
    "tm": "Türkmenistan, Orta Asya'da yer alır. Doğal gaz zenginliği ve izole edilmiş siyasi yapısıyla bilinir.",
    "tn": "Tunus, Kuzey Afrika'da Akdeniz kıyısında yer alır. Antik Kartaca kalıntıları ve plajlarıyla tanınır.",
    "to": "Tonga, Pasifik Okyanusu'nda yer alan, monarşi ile yönetilen bir takımadadır.",
    "tv": "Tuvalu, Pasifik Okyanusu'nda yer alan, dokuz mercan adasından oluşan bir ada devletidir. İklim değişikliği tehdidi altındadır.",
    "tw": "Tayvan, Doğu Asya'da bir adadır. Yüksek teknolojisi ve karmaşık siyasi statüsüyle tanınır.",
    "tz": "Tanzanya, Doğu Afrika'da yer alır. Kilimanjaro Dağı, Serengeti Milli Parkı ve Zanzibar adasına ev sahipliği yapar.",
    "ua": "Ukrayna, Doğu Avrupa'da yer alır. Avrupa'nın ikinci en büyük ülkesidir ve zengin tarım arazilerine sahiptir.",
    "ug": "Uganda, Doğu Afrika'da yer alır. Nil Nehri'nin kaynağı ve goril safarileriyle tanınır.",
    "um": "ABD Küçük Dış Adaları, Pasifik ve Karayipler'deki küçük ABD bölgeleridir.",
    "uy": "Uruguay, Güney Amerika'da Arjantin ve Brezilya arasında yer alan küçük bir ülkedir. Yüksek yaşam standartları ve liberal yasalarıyla bilinir.",
    "uz": "Özbekistan, Orta Asya'da denize kıyısı olmayan bir ülkedir. İpek Yolu üzerindeki tarihi Semerkant ve Buhara şehirleriyle ünlüdür.",
    "va": "Vatikan, Roma içinde yer alan, dünyanın en küçük bağımsız ülkesidir ve Katolik Kilisesi'nin merkezidir.",
    "vc": "Saint Vincent ve Grenadinler, Karayipler'de yer alan bir ada devletidir.",
    "ve": "Venezuela, Güney Amerika'nın kuzeyinde yer alır. Zengin petrol rezervlerine ve Angel Şelalesi'ne sahiptir.",
    "vg": "Britanya Virjin Adaları, Karayipler'de İngiliz Denizaşırı Bölgesi'dir. Yelken turizmi ve offshore finans merkezi olarak bilinir.",
    "vi": "ABD Virjin Adaları, Karayipler'de ABD'ye bağlı bir bölgedir.",
    "vn": "Vietnam, Güneydoğu Asya'da yer alır. Uzun bir sahil şeridi, pirinç tarlaları ve tarihi savaş geçmişi önemlidir.",
    "vu": "Vanuatu, Pasifik Okyanusu'nda yer alan bir takımadadır. Volkanik adaları ve dalış noktalarıyla tanınır.",
    "wf": "Wallis ve Futuna, Pasifik Okyanusu'nda Fransa'ya bağlı bir takımadadır.",
    "ws": "Samoa, Pasifik Okyanusu'nda yer alan bir ada devletidir.",
    "ye": "Yemen, Arap Yarımadası'nda yer alır. Köklü bir tarihi ve zorlu bir coğrafyası vardır.",
    "yt": "Mayotte, Hint Okyanusu'nda Fransa'nın denizaşırı bir bölgesidir.",
    "zm": "Zambiya, Güney Afrika'da denize kıyısı olmayan bir ülkedir. Victoria Şelaleleri ve bakır madenciliği ile tanınır.",
    "zw": "Zimbabve, Güney Afrika'da yer alır. Victoria Şelaleleri'nin bir kısmına sahiptir ve zengin bir yaban hayatı vardır."
  };


  // 3. Kod Düzeltme Haritası (fixMap)
  const fixMap = {
    turkey: "tr", 
    usa: "us", 
    america: "us", 
    "united states": "us",
    "united_states": "us",
    "United States": "us", 
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
    const classAttr = (target.getAttribute("class") || ""); 
    
    // Tıklanan öğeden olası ülke adlarını/kodlarını çıkar
    const tokens = (idAttr + " " + classAttr.toLowerCase()).trim().split(/\s+/).filter(Boolean);
    tokens.push(classAttr); 

    // Eşleşen token'ı fixMap'te veya doğrudan 2 harfli kod olarak ara
    let foundToken = tokens.find(t => fixMap[t] || (t.length === 2 && countryNames[t.toLowerCase()]));
    
    let rawCode = foundToken || tokens[0] || "";
    
    // Ülke kodunu belirle
    let countryCode = fixMap[rawCode] || rawCode.toLowerCase(); 
    
    if (!countryCode || !countryNames[countryCode]) {
        console.warn(`Ülke kodu bulunamadı veya tanınmadı. Tıklanan öğenin ID/Class: ${idAttr} / ${classAttr}`);
        return; 
    }

    const name = countryNames[countryCode];
    // Metin bulunamazsa genel bir uyarı metni göster
    const text = countryTexts[countryCode] || `**${name}** için henüz detaylı bilgi metni girilmemiştir. Lütfen bu bilgiyi daha sonra kontrol edin.`; 

    // -------------------------------
    // Yeni Sekme Açma İşlemi 
    // -------------------------------
    const newTab = window.open("", "_blank");
    
    if (!newTab || newTab.closed || typeof newTab.closed == 'undefined') {
        alert("Tarayıcınız pop-up pencerelerini engelledi. Lütfen bu site için izin verin.");
        return;
    }

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

