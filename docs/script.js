document.addEventListener("DOMContentLoaded", function () {

  const svg = document.querySelector("svg");
  if (!svg) return; // SVG öğesi yoksa dur

  // 1. ÜLKE ADLARI VE KODLARI (ISO 3166-1 alpha-2) - TAM LİSTE
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

  // 2. ÜLKE BİLGİ METİNLERİ - TÜM ÜLKELERİN METİNLERİ EKLENMİŞTİR
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
    "ht": "Haiti, Hispanyola adasında yer alır. Latin Amerika'da bağımsızlığını kazanan ilk cumhuriyettir, ancak doğal afetlerle mücadele etmektedir.",
    "hu": "Macaristan, Orta Avrupa'da yer alır. Başkenti Budapeşte, termal banyoları ve mimarisiyle ünlüdür.",
    "id": "Endonezya, 17.000'den fazla adadan oluşan, dünyanın en büyük takımada devletidir. Zengin kültürel çeşitliliğe sahiptir.",
    "ie": "İrlanda, Kuzey Atlantik'te yer alan bir ada ülkesidir. Zümrüt Adası olarak bilinir ve zengin bir edebiyat geçmişine sahiptir.",
    "il": "İsrail, Orta Doğu'da yer alan, Yahudilik, Hristiyanlık ve İslam için kutsal topraklara sahip karmaşık bir ülkedir.",
    "im": "Man Adası, İrlanda Denizi'nde İngiliz Kraliyetine bağlıdır. TT motosiklet yarışlarıyla ve eşsiz yasalarıyla tanınır.",
    "io": "Britanya Hint Okyanusu Toprakları, Hint Okyanusu'nda yer alan, İngiliz Denizaşırı Bölgesi'dir.",
    "is": "İzlanda, Kuzey Atlantik'te volkanik bir adadır. Jeotermal enerji, buzullar ve Kuzey Işıkları ile ünlüdür.",
    "je": "Jersey, Manş Denizi'nde İngiliz Kraliyetine bağlı bir adadır. En büyük Manş Adası'dır ve finansal bir merkezdir.",
    "jm": "Jamaika, Karayipler'de yer alan bir ada devletidir. Reggae müziği, atletizm ve kendine özgü kültürüyle dünya çapında tanınır.",
    "jo": "Ürdün, Orta Doğu'da yer alır. Petra Antik Kenti ve Ölü Deniz gibi tarihi ve doğal harikalara ev sahipliği yapar.",
    "ke": "Kenya, Doğu Afrika'da yer alır. Zengin yaban hayatı, Büyük Göç olayları ve savanalarıyla ünlüdür.",
    "kg": "Kırgızistan, Orta Asya'da yer alan, dağlık ve göçebe kültürü ağırlıklı bir ülkedir.",
    "kh": "Kamboçya, Güneydoğu Asya'da yer alır. Angkor Wat gibi görkemli antik tapınaklarıyla bilinir.",
    "ki": "Kiribati, Pasifik Okyanusu'nda 33 mercan adasından oluşan bir takımadadır.",
    "km": "Komorlar, Afrika'nın güneydoğu kıyısında, Hint Okyanusu'nda yer alan volkanik bir adalar grubudur.",
    "kn": "Saint Kitts ve Nevis, Karayipler'de iki adadan oluşan, küçük bir federal ada devletidir.",
    "kp": "Kuzey Kore, Doğu Asya'da Kore Yarımadası'nın kuzeyinde yer alan, izole edilmiş bir ülkedir.",
    "kr": "Güney Kore, Doğu Asya'da yer alır. Yüksek teknoloji, K-Pop kültürü ve hızlı ekonomik gelişimiyle bilinir.",
    "kw": "Kuveyt, Basra Körfezi'nde yer alan, yüksek petrol rezervlerine sahip küçük bir Arap emirliktir.",
    "ky": "Cayman Adaları, Batı Karayipler'de İngiliz Denizaşırı Bölgesi'dir. Offshore finans merkezi olarak bilinir.",
    "kz": "Kazakistan, Orta Asya'da yer alan, dünyanın en büyük denize kıyısı olmayan ülkesidir ve zengin doğal kaynaklara sahiptir.",
    "la": "Laos, Güneydoğu Asya'da denize kıyısı olmayan, ormanlık ve Budist kültürü ağırlıklı bir ülkedir.",
    "lb": "Lübnan, Orta Doğu'da Akdeniz kıyısında yer alır. Köklü bir ticari geçmişe ve kültürel çeşitliliğe sahiptir.",
    "lc": "Saint Lucia, Karayipler'de yer alan, ikonik Pitons dağlarıyla ünlü bir ada devletidir.",
    "li": "Lihtenştayn, Alpler'de İsviçre ve Avusturya arasında yer alan küçük bir prensliktir.",
    "lk": "Sri Lanka, Hint Okyanusu'nda yer alan bir ada devletidir. Çay üretimi ve zengin Budist kültürüyle tanınır.",
    "lr": "Liberya, Batı Afrika'da yer alır. Afrika'nın en eski cumhuriyetlerinden biridir ve ABD ile güçlü tarihi bağları vardır.",
    "ls": "Lesoto, Güney Afrika Cumhuriyeti tarafından tamamen çevrili olan, yüksek rakımlı dağlık bir krallıktır.",
    "lt": "Litvanya, Kuzey Avrupa'da Baltık Denizi kıyısında yer alan, tarihi ve kültürel mirası güçlü bir ülkedir.",
    "lu": "Lüksemburg, Batı Avrupa'da yer alan küçük bir Büyük Dükalık'tır. Avrupa Birliği'nin önemli bir finans merkezidir.",
    "lv": "Letonya, Kuzey Avrupa'da Baltık Denizi kıyısında yer alır. Ormanlık alanları ve Art Nouveau mimarisiyle bilinir.",
    "ly": "Libya, Kuzey Afrika'da yer alır. Sahra Çölü'nün büyük bir bölümünü kapsar ve zengin petrol rezervlerine sahiptir.",
    "ma": "Fas, Kuzey Afrika'da yer alır. Zengin Berberi, Arap ve Avrupa etkileşimlerinden oluşan eşsiz bir kültüre sahiptir.",
    "mc": "Monako, Fransa kıyısında yer alan çok küçük bir prensliktir. Kumarhaneleri, Formula 1 yarışları ve yüksek yaşam standartlarıyla ünlüdür.",
    "md": "Moldova, Doğu Avrupa'da denize kıyısı olmayan, şarapçılık ve tarımla geçinen küçük bir ülkedir.",
    "me": "Karadağ, Balkanlar'da Adriyatik kıyısında yer alır. Fiyort benzeri körfezleri ve dağlık manzaralarıyla dikkat çeker.",
    "mf": "Saint Martin (Fransız Bölgesi), Karayipler'de Fransa'ya ait kuzey yarısıdır. Turizm önemli gelir kaynağıdır.",
    "mg": "Madagaskar, Afrika'nın güneydoğu kıyısında yer alan büyük bir ada devletidir. Özgün yaban hayatı ve lemurlarıyla tanınır.",
    "mh": "Marshall Adaları, Pasifik Okyanusu'nda yer alan, ABD ile yakın bağları olan mercan adaları grubudur.",
    "mk": "Kuzey Makedonya, Balkanlar'da yer alan, zengin kültürel miras ve antik tarihe sahip bir ülkedir.",
    "ml": "Mali, Batı Afrika'da denize kıyısı olmayan, Sahra ve Sahel bölgelerinde yer alan bir ülkedir.",
    "mm": "Myanmar, Güneydoğu Asya'da yer alan, altın pagodaları ve zengin kültürüyle tanınan bir ülkedir.",
    "mn": "Moğolistan, Doğu ve Orta Asya'da denize kıyısı olmayan, göçebe kültürü ağırlıklı geniş bir ülkedir.",
    "mo": "Makao, Çin'in özel idari bölgesidir. Asya'nın kumar ve eğlence merkezi olarak bilinir.",
    "mp": "Kuzey Mariana Adaları, Pasifik Okyanusu'nda ABD'ye bağlı bir takımadadır.",
    "mq": "Martinik, Karayipler'de Fransa'nın denizaşırı bir bölgesidir. Volkanik manzaraları ve tropikal ormanlarıyla ünlüdür.",
    "mr": "Moritanya, Batı Afrika'da yer alır. Sahra Çölü'nün büyük bir bölümünü kapsayan geniş bir ülkedir.",
    "ms": "Montserrat, Karayipler'de İngiliz Denizaşırı Bölgesi'dir. Aktif bir volkana sahip 'Zümrüt Adası' olarak bilinir.",
    "mt": "Malta, Akdeniz'de yer alan küçük bir takımada devletidir. Köklü bir tarihe ve denizcilik kültürüne sahiptir.",
    "mu": "Mauritius, Hint Okyanusu'nda yer alan volkanik bir ada devletidir. Turizm ve şeker üretimiyle ünlüdür.",
    "mv": "Maldivler, Hint Okyanusu'nda yer alan, alçak mercan adaları ve lüks tatil köyleriyle ünlü bir takımadadır.",
    "mw": "Malavi, Güneydoğu Afrika'da yer alan, Malavi Gölü'ne kıyısı olan ve tarımla geçinen bir ülkedir.",
    "na": "Namibya, Güney Afrika'da yer alır. Namib Çölü, zengin elmas yatakları ve Alman sömürge mimarisiyle bilinir.",
    "nc": "Yeni Kaledonya, Pasifik Okyanusu'nda Fransa'ya bağlı bir adalar grubudur. Zengin nikel rezervlerine sahiptir.",
    "ne": "Nijer, Batı Afrika'da denize kıyısı olmayan, Sahra Çölü'nün büyük bir bölümünü kapsayan bir ülkedir.",
    "nf": "Norfolk Adası, Pasifik Okyanusu'nda Avustralya'ya bağlı küçük bir adadır. Zengin bir İngiliz sömürge tarihine sahiptir.",
    "ng": "Nijerya, Batı Afrika'nın en kalabalık ülkesidir. Afrika'nın en büyük ekonomilerinden biridir ve zengin petrol kaynaklarına sahiptir.",
    "ni": "Nikaragua, Orta Amerika'da yer alır. Büyük gölleri, volkanları ve zengin doğal hayatıyla bilinir.",
    "nl": "Hollanda, Batı Avrupa'da yer alır. Rüzgar değirmenleri, laleleri ve gelişmiş su yönetimi sistemiyle ünlüdür.",
    "no": "Norveç, Kuzey Avrupa'da yer alır. Fiyortları, Kuzey Kutbu'na yakın konumu ve yüksek yaşam standartlarıyla bilinir.",
    "np": "Nepal, Himalayalar'da yer alan denize kıyısı olmayan bir ülkedir. Everest Dağı ve zengin Budist/Hindu kültürüyle ünlüdür.",
    "nr": "Nauru, Pasifik Okyanusu'nda dünyanın en küçük ada devletlerinden biridir.",
    "nu": "Niue, Pasifik Okyanusu'nda Yeni Zelanda ile serbest birlik içinde olan büyük bir mercan adasıdır.",
    "nz": "Yeni Zelanda, Güneybatı Pasifik'te yer alan bir ada devletidir. Çarpıcı doğal güzellikleri ve Maori kültürüyle tanınır.",
    "om": "Umman, Arap Yarımadası'nın güneydoğu kıyısında yer alan, zengin denizcilik tarihine sahip bir sultanlıktır.",
    "pa": "Panama, Orta ve Güney Amerika'yı birleştiren bir köprüdür. Panama Kanalı ile dünya ticareti için kritik öneme sahiptir.",
    "pe": "Peru, Güney Amerika'nın batı kıyısında yer alır. İnka İmparatorluğu'nun mirası ve Machu Picchu Antik Kenti ile ünlüdür.",
    "pf": "Fransız Polinezyası, Pasifik Okyanusu'nda Fransa'ya bağlı bir adalar grubudur. Bora Bora gibi lüks tatil adalarına ev sahipliği yapar.",
    "pg": "Papua Yeni Gine, Pasifik Okyanusu'nda yer alır. Dünyanın en kültürel ve biyolojik açıdan çeşitli ülkelerinden biridir.",
    "ph": "Filipinler, Pasifik Okyanusu'nda 7.000'den fazla adadan oluşan bir takımadadır. Yoğun kültürel çeşitliliğe sahiptir.",
    "pk": "Pakistan, Güney Asya'da yer alır. Zengin İslami tarihi, İndus Nehri medeniyeti ve yüksek dağlarıyla bilinir.",
    "pl": "Polonya, Orta Avrupa'da yer alır. Köklü bir tarihe, güçlü Katolik kültüre ve gelişmiş bir ekonomiye sahiptir.",
    "pm": "Saint Pierre ve Miquelon, Kuzey Atlantik'te Kanada kıyısı açıklarında Fransa'ya bağlı küçük adalardır.",
    "pn": "Pitcairn Adaları, Pasifik Okyanusu'nda yer alan, dünyanın en az nüfuslu İngiliz Denizaşırı Bölgesi'dir.",
    "pr": "Porto Riko, Karayipler'de ABD'ye bağlı, İspanyol ve Amerikan etkileşimlerinden oluşan bir kültüre sahiptir.",
    "ps": "Filistin, Orta Doğu'da yer alan, tarih boyunca birçok çatışmaya sahne olmuş ve statüsü tartışmalı topraklardır.",
    "pt": "Portekiz, İber Yarımadası'nın batı ucunda yer alır. Zengin denizcilik tarihi ve keşifler dönemiyle ünlüdür.",
    "pw": "Palau, Pasifik Okyanusu'nda yer alan, zengin deniz yaşamı ve dalış noktalarıyla ünlü bir takımadadır.",
    "py": "Paraguay, Güney Amerika'da denize kıyısı olmayan, güçlü yerli ve İspanyol kültürü etkileşimlerine sahip bir ülkedir.",
    "qa": "Katar, Basra Körfezi'nde yer alan küçük bir yarımada emirliktir. Zengin doğal gaz ve petrol kaynaklarına sahiptir.",
    "re": "Reunion, Hint Okyanusu'nda yer alan, Fransa'nın denizaşırı bir bölgesidir. Aktif volkanları ve eşsiz biyoçeşitliliği ile ünlüdür.",
    "ro": "Romanya, Güneydoğu Avrupa'da yer alır. Karpat Dağları, tarihi kaleleri ve efsaneleriyle bilinir.",
    "rs": "Sırbistan, Balkanlar'da yer alan, zengin Slav kültürü ve çalkantılı siyasi tarihine sahip bir ülkedir.",
    "rw": "Ruanda, Doğu Afrika'da yer alan, 'Bin Tepeler Ülkesi' olarak bilinir ve hızla gelişen bir ülkedir.",
    "sb": "Solomon Adaları, Pasifik Okyanusu'nda yer alan, 990'dan fazla adadan oluşan bir takımadadır.",
    "sc": "Seyşeller, Hint Okyanusu'nda yer alan 115 adadan oluşan, lüks turizmle geçinen tropikal bir cennettir.",
    "sd": "Sudan, Kuzeydoğu Afrika'da yer alan, Nil Nehri'nin önemli bir bölümünü kapsayan büyük bir ülkedir.",
    "se": "İsveç, Kuzey Avrupa'da yer alır. Yüksek refah düzeyi, tasarım kültürü ve doğal güzellikleriyle ünlüdür.",
    "sg": "Singapur, Güneydoğu Asya'nın ucunda yer alan, küresel bir finans ve ticaret merkezi olan ada şehir devletidir.",
    "sh": "Saint Helena, Ascension ve Tristan da Cunha, Güney Atlantik'te yer alan İngiliz Denizaşırı Bölgesi'dir. Napoleon'un sürgün yeri olarak bilinir.",
    "si": "Slovenya, Orta Avrupa'da yer alan küçük bir ülkedir. Alp dağları ve Adriyatik kıyısı manzaralarına sahiptir.",
    "sj": "Svalbard ve Jan Mayen, Kuzey Kutbu'nda yer alan, Norveç'e bağlı soğuk adalardır.",
    "sk": "Slovakya, Orta Avrupa'da yer alır. Karpat Dağları'nın bir bölümünü kapsar ve zengin bir halk kültürüne sahiptir.",
    "sl": "Sierra Leone, Batı Afrika'da yer alır. Zengin elmas kaynaklarına rağmen ekonomik zorluklar yaşamış bir ülkedir.",
    "sm": "San Marino, İtalya tarafından tamamen çevrili olan dünyanın en eski cumhuriyetlerinden biridir.",
    "sn": "Senegal, Batı Afrika'da yer alır. Canlı müzik, sanat ve Fransız sömürge mimarisiyle bilinir.",
    "so": "Somali, Doğu Afrika'da yer alan, 'Afrika Boynuzu'nun ucunda stratejik bir konuma sahiptir.",
    "sr": "Surinam, Güney Amerika'nın kuzeydoğu kıyısında yer alan, çok kültürlü bir yapıya sahip küçük bir ülkedir.",
    "ss": "Güney Sudan, Afrika'nın en yeni ülkesidir. Nil Nehri'nin akışında önemli bir konuma sahiptir.",
    "st": "Sao Tome ve Principe, Afrika'nın batı kıyısında yer alan küçük bir volkanik adalar grubudur.",
    "sv": "El Salvador, Orta Amerika'da yer alır. Volkanlar ve kahve üretimiyle bilinir.",
    "sx": "Sint Maarten (Hollanda Bölgesi), Karayipler'de Hollanda Krallığı'na bağlı güney yarısıdır. Turizm önemli gelir kaynağıdır.",
    "sy": "Suriye, Orta Doğu'da yer alan, zengin antik tarihe ve kültürel mirasa sahip bir ülkedir.",
    "sz": "Esvatini, Güney Afrika tarafından çevrili, küçük bir mutlak monarşi ülkesidir.",
    "tc": "Turks ve Caicos Adaları, Atlantik Okyanusu'nda yer alan İngiliz Denizaşırı Bölgesi'dir. Lüks plajlarıyla ünlüdür.",
    "td": "Çad, Orta Afrika'da denize kıyısı olmayan, Sahra ve Sahel bölgelerinde yer alan bir ülkedir.",
    "tf": "Fransız Güney Toprakları, Hint Okyanusu'nda yer alan, Fransa'nın denizaşırı ıssız bölgeleridir.",
    "tg": "Togo, Batı Afrika'da yer alan, dar bir kıyı şeridine ve tarıma dayalı bir ekonomiye sahip küçük bir ülkedir.",
    "th": "Tayland, Güneydoğu Asya'da yer alır. Antik tapınakları, plajları ve canlı mutfağıyla popülerdir.",
    "tj": "Tacikistan, Orta Asya'da yer alan denize kıyısı olmayan, yüksek dağlık bölgelere sahip bir ülkedir.",
    "tk": "Tokelau, Pasifik Okyanusu'nda Yeni Zelanda'ya bağlı, üç mercan atolünden oluşan bir bölgedir.",
    "tl": "Doğu Timor, Güneydoğu Asya'da yer alan bir ada devletidir. Portekiz ve Endonezya etkileşimli bir geçmişe sahiptir.",
    "tm": "Türkmenistan, Orta Asya'da yer alan, zengin doğal gaz rezervlerine sahip, izole bir ülkedir.",
    "tn": "Tunus, Kuzey Afrika'da yer alır. Zengin Fenike ve Roma tarihi mirasına sahiptir.",
    "to": "Tonga, Pasifik Okyanusu'nda yer alan bir takımada krallığıdır. Avustralya'dan bağımsızlığını kazanan son Pasifik ülkelerindendir.",
    "tv": "Tuvalu, Pasifik Okyanusu'nda yer alan, dokuz mercan atolünden oluşan küçük bir ada devletidir.",
    "tw": "Tayvan, Doğu Asya'da yer alan bir ada devletidir. Yüksek teknoloji endüstrisi ve canlı kültürüyle bilinir.",
    "tz": "Tanzanya, Doğu Afrika'da yer alır. Kilimanjaro Dağı ve ünlü Serengeti Ulusal Parkı'na ev sahipliği yapar.",
    "ua": "Ukrayna, Doğu Avrupa'da yer alan, geniş tarım arazilerine ve zengin bir Slav kültürüne sahip büyük bir ülkedir.",
    "ug": "Uganda, Doğu Afrika'da yer alan, Nil Nehri'nin kaynağına yakın konumu ve dağlık gorilleriyle ünlüdür.",
    "um": "ABD Küçük Dış Adaları, Pasifik ve Karayipler'de yer alan, ABD'ye bağlı dokuz ıssız adalar grubudur.",
    "uy": "Uruguay, Güney Amerika'da yer alan, yüksek refah düzeyi ve istikrarlı siyasetiyle öne çıkan küçük bir ülkedir.",
    "uz": "Özbekistan, Orta Asya'da yer alan denize kıyısı olmayan bir ülkedir. İpek Yolu üzerindeki Semerkant ve Buhara gibi tarihi şehirleriyle ünlüdür.",
    "va": "Vatikan, İtalya tarafından tamamen çevrili, Roma'da yer alan bağımsız bir şehir devletidir. Katolik Kilisesi'nin merkezidir.",
    "vc": "Saint Vincent ve Grenadinler, Karayipler'de yer alan bir ada devletidir. Volkanik manzaraları ve yelken turizmiyle tanınır.",
    "ve": "Venezuela, Güney Amerika'nın kuzey kıyısında yer alır. Zengin petrol rezervlerine, Angel Şelalesi'ne ve biyolojik çeşitliliğe sahiptir.",
    "vg": "Britanya Virjin Adaları, Karayipler'de yer alan İngiliz Denizaşırı Bölgesi'dir. Yelken ve offshore finans merkezi olarak bilinir.",
    "vi": "ABD Virjin Adaları, Karayipler'de yer alan, ABD'ye bağlı bir takımadadır. Güzel plajları ve turizmle popülerdir.",
    "vn": "Vietnam, Güneydoğu Asya'da yer alan, pirinç tarlaları, uzun kıyı şeridi ve zengin tarihiyle bilinen bir ülkedir.",
    "vu": "Vanuatu, Pasifik Okyanusu'nda yer alan, volkanik adalar ve eşsiz kabile kültürleriyle bilinen bir takımadadır.",
    "wf": "Wallis ve Futuna, Pasifik Okyanusu'nda Fransa'ya bağlı bir adalar grubudur.",
    "ws": "Samoa, Pasifik Okyanusu'nda yer alan, güçlü bir Polinezya kültürüne sahip bir ada devletidir.",
    "ye": "Yemen, Arap Yarımadası'nın güney ucunda yer alan, köklü bir tarihe ve Arap kültürüne sahip bir ülkedir.",
    "yt": "Mayotte, Hint Okyanusu'nda yer alan, Fransa'nın denizaşırı bir departmanıdır.",
    "zm": "Zambiya, Güney Afrika'da denize kıyısı olmayan bir ülkedir. Victoria Şelalesi ve zengin maden kaynaklarıyla tanınır.",
    "zw": "Zimbabve, Güney Afrika'da yer alan, zengin doğal kaynaklara ve yaban hayatına sahip bir ülkedir."
  };

  // 3. Kod Düzeltme Haritası (fixMap) - SVG'deki yaygın isimleri ISO kodlarına eşler.
  const fixMap = {
    turkey: "tr", usa: "us", america: "us", canada: "ca", france: "fr", germany: "de", 
    england: "gb", uk: "gb",
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
    // Tüm ülkeler için metin eklendiği için varsayılan uyarıya gerek kalmadı, ancak yine de yedek olarak durabilir.
    const text = countryTexts[countryCode] || `**${name}** için metin bulunamadı.`; 

    // -------------------------------
    // Yeni Sekme Açma ve Pop-up Engeli Kontrolü
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
