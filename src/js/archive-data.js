/* Forgotten Footprints — verified artifact dataset.
   Every record identifies one physical object or component.
   Coordinates are sourced; approximate or region-level positions are labelled as such.
   The conceptual 3D notes describe representation limits, not engineering dimensions. */
window.ForgottenFootprintsData = {
  schemaVersion: 2,
  artifacts: [
    {
      id: "MOON-AP11-LMDS",
      name: {
        en: "Apollo 11 Eagle descent stage",
        ar: "مرحلة الهبوط «إيغل» — أبولو 11"
      },
      mission: "Apollo 11",
      missionAr: "أبولو 11",
      missionId: "APOLLO-11",
      missionLabel: { en: "Apollo 11", ar: "أبولو 11" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Lunar Module descent stage",
      typeAr: "مرحلة هبوط المركبة القمرية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended",
      operationalStatusAr: "انتهت المهمة",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Apollo 11 landing point, Mare Tranquillitatis",
      locationAr: "موقع هبوط أبولو 11، بحر السكون",
      lat: 0.67416,
      lon: 23.47314,
      locationConfidence: "NASA NSSDC Lunar Module landing coordinate (0.67416°N, 23.47314°E). It is not a survey of individual fragments.",
      locationConfidenceAr: "إحداثي هبوط المركبة القمرية وفق NASA NSSDC (0.67416° شمالاً، 23.47314° شرقاً). وهو ليس مسحاً لكل جزء منفصل.",
      markerLabel: "Apollo 11 Lunar Module landing coordinate — descent stage vicinity",
      markerLabelAr: "إحداثي هبوط مركبة أبولو 11 القمرية — نطاق مرحلة الهبوط",
      story: {
        en: "The descent stage stayed on the Moon after Eagle's ascent stage carried the crew back to lunar orbit. It is the part of the lander that remained at Tranquility Base, and its position is tied to the documented Lunar Module landing coordinate.",
        ar: "بقيت مرحلة الهبوط على سطح القمر بعد أن حملت مرحلة الصعود طاقم «إيغل» عائداً إلى المدار القمري. وهي الجزء الذي ظل في قاعدة «ترانكويليتي»، ويرتبط موضعها بإحداثي هبوط المركبة القمرية الموثق."
      },
      then: "Descent stage of Eagle",
      thenAr: "مرحلة هبوط مركبة «إيغل»",
      missionStory: "Carried the crew and equipment to the lunar surface; the ascent stage then lifted off.",
      missionStoryAr: "حملت الطاقم والمعدات إلى سطح القمر، ثم انطلقت مرحلة الصعود.",
      now: "Remains on the lunar surface at the Apollo 11 site; the mission is over.",
      nowAr: "لا تزال على سطح القمر في موقع أبولو 11؛ وقد انتهت المهمة.",
      significance: {
        en: "The descent stage is the surviving surface element of the first crewed lunar landing. It is a fixed reference point for interpreting the Apollo 11 site and the hardware left there.",
        ar: "مرحلة الهبوط هي العنصر السطحي الباقي من أول هبوط مأهول على القمر. وهي نقطة مرجعية ثابتة لفهم موقع أبولو 11 والعتاد المتروك فيه."
      },
      evidence: {
        en: "The record is supported by the NASA NSSDC Apollo 11 Lunar Module page, the Apollo landing-site coordinate table and the Apollo 11 mission information page. The Lunar Module page states that the descent stage was left behind on the Moon; the coordinate locates the Lunar Module and does not measure the descent stage's separate outline.",
        ar: "يدعم السجل صفحة المركبة القمرية لأبولو 11 لدى NASA NSSDC وجدول إحداثيات مواقع هبوط أبولو وصفحة معلومات مهمة أبولو 11. تذكر صفحة المركبة القمرية أن مرحلة الهبوط تُركت على القمر؛ ويحدد الإحداثي موضع المركبة القمرية ولا يقيس حدود مرحلة الهبوط بشكل منفصل."
      },
      model: "conceptual",
      modelKind: "lm-descent",
      modelNote: {
        en: "Conceptual assembly based on published Apollo Lunar Module descriptions. It shows recognizable structure; it is not an engineering-accurate reconstruction.",
        ar: "تجميع تصوري مستند إلى أوصاف منشورة للمركبة القمرية في برنامج أبولو. يوضح البنية المميزة، وليس إعادة بناء هندسية دقيقة."
      },
      components: [
        { anchor: [0, 0.15, 1.05], name: { en: "Descent-stage structure", ar: "بنية مرحلة الهبوط" }, description: { en: "The central body that carried the descent engine, propellant and equipment. Shown conceptually.", ar: "الجسم المركزي الذي حمل محرك الهبوط والوقود والمعدات. معروض بشكل تصوري." } },
        { anchor: [1.5, -0.55, 0.55], name: { en: "Landing legs and footpads", ar: "أرجل الهبوط وقواعدها" }, description: { en: "Four legs absorbed the landing load and kept the stage stable. The model simplifies their struts.", ar: "أربع أرجل امتصت حمل الهبوط وأبقت المرحلة مستقرة. يبسط النموذج تفاصيل الدعامات." } },
        { anchor: [0, -1.25, 0.1], name: { en: "Descent engine bell", ar: "فوهة محرك الهبوط" }, description: { en: "The large engine at the base performed the powered descent. Its bell is represented as a simplified cone.", ar: "المحرك الكبير في القاعدة نفّذ الهبوط المدفوع. تُمثَّل فوهته بمخروط مبسط." } },
        { anchor: [-1.55, -0.35, 0.75], name: { en: "Ladder and porch", ar: "السلّم والشرفة" }, description: { en: "The crew used the ladder and porch to step from the ascent stage onto the surface.", ar: "استخدم الطاقم السلّم والشرفة للنزول من مرحلة الصعود إلى السطح." } },
        { anchor: [0, 0.55, 1.15], name: { en: "Thermal blanket", ar: "الغلاف الحراري" }, description: { en: "The model represents the stage's gold-toned insulation as a single simplified foil surface.", ar: "يمثّل النموذج عزل المرحلة الذهبي بسطح ورق مبسط واحد." } }
      ],
      related: ["MOON-AP11-LRRR"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Apollo 11 Lunar Module — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C" },
        { title: "Apollo 11 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11info.html" }
      ],
      events: [
        { date: "1969-07-20", title: "Apollo 11 lunar landing", titleAr: "هبوط أبولو 11 على القمر", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11info.html" }
      ]
    },
    {
      id: "MOON-AP11-LRRR",
      name: {
        en: "Apollo 11 Lunar Laser Ranging Retroreflector",
        ar: "عاكس الليزر للقياس القمري — أبولو 11"
      },
      mission: "Apollo 11",
      missionAr: "أبولو 11",
      missionId: "APOLLO-11",
      missionLabel: { en: "Apollo 11", ar: "أبولو 11" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Passive scientific instrument",
      typeAr: "أداة علمية سلبية",
      status: "STILL ACTIVE",
      operationalStatus: "Passive instrument; no power source or transmitter; used for lunar laser ranging",
      operationalStatusAr: "أداة سلبية؛ بلا مصدر طاقة أو جهاز إرسال؛ تُستخدم في القياس بالليزر القمري",
      mode: "Passive",
      modeAr: "أداة سلبية",
      location: "Apollo 11 landing point, Mare Tranquillitatis",
      locationAr: "موقع هبوط أبولو 11، بحر السكون",
      lat: 0.67345,
      lon: 23.47307,
      locationConfidence: "NASA NSSDC coordinate for the Apollo 11 LRRR (0.67345°N, 23.47307°E).",
      locationConfidenceAr: "إحداثي عاكس أبولو 11 وفق NASA NSSDC (0.67345° شمالاً، 23.47307° شرقاً).",
      markerLabel: "Apollo 11 LRRR — passive retroreflector array",
      markerLabelAr: "عاكس أبولو 11 — مصفوفة عاكسات سلبية",
      story: {
        en: "The array reflects laser pulses sent from Earth. It has no power source and no active transmitter: it is a passive scientific instrument used for lunar laser ranging, and it is still classified as an active experiment rather than abandoned hardware.",
        ar: "تعكس المصفوفة نبضات الليزر المرسلة من الأرض. ليس لها مصدر طاقة ولا جهاز إرسال نشط: إنها أداة علمية سلبية تُستخدم في القياس بالليزر القمري، ولا تزال تجربة نشطة لا عتاداً مهجوراً."
      },
      then: "Deployed at the Apollo 11 site",
      thenAr: "نُشرت في موقع أبولو 11",
      missionStory: "Provides a passive laser-ranging target for Earth-based observatories.",
      missionStoryAr: "توفر هدفاً سلبياً للقياس بالليزر لمراصد الأرض.",
      now: "Remains on the Moon and is used passively for laser ranging.",
      nowAr: "لا تزال على القمر وتُستخدم سلبياً في القياس بالليزر.",
      significance: {
        en: "The retroreflector is one of the Apollo-era passive arrays that allow precise Earth–Moon distance measurements. Its operational state comes from its passive design, not from a power source.",
        ar: "المصفوفة واحدة من مصفوفات العاكسات السلبية من عصر أبولو التي تتيح قياس المسافة بين الأرض والقمر بدقة. تعود حالتها التشغيلية إلى تصميمها السلبي، لا إلى مصدر طاقة."
      },
      evidence: {
        en: "Coordinates come from the NASA NSSDC Apollo landing-site table. The passive-instrument description is consistent with the NASA lunar historic sites reference, the Apollo 11 experiment context and the ILRS lunar laser ranging summary, which documents continuing ranging to the Apollo 11, 14 and 15 arrays.",
        ar: "تأتي الإحداثيات من جدول مواقع هبوط أبولو التابع لـ NASA NSSDC. ويتوافق وصف الأداة السلبية مع مرجع ناسا للمواقع التاريخية القمرية وسياق تجربة أبولو 11 وملخص القياس بالليزر القمري لدى ILRS، الذي يوثق استمرار القياس إلى مصفوفات أبولو 11 و14 و15."
      },
      model: "conceptual",
      modelKind: "lrrr",
      modelNote: {
        en: "Conceptual representation of the reflector array and its mount. The number and exact arrangement of optical elements are simplified.",
        ar: "تمثيل تصوري لمصفوفة العاكسات وحاملها. عدد العناصر البصرية وترتيبها الدقيق مبسطان."
      },
      components: [
        { anchor: [0, 0.45, 0.3], name: { en: "Retroreflector array", ar: "مصفوفة العاكسات" }, description: { en: "A panel of corner-cube reflectors returns laser light toward its source.", ar: "لوحة من عاكسات الزوايا تعيد ضوء الليزر نحو مصدره." } },
        { anchor: [-0.55, -0.2, 0.15], name: { en: "Tripod mount", ar: "حامل ثلاثي القوائم" }, description: { en: "The array was set on a mount so it could be aimed at Earth. The model shows three simplified legs.", ar: "وُضعت المصفوفة على حامل ليُوجَّه نحو الأرض. يعرض النموذج ثلاث أرجل مبسطة." } },
        { anchor: [0.42, 0.1, 0.25], name: { en: "Leveling base", ar: "قاعدة التسوية" }, description: { en: "A base assembly helped establish the array's orientation. Details are conceptual.", ar: "ساعدت مجموعة القاعدة في ضبط اتجاه المصفوفة. التفاصيل تصورية." } }
      ],
      related: ["MOON-AP11-LMDS"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Apollo 11 experiment context — NASA PDS", url: "https://pds.nasa.gov/ds-view/pds/viewContext.jsp?identifier=urn%3Anasa%3Apds%3Acontext%3Ainstrument_host%3Aspacecraft.a11e&version=1.1" },
        { title: "Lunar historic sites reference — NASA", url: "https://www.nasa.gov/wp-content/uploads/2023/12/nasa-usg-lunar-historic-sites-reva.pdf" },
        { title: "Lunar laser ranging summary — ILRS", url: "https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar.html" },
        { title: "Apollo 11 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11info.html" }
      ],
      events: [
        { date: "1969-07-21", title: "Apollo 11 crew deploys the lunar retroreflector (UTC)", titleAr: "طاقم أبولو 11 ينشر عاكس الليزر القمري (بالتوقيت العالمي)", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo11info.html" }
      ]
    },
    {
      id: "MOON-AP15-LRV",
      name: {
        en: "Apollo Lunar Roving Vehicle (LRV)",
        ar: "العربة القمرية (LRV)"
      },
      mission: "Apollo 15, 16 and 17",
      missionAr: "أبولو 15 و16 و17",
      missionId: "LRV",
      missionLabel: { en: "Lunar Roving Vehicle — Apollo 15, 16 and 17", ar: "العربة القمرية — أبولو 15 و16 و17" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Crewed lunar surface vehicle",
      typeAr: "مركبة سطح قمرية مأهولة",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; all three vehicles remain at their landing sites",
      operationalStatusAr: "انتهت المهمة؛ ولا تزال العربات الثلاث في مواقع هبوطها",
      mode: "Crewed vehicle",
      modeAr: "مركبة مأهولة",
      location: "Three vehicles at three lunar sites — Hadley–Apennine (Apollo 15), Descartes (Apollo 16) and Taurus–Littrow (Apollo 17). All three remain where their missions ended; no rover's final parking position is asserted.",
      locationAr: "ثلاث عربات في ثلاثة مواقع قمرية — هادلي–أبينين (أبولو 15)، وديكارت (أبولو 16)، وتوروس–ليترو (أبولو 17). وتبقى العربات الثلاث حيث انتهت مهامها؛ ولا يُحدَّد موقع وقوف أي منها.",
      lat: 26.13239,
      lon: 3.6333,
      locationConfidence: "The plotted pin is the NASA NSSDC Apollo 15 Lunar Module landing coordinate (26.13239°N, 3.63330°E) — one of the three sites where an LRV was used. The Apollo 16 and Apollo 17 sites are documented in this record but are not plotted. No rover's final parking position is asserted.",
      locationConfidenceAr: "العلامة المعروضة هي إحداثي هبوط المركبة القمرية لأبولو 15 وفق NASA NSSDC (26.13239° شمالاً، 3.63330° شرقاً) — أحد المواقع الثلاثة التي استُخدمت فيها العربة القمرية. ويوثّق هذا السجل موقعي أبولو 16 وأبولو 17 دون عرضهما. ولا يُحدَّد موقع وقوف أي عربة.",
      missionMarker: true,
      markerLabel: "Apollo 15 landing site — one of the three LRV sites; not a rover's final parking position",
      markerLabelAr: "موقع هبوط أبولو 15 — أحد المواقع الثلاثة للعربة القمرية؛ وليس موقع وقوف أي عربة",
      story: {
        en: "Three Lunar Roving Vehicles were driven on the Moon: one on Apollo 15 by David Scott and Jim Irwin, one on Apollo 16 by John Young and Charles Duke, and one on Apollo 17 by Gene Cernan and Harrison Schmitt. Each rover was used on three traverses, one per day. The Apollo 15 rover drove 27.8 km, the Apollo 16 rover 26.7 km and the Apollo 17 rover 35.9 km; these are separate per-mission distances. Added together they total about 90.4 km — a combined figure for all three vehicles, not a single mission. Each vehicle was left at its own landing site. The rover, often called the 'Moon Buggy', was a battery-powered electric vehicle designed for the Moon's vacuum and low gravity. NASA's Marshall Space Flight Center managed the project; Boeing was the prime contractor and General Motors' Delco Electronics Division was a major subcontractor. Development began in October 1969. The LRV was folded inside the Lunar Module descent stage and lowered to the surface using cables, pulleys, reels and springs; once deployed, astronauts used a T-shaped hand controller to drive, steer, brake and reverse. The rover had four independently powered wheels, two seats, a total motor power of about one horsepower, a top speed near 13 km/h, a mass of about 210 kg and a payload capacity of about 490 kg.",
        ar: "استُخدمت ثلاث عربات قمرية على سطح القمر: واحدة في أبولو 15 بقيادة ديفيد سكوت وجيم إيروين، وواحدة في أبولو 16 بقيادة جون يونغ وتشارلز ديوك، وواحدة في أبولو 17 بقيادة جين سيرنان وهاريسون شميت. وقد استُخدمت كل عربة في ثلاث جولات، واحدة في كل يوم. قطعت عربة أبولو 15 مسافة 27.8 كم، وعربة أبولو 16 مسافة 26.7 كم، وعربة أبولو 17 مسافة 35.9 كم؛ وهذه مسافات منفصلة لكل مهمة. ويبلغ مجموعها معاً نحو 90.4 كم — وهو رقم مجمّع للعربات الثلاث، وليس لمهمة واحدة. وقد تُركت كل عربة في موقع هبوطها. وكانت العربة، التي تُعرف غالباً باسم «عربة القمر» أو «Moon Buggy»، مركبة كهربائية تعمل بالبطارية وصُمّمت لفراغ القمر وجاذبيته المنخفضة. وأدار المشروع مركز مارشال التابع لناسا، وكان بوينغ المقاول الرئيسي، بينما كانت شعبة ديلكو للإلكترونيات التابعة لشركة جنرال موتورز من المقاولين الرئيسيين. وبدأ التطوير في أكتوبر 1969. وتم إدخال العربة مطوية داخل مرحلة الهبوط للمركبة القمرية، ثم خفضت إلى السطح باستخدام كابلات وبكرات وبكرات/مقابض ومرسّيات، مع استخدام نابضات لتفكيكها بعد النشر؛ وبعد تفكيكها استخدم الرواد عصا تحكم على شكل حرف T لتوجيه العربة، والقيادة، والفرملة، والانعكاس. وكانت للعربة أربع عجلات مستقلة الدفع، ومقعدان، وإجمالي قوة محرك نحو حصان واحد، وسرعة قصوى قريبة من 13 كم/ساعة، وكتلة نحو 210 كغم، وسعة حمل نحو 490 كجم."
      },
      then: "Surface mobility vehicle",
      thenAr: "مركبة تنقل على السطح",
      missionStory: "Extended the astronauts' surface range on Apollo 15, 16 and 17 and carried crews, tools and samples.",
      missionStoryAr: "وسّعت مدى حركة رواد الفضاء على السطح في أبولو 15 و16 و17، وحملت الأطقم والأدوات والعينات.",
      now: "All three vehicles remain on the Moon at their landing sites; no rover's final parking position is asserted in this record.",
      nowAr: "لا تزال العربات الثلاث على القمر في مواقع هبوطها؛ ولا يُحدَّد في هذا السجل موقع وقوف أي عربة.",
      significance: {
        en: "The Lunar Roving Vehicle was the first crewed vehicle driven on another world. Across Apollo 15, 16 and 17 it changed the scale of lunar surface exploration by allowing longer traverses and the carriage of more equipment and samples.",
        ar: "كانت العربة القمرية أول مركبة مأهولة تُقاد على عالم آخر. وخلال أبولو 15 و16 و17 غيّرت حجم الاستكشاف السطحي بإتاحة جولات أطول وحمل مزيد من المعدات والعينات."
      },
      evidence: {
        en: "Distances, driving times and crews are from NASA NSSDC's Lunar Roving Vehicle page, which lists Apollo 15 at 27.8 km, Apollo 16 at 26.7 km and Apollo 17 at 35.9 km as individual mission totals and states no combined total, so the aggregate given here is identified as the sum of the three missions. The plotted pin is the Apollo 15 Lunar Module coordinate from NASA NSSDC's Apollo landing-site table, not a rover survey. The design details — two 36-volt silver-zinc batteries, four independently powered wheels, a T-shaped hand controller, about 210 kg mass, about 490 kg payload and a top speed near 13 km/h — are taken from the technical descriptions of the lunar rover program and support the mission-specific record.",
        ar: "المسافات وأزمنة القيادة والأطقم مستمدة من صفحة العربة القمرية لدى NASA NSSDC، التي تسرد أبولو 15 بمسافة 27.8 كم، وأبولو 16 بمسافة 26.7 كم، وأبولو 17 بمسافة 35.9 كم كإجماليات منفصلة للمهمات، ولا تذكر أي إجمالي مجمّع؛ لذلك يُعرَّف المجموع الوارد هنا بأنه حاصل جمع المهمات الثلاث. والعلامة المعروضة هي إحداثي المركبة القمرية لأبولو 15 من جدول مواقع الهبوط لدى NASA NSSDC، وليست مسحاً لموقع العربة. كما أن تفاصيل التصميم — بطاريتان فضيات-زنك بجهد 36 فولت، وأربع عجلات مستقلة الدفع، وعصا تحكم على شكل T، وكتلة نحو 210 كغم، وسعة حمل نحو 490 كجم، وسرعة قصوى قريبة من 13 كم/ساعة — مستمدة من أوصاف البرنامج التقني للعربة القمرية وتؤيد هذا السجل الخاص بالمهمة."
      },
      model: "conceptual",
      modelKind: "lrv",
      modelNote: {
        en: "Conceptual model of the Lunar Roving Vehicle. The three vehicles shared a single design; wheel construction, seating and instrument details are simplified and are not an engineering reconstruction.",
        ar: "نموذج تصوري للعربة القمرية. تشتركت العربات الثلاث في تصميم واحد؛ وتفاصيل العجلات والمقاعد والأجهزة مبسطة، وليست إعادة بناء هندسية."
      },
      components: [
        { anchor: [0, 0.15, 0.8], name: { en: "Chassis", ar: "الهيكل" }, description: { en: "The central frame carried the seats, controls and payload. It was folded inside the Lunar Module descent stage and deployed with cables, pulleys, reels and springs.", ar: "حمل الإطار المركزي المقاعد وأدوات التحكم والحمل. وتم طيّه داخل مرحلة هبوط المركبة القمرية ونشره باستخدام كابلات وبكرات ومقابض ومرسّيات." } },
        { anchor: [1.35, -0.45, 0.6], name: { en: "Wheels", ar: "العجلات" }, description: { en: "Four independently powered wheels used spun-aluminum hubs, flexible steel-wire mesh tires and titanium treads to cross the lunar soil. The model uses simplified spoked wheels.", ar: "استُخدمت أربع عجلات مستقلة الدفع بمراكز من الألمنيوم الدوار وإطارات شبكية من سلك الفولاذ المرن وأقدام من التيتانيوم لعبور ترب القمر. يستخدم النموذج عجلات مبسطة ذات أسلاك." } },
        { anchor: [-0.35, 0.62, 0.15], name: { en: "Seats and controls", ar: "المقاعد وأدوات التحكم" }, description: { en: "Two seats and a T-shaped hand controller let the crew steer, brake, reverse and manage the rover while driving.", ar: "يتيح مقعدان وعصا تحكم على شكل T للطاقم التوجيه والفرملة والانعكاس وإدارة العربة أثناء القيادة." } },
        { anchor: [0.45, 0.95, -0.4], name: { en: "Power and drive system", ar: "نظام الطاقة والتشغيل" }, description: { en: "Two 36-volt silver-zinc batteries supplied the electric motors, which delivered about one horsepower total for the four-wheel drive train.", ar: "زوّدت بطاريتان من نوع الفضة-الزنك بجهد 36 فولت المحركات الكهربائية، التي أمدّت نظام الدفع بأربع عجلات بقوة إجمالية تبلغ نحو حصان واحد." } },
        { anchor: [-0.9, 0.05, 0.75], name: { en: "Fenders and tool carriers", ar: "الواقيات وحاملات الأدوات" }, description: { en: "Fenders and carriers kept tools, cameras and samples safe during traverses. Small fittings are conceptual.", ar: "حافظت الواقيات والحاملات على الأدوات والكاميرات والعينات أثناء الجولات. التركيبات الصغيرة تصورية." } }
      ],
      related: ["MOON-AP15-LMDS", "MOON-AP15-LRRR", "MOON-ALSEP"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo 15 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo15info.html" },
        { title: "The Apollo Lunar Roving Vehicle — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_lrv.html" },
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" }
      ],
      events: [
        { date: "1971-07-30", title: "Apollo 15 lunar landing", titleAr: "هبوط أبولو 15 على القمر", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo15info.html" }
      ]
    },
    {
      id: "MOON-SURV3-HULL",
      name: {
        en: "Surveyor 3 remaining lander structure",
        ar: "الهيكل المتبقي من مركبة سيرفيور 3"
      },
      mission: "Surveyor 3",
      missionAr: "سيرفيور 3",
      missionId: "SURVEYOR-3",
      missionLabel: { en: "Surveyor 3", ar: "سيرفيور 3" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Robotic lunar lander structure",
      typeAr: "هيكل مركبة هبوط قمرية آلية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; selected components recovered by Apollo 12",
      operationalStatusAr: "انتهت المهمة؛ واستُعيدت مكونات مختارة عبر أبولو 12",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Surveyor Crater, Oceanus Procellarum (Ocean of Storms)",
      locationAr: "فوهة سيرفيور، محيط العواصف",
      lat: -3.0162,
      lon: -23.418,
      locationConfidence: "NASA NSSDC LRO-determined Surveyor 3 landing coordinate (3.0162°S, 23.418°W). It locates the lander site, not a survey of the remaining structure.",
      locationConfidenceAr: "إحداثي هبوط سيرفيور 3 المحدد من صور LRO وفق NASA NSSDC (3.0162° جنوباً، 23.418° غرباً). يحدد موقع الهبوط، وليس مسحاً للهيكل المتبقي.",
      markerLabel: "Surveyor 3 landing site — lander remains",
      markerLabelAr: "موقع هبوط سيرفيور 3 — الهيكل المتبقي",
      story: {
        en: "Apollo 12 astronauts examined Surveyor 3 and returned its television camera and several other pieces to Earth. This record refers only to the remaining lander structure; returned components are distinct physical objects and are not represented as remaining on the Moon.",
        ar: "فحص رواد أبولو 12 مركبة سيرفيور 3 وأعادوا كاميرا التلفزيون وأجزاء أخرى إلى الأرض. يشير هذا السجل إلى الهيكل المتبقي فقط؛ أما المكونات المستعادة فهي أجسام منفصلة ولا تُعرض على أنها باقية على القمر."
      },
      then: "Soft-landed in 1967",
      thenAr: "هبطت بسلام عام 1967",
      missionStory: "Robotic lunar surface mission that tested the bearing strength of the lunar surface.",
      missionStoryAr: "مهمة آلية إلى سطح القمر اختبرت قدرة السطح على تحمل الأوزان.",
      now: "Remaining structure left at the site; selected components were recovered.",
      nowAr: "الهيكل المتبقي في الموقع؛ واستُعيدت مكونات مختارة.",
      significance: {
        en: "Surveyor 3 was the second Surveyor to soft-land on the Moon. Its surface-sampling tests helped show that the lunar surface could support an Apollo lunar module, and Apollo 12 later visited the site.",
        ar: "كانت سيرفيور 3 ثاني مركبة من سلسلة سيرفيور تهبط بسلام على القمر. ساعدت اختبارات أخذ العينات السطحية في إظهار قدرة السطح على حمل مركبة أبولو القمرية، وزار موقعها لاحقاً طاقم أبولو 12."
      },
      evidence: {
        en: "NASA NSSDC's Surveyor 3 page gives the LRO-determined landing coordinate, the landing date and the Apollo 12 visit that removed about 10 kg of parts. NASA Science's Surveyor 3 page and the Apollo 12 and Surveyor 3 source document the mission and the recovery. The plotted coordinate locates the lander site, not a measured outline of the remaining hardware.",
        ar: "تقدم صفحة سيرفيور 3 لدى NASA NSSDC إحداثي الهبوط المحدد من صور LRO وتاريخ الهبوط وزيارة أبولو 12 التي أزالت نحو 10 كغ من الأجزاء. وتوثق صفحة سيرفيور 3 من NASA Science ومصدر أبولو 12 وسيرفيور 3 المهمة والاستعادة. يحدد الإحداثي المعروض موقع الهبوط، وليس قياساً لحدود العتاد المتبقي."
      },
      model: "conceptual",
      modelKind: "surveyor-lander",
      modelNote: {
        en: "Conceptual reconstruction of the lander's recognizable structure. The camera and sampled parts are shown only as mount points because those components were removed.",
        ar: "إعادة بناء تصورية للبنية المميزة للمركبة. تظهر الكاميرا والأجزاء المستعادة كمواضع تركيب فقط لأنها أُزيلت."
      },
      components: [
        { anchor: [0, 0.15, 0.55], name: { en: "Lander bus", ar: "جسم المركبة" }, description: { en: "The central structure housed the lander's systems. Its box-like form is simplified.", ar: "ضمّ الهيكل المركزي أنظمة المركبة. شكله الصندوقي مبسط." } },
        { anchor: [0, 0.75, 0.1], name: { en: "Solar panel", ar: "اللوح الشمسي" }, description: { en: "A solar panel supplied power during the surface mission. The model shows a single flat panel.", ar: "وفّر لوح شمسي الطاقة خلال المهمة السطحية. يعرض النموذج لوحاً مسطحاً واحداً." } },
        { anchor: [-1.1, -0.5, 0.35], name: { en: "Landing legs", ar: "أرجل الهبوط" }, description: { en: "Three legs with footpads stabilized the lander on the surface.", ar: "ثبّتت ثلاث أرجل بقواعدها المركبة على السطح." } },
        { anchor: [0.45, 0.55, -0.15], name: { en: "Camera mast", ar: "حامل الكاميرا" }, description: { en: "The television camera was mounted here before Apollo 12 removed it. The mount is shown, not the recovered camera.", ar: "ثُبتت كاميرا التلفزيون هنا قبل أن يزيلها طاقم أبولو 12. يظهر الحامل، وليس الكاميرا المستعادة." } },
        { anchor: [-0.45, 0.3, -0.45], name: { en: "Omni antenna", ar: "الهوائي متعدد الاتجاهات" }, description: { en: "Communications hardware supported the mission. The model uses a simplified mast and dish.", ar: "دعمت معدات الاتصالات المهمة. يستخدم النموذج سارية وطبقاً مبسطين." } }
      ],
      related: ["MOON-SURV3-TV-CAMERA", "MOON-AP12-LMDS"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A",
      sources: [
        { title: "Surveyor 3 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A" },
        { title: "Surveyor 3 — NASA Science", url: "https://science.nasa.gov/mission/surveyor-3/" },
        { title: "Apollo 12 and Surveyor 3 — NASA Science", url: "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/" }
      ],
      events: [
        { date: "1967-04-20", title: "Surveyor 3 soft-lands on the Moon", titleAr: "هبوط سيرفيور 3 بسلام على القمر", source: "https://science.nasa.gov/mission/surveyor-3/" }
      ]
    },
    {
      id: "MOON-SURV3-TV-CAMERA",
      name: {
        en: "Surveyor 3 television camera (recovered)",
        ar: "كاميرا التلفزيون المستعادة من سيرفيور 3"
      },
      mission: "Surveyor 3 / Apollo 12 recovery",
      missionAr: "سيرفيور 3 / استعادة أبولو 12",
      missionId: "SURVEYOR-3",
      missionLabel: { en: "Surveyor 3", ar: "سيرفيور 3" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "component",
      type: "Recovered television camera",
      typeAr: "كاميرا تلفزيون مستعادة",
      status: "RECOVERED",
      operationalStatus: "Surveyor 3 mission ended; component recovered by Apollo 12",
      operationalStatusAr: "انتهت مهمة سيرفيور 3؛ واستُعيد المكوّن عبر أبولو 12",
      mode: "Recovered hardware",
      modeAr: "عتاد مستعاد",
      location: "Returned to Earth; NASA NSSDC records it on display at the Smithsonian National Air and Space Museum",
      locationAr: "أُعيدت إلى الأرض؛ ويسجل NASA NSSDC عرضها في متحف سميثسونيان الوطني للطيران والفضاء",
      lat: null,
      lon: null,
      locationConfidence: "Recovery and return are documented. NASA NSSDC states the camera is now on display in the Smithsonian National Air and Space Museum, Washington, D.C.",
      locationConfidenceAr: "الاستعادة والإعادة موثقتان. ويذكر NASA NSSDC أن الكاميرا معروضة الآن في متحف سميثسونيان الوطني للطيران والفضاء، واشنطن العاصمة.",
      story: {
        en: "Apollo 12 astronauts removed Surveyor 3's television camera and returned it to Earth for examination after prolonged lunar exposure. This is a recovered component record, separate from the lander structure left on the Moon.",
        ar: "أزال رواد أبولو 12 كاميرا التلفزيون من سيرفيور 3 وأعادوها إلى الأرض لفحصها بعد تعرض مطوّل للبيئة القمرية. هذا سجل لمكوّن مستعاد، منفصل عن هيكل المركبة المتروك على القمر."
      },
      then: "Surveyor 3 imaging hardware",
      thenAr: "معدات تصوير سيرفيور 3",
      missionStory: "Returned by Apollo 12 for examination.",
      missionStoryAr: "أعادها طاقم أبولو 12 لفحصها.",
      now: "Recovered to Earth; NASA NSSDC records it on display at the Smithsonian National Air and Space Museum.",
      nowAr: "مستعادة إلى الأرض؛ ويسجل NASA NSSDC عرضها في متحف سميثسونيان الوطني للطيران والفضاء.",
      significance: {
        en: "The camera is a recovered component of a robotic lunar lander. Its return let engineers examine hardware that had been exposed to the lunar environment, and it remains a separate object from the structure left at the site.",
        ar: "الكاميرا مكوّن مستعاد من مركبة هبوط قمرية آلية. أتاحت إعادتها للمهندسين فحص عتاد تعرض للبيئة القمرية، وهي جسم منفصل عن الهيكل المتروك في الموقع."
      },
      evidence: {
        en: "NASA Science's Apollo 12 and Surveyor 3 page documents the visit and the removal of the camera. The NASA NSSDC Surveyor 3 page records that the astronauts removed about 10 kg of parts, including the television camera, and states that the camera is now on display in the Smithsonian National Air and Space Museum.",
        ar: "توثق صفحة أبولو 12 وسيرفيور 3 من NASA Science الزيارة وإزالة الكاميرا. وتسجل صفحة سيرفيور 3 لدى NASA NSSDC أن الرواد أزالوا نحو 10 كغ من الأجزاء، من بينها كاميرا التلفزيون، وتذكر أن الكاميرا معروضة الآن في متحف سميثسونيان الوطني للطيران والفضاء."
      },
      model: "conceptual",
      modelKind: "surveyor-camera",
      modelNote: {
        en: "Conceptual model of the recovered camera. The lens assembly and housing are simplified; dimensions are not engineering data.",
        ar: "نموذج تصوري للكاميرا المستعادة. مبسط لمجموعة العدسة والغلاف؛ والأبعاد ليست بيانات هندسية."
      },
      components: [
        { anchor: [0, 0.1, 0.35], name: { en: "Camera body", ar: "جسم الكاميرا" }, description: { en: "The main housing contained the camera's electronics and imaging hardware.", ar: "ضمّ الغلاف الرئيسي إلكترونيات الكاميرا ومعدات التصوير." } },
        { anchor: [0, 0.1, 0.75], name: { en: "Lens assembly", ar: "مجموعة العدسة" }, description: { en: "The lens and barrel faced the lunar surface. The model simplifies their internal structure.", ar: "واجهت العدسة والأنبوب سطح القمر. يبسط النموذج بنيتها الداخلية." } },
        { anchor: [0.35, 0.1, 0.45], name: { en: "Sunshade", ar: "واقي الشمس" }, description: { en: "A shade limited stray light. Its exact profile is conceptual.", ar: "حدّ الواقي من الضوء المتشتت. ملفه الدقيق تصوري." } },
        { anchor: [-0.35, -0.05, 0.2], name: { en: "Mounting bracket", ar: "حامل التثبيت" }, description: { en: "The bracket attached the camera to the lander before removal.", ar: "ربط الحامل الكاميرا بالمركبة قبل إزالتها." } }
      ],
      related: ["MOON-SURV3-HULL", "MOON-AP12-LMDS"],
      coordinateSource: "https://science.nasa.gov/mission/surveyor-3/",
      sources: [
        { title: "Surveyor 3 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-035A" },
        { title: "Surveyor 3 — NASA Science", url: "https://science.nasa.gov/mission/surveyor-3/" },
        { title: "Apollo 12 and Surveyor 3 — NASA Science", url: "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/" }
      ],
      events: [
        { date: "1969-11-20", title: "Apollo 12 retrieves the Surveyor 3 camera", titleAr: "أبولو 12 تستعيد كاميرا سيرفيور 3", source: "https://science.nasa.gov/resource/apollo-12-and-surveyor-3/" }
      ]
    },
    {
      id: "MOON-AP12-LMDS",
      name: {
        en: "Apollo 12 Intrepid descent stage",
        ar: "مرحلة الهبوط «إنتريبيد» — أبولو 12"
      },
      mission: "Apollo 12",
      missionAr: "أبولو 12",
      missionId: "APOLLO-12",
      missionLabel: { en: "Apollo 12", ar: "أبولو 12" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Lunar Module descent stage",
      typeAr: "مرحلة هبوط المركبة القمرية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the descent stage remains at the landing site",
      operationalStatusAr: "انتهت المهمة؛ وتبقى مرحلة الهبوط في موقع الهبوط",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Apollo 12 landing point, Oceanus Procellarum (Ocean of Storms)",
      locationAr: "موقع هبوط أبولو 12، محيط العواصف",
      lat: -3.0128,
      lon: -23.4219,
      locationConfidence: "NASA NSSDC Apollo 12 Lunar Module landing coordinate (3.0128°S, 23.4219°W), about 180 m from Surveyor 3. It locates the LM site, not a survey of the descent stage's outline.",
      locationConfidenceAr: "إحداثي هبوط المركبة القمرية لأبولو 12 وفق NASA NSSDC (3.0128° جنوباً، 23.4219° غرباً)، على نحو 180 متراً من سيرفيور 3. يحدد موقع المركبة القمرية، وليس مسحاً لحدود مرحلة الهبوط.",
      markerLabel: "Apollo 12 Lunar Module landing coordinate — descent stage vicinity",
      markerLabelAr: "إحداثي هبوط مركبة أبولو 12 القمرية — نطاق مرحلة الهبوط",
      story: {
        en: "The descent stage stayed on the Moon after Intrepid's ascent stage carried the crew back to lunar orbit. The ascent stage was later deliberately impacted; the descent stage remains at the Ocean of Storms site, about 180 m from Surveyor 3.",
        ar: "بقيت مرحلة الهبوط على سطح القمر بعد أن حملت مرحلة صعود «إنتريبيد» الطاقم عائداً إلى المدار القمري. اصطدمت مرحلة الصعود لاحقاً عمداً؛ وتبقى مرحلة الهبوط في موقع محيط العواصف، على نحو 180 متراً من سيرفيور 3."
      },
      then: "Descent stage of Intrepid",
      thenAr: "مرحلة هبوط «إنتريبيد»",
      missionStory: "Carried the crew and equipment to the lunar surface; the ascent stage then lifted off.",
      missionStoryAr: "حملت الطاقم والمعدات إلى سطح القمر، ثم انطلقت مرحلة الصعود.",
      now: "Remains on the lunar surface at the Apollo 12 site; the mission is over.",
      nowAr: "لا تزال على سطح القمر في موقع أبولو 12؛ وقد انتهت المهمة.",
      significance: {
        en: "The descent stage is the surviving surface element of the Apollo 12 landing. Its site is also where astronauts examined another spacecraft on the Moon, Surveyor 3.",
        ar: "مرحلة الهبوط هي العنصر السطحي الباقي من هبوط أبولو 12. وفي موقعها فحص رواد الفضاء مركبة أخرى على القمر، سيرفيور 3."
      },
      evidence: {
        en: "The NSSDC Apollo 12 Lunar Module page states that the descent stage was left behind on the Moon and gives the landing coordinate; the NSSDC landing-site table lists the same LM coordinate. The page also records the later deliberate impact of the ascent stage.",
        ar: "تذكر صفحة المركبة القمرية لأبولو 12 لدى NASA NSSDC أن مرحلة الهبوط تُركت على القمر وتعطي إحداثي الهبوط؛ ويسرد جدول مواقع الهبوط إحداثي المركبة نفسه. وتسجل الصفحة أيضاً الاصطدام المتعمد اللاحق لمرحلة الصعود."
      },
      model: "conceptual",
      modelKind: "lm-descent",
      modelNote: {
        en: "Conceptual assembly based on published Apollo Lunar Module descriptions. It shows the recognizable descent-stage structure; it is not an engineering-accurate reconstruction.",
        ar: "تجميع تصوري مستند إلى أوصاف منشورة للمركبة القمرية في برنامج أبولو. يوضح بنية مرحلة الهبوط المميزة، وليس إعادة بناء هندسية دقيقة."
      },
      components: [
        { anchor: [0, 0.15, 1.05], name: { en: "Descent-stage structure", ar: "بنية مرحلة الهبوط" }, description: { en: "The central body that carried the descent engine, propellant and equipment. Shown conceptually.", ar: "الجسم المركزي الذي حمل محرك الهبوط والوقود والمعدات. معروض بشكل تصوري." } },
        { anchor: [1.5, -0.55, 0.55], name: { en: "Landing legs and footpads", ar: "أرجل الهبوط وقواعدها" }, description: { en: "Four legs absorbed the landing load and kept the stage stable. The model simplifies their struts.", ar: "أربع أرجل امتصت حمل الهبوط وأبقت المرحلة مستقرة. يبسط النموذج تفاصيل الدعامات." } },
        { anchor: [0, -1.25, 0.1], name: { en: "Descent engine bell", ar: "فوهة محرك الهبوط" }, description: { en: "The large engine at the base performed the powered descent. Its bell is represented as a simplified cone.", ar: "المحرك الكبير في القاعدة نفّذ الهبوط المدفوع. تُمثَّل فوهته بمخروط مبسط." } },
        { anchor: [-1.55, -0.35, 0.75], name: { en: "Ladder and porch", ar: "السلّم والشرفة" }, description: { en: "The crew used the ladder and porch to step from the ascent stage onto the surface.", ar: "استخدم الطاقم السلّم والشرفة للنزول من مرحلة الصعود إلى السطح." } },
        { anchor: [0, 0.55, 1.15], name: { en: "Thermal blanket", ar: "الغلاف الحراري" }, description: { en: "The model represents the stage's gold-toned insulation as a single simplified foil surface.", ar: "يمثّل النموذج عزل المرحلة الذهبي بسطح ورق مبسط واحد." } }
      ],
      related: ["MOON-SURV3-HULL", "MOON-SURV3-TV-CAMERA"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Apollo 12 Lunar Module — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-099C" },
        { title: "Apollo 12 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo12info.html" }
      ],
      events: [
        { date: "1969-11-19", title: "Apollo 12 lunar landing", titleAr: "هبوط أبولو 12 على القمر", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo12info.html" }
      ]
    },
    {
      id: "MOON-AP14-LMDS",
      name: {
        en: "Apollo 14 Antares descent stage",
        ar: "مرحلة الهبوط «أنتاريس» — أبولو 14"
      },
      mission: "Apollo 14",
      missionAr: "أبولو 14",
      missionId: "APOLLO-14",
      missionLabel: { en: "Apollo 14", ar: "أبولو 14" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Lunar Module descent stage",
      typeAr: "مرحلة هبوط المركبة القمرية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the descent stage remains at the landing site",
      operationalStatusAr: "انتهت المهمة؛ وتبقى مرحلة الهبوط في موقع الهبوط",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Apollo 14 landing point, Fra Mauro highlands",
      locationAr: "موقع هبوط أبولو 14، مرتفعات فرا مورو",
      lat: -3.64589,
      lon: -17.47194,
      locationConfidence: "NASA NSSDC Apollo 14 Lunar Module landing coordinate (3.64589°S, 17.47194°W). It locates the LM site, not a survey of the descent stage's outline.",
      locationConfidenceAr: "إحداثي هبوط المركبة القمرية لأبولو 14 وفق NASA NSSDC (3.64589° جنوباً، 17.47194° غرباً). يحدد موقع المركبة القمرية، وليس مسحاً لحدود مرحلة الهبوط.",
      markerLabel: "Apollo 14 Lunar Module landing coordinate — descent stage vicinity",
      markerLabelAr: "إحداثي هبوط مركبة أبولو 14 القمرية — نطاق مرحلة الهبوط",
      story: {
        en: "The descent stage stayed on the Moon after Antares's ascent stage carried the crew back to lunar orbit. The ascent stage was later deliberately impacted; the descent stage remains at the Fra Mauro site.",
        ar: "بقيت مرحلة الهبوط على سطح القمر بعد أن حملت مرحلة صعود «أنتاريس» الطاقم عائداً إلى المدار القمري. اصطدمت مرحلة الصعود لاحقاً عمداً؛ وتبقى مرحلة الهبوط في موقع فرا مورو."
      },
      then: "Descent stage of Antares",
      thenAr: "مرحلة هبوط «أنتاريس»",
      missionStory: "Carried the crew and equipment to the Fra Mauro highlands; the ascent stage then lifted off.",
      missionStoryAr: "حملت الطاقم والمعدات إلى مرتفعات فرا مورو، ثم انطلقت مرحلة الصعود.",
      now: "Remains on the lunar surface at the Fra Mauro site; the mission is over.",
      nowAr: "لا تزال على سطح القمر في موقع فرا مورو؛ وقد انتهت المهمة.",
      significance: {
        en: "The descent stage is the surviving surface element of the Apollo 14 landing, the first crewed landing in the lunar highlands. The mission also deployed the Apollo 14 retroreflector.",
        ar: "مرحلة الهبوط هي العنصر السطحي الباقي من هبوط أبولو 14، أول هبوط مأهول في المرتفعات القمرية. ونشرت المهمة أيضاً عاكس أبولو 14."
      },
      evidence: {
        en: "The NSSDC Apollo 14 Lunar Module page states that the descent stage was left behind on the Moon and gives the landing coordinate; the NSSDC landing-site table lists the same LM coordinate. The page records the ascent stage's later impact.",
        ar: "تذكر صفحة المركبة القمرية لأبولو 14 لدى NASA NSSDC أن مرحلة الهبوط تُركت على القمر وتعطي إحداثي الهبوط؛ ويسرد جدول مواقع الهبوط إحداثي المركبة نفسه. وتسجل الصفحة اصطدام مرحلة الصعود لاحقاً."
      },
      model: "conceptual",
      modelKind: "lm-descent",
      modelNote: {
        en: "Conceptual assembly based on published Apollo Lunar Module descriptions. It shows the recognizable descent-stage structure; it is not an engineering-accurate reconstruction.",
        ar: "تجميع تصوري مستند إلى أوصاف منشورة للمركبة القمرية في برنامج أبولو. يوضح بنية مرحلة الهبوط المميزة، وليس إعادة بناء هندسية دقيقة."
      },
      components: [
        { anchor: [0, 0.15, 1.05], name: { en: "Descent-stage structure", ar: "بنية مرحلة الهبوط" }, description: { en: "The central body that carried the descent engine, propellant and equipment. Shown conceptually.", ar: "الجسم المركزي الذي حمل محرك الهبوط والوقود والمعدات. معروض بشكل تصوري." } },
        { anchor: [1.5, -0.55, 0.55], name: { en: "Landing legs and footpads", ar: "أرجل الهبوط وقواعدها" }, description: { en: "Four legs absorbed the landing load and kept the stage stable. The model simplifies their struts.", ar: "أربع أرجل امتصت حمل الهبوط وأبقت المرحلة مستقرة. يبسط النموذج تفاصيل الدعامات." } },
        { anchor: [0, -1.25, 0.1], name: { en: "Descent engine bell", ar: "فوهة محرك الهبوط" }, description: { en: "The large engine at the base performed the powered descent. Its bell is represented as a simplified cone.", ar: "المحرك الكبير في القاعدة نفّذ الهبوط المدفوع. تُمثَّل فوهته بمخروط مبسط." } },
        { anchor: [-1.55, -0.35, 0.75], name: { en: "Ladder and porch", ar: "السلّم والشرفة" }, description: { en: "The crew used the ladder and porch to step from the ascent stage onto the surface.", ar: "استخدم الطاقم السلّم والشرفة للنزول من مرحلة الصعود إلى السطح." } },
        { anchor: [0, 0.55, 1.15], name: { en: "Thermal blanket", ar: "الغلاف الحراري" }, description: { en: "The model represents the stage's gold-toned insulation as a single simplified foil surface.", ar: "يمثّل النموذج عزل المرحلة الذهبي بسطح ورق مبسط واحد." } }
      ],
      related: ["MOON-AP14-LRRR"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Apollo 14 Lunar Module — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-008C" },
        { title: "Apollo 14 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo14info.html" }
      ],
      events: [
        { date: "1971-02-05", title: "Apollo 14 lunar landing", titleAr: "هبوط أبولو 14 على القمر", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo14info.html" }
      ]
    },
    {
      id: "MOON-AP15-LMDS",
      name: {
        en: "Apollo 15 Falcon descent stage",
        ar: "مرحلة الهبوط «فالكون» — أبولو 15"
      },
      mission: "Apollo 15",
      missionAr: "أبولو 15",
      missionId: "APOLLO-15",
      missionLabel: { en: "Apollo 15", ar: "أبولو 15" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Lunar Module descent stage",
      typeAr: "مرحلة هبوط المركبة القمرية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the descent stage remains at the landing site",
      operationalStatusAr: "انتهت المهمة؛ وتبقى مرحلة الهبوط في موقع الهبوط",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Apollo 15 landing point, Hadley–Apennine region, Mare Imbrium",
      locationAr: "موقع هبوط أبولو 15، منطقة هادلي–أبينين، بحر الأمطار",
      lat: 26.13239,
      lon: 3.6333,
      locationConfidence: "NASA NSSDC Apollo 15 Lunar Module landing coordinate (26.13239°N, 3.63330°E). It locates the LM site, not a survey of the descent stage's outline.",
      locationConfidenceAr: "إحداثي هبوط المركبة القمرية لأبولو 15 وفق NASA NSSDC (26.13239° شمالاً، 3.63330° شرقاً). يحدد موقع المركبة القمرية، وليس مسحاً لحدود مرحلة الهبوط.",
      markerLabel: "Apollo 15 Lunar Module landing coordinate — descent stage vicinity",
      markerLabelAr: "إحداثي هبوط مركبة أبولو 15 القمرية — نطاق مرحلة الهبوط",
      story: {
        en: "The descent stage stayed on the Moon after Falcon's ascent stage carried the crew back to lunar orbit. The ascent stage was later deliberately impacted; the descent stage remains at the Hadley–Apennine site with the mission's surface hardware.",
        ar: "بقيت مرحلة الهبوط على سطح القمر بعد أن حملت مرحلة صعود «فالكون» الطاقم عائداً إلى المدار القمري. اصطدمت مرحلة الصعود لاحقاً عمداً؛ وتبقى مرحلة الهبوط في موقع هادلي–أبينين مع عتاد المهمة السطحي."
      },
      then: "Descent stage of Falcon",
      thenAr: "مرحلة هبوط «فالكون»",
      missionStory: "Carried the crew, the Lunar Roving Vehicle and equipment to the lunar surface; the ascent stage then lifted off.",
      missionStoryAr: "حملت الطاقم والعربة القمرية والمعدات إلى سطح القمر، ثم انطلقت مرحلة الصعود.",
      now: "Remains on the lunar surface at the Hadley–Apennine site; the mission is over.",
      nowAr: "لا تزال على سطح القمر في موقع هادلي–أبينين؛ وقد انتهت المهمة.",
      significance: {
        en: "The descent stage is the surviving surface element of the Apollo 15 landing. It carried the first Lunar Roving Vehicle used on the Moon, which extended the crew's surface range.",
        ar: "مرحلة الهبوط هي العنصر السطحي الباقي من هبوط أبولو 15. وقد حملت أول عربة قمرية تُستخدم على القمر، فوسّعت نطاق حركة الطاقم على السطح."
      },
      evidence: {
        en: "The NSSDC Apollo 15 Lunar Module page states that the descent stage was left behind and gives the landing coordinate; the NSSDC landing-site table lists the same LM coordinate. The page records the ascent stage's later impact.",
        ar: "تذكر صفحة المركبة القمرية لأبولو 15 لدى NASA NSSDC أن مرحلة الهبوط تُركت على القمر وتعطي إحداثي الهبوط؛ ويسرد جدول مواقع الهبوط إحداثي المركبة نفسه. وتسجل الصفحة اصطدام مرحلة الصعود لاحقاً."
      },
      model: "conceptual",
      modelKind: "lm-descent",
      modelNote: {
        en: "Conceptual assembly based on published Apollo Lunar Module descriptions. It shows the recognizable descent-stage structure; it is not an engineering-accurate reconstruction.",
        ar: "تجميع تصوري مستند إلى أوصاف منشورة للمركبة القمرية في برنامج أبولو. يوضح بنية مرحلة الهبوط المميزة، وليس إعادة بناء هندسية دقيقة."
      },
      components: [
        { anchor: [0, 0.15, 1.05], name: { en: "Descent-stage structure", ar: "بنية مرحلة الهبوط" }, description: { en: "The central body that carried the descent engine, propellant and equipment. Shown conceptually.", ar: "الجسم المركزي الذي حمل محرك الهبوط والوقود والمعدات. معروض بشكل تصوري." } },
        { anchor: [1.5, -0.55, 0.55], name: { en: "Landing legs and footpads", ar: "أرجل الهبوط وقواعدها" }, description: { en: "Four legs absorbed the landing load and kept the stage stable. The model simplifies their struts.", ar: "أربع أرجل امتصت حمل الهبوط وأبقت المرحلة مستقرة. يبسط النموذج تفاصيل الدعامات." } },
        { anchor: [0, -1.25, 0.1], name: { en: "Descent engine bell", ar: "فوهة محرك الهبوط" }, description: { en: "The large engine at the base performed the powered descent. Its bell is represented as a simplified cone.", ar: "المحرك الكبير في القاعدة نفّذ الهبوط المدفوع. تُمثَّل فوهته بمخروط مبسط." } },
        { anchor: [-1.55, -0.35, 0.75], name: { en: "Ladder and porch", ar: "السلّم والشرفة" }, description: { en: "The crew used the ladder and porch to step from the ascent stage onto the surface.", ar: "استخدم الطاقم السلّم والشرفة للنزول من مرحلة الصعود إلى السطح." } },
        { anchor: [0, 0.55, 1.15], name: { en: "Thermal blanket", ar: "الغلاف الحراري" }, description: { en: "The model represents the stage's gold-toned insulation as a single simplified foil surface.", ar: "يمثّل النموذج عزل المرحلة الذهبي بسطح ورق مبسط واحد." } }
      ],
      related: ["MOON-AP15-LRV", "MOON-AP15-LRRR"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Apollo 15 Lunar Module — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C" },
        { title: "Apollo 15 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo15info.html" }
      ],
      events: [
        { date: "1971-08-02", title: "Apollo 15 ascent stage departs; descent stage remains", titleAr: "انطلاق مرحلة صعود أبولو 15 وبقاء مرحلة الهبوط", source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1971-063C" }
      ]
    },
    {
      id: "MOON-AP16-LMDS",
      name: {
        en: "Apollo 16 Orion descent stage",
        ar: "مرحلة الهبوط «أوريون» — أبولو 16"
      },
      mission: "Apollo 16",
      missionAr: "أبولو 16",
      missionId: "APOLLO-16",
      missionLabel: { en: "Apollo 16", ar: "أبولو 16" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Lunar Module descent stage",
      typeAr: "مرحلة هبوط المركبة القمرية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the descent stage remains at the landing site",
      operationalStatusAr: "انتهت المهمة؛ وتبقى مرحلة الهبوط في موقع الهبوط",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Apollo 16 landing point, Descartes highlands",
      locationAr: "موقع هبوط أبولو 16، مرتفعات ديكارت",
      lat: -8.9734,
      lon: 15.5011,
      locationConfidence: "NASA NSSDC Apollo landing-site coordinate table (8.9734°S, 15.5011°E). The NSSDC spacecraft page gives 8.9730°S, 15.5002°E in the IAU frame; the table value is used for consistency with the other Apollo records. Neither is a survey of the descent stage's outline.",
      locationConfidenceAr: "إحداثي موقع هبوط أبولو 16 وفق جدول NASA NSSDC (8.9734° جنوباً، 15.5011° شرقاً). وتعطي صفحة المركبة القمرية 8.9730° جنوباً، 15.5002° شرقاً في إطار IAU؛ وتُستخدم قيمة الجدول للاتساق مع سجلات أبولو الأخرى. ولا يمثل أي منهما مسحاً لحدود مرحلة الهبوط.",
      markerLabel: "Apollo 16 Lunar Module landing coordinate — descent stage vicinity",
      markerLabelAr: "إحداثي هبوط مركبة أبولو 16 القمرية — نطاق مرحلة الهبوط",
      story: {
        en: "The descent stage stayed on the Moon after Orion's ascent stage carried the crew back to lunar orbit. The ascent stage was jettisoned into lunar orbit after loss of attitude control; the descent stage remains at the Descartes site.",
        ar: "بقيت مرحلة الهبوط على سطح القمر بعد أن حملت مرحلة صعود «أوريون» الطاقم عائداً إلى المدار القمري. تُركت مرحلة الصعود في مدار قمري بعد فقدان التحكم في الاتجاه؛ وتبقى مرحلة الهبوط في موقع ديكارت."
      },
      then: "Descent stage of Orion",
      thenAr: "مرحلة هبوط «أوريون»",
      missionStory: "Carried the crew and equipment to the Descartes highlands; the ascent stage then lifted off.",
      missionStoryAr: "حملت الطاقم والمعدات إلى مرتفعات ديكارت، ثم انطلقت مرحلة الصعود.",
      now: "Remains on the lunar surface at the Descartes site; the mission is over.",
      nowAr: "لا تزال على سطح القمر في موقع ديكارت؛ وقد انتهت المهمة.",
      significance: {
        en: "The descent stage is the surviving surface element of the Apollo 16 landing, the only Apollo mission to land in the Descartes highlands. Its site preserves hardware from the next-to-last crewed lunar landing.",
        ar: "مرحلة الهبوط هي العنصر السطحي الباقي من هبوط أبولو 16، المهمة الوحيدة من أبولو التي هبطت في مرتفعات ديكارت. ويحفظ موقعها عتاداً من الهبوط المأهول قبل الأخير على القمر."
      },
      evidence: {
        en: "The NSSDC Apollo 16 Lunar Module page states that the descent stage was left behind and gives the landing coordinate; the NSSDC landing-site table lists the same site. The page records that the ascent stage was left in lunar orbit after loss of attitude control, not deliberately impacted.",
        ar: "تذكر صفحة المركبة القمرية لأبولو 16 لدى NASA NSSDC أن مرحلة الهبوط تُركت على القمر وتعطي إحداثي الهبوط؛ ويسرد جدول مواقع الهبوط الموقع نفسه. وتسجل الصفحة أن مرحلة الصعود تُركت في مدار قمري بعد فقدان التحكم في الاتجاه، ولم تصطدم عمداً."
      },
      model: "conceptual",
      modelKind: "lm-descent",
      modelNote: {
        en: "Conceptual assembly based on published Apollo Lunar Module descriptions. It shows the recognizable descent-stage structure; it is not an engineering-accurate reconstruction.",
        ar: "تجميع تصوري مستند إلى أوصاف منشورة للمركبة القمرية في برنامج أبولو. يوضح بنية مرحلة الهبوط المميزة، وليس إعادة بناء هندسية دقيقة."
      },
      components: [
        { anchor: [0, 0.15, 1.05], name: { en: "Descent-stage structure", ar: "بنية مرحلة الهبوط" }, description: { en: "The central body that carried the descent engine, propellant and equipment. Shown conceptually.", ar: "الجسم المركزي الذي حمل محرك الهبوط والوقود والمعدات. معروض بشكل تصوري." } },
        { anchor: [1.5, -0.55, 0.55], name: { en: "Landing legs and footpads", ar: "أرجل الهبوط وقواعدها" }, description: { en: "Four legs absorbed the landing load and kept the stage stable. The model simplifies their struts.", ar: "أربع أرجل امتصت حمل الهبوط وأبقت المرحلة مستقرة. يبسط النموذج تفاصيل الدعامات." } },
        { anchor: [0, -1.25, 0.1], name: { en: "Descent engine bell", ar: "فوهة محرك الهبوط" }, description: { en: "The large engine at the base performed the powered descent. Its bell is represented as a simplified cone.", ar: "المحرك الكبير في القاعدة نفّذ الهبوط المدفوع. تُمثَّل فوهته بمخروط مبسط." } },
        { anchor: [-1.55, -0.35, 0.75], name: { en: "Ladder and porch", ar: "السلّم والشرفة" }, description: { en: "The crew used the ladder and porch to step from the ascent stage onto the surface.", ar: "استخدم الطاقم السلّم والشرفة للنزول من مرحلة الصعود إلى السطح." } },
        { anchor: [0, 0.55, 1.15], name: { en: "Thermal blanket", ar: "الغلاف الحراري" }, description: { en: "The model represents the stage's gold-toned insulation as a single simplified foil surface.", ar: "يمثّل النموذج عزل المرحلة الذهبي بسطح ورق مبسط واحد." } }
      ],
      related: [],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Apollo 16 Lunar Module — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-031C" },
        { title: "Apollo 16 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo16info.html" }
      ],
      events: [
        { date: "1972-04-21", title: "Apollo 16 lunar landing", titleAr: "هبوط أبولو 16 على القمر", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo16info.html" }
      ]
    },
    {
      id: "MOON-AP17-LMDS",
      name: {
        en: "Apollo 17 Challenger descent stage",
        ar: "مرحلة الهبوط «تشالنجر» — أبولو 17"
      },
      mission: "Apollo 17",
      missionAr: "أبولو 17",
      missionId: "APOLLO-17",
      missionLabel: { en: "Apollo 17", ar: "أبولو 17" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Lunar Module descent stage",
      typeAr: "مرحلة هبوط المركبة القمرية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the descent stage remains at the landing site",
      operationalStatusAr: "انتهت المهمة؛ وتبقى مرحلة الهبوط في موقع الهبوط",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Apollo 17 landing point, Taurus–Littrow valley",
      locationAr: "موقع هبوط أبولو 17، وادي تاوروس–ليترو",
      lat: 20.1911,
      lon: 30.7723,
      locationConfidence: "NASA NSSDC Apollo 17 Lunar Module landing coordinate (20.1911°N, 30.7723°E). It locates the LM site, not a survey of the descent stage's outline.",
      locationConfidenceAr: "إحداثي هبوط المركبة القمرية لأبولو 17 وفق NASA NSSDC (20.1911° شمالاً، 30.7723° شرقاً). يحدد موقع المركبة القمرية، وليس مسحاً لحدود مرحلة الهبوط.",
      markerLabel: "Apollo 17 Lunar Module landing coordinate — descent stage vicinity",
      markerLabelAr: "إحداثي هبوط مركبة أبولو 17 القمرية — نطاق مرحلة الهبوط",
      story: {
        en: "The descent stage stayed on the Moon after Challenger's ascent stage carried the crew back to lunar orbit. The ascent stage was later deliberately impacted; the descent stage remains at Taurus–Littrow.",
        ar: "بقيت مرحلة الهبوط على سطح القمر بعد أن حملت مرحلة صعود «تشالنجر» الطاقم عائداً إلى المدار القمري. اصطدمت مرحلة الصعود لاحقاً عمداً؛ وتبقى مرحلة الهبوط في وادي تاوروس–ليترو."
      },
      then: "Descent stage of Challenger",
      thenAr: "مرحلة هبوط «تشالنجر»",
      missionStory: "Carried the crew and equipment to Taurus–Littrow; the ascent stage then lifted off.",
      missionStoryAr: "حملت الطاقم والمعدات إلى وادي تاوروس–ليترو، ثم انطلقت مرحلة الصعود.",
      now: "Remains on the lunar surface at Taurus–Littrow; the mission is over.",
      nowAr: "لا تزال على سطح القمر في وادي تاوروس–ليترو؛ وقد انتهت المهمة.",
      significance: {
        en: "The descent stage is the surviving surface element of Apollo 17, the last crewed lunar landing. It remains at Taurus–Littrow with the mission's other surface hardware.",
        ar: "مرحلة الهبوط هي العنصر السطحي الباقي من أبولو 17، آخر هبوط مأهول على القمر. وتبقى في وادي تاوروس–ليترو مع عتاد المهمة السطحي الآخر."
      },
      evidence: {
        en: "The NSSDC Apollo 17 Lunar Module page states that the descent stage was left behind and gives the landing coordinate; the NSSDC landing-site table lists the same LM coordinate. The page records the ascent stage's later deliberate impact.",
        ar: "تذكر صفحة المركبة القمرية لأبولو 17 لدى NASA NSSDC أن مرحلة الهبوط تُركت على القمر وتعطي إحداثي الهبوط؛ ويسرد جدول مواقع الهبوط إحداثي المركبة نفسه. وتسجل الصفحة الاصطدام المتعمد اللاحق لمرحلة الصعود."
      },
      model: "conceptual",
      modelKind: "lm-descent",
      modelNote: {
        en: "Conceptual assembly based on published Apollo Lunar Module descriptions. It shows the recognizable descent-stage structure; it is not an engineering-accurate reconstruction.",
        ar: "تجميع تصوري مستند إلى أوصاف منشورة للمركبة القمرية في برنامج أبولو. يوضح بنية مرحلة الهبوط المميزة، وليس إعادة بناء هندسية دقيقة."
      },
      components: [
        { anchor: [0, 0.15, 1.05], name: { en: "Descent-stage structure", ar: "بنية مرحلة الهبوط" }, description: { en: "The central body that carried the descent engine, propellant and equipment. Shown conceptually.", ar: "الجسم المركزي الذي حمل محرك الهبوط والوقود والمعدات. معروض بشكل تصوري." } },
        { anchor: [1.5, -0.55, 0.55], name: { en: "Landing legs and footpads", ar: "أرجل الهبوط وقواعدها" }, description: { en: "Four legs absorbed the landing load and kept the stage stable. The model simplifies their struts.", ar: "أربع أرجل امتصت حمل الهبوط وأبقت المرحلة مستقرة. يبسط النموذج تفاصيل الدعامات." } },
        { anchor: [0, -1.25, 0.1], name: { en: "Descent engine bell", ar: "فوهة محرك الهبوط" }, description: { en: "The large engine at the base performed the powered descent. Its bell is represented as a simplified cone.", ar: "المحرك الكبير في القاعدة نفّذ الهبوط المدفوع. تُمثَّل فوهته بمخروط مبسط." } },
        { anchor: [-1.55, -0.35, 0.75], name: { en: "Ladder and porch", ar: "السلّم والشرفة" }, description: { en: "The crew used the ladder and porch to step from the ascent stage onto the surface.", ar: "استخدم الطاقم السلّم والشرفة للنزول من مرحلة الصعود إلى السطح." } },
        { anchor: [0, 0.55, 1.15], name: { en: "Thermal blanket", ar: "الغلاف الحراري" }, description: { en: "The model represents the stage's gold-toned insulation as a single simplified foil surface.", ar: "يمثّل النموذج عزل المرحلة الذهبي بسطح ورق مبسط واحد." } }
      ],
      related: [],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Apollo 17 Lunar Module — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1972-096C" },
        { title: "Apollo 17 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo17info.html" }
      ],
      events: [
        { date: "1972-12-11", title: "Apollo 17 lunar landing", titleAr: "هبوط أبولو 17 على القمر", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo17info.html" }
      ]
    },
    {
      id: "MOON-AP14-LRRR",
      name: {
        en: "Apollo 14 Lunar Laser Ranging Retroreflector",
        ar: "عاكس الليزر للقياس القمري — أبولو 14"
      },
      mission: "Apollo 14",
      missionAr: "أبولو 14",
      missionId: "APOLLO-14",
      missionLabel: { en: "Apollo 14", ar: "أبولو 14" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Passive scientific instrument",
      typeAr: "أداة علمية سلبية",
      status: "STILL ACTIVE",
      operationalStatus: "Passive instrument; no power source or transmitter; used for lunar laser ranging",
      operationalStatusAr: "أداة سلبية؛ بلا مصدر طاقة أو جهاز إرسال؛ تُستخدم في القياس بالليزر القمري",
      mode: "Passive",
      modeAr: "أداة سلبية",
      location: "Fra Mauro landing site, about 200 m west of the Lunar Module",
      locationAr: "موقع هبوط فرا مورو، نحو 200 متر غرب المركبة القمرية",
      lat: -3.64417,
      lon: -17.47865,
      locationConfidence: "NASA NSSDC coordinate for the Apollo 14 LRRR (3.64417°S, 17.47865°W).",
      locationConfidenceAr: "إحداثي عاكس أبولو 14 وفق NASA NSSDC (3.64417° جنوباً، 17.47865° غرباً).",
      markerLabel: "Apollo 14 LRRR — passive retroreflector array",
      markerLabelAr: "عاكس أبولو 14 — مصفوفة عاكسات سلبية",
      story: {
        en: "The array was deployed on the first EVA, 30 m west of the ALSEP central station and about 200 m west of the Lunar Module. It reflects laser pulses sent from Earth and has no power source or transmitter.",
        ar: "نُشرت المصفوفة خلال أول خروج على السطح، على 30 متراً غرب المحطة المركزية لحزمة ALSEP ونحو 200 متر غرب المركبة القمرية. تعكس نبضات الليزر المرسلة من الأرض، وليس لها مصدر طاقة أو جهاز إرسال."
      },
      then: "Deployed at the Fra Mauro site",
      thenAr: "نُشرت في موقع فرا مورو",
      missionStory: "Provides a passive laser-ranging target for Earth-based observatories.",
      missionStoryAr: "توفر هدفاً سلبياً للقياس بالليزر لمراصد الأرض.",
      now: "Remains on the Moon and is used passively for laser ranging.",
      nowAr: "لا تزال على القمر وتُستخدم سلبياً في القياس بالليزر.",
      significance: {
        en: "The array is one of the Apollo-era passive retroreflectors used for lunar laser ranging. Together with the Apollo 11 and 15 arrays, it supports precise measurements of the Earth–Moon distance and lunar motion.",
        ar: "المصفوفة واحدة من عاكسات عصر أبولو السلبية المستخدمة في القياس بالليزر القمري. وتدعم مع مصفوفتي أبولو 11 و15 قياسات دقيقة للمسافة بين الأرض والقمر وحركة القمر."
      },
      evidence: {
        en: "NSSDC's LRRR experiment page gives the deployment geometry and passive operation; the NSSDC landing-site table gives the array coordinate; ILRS documents ongoing lunar laser ranging to the Apollo 11, 14 and 15 arrays.",
        ar: "تقدم صفحة تجربة LRRR لدى NASA NSSDC هندسة النشر والتشغيل السلبي؛ ويعطي جدول مواقع الهبوط إحداثي المصفوفة؛ ويوثق ILRS استمرار القياس بالليزر القمري إلى مصفوفات أبولو 11 و14 و15."
      },
      model: "conceptual",
      modelKind: "lrrr",
      modelNote: {
        en: "Conceptual model of the retroreflector array. The number and arrangement of corner cubes are simplified and are not engineering data.",
        ar: "نموذج تصوري لمصفوفة العاكسات. عدد عاكسات الزوايا وترتيبها مبسطان وليسا بيانات هندسية."
      },
      components: [
        { anchor: [0, 0.45, 0.3], name: { en: "Retroreflector array", ar: "مصفوفة العاكسات" }, description: { en: "A panel of corner-cube reflectors returns laser light toward its source.", ar: "لوحة من عاكسات الزوايا تعيد ضوء الليزر نحو مصدره." } },
        { anchor: [-0.55, -0.2, 0.15], name: { en: "Tripod mount", ar: "حامل ثلاثي القوائم" }, description: { en: "The array was set on a mount so it could be aimed at Earth. The model shows three simplified legs.", ar: "وُضعت المصفوفة على حامل ليُوجَّه نحو الأرض. يعرض النموذج ثلاث أرجل مبسطة." } },
        { anchor: [0.42, 0.1, 0.25], name: { en: "Leveling base", ar: "قاعدة التسوية" }, description: { en: "A base assembly helped establish the array's orientation. Details are conceptual.", ar: "ساعدت مجموعة القاعدة في ضبط اتجاه المصفوفة. التفاصيل تصورية." } }
      ],
      related: ["MOON-AP14-LMDS"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Laser Ranging Retroreflector (Apollo 14) — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1971-008C-09" },
        { title: "Lunar laser ranging summary — ILRS", url: "https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar.html" },
        { title: "Apollo 14 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo14info.html" }
      ],
      events: [
        { date: "1971-02-05", title: "Apollo 14 crew deploys the lunar retroreflector", titleAr: "طاقم أبولو 14 ينشر عاكس الليزر القمري", source: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1971-008C-09" }
      ]
    },
    {
      id: "MOON-AP15-LRRR",
      name: {
        en: "Apollo 15 Lunar Laser Ranging Retroreflector",
        ar: "عاكس الليزر للقياس القمري — أبولو 15"
      },
      mission: "Apollo 15",
      missionAr: "أبولو 15",
      missionId: "APOLLO-15",
      missionLabel: { en: "Apollo 15", ar: "أبولو 15" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Passive scientific instrument",
      typeAr: "أداة علمية سلبية",
      status: "STILL ACTIVE",
      operationalStatus: "Passive instrument; no power source or transmitter; used for lunar laser ranging",
      operationalStatusAr: "أداة سلبية؛ بلا مصدر طاقة أو جهاز إرسال؛ تُستخدم في القياس بالليزر القمري",
      mode: "Passive",
      modeAr: "أداة سلبية",
      location: "Hadley–Apennine landing site, near the Lunar Module",
      locationAr: "موقع هبوط هادلي–أبينين، قرب المركبة القمرية",
      lat: 26.13341,
      lon: 3.6285,
      locationConfidence: "NASA NSSDC coordinate for the Apollo 15 LRRR (26.13341°N, 3.62850°E).",
      locationConfidenceAr: "إحداثي عاكس أبولو 15 وفق NASA NSSDC (26.13341° شمالاً، 3.62850° شرقاً).",
      markerLabel: "Apollo 15 LRRR — passive retroreflector array",
      markerLabelAr: "عاكس أبولو 15 — مصفوفة عاكسات سلبية",
      story: {
        en: "The array was carried to the Hadley site on the Lunar Roving Vehicle and deployed during the mission. It contains 300 fused-silica corner reflectors and became passive after deployment.",
        ar: "حُملت المصفوفة إلى موقع هادلي على العربة القمرية ونُشرت خلال المهمة. تحتوي على 300 عاكس زاوية من السيليكا المنصهرة، وأصبحت سلبية بعد النشر."
      },
      then: "Deployed at the Hadley–Apennine site",
      thenAr: "نُشرت في موقع هادلي–أبينين",
      missionStory: "Provides a passive laser-ranging target for Earth-based observatories.",
      missionStoryAr: "توفر هدفاً سلبياً للقياس بالليزر لمراصد الأرض.",
      now: "Remains on the Moon and is used passively for laser ranging.",
      nowAr: "لا تزال على القمر وتُستخدم سلبياً في القياس بالليزر.",
      significance: {
        en: "The array is one of the Apollo-era passive retroreflectors used for lunar laser ranging. Its 300 corner cubes are documented by NSSDC, and ILRS records continuing ranging to the Apollo 15 array.",
        ar: "المصفوفة واحدة من عاكسات عصر أبولو السلبية المستخدمة في القياس بالليزر القمري. ويوثق NASA NSSDC عاكساتها الثلاثمئة، ويسجل ILRS استمرار القياس إلى مصفوفة أبولو 15."
      },
      evidence: {
        en: "NSSDC's LRRR experiment page describes the 300-reflector array, its transport on the LRV and its passive operation; the NSSDC landing-site table gives the array coordinate; ILRS documents ongoing lunar laser ranging to the Apollo 11, 14 and 15 arrays.",
        ar: "تصف صفحة تجربة LRRR لدى NASA NSSDC المصفوفة ذات العاكسات الثلاثمئة، ونقلها على العربة القمرية، وتشغيلها السلبي؛ ويعطي جدول مواقع الهبوط إحداثي المصفوفة؛ ويوثق ILRS استمرار القياس بالليزر القمري إلى مصفوفات أبولو 11 و14 و15."
      },
      model: "conceptual",
      modelKind: "lrrr",
      modelNote: {
        en: "Conceptual model of the retroreflector array. The number and arrangement of corner cubes are simplified and are not engineering data.",
        ar: "نموذج تصوري لمصفوفة العاكسات. عدد عاكسات الزوايا وترتيبها مبسطان وليسا بيانات هندسية."
      },
      components: [
        { anchor: [0, 0.45, 0.3], name: { en: "Retroreflector array", ar: "مصفوفة العاكسات" }, description: { en: "A panel of corner-cube reflectors returns laser light toward its source.", ar: "لوحة من عاكسات الزوايا تعيد ضوء الليزر نحو مصدره." } },
        { anchor: [-0.55, -0.2, 0.15], name: { en: "Tripod mount", ar: "حامل ثلاثي القوائم" }, description: { en: "The array was set on a mount so it could be aimed at Earth. The model shows three simplified legs.", ar: "وُضعت المصفوفة على حامل ليُوجَّه نحو الأرض. يعرض النموذج ثلاث أرجل مبسطة." } },
        { anchor: [0.42, 0.1, 0.25], name: { en: "Leveling base", ar: "قاعدة التسوية" }, description: { en: "A base assembly helped establish the array's orientation. Details are conceptual.", ar: "ساعدت مجموعة القاعدة في ضبط اتجاه المصفوفة. التفاصيل تصورية." } }
      ],
      related: ["MOON-AP15-LMDS", "MOON-AP15-LRV"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Laser Ranging Retroreflector (Apollo 15) — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1971-063C-08" },
        { title: "Lunar laser ranging summary — ILRS", url: "https://ilrs.gsfc.nasa.gov/science/scienceContributions/lunar.html" },
        { title: "Apollo 15 mission information — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo15info.html" }
      ],
      events: [
        { date: "1971-07-31", title: "Apollo 15 crew deploys the lunar retroreflector", titleAr: "طاقم أبولو 15 ينشر عاكس الليزر القمري", source: "https://nssdc.gsfc.nasa.gov/nmc/experiment/display.action?id=1971-063C-08" }
      ]
    },
    {
      id: "MOON-SURV1-HULL",
      name: {
        en: "Surveyor 1 remaining lander structure",
        ar: "الهيكل المتبقي من مركبة سيرفيور 1"
      },
      mission: "Surveyor 1",
      missionAr: "سيرفيور 1",
      missionId: "SURVEYOR-1",
      missionLabel: { en: "Surveyor 1", ar: "سيرفيور 1" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Robotic lunar lander structure",
      typeAr: "هيكل مركبة هبوط قمرية آلية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the lander remains on the Moon",
      operationalStatusAr: "انتهت المهمة؛ وتبقى المركبة على القمر",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Oceanus Procellarum, north of Flamsteed Crater",
      locationAr: "محيط العواصف، شمال فوهة فلامستيد",
      lat: -2.4745,
      lon: -43.3398,
      locationConfidence: "NASA NSSDC LRO-determined landing coordinate (2.4745°S, 316.6602°E, equivalent to 43.3398°W). It locates the lander site, not a survey of the remaining structure.",
      locationConfidenceAr: "إحداثي هبوط سيرفيور 1 المحدد من صور LRO وفق NASA NSSDC (2.4745° جنوباً، 316.6602° شرقاً، أي 43.3398° غرباً). يحدد موقع الهبوط، وليس مسحاً للهيكل المتبقي.",
      markerLabel: "Surveyor 1 landing site — lander remains",
      markerLabelAr: "موقع هبوط سيرفيور 1 — الهيكل المتبقي",
      story: {
        en: "Surveyor 1 made the first U.S. soft landing on the Moon on 2 June 1966. The lander remains at its Oceanus Procellarum site; no component-return mission visited it.",
        ar: "نفذت سيرفيور 1 أول هبوط أمريكي سلس على القمر في 2 يونيو 1966. وتبقى المركبة في موقعها في محيط العواصف؛ ولم تزرها مهمة لاستعادة مكوناتها."
      },
      then: "First U.S. soft lander on the Moon",
      thenAr: "أول مركبة هبوط أمريكية سلسة على القمر",
      missionStory: "Demonstrated soft-landing technology and returned surface images and engineering data.",
      missionStoryAr: "أثبتت تقنية الهبوط السلس وأعادت صوراً للسطح وبيانات هندسية.",
      now: "Remains on the Moon; the mission ended in 1966.",
      nowAr: "لا تزال على القمر؛ وقد انتهت المهمة عام 1966.",
      significance: {
        en: "Surveyor 1 was the first U.S. spacecraft to soft-land on the Moon and helped validate landing technology for Apollo. Its lander remains at the site.",
        ar: "كانت سيرفيور 1 أول مركبة أمريكية تهبط بسلام على القمر، وساعدت في التحقق من تقنية الهبوط لأبولو. وتبقى مركبتها في الموقع."
      },
      evidence: {
        en: "The NSSDC Surveyor 1 page gives the launch and landing dates, the LRO-determined landing coordinate and the mission results. NASA Science's Surveyor 1 page provides mission context.",
        ar: "تقدم صفحة سيرفيور 1 لدى NASA NSSDC تاريخي الإطلاق والهبوط، وإحداثي الهبوط المحدد من صور LRO، ونتائج المهمة. وتوفر صفحة سيرفيور 1 من NASA Science سياق المهمة."
      },
      model: "conceptual",
      modelKind: "surveyor-lander",
      modelNote: {
        en: "Conceptual reconstruction of the lander's recognizable structure. The camera and surface sampler are simplified; dimensions are not engineering data.",
        ar: "إعادة بناء تصورية للبنية المميزة للمركبة. الكاميرا وأداة أخذ العينات مبسطتان؛ والأبعاد ليست بيانات هندسية."
      },
      components: [
        { anchor: [0, 0.15, 0.55], name: { en: "Lander bus", ar: "جسم المركبة" }, description: { en: "The central structure housed the lander's systems. Its box-like form is simplified.", ar: "ضمّ الهيكل المركزي أنظمة المركبة. شكله الصندوقي مبسط." } },
        { anchor: [0.75, 0.1, 0.1], name: { en: "Solar panel", ar: "اللوح الشمسي" }, description: { en: "A solar panel supplied power during the surface mission. The model shows a single flat panel.", ar: "وفّر لوح شمسي الطاقة خلال المهمة السطحية. يعرض النموذج لوحاً مسطحاً واحداً." } },
        { anchor: [-1.1, -0.5, 0.35], name: { en: "Landing legs", ar: "أرجل الهبوط" }, description: { en: "Three legs with footpads stabilized the lander on the surface.", ar: "ثبّتت ثلاث أرجل بقواعدها المركبة على السطح." } },
        { anchor: [0.45, 0.55, -0.15], name: { en: "Camera mast", ar: "حامل الكاميرا" }, description: { en: "The television camera remained on this lander; it was not removed. The model shows a simplified camera and mast.", ar: "بقيت كاميرا التلفزيون على هذه المركبة ولم تُزل. يعرض النموذج كاميرا وصارياً مبسطين." } },
        { anchor: [-0.45, 0.3, -0.45], name: { en: "Omni antenna", ar: "الهوائي متعدد الاتجاهات" }, description: { en: "Communications hardware supported the mission. The model uses a simplified mast and dish.", ar: "دعمت معدات الاتصالات المهمة. يستخدم النموذج سارية وطبقاً مبسطين." } }
      ],
      related: [],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A",
      sources: [
        { title: "Surveyor 1 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A" },
        { title: "Surveyor 1 — NASA Science", url: "https://science.nasa.gov/mission/surveyor-1/" }
      ],
      events: [
        { date: "1966-06-02", title: "Surveyor 1 soft-lands on the Moon", titleAr: "هبوط سيرفيور 1 بسلام على القمر", source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1966-045A" }
      ]
    },
    {
      id: "MOON-SURV7-HULL",
      name: {
        en: "Surveyor 7 remaining lander structure",
        ar: "الهيكل المتبقي من مركبة سيرفيور 7"
      },
      mission: "Surveyor 7",
      missionAr: "سيرفيور 7",
      missionId: "SURVEYOR-7",
      missionLabel: { en: "Surveyor 7", ar: "سيرفيور 7" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Robotic lunar lander structure",
      typeAr: "هيكل مركبة هبوط قمرية آلية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the lander remains on the Moon",
      operationalStatusAr: "انتهت المهمة؛ وتبقى المركبة على القمر",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Lunar highlands north of Tycho Crater",
      locationAr: "المرتفعات القمرية شمال فوهة تيكو",
      lat: -40.9812,
      lon: -11.5127,
      locationConfidence: "NASA NSSDC LRO-determined landing coordinate (40.9812°S, 11.5127°W) on an ejecta blanket about 29 miles north of Tycho's rim. It locates the lander site, not a survey of the remaining structure.",
      locationConfidenceAr: "إحداثي هبوط سيرفيور 7 المحدد من صور LRO وفق NASA NSSDC (40.9812° جنوباً، 11.5127° غرباً) على غطاء قذفي على نحو 29 ميلاً شمال حافة فوهة تيكو. يحدد موقع الهبوط، وليس مسحاً للهيكل المتبقي.",
      markerLabel: "Surveyor 7 landing site — lander remains",
      markerLabelAr: "موقع هبوط سيرفيور 7 — الهيكل المتبقي",
      story: {
        en: "Surveyor 7 was the last Surveyor and the only one to land in the lunar highlands. It remains at its site on an ejecta blanket north of Tycho Crater.",
        ar: "كانت سيرفيور 7 آخر مركبة من سلسلة سيرفيور والوحيدة التي هبطت في المرتفعات القمرية. وتبقى في موقعها على غطاء قذفي شمال فوهة تيكو."
      },
      then: "Last Surveyor lander",
      thenAr: "آخر مركبة هبوط من سلسلة سيرفيور",
      missionStory: "Studied a lunar highland site near Tycho Crater.",
      missionStoryAr: "درست موقعاً في المرتفعات القمرية قرب فوهة تيكو.",
      now: "Remains on the Moon; the mission ended in 1968.",
      nowAr: "لا تزال على القمر؛ وقد انتهت المهمة عام 1968.",
      significance: {
        en: "Surveyor 7 was the last Surveyor and the only one to land in the lunar highlands. It returned images and soil data from a site near Tycho Crater.",
        ar: "كانت سيرفيور 7 آخر مركبة من سلسلة سيرفيور والوحيدة التي هبطت في المرتفعات القمرية. وأعادت صوراً وبيانات تربة من موقع قرب فوهة تيكو."
      },
      evidence: {
        en: "The NSSDC Surveyor 7 page gives the landing date, the LRO-determined landing coordinate near Tycho and the mission results. NASA Science's Surveyor 7 page provides mission context.",
        ar: "تقدم صفحة سيرفيور 7 لدى NASA NSSDC تاريخ الهبوط، وإحداثي الهبوط المحدد من صور LRO قرب تيكو، ونتائج المهمة. وتوفر صفحة سيرفيور 7 من NASA Science سياق المهمة."
      },
      model: "conceptual",
      modelKind: "surveyor-lander",
      modelNote: {
        en: "Conceptual reconstruction of the lander's recognizable structure. The camera and surface sampler are simplified; dimensions are not engineering data.",
        ar: "إعادة بناء تصورية للبنية المميزة للمركبة. الكاميرا وأداة أخذ العينات مبسطتان؛ والأبعاد ليست بيانات هندسية."
      },
      components: [
        { anchor: [0, 0.15, 0.55], name: { en: "Lander bus", ar: "جسم المركبة" }, description: { en: "The central structure housed the lander's systems. Its box-like form is simplified.", ar: "ضمّ الهيكل المركزي أنظمة المركبة. شكله الصندوقي مبسط." } },
        { anchor: [0.75, 0.1, 0.1], name: { en: "Solar panel", ar: "اللوح الشمسي" }, description: { en: "A solar panel supplied power during the surface mission. The model shows a single flat panel.", ar: "وفّر لوح شمسي الطاقة خلال المهمة السطحية. يعرض النموذج لوحاً مسطحاً واحداً." } },
        { anchor: [-1.1, -0.5, 0.35], name: { en: "Landing legs", ar: "أرجل الهبوط" }, description: { en: "Three legs with footpads stabilized the lander on the surface.", ar: "ثبّتت ثلاث أرجل بقواعدها المركبة على السطح." } },
        { anchor: [0.45, 0.55, -0.15], name: { en: "Camera mast", ar: "حامل الكاميرا" }, description: { en: "The television camera remained on this lander; it was not removed. The model shows a simplified camera and mast.", ar: "بقيت كاميرا التلفزيون على هذه المركبة ولم تُزل. يعرض النموذج كاميرا وصارياً مبسطين." } },
        { anchor: [-0.45, 0.3, -0.45], name: { en: "Omni antenna", ar: "الهوائي متعدد الاتجاهات" }, description: { en: "Communications hardware supported the mission. The model uses a simplified mast and dish.", ar: "دعمت معدات الاتصالات المهمة. يستخدم النموذج سارية وطبقاً مبسطين." } }
      ],
      related: [],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1968-001A",
      sources: [
        { title: "Surveyor 7 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1968-001A" },
        { title: "Surveyor 7 — NASA Science", url: "https://science.nasa.gov/mission/surveyor-7/" }
      ],
      events: [
        { date: "1968-01-10", title: "Surveyor 7 soft-lands near Tycho Crater", titleAr: "هبوط سيرفيور 7 بسلام قرب فوهة تيكو", source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1968-001A" }
      ]
    },
    {
      id: "MOON-SURV5-HULL",
      name: {
        en: "Surveyor 5 remaining lander structure",
        ar: "الهيكل المتبقي من مركبة سيرفيور 5"
      },
      mission: "Surveyor 5",
      missionAr: "سيرفيور 5",
      missionId: "SURVEYOR-5",
      missionLabel: { en: "Surveyor 5", ar: "سيرفيور 5" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Robotic lunar lander structure",
      typeAr: "هيكل مركبة هبوط قمرية آلية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the lander remains on the Moon",
      operationalStatusAr: "انتهت المهمة؛ وتبقى المركبة على القمر",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Southwestern Mare Tranquillitatis, on the slope of a small crater",
      locationAr: "جنوب غرب بحر السكون، على منحدر فوهة صغيرة",
      lat: 1.4551,
      lon: 23.1943,
      locationConfidence: "NASA NSSDC LRO-determined landing coordinate (1.4551°N, 23.1943°E), on a 20 degree slope of a 9 x 12 metre rimless crater. It locates the lander site, not a survey of the remaining structure.",
      locationConfidenceAr: "إحداثي هبوط سيرفيور 5 المحدد من صور LRO وفق NASA NSSDC (1.4551° شمالاً، 23.1943° شرقاً)، على منحدر بزاوية 20 درجة لفوهة بلا حافة بأبعاد 9×12 متراً. يحدد موقع الهبوط، وليس مسحاً للهيكل المتبقي.",
      markerLabel: "Surveyor 5 landing site — lander remains",
      markerLabelAr: "موقع هبوط سيرفيور 5 — الهيكل المتبقي",
      story: {
        en: "Surveyor 5 soft-landed in 1967 and carried an alpha-scattering instrument in place of the surface sampler used on earlier landers. It performed the first in-situ analysis of the chemical composition of another world's surface. The lander remains at its Mare Tranquillitatis site; no component-return mission visited it.",
        ar: "هبطت سيرفيور 5 بسلام عام 1967 وحملت أداة استطارة ألفا بدلاً من أداة أخذ العينات في المركبات السابقة. وأجرت أول تحليل موضعي للتركيب الكيميائي لسطح جسم آخر. وتبقى المركبة في موقعها في بحر السكون؛ ولم تزرها مهمة لاستعادة مكوناتها."
      },
      then: "Third Surveyor to soft-land",
      thenAr: "ثالث مركبة من سيرفيور تهبط بسلام",
      missionStory: "Tested landing technology for Apollo and returned the first in-situ analysis of lunar soil composition.",
      missionStoryAr: "اختبرت تقنية الهبوط لأبولو وأعادت أول تحليل موضعي لتركيب التربة القمرية.",
      now: "Remains on the Moon; the mission ended in 1967.",
      nowAr: "لا تزال على القمر؛ وقد انتهت المهمة عام 1967.",
      significance: {
        en: "Surveyor 5 was the first mission to analyse the composition of another world's surface in place, using its alpha-scattering instrument. The results indicated a basaltic soil and supported planning for crewed Apollo landings.",
        ar: "كانت سيرفيور 5 أول مهمة تحلل تركيب سطح جسم آخر في موضعه باستخدام أداة الاستطارة ألفا. وأشارت النتائج إلى تربة بازلتية، ودعمت التخطيط لهبوطات أبولو المأهولة."
      },
      evidence: {
        en: "The NASA NSSDC Surveyor 5 page gives the launch and landing dates, the LRO-determined landing coordinate, the alpha-scattering results and the final transmission on 17 December 1967. NASA Science's Surveyor 5 page provides mission context; its rounded coordinates are consistent with the NSSDC figures.",
        ar: "تقدم صفحة سيرفيور 5 لدى NASA NSSDC تاريخي الإطلاق والهبوط، وإحداثي الهبوط المحدد من صور LRO، ونتائج الاستطارة ألفا، وآخر إرسال في 17 ديسمبر 1967. وتوفر صفحة سيرفيور 5 من NASA Science سياق المهمة؛ وتتوافق إحداثياتها المقربة مع أرقام NSSDC."
      },
      model: "conceptual",
      modelKind: "surveyor-lander",
      modelNote: {
        en: "Conceptual reconstruction of the lander's recognizable structure. The camera, alpha-scattering instrument and footpad magnet are simplified; dimensions are not engineering data.",
        ar: "إعادة بناء تصورية للبنية المميزة للمركبة. الكاميرا وأداة الاستطارة ألفا ومغناطيس القاعدة مبسطة؛ والأبعاد ليست بيانات هندسية."
      },
      components: [
        { anchor: [0, 0.15, 0.55], name: { en: "Lander bus", ar: "جسم المركبة" }, description: { en: "The central structure housed the lander's systems. Its box-like form is simplified.", ar: "ضمّ الهيكل المركزي أنظمة المركبة. شكله الصندوقي مبسط." } },
        { anchor: [0.75, 0.1, 0.1], name: { en: "Solar panel", ar: "اللوح الشمسي" }, description: { en: "A solar panel supplied power during the surface mission. The model shows a single flat panel.", ar: "وفّر لوح شمسي الطاقة خلال المهمة السطحية. يعرض النموذج لوحاً مسطحاً واحداً." } },
        { anchor: [-1.1, -0.5, 0.35], name: { en: "Landing legs", ar: "أرجل الهبوط" }, description: { en: "Three legs with footpads stabilized the lander on the surface.", ar: "ثبّتت ثلاث أرجل بقواعدها المركبة على السطح." } },
        { anchor: [0.45, 0.55, -0.15], name: { en: "Camera mast", ar: "حامل الكاميرا" }, description: { en: "The television camera remained on this lander; it was not removed. The model shows a simplified camera and mast.", ar: "بقيت كاميرا التلفزيون على هذه المركبة ولم تُزل. يعرض النموذج كاميرا وصارياً مبسطين." } },
        { anchor: [-0.45, 0.3, -0.45], name: { en: "Omni antenna", ar: "الهوائي متعدد الاتجاهات" }, description: { en: "Communications hardware supported the mission. The model uses a simplified mast and dish.", ar: "دعمت معدات الاتصالات المهمة. يستخدم النموذج سارية وطبقاً مبسطين." } },
        { anchor: [0.3, -0.62, 0.5], name: { en: "Alpha-scattering instrument", ar: "أداة الاستطارة ألفا" }, description: { en: "The instrument measured the relative abundances of chemical elements in the lunar soil. Its deployment mechanism is simplified.", ar: "قاست الأداة الوفرة النسبية للعناصر الكيميائية في التربة القمرية. وآلية إنزالها مبسطة." } }
      ],
      related: [],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-084A",
      sources: [
        { title: "Surveyor 5 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-084A" },
        { title: "Surveyor 5 — NASA Science", url: "https://science.nasa.gov/mission/surveyor-5/" }
      ],
      events: [
        { date: "1967-09-11", title: "Surveyor 5 soft-lands on the Moon", titleAr: "هبوط سيرفيور 5 بسلام على القمر", source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-084A" }
      ]
    },
    {
      id: "MOON-SURV6-HULL",
      name: {
        en: "Surveyor 6 remaining lander structure",
        ar: "الهيكل المتبقي من مركبة سيرفيور 6"
      },
      mission: "Surveyor 6",
      missionAr: "سيرفيور 6",
      missionId: "SURVEYOR-6",
      missionLabel: { en: "Surveyor 6", ar: "سيرفيور 6" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Robotic lunar lander structure",
      typeAr: "هيكل مركبة هبوط قمرية آلية",
      status: "LEFT IN PLACE",
      operationalStatus: "Mission ended; the lander remains on the Moon",
      operationalStatusAr: "انتهت المهمة؛ وتبقى المركبة على القمر",
      mode: "Uncrewed hardware",
      modeAr: "عتاد غير مأهول",
      location: "Sinus Medii (Central Bay), near the centre of the Moon's Earth-facing hemisphere",
      locationAr: "خليج الوسط (ساينس ميدي)، قرب مركز نصف الكرة القمري المواجه للأرض",
      lat: 0.4742,
      lon: -1.4275,
      locationConfidence: "NASA NSSDC LRO-determined final landing coordinate (0.4742°N, 358.5725°E, equivalent to 1.4275°W). NSSDC lists this coordinate after the 17 November 1967 hop. It locates the lander site, not a survey of the remaining structure.",
      locationConfidenceAr: "إحداثي الهبوط النهائي لسيرفيور 6 المحدد من صور LRO وفق NASA NSSDC (0.4742° شمالاً، 358.5725° شرقاً، أي 1.4275° غرباً). ويسجل NSSDC هذا الإحداثي بعد قفزة 17 نوفمبر 1967. يحدد موقع الهبوط، وليس مسحاً للهيكل المتبقي.",
      markerLabel: "Surveyor 6 landing site — lander remains",
      markerLabelAr: "موقع هبوط سيرفيور 6 — الهيكل المتبقي",
      story: {
        en: "Surveyor 6 soft-landed in Sinus Medii in 1967. On 17 November 1967 its thrusters fired briefly and lifted it off the surface, making it the first spacecraft to lift off from another world; it came down a short distance west of its original position. The lander remains at the site.",
        ar: "هبطت سيرفيور 6 بسلام في خليج الوسط (ساينس ميدي) عام 1967. وفي 17 نوفمبر 1967 عملت محركاتها لحظة قصيرة فرفعتها عن السطح، لتكون أول مركبة تنطلق من جسم آخر؛ ثم هبطت على مسافة قصيرة غرب موقعها الأصلي. وتبقى المركبة في الموقع."
      },
      then: "Fourth Surveyor to soft-land",
      thenAr: "رابع مركبة من سيرفيور تهبط بسلام",
      missionStory: "Demonstrated a controlled lunar liftoff and returned soil-composition and imaging data.",
      missionStoryAr: "أثبتت الانطلاق المتحكم به من سطح القمر وأعادت بيانات عن تركيب التربة وتصويراً.",
      now: "Remains on the Moon; the mission ended in 1967.",
      nowAr: "لا تزال على القمر؛ وقد انتهت المهمة عام 1967.",
      significance: {
        en: "Surveyor 6 made the first controlled liftoff from the Moon, an engineering first that also let its cameras re-image the original landing site. Its alpha-scattering instrument analysed the soil composition at Sinus Medii.",
        ar: "نفذت سيرفيور 6 أول انطلاق متحكم به من القمر، وهو إنجاز هندسي أتاح لكاميراتها إعادة تصوير موقع الهبوط الأصلي. وحللت أداة الاستطارة ألفا تركيب التربة في خليج الوسط."
      },
      evidence: {
        en: "The NASA NSSDC Surveyor 6 page gives the landing date and time, the LRO-determined final coordinate, the 17 November 1967 liftoff (about 3 to 4 metres up and about 2.4 metres west), the imaging totals and the soil-composition results. NASA Science's Surveyor 6 page provides mission context; its rounded values (about 3 metres up, about 2.5 metres west) agree with the NSSDC figures.",
        ar: "تقدم صفحة سيرفيور 6 لدى NASA NSSDC تاريخ الهبوط ووقته، وإحداثي الهبوط النهائي المحدد من صور LRO، والانطلاق في 17 نوفمبر 1967 (نحو 3 إلى 4 أمتار للأعلى ونحو 2.4 متر غرباً)، وإجمالي الصور، ونتائج تركيب التربة. وتوفر صفحة سيرفيور 6 من NASA Science سياق المهمة؛ وتتفق قيمها المقربة (نحو 3 أمتار للأعلى، ونحو 2.5 متر غرباً) مع أرقام NSSDC."
      },
      model: "conceptual",
      modelKind: "surveyor-lander",
      modelNote: {
        en: "Conceptual reconstruction of the lander's recognizable structure. The camera, alpha-scattering instrument and footpad magnets are simplified; dimensions are not engineering data.",
        ar: "إعادة بناء تصورية للبنية المميزة للمركبة. الكاميرا وأداة الاستطارة ألفا ومغناطيسات القواعد مبسطة؛ والأبعاد ليست بيانات هندسية."
      },
      components: [
        { anchor: [0, 0.15, 0.55], name: { en: "Lander bus", ar: "جسم المركبة" }, description: { en: "The central structure housed the lander's systems. Its box-like form is simplified.", ar: "ضمّ الهيكل المركزي أنظمة المركبة. شكله الصندوقي مبسط." } },
        { anchor: [0.75, 0.1, 0.1], name: { en: "Solar panel", ar: "اللوح الشمسي" }, description: { en: "A solar panel supplied power during the surface mission. The model shows a single flat panel.", ar: "وفّر لوح شمسي الطاقة خلال المهمة السطحية. يعرض النموذج لوحاً مسطحاً واحداً." } },
        { anchor: [-1.1, -0.5, 0.35], name: { en: "Landing legs", ar: "أرجل الهبوط" }, description: { en: "Three legs with footpads stabilized the lander on the surface.", ar: "ثبّتت ثلاث أرجل بقواعدها المركبة على السطح." } },
        { anchor: [0.45, 0.55, -0.15], name: { en: "Camera mast", ar: "حامل الكاميرا" }, description: { en: "The television camera remained on this lander; it was not removed. This mission's camera carried polarising filters and a different glare hood. The model shows a simplified camera and mast.", ar: "بقيت كاميرا التلفزيون على هذه المركبة ولم تُزل. وحملت كاميرا هذه المهمة مرشحات استقطاب وواقي وهج مختلفاً. يعرض النموذج كاميرا وصارياً مبسطين." } },
        { anchor: [-0.45, 0.3, -0.45], name: { en: "Omni antenna", ar: "الهوائي متعدد الاتجاهات" }, description: { en: "Communications hardware supported the mission. The model uses a simplified mast and dish.", ar: "دعمت معدات الاتصالات المهمة. يستخدم النموذج سارية وطبقاً مبسطين." } },
        { anchor: [0.3, -0.62, 0.5], name: { en: "Alpha-scattering instrument", ar: "أداة الاستطارة ألفا" }, description: { en: "The instrument measured the relative abundances of chemical elements in the lunar soil. Its deployment mechanism is simplified.", ar: "قاست الأداة الوفرة النسبية للعناصر الكيميائية في التربة القمرية. وآلية إنزالها مبسطة." } }
      ],
      related: [],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-112A",
      sources: [
        { title: "Surveyor 6 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-112A" },
        { title: "Surveyor 6 — NASA Science", url: "https://science.nasa.gov/mission/surveyor-6/" }
      ],
      events: [
        { date: "1967-11-10", title: "Surveyor 6 soft-lands in Sinus Medii", titleAr: "هبوط سيرفيور 6 بسلام في خليج الوسط", source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-112A" },
        { date: "1967-11-17", title: "Surveyor 6 makes the first powered liftoff from the Moon", titleAr: "سيرفيور 6 تنفذ أول انطلاق مدفوع من القمر", source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1967-112A" }
      ]
    },
    {
      id: "MOON-ALSEP",
      name: {
        en: "Apollo Lunar Surface Experiments Package (ALSEP)",
        ar: "حزمة التجارب السطحية القمرية (ALSEP)"
      },
      mission: "Apollo 12, 14, 15, 16 and 17",
      missionAr: "أبولو 12 و14 و15 و16 و17",
      missionId: "ALSEP",
      missionLabel: { en: "Apollo Lunar Surface Experiments Package", ar: "حزمة التجارب السطحية القمرية" },
      world: "moon",
      worldLabel: "Moon",
      worldLabelAr: "القمر",
      recordType: "artifact",
      type: "Network of deployed scientific stations",
      typeAr: "شبكة محطات علمية منشورة",
      status: "LEFT IN PLACE",
      operationalStatus: "All ALSEP experiments were shut down on September 30, 1977; the hardware remains on the Moon",
      operationalStatusAr: "أُوقفت جميع تجارب ALSEP في 30 سبتمبر 1977؛ ولا تزال المعدات على القمر",
      mode: "Deployed surface experiment network",
      modeAr: "شبكة تجارب سطحية منشورة",
      location: "Five separate ALSEP stations remain on the Moon — Oceanus Procellarum (Apollo 12), Fra Mauro (Apollo 14), Hadley–Apennine (Apollo 15), Descartes (Apollo 16) and Taurus–Littrow (Apollo 17). No single coordinate represents the collection.",
      locationAr: "تبقى خمس محطات ALSEP منفصلة على القمر — محيط العواصف (أبولو 12)، وفرا مورو (أبولو 14)، وهادلي–أبينين (أبولو 15)، وديكارت (أبولو 16)، وتوروس–ليترو (أبولو 17). ولا يمثّل إحداثي واحد هذه المجموعة.",
      lat: null,
      lon: null,
      locationConfidence: "No single coordinate is plotted for this collection. NASA NSSDC lists the five ALSEP station coordinates separately (LRO-derived, DE 421 mean Earth/polar rotation axis frame): Apollo 12 −3.0098°, −23.4249°; Apollo 14 −3.64419°, −17.47768°; Apollo 15 26.13406°, 3.62991°; Apollo 16 −8.9759°, 15.4986°; Apollo 17 20.1923°, 30.7655°.",
      locationConfidenceAr: "لا يُعرض إحداثي واحد لهذه المجموعة. وتسرد ناسا (NSSDC) إحداثيات محطات ALSEP الخمس منفصلةً (مستخلصة من صور المستكشف المداري القمري): أبولو 12 −3.0098°، −23.4249°؛ أبولو 14 −3.64419°، −17.47768°؛ أبولو 15 26.13406°، 3.62991°؛ أبولو 16 −8.9759°، 15.4986°؛ أبولو 17 20.1923°، 30.7655°.",
      story: {
        en: "The Apollo Lunar Surface Experiments Package (ALSEP) was a set of self-contained science stations that Apollo astronauts deployed, activated and then left on the Moon. Five stations were deployed, on Apollo 12, 14, 15, 16 and 17, each carrying a different mix of instruments: passive and active seismometers, heat-flow probes, magnetometers, solar-wind and charged-particle detectors, ion gauges and dust detectors. Apollo 11 did not carry a standard ALSEP; it deployed the smaller Early Apollo Scientific Experiments Package (EASEP), which used solar power. Each ALSEP station had a central station connected by cables to the surrounding experiments; the station collected data and radioed the results back to Earth. It was powered by a SNAP-27 radioisotope thermoelectric generator (RTG), which used the heat from plutonium-238 decay to generate electricity through the long lunar night. The stations were commanded from Earth until support operations were terminated on September 30, 1977. The experiments were switched off, but the physical hardware remains at the five sites. Its present condition should not be assumed without direct inspection.",
        ar: "كانت حزمة التجارب السطحية القمرية (ALSEP) مجموعةً من محطات علمية مكتفية بذاتها نشرها رواد أبولو وشغّلوها ثم تركوها على القمر. وقد نُشرت خمس محطات في أبولو 12 و14 و15 و16 و17، حملت كل منها مزيجاً مختلفاً من الأجهزة: مقاييس زلزالية سلبية وفعّالة، ومجسّات لتدفق الحرارة، ومقاييس مغناطيسية، وكواشف للريح الشمسية والجسيمات المشحونة، ومقاييس للغازات المتأينة، وكواشف للغبار. ولم تحمل أبولو 11 حزمة ALSEP القياسية؛ بل نشرت حزمة أبولو المبكرة للتجارب العلمية (EASEP) الأصغر التي تعمل بالطاقة الشمسية. وكانت كل محطة ALSEP تضم محطة مركزية متصلة بأسلاك بالأجهزة المحيطة، حيث جمعت البيانات وأرسلتها إلى الأرض عبر الراديو. وكانت تُغذّى بمولد حراري نووي (SNAP-27) يعمل بالحرارة الناتجة عن اضمحلال البلوتونيوم-238 لتوليد الكهرباء خلال الليل القمري الطويل. وظلّت المحطات تُدار من الأرض حتى إيقاف عمليات الدعم في 30 سبتمبر 1977. وقد أُوقفت التجارب، لكن المعدات المادية لا تزال في المواقع الخمسة. ولا ينبغي افتراض حالتها الحالية دون فحص مباشر."
      },
      then: "Deployed scientific station network",
      thenAr: "شبكة محطات علمية منشورة",
      missionStory: "Deployed by Apollo 12, 14, 15, 16 and 17 to monitor the lunar surface, interior and environment.",
      missionStoryAr: "نُشرت بواسطة أبولو 12 و14 و15 و16 و17 لرصد سطح القمر وباطنه وبيئته.",
      now: "The experiments were switched off on September 30, 1977; the station hardware remains on the Moon at five separate sites.",
      nowAr: "أُوقفت التجارب في 30 سبتمبر 1977؛ ولا تزال معدات المحطات على القمر في خمسة مواقع منفصلة.",
      significance: {
        en: "For the first time a network of instruments returned a long-term geophysical record from another world. ALSEP seismic, heat-flow, magnetic and particle measurements shaped the modern picture of the Moon's interior structure, its weak magnetic environment, the solar wind and the extremely thin lunar atmosphere.",
        ar: "لأول مرة، قدّمت شبكة من الأجهزة سجلاً جيوفيزيائياً طويل الأمد من عالم آخر. وقد شكّلت قياسات ALSEP الزلزالية والحرارية والمغناطيسية وقياسات الجسيمات الصورة الحديثة لبنية القمر الداخلية وبيئته المغناطيسية الضعيفة والريح الشمسية وغلافه الجوي الرقيق جداً."
      },
      evidence: {
        en: "The record follows NASA's ALSEP Termination Report (NASA Reference Publication 1036, 1979), which describes ALSEP as a self-contained science station, notes that Apollo 11 deployed the EASEP instead, and records the end of support operations on September 30, 1977. NASA NSSDC's Apollo 11 EASEP page describes the EASEP instruments, and the NSSDC mission pages for Apollo 12, 14, 15, 16 and 17 list the individual experiments. The five station coordinates are taken from NASA NSSDC's Apollo landing-site table (LRO-derived). No single plotted position is used for this multi-site collection.",
        ar: "يعتمد السجل على تقرير إنهاء ALSEP الصادر عن ناسا (منشور مرجعي رقم 1036، 1979)، الذي يصف ALSEP بأنها محطة علمية مكتفية بذاتها، ويشير إلى أن أبولو 11 نشرت EASEP بدلاً منها، ويسجل انتهاء عمليات الدعم في 30 سبتمبر 1977. وتصف صفحة EASEP لدى NASA NSSDC أجهزة الحزمة، وتسرد صفحات مهام أبولو 12 و14 و15 و16 و17 التجارب المختلفة. وقد أُخذت إحداثيات المحطات الخمس من جدول مواقع الهبوط لدى NASA NSSDC (المستخلص من صور LRO). ولا يُستخدم موقع واحد معروض لهذه المجموعة متعددة المواقع."
      },
      model: "conceptual",
      modelKind: "surveyor-lander",
      modelNote: {
        en: "Conceptual model of a deployed science station, using the archive's stationary-lander geometry as a schematic stand-in. The ALSEP central station, its power source and its instrument packages are not an engineering reconstruction; the five stations differed from one another.",
        ar: "نموذج تصوري لمحطة علمية منشورة، يستخدم هندسة مركبة الهبوط الثابتة في الأرشيف كبديل تخطيطي. ولا تمثّل المحطة المركزية لـALSEP ومصدر طاقتها وحزم أجهزتها إعادة بناء هندسية؛ كما اختلفت المحطات الخمس إحداها عن الأخرى."
      },
      components: [
        { anchor: [0, 0.15, 0.55], name: { en: "Central station", ar: "المحطة المركزية" }, description: { en: "The central station carried the electronics, the data-handling system and the radio link to Earth, gathering readings from instrument packages connected by cables.", ar: "حملت المحطة المركزية الإلكترونيات ونظام معالجة البيانات ووصلة الراديو مع الأرض، وجمعت قراءات حزم الأجهزة المتصلة بأسلاك." } },
        { anchor: [0, 0.75, 0.1], name: { en: "Power source", ar: "مصدر الطاقة" }, description: { en: "A SNAP-27 radioisotope thermoelectric generator used plutonium-238 decay to produce electricity continuously through the lunar day and night.", ar: "استُخدم مولد حراري نووي (SNAP-27) يعتمد على اضمحلال البلوتونيوم-238 لإنتاج الكهرباء بشكل مستمر خلال النهار والليل القمريين." } },
        { anchor: [-1.1, -0.5, 0.35], name: { en: "Seismic and geophysical instruments", ar: "الأجهزة الزلزالية والجيوفيزيائية" }, description: { en: "Passive and active seismometers and heat-flow probes recorded the Moon's interior and near-surface, returning evidence on moonquakes and thermal structure.", ar: "سجّلت المقاييس الزلزالية السلبية والفعّالة ومجسّات تدفق الحرارة باطن القمر وطبقته القريبة من السطح، وأعادت أدلة عن الزلازل القمرية والبنية الحرارية." } },
        { anchor: [0.45, 0.55, -0.15], name: { en: "Magnetometers and particle detectors", ar: "المقاييس المغناطيسية وكواشف الجسيمات" }, description: { en: "Magnetometers, solar-wind spectrometers, suprathermal ion detectors and charged-particle sensors measured fields and particles at the surface.", ar: "قاس كل من المقاييس المغناطيسية ومطياف الريح الشمسية وكواشف الأيونات فائقة الحرارة ومجسّات الجسيمات المشحونة المجالات والجسيمات عند السطح." } },
        { anchor: [-0.45, 0.3, -0.45], name: { en: "Antenna mast and thermal shroud", ar: "صاري الهوائي والغلاف الحراري" }, description: { en: "A mast and antenna supported the command uplink and data downlink; thermal shrouds protected the instruments and their electronics.", ar: "دعم الصاري والهوائي وصلة الأوامر الصاعدة ووصلة البيانات الهابطة؛ وحمت الأغلفة الحرارية الأجهزة والإلكترونيات." } }
      ],
      related: ["MOON-AP15-LRV"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html",
      sources: [
        { title: "ALSEP Termination Report (NASA RP-1036, 1979) — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/misc/documents/b32116.pdf" },
        { title: "Apollo 11 Lunar Module / EASEP — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=1969-059C" },
        { title: "Apollo landing site coordinates — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/lunar_sites.html" },
        { title: "Apollo 12 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo12info.html" },
        { title: "Apollo 14 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo14info.html" },
        { title: "Apollo 15 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo15info.html" },
        { title: "Apollo 16 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo16info.html" },
        { title: "Apollo 17 — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo17info.html" }
      ],
      events: [
        { date: "1969-11-19", title: "Apollo 12 deploys the first ALSEP science station", titleAr: "أبولو 12 تنشر أول محطة علمية من حزمة ALSEP", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo12info.html" },
        { date: "1971-02-05", title: "Apollo 14 deploys its ALSEP science station", titleAr: "أبولو 14 تنشر محطتها العلمية من حزمة ALSEP", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo14info.html" },
        { date: "1971-07-31", title: "Apollo 15 deploys its ALSEP science station", titleAr: "أبولو 15 تنشر محطتها العلمية من حزمة ALSEP", source: "https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo15info.html" },
        { date: "1972-04-21", title: "Apollo 16's ALSEP station begins transmitting to Earth", titleAr: "محطة ALSEP لأبولو 16 تبدأ الإرسال إلى الأرض", source: "https://nssdc.gsfc.nasa.gov/misc/documents/b32116.pdf" },
        { date: "1972-12-12", title: "Apollo 17's ALSEP station begins transmitting to Earth", titleAr: "محطة ALSEP لأبولو 17 تبدأ الإرسال إلى الأرض", source: "https://nssdc.gsfc.nasa.gov/misc/documents/b32116.pdf" },
        { date: "1977-09-30", title: "ALSEP support operations terminated; the stations remain on the Moon", titleAr: "إنهاء عمليات دعم ALSEP؛ وتبقى المحطات على القمر", source: "https://nssdc.gsfc.nasa.gov/misc/documents/b32116.pdf" }
      ]
    },
    {
      id: "MARS-MER-OPPORTUNITY",
      name: {
        en: "Opportunity rover",
        ar: "العربة الجوالة أوبورتيونيتي"
      },
      mission: "Mars Exploration Rover (MER)",
      missionAr: "مهمة استكشاف المريخ (MER)",
      missionId: "MER-OPPORTUNITY",
      missionLabel: { en: "Mars Exploration Rover — Opportunity", ar: "مهمة استكشاف المريخ — أوبورتيونيتي" },
      world: "mars",
      worldLabel: "Mars",
      worldLabelAr: "المريخ",
      recordType: "artifact",
      type: "Robotic rover",
      typeAr: "عربة جوالة آلية",
      status: "MISSION ENDED",
      operationalStatus: "Contact lost June 10, 2018; mission concluded February 13, 2019",
      operationalStatusAr: "انقطع الاتصال في 10 يونيو 2018؛ وأُعلن انتهاء المهمة في 13 فبراير 2019",
      mode: "Mobile robotic spacecraft",
      modeAr: "مركبة آلية متحركة",
      location: "Perseverance Valley, Endeavour Crater rim, Mars; precise final coordinates are not supplied",
      locationAr: "وادي بيرسيفيرانس، حافة فوهة إنديفور، المريخ؛ الإحداثيات النهائية الدقيقة غير محددة",
      lat: null,
      lon: null,
      locationConfidence: "NASA describes the rover's final resting area; this record plots no precise coordinate.",
      locationConfidenceAr: "تصف ناسا منطقة الاستقرار النهائي للعربة؛ ولا يعرض هذا السجل إحداثياً دقيقاً.",
      story: {
        en: "Opportunity investigated the Martian surface and geology. It stopped communicating during a planet-wide dust storm in 2018; NASA announced the end of the mission in 2019. The mission's status and its physical location are separate facts, and no precise final coordinate is plotted here.",
        ar: "درست أوبورتيونيتي سطح المريخ وجيولوجيته. انقطع الاتصال بها خلال عاصفة ترابية واسعة عام 2018، وأعلنت ناسا انتهاء المهمة عام 2019. حالة المهمة وموقعها المادي حقيقتان منفصلتان، ولا يُعرض هنا إحداثي نهائي دقيق."
      },
      then: "Robotic Mars explorer",
      thenAr: "مستكشفة آلية للمريخ",
      missionStory: "Studied Martian geology and surface conditions for almost 15 years.",
      missionStoryAr: "درست جيولوجيا المريخ وظروف سطحه لنحو 15 عاماً.",
      now: "Mission ended; the rover remains on Mars, with no precise point plotted.",
      nowAr: "انتهت المهمة؛ ولا تزال العربة على المريخ، دون تحديد نقطة دقيقة.",
      significance: {
        en: "Opportunity operated far beyond its planned 90-martian-day mission, traveled more than 45 kilometres and returned evidence about ancient watery environments on Mars.",
        ar: "عملت أوبورتيونيتي فترة تتجاوز بكثير مهمتها المخطط لها (90 يوماً مريخياً)، وقطعت أكثر من 45 كيلومتراً، وقدّمت أدلة على بيئات مائية قديمة على المريخ."
      },
      evidence: {
        en: "NASA's Opportunity mission page gives the landing date, the June 10, 2018 loss of contact, the February 13, 2019 end of mission and the 45.16 km odometry. The record deliberately does not convert the described final area into a precise coordinate.",
        ar: "تقدم صفحة مهمة أوبورتيونيتي من ناسا تاريخ الهبوط، وفقدان الاتصال في 10 يونيو 2018، ونهاية المهمة في 13 فبراير 2019، ومسافة 45.16 كيلومتراً. ويتجنب السجل تحويل المنطقة النهائية الموصوفة إلى إحداثي دقيق."
      },
      model: "conceptual",
      modelKind: "opportunity",
      modelNote: {
        en: "Conceptual model of the Opportunity rover. The six-wheel rocker-bogie arrangement, solar arrays, mast and arm are recognizable, but the model is not an engineering reconstruction.",
        ar: "نموذج تصوري للعربة أوبورتيونيتي. ترتيب العجلات الست ونظام التعليق والألواح الشمسية والصاري والذراع مميزة، لكن النموذج ليس إعادة بناء هندسية."
      },
      components: [
        { anchor: [0, 0.25, 0.55], name: { en: "Rover body", ar: "جسم العربة" }, description: { en: "The warm electronics box housed the rover's core systems. The model simplifies its shape.", ar: "ضمّ صندوق الإلكترونيات الحساسة الأنظمة الأساسية للعربة. يبسط النموذج شكله." } },
        { anchor: [0, 0.85, 0], name: { en: "Solar arrays", ar: "الألواح الشمسية" }, description: { en: "Wing-like solar panels generated power. Their layout is shown conceptually.", ar: "ولّدت الألواح الشمسية الشبيهة بالأجنحة الطاقة. ويُعرض ترتيبها تصورياً." } },
        { anchor: [1.15, -0.35, 0.55], name: { en: "Six wheels", ar: "العجلات الست" }, description: { en: "Six wheels and a rocker-bogie suspension carried the rover across rough terrain.", ar: "حملت ست عجلات ونظام تعليق متأرجح العربة عبر تضاريس وعرة." } },
        { anchor: [0.25, 0.95, -0.35], name: { en: "Camera mast", ar: "صاري الكاميرات" }, description: { en: "The mast carried panoramic cameras above the body. The model shows a simplified head.", ar: "حمل الصاري كاميرات بانورامية فوق الجسم. يعرض النموذج رأساً مبسطاً." } },
        { anchor: [-0.85, 0.1, 0.45], name: { en: "Robotic arm", ar: "الذراع الآلية" }, description: { en: "The instrument deployment device placed tools against rocks and soil.", ar: "وضعت ذراع نشر الأجهزة الأدوات على الصخور والتربة." } },
        { anchor: [-0.2, 0.55, -0.7], name: { en: "High-gain antenna", ar: "الهوائي عالي الكسب" }, description: { en: "A directional antenna supported high-rate communications with Earth.", ar: "دعم هوائي موجّه اتصالات عالية المعدل مع الأرض." } }
      ],
      related: ["MARS-MER-SPIRIT"],
      coordinateSource: "",
      sources: [
        { title: "Opportunity mission — NASA Science", url: "https://science.nasa.gov/mission/mer-opportunity/" },
        { title: "Opportunity mission ends — NASA", url: "https://www.nasa.gov/news-release/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end/" }
      ],
      events: [
        { date: "2004-01-25", title: "Opportunity lands on Mars (UTC)", titleAr: "هبوط أوبورتيونيتي على المريخ (بالتوقيت العالمي)", source: "https://science.nasa.gov/mission/mer-opportunity/" },
        { date: "2019-02-13", title: "NASA concludes the Opportunity mission", titleAr: "ناسا تعلن انتهاء مهمة أوبورتيونيتي", source: "https://www.nasa.gov/news-release/nasas-record-setting-opportunity-rover-mission-on-mars-comes-to-end/" }
      ]
    },
    {
      id: "MARS-MER-SPIRIT",
      name: {
        en: "Spirit rover",
        ar: "العربة الجوالة سبيريت"
      },
      mission: "Mars Exploration Rover (MER)",
      missionAr: "مهمة استكشاف المريخ (MER)",
      missionId: "MER-SPIRIT",
      missionLabel: { en: "Mars Exploration Rover — Spirit", ar: "مهمة استكشاف المريخ — سبيريت" },
      world: "mars",
      worldLabel: "Mars",
      worldLabelAr: "المريخ",
      recordType: "artifact",
      type: "Robotic rover",
      typeAr: "عربة جوالة آلية",
      status: "MISSION ENDED",
      operationalStatus: "Stuck in soft soil from 2009; last communication on March 22, 2010; NASA declared the mission complete on May 25, 2011. These are separate milestones — the rover has remained silent on Mars since 2010.",
      operationalStatusAr: "غرزت في تربة رخوة منذ 2009؛ وكان آخر اتصال في 22 مارس 2010؛ وأعلنت ناسا اكتمال المهمة في 25 مايو 2011. وهذه محطات منفصلة — فالعربة صامتة على المريخ منذ 2010.",
      mode: "Mobile robotic spacecraft",
      modeAr: "مركبة آلية متحركة",
      location: "Gusev Crater, Mars; landing site plotted, final position not asserted",
      locationAr: "فوهة غوسيف، المريخ؛ يُعرض موقع الهبوط، ولا يُحدد الموقع النهائي",
      lat: -14.572,
      lon: 175.478,
      locationConfidence: "NASA NSSDC Spirit landing coordinate (14.572°S, 175.478°E), plotted as a mission marker only. It is not the rover's final position. NASA Science's Spirit page gives a closely similar landing coordinate (14.5692°S, 175.4729°E); the NSSDC value is used here and the small difference is noted rather than averaged.",
      locationConfidenceAr: "إحداثي هبوط سبيريت وفق NASA NSSDC (14.572° جنوباً، 175.478° شرقاً)، ويُعرض كعلامة للمهمة فقط. وهو ليس موقع العربة النهائي. وتقدم صفحة سبيريت لدى NASA Science إحداثي هبوط قريباً جداً (14.5692° جنوباً، 175.4729° شرقاً)؛ وقد استُخدمت قيمة NSSDC هنا مع الإشارة إلى الفرق الطفيف بدل حسابه وسيطاً.",
      missionMarker: true,
      markerLabel: "Spirit landing site — not the rover's final position",
      markerLabelAr: "موقع هبوط سبيريت — وليس موقع العربة النهائي",
      story: {
        en: "Spirit, also called Mars Exploration Rover A (MER-A), launched on June 10, 2003 and landed in Gusev Crater on January 4, 2004. It was designed for a 90-sol (about three-month) mission but operated for more than six years, driving about 7.73 km in total. In 2009 it broke through a crust into soft soil and became stuck; after months of recovery attempts, NASA's last communication with the rover was on March 22, 2010. NASA ended attempts to restore contact and declared the mission complete on May 25, 2011. The last communication and the official mission closure are separate milestones: the rover has remained silent on Mars since 2010 and remains there today.",
        ar: "أُطلقت سبيريت، وتُعرف أيضاً بعربة استكشاف المريخ A (MER-A)، في 10 يونيو 2003 وهبطت في فوهة غوسيف في 4 يناير 2004. وقد صُممت لمهمة مدتها 90 يوماً مريخياً (نحو ثلاثة أشهر) لكنها عملت أكثر من ست سنوات، قاطعة نحو 7.73 كم إجمالاً. وفي عام 2009 اخترقت قشرة سطحية وغاصت في تربة رخوة فغرزت؛ وبعد أشهر من محاولات الاستخراج، كان آخر اتصال لناسا مع العربة في 22 مارس 2010. وقد أوقفت ناسا محاولات استعادة الاتصال وأعلنت اكتمال المهمة في 25 مايو 2011. وهاتان محطتان منفصلتان: آخر اتصال، والإغلاق الرسمي للمهمة؛ فالعربة صامتة على المريخ منذ 2010 ولا تزال هناك."
      },
      then: "Robotic Mars explorer",
      thenAr: "مستكشفة آلية للمريخ",
      missionStory: "Studied Gusev Crater's geology and ancient watery environments.",
      missionStoryAr: "درست جيولوجيا فوهة غوسيف وبيئاتها المائية القديمة.",
      now: "Mission ended; the rover remains on Mars, with the landing site plotted as a marker only.",
      nowAr: "انتهت المهمة؛ ولا تزال العربة على المريخ، ويُعرض موقع الهبوط كعلامة فقط.",
      significance: {
        en: "Spirit and its twin Opportunity transformed understanding of ancient aqueous environments on Mars and demonstrated long-lived solar-powered surface operations. Spirit's roughly 7.73 km traverse of Gusev Crater produced evidence of past water-altered rocks and soils, and the rover's long survival far beyond its 90-sol design life reshaped expectations for robotic surface missions.",
        ar: "غيّرت سبيريت وتوأمتها أوبورتيونيتي فهم البيئات المائية القديمة على المريخ، وأثبتتا إمكانية عمليات سطحية طويلة الأمد تعمل بالطاقة الشمسية. وقد أنتجت جولة سبيريت التي بلغت نحو 7.73 كم في فوهة غوسيف أدلة على صخور وتربة تأثرت بالماء في الماضي، كما غيّر بقاؤها الطويل بعد عمرها التصميمي (90 يوماً مريخياً) التوقعات بشأن المهمات السطحية الآلية."
      },
      evidence: {
        en: "NASA's Spirit mission page gives the launch date, the roughly 7.73 km traverse, the 2009 entrapment, the last-communication date and the mission-end date; the NSSDC Spirit page (2003-027A) gives the launch date, the January 4, 2004 landing, the landing coordinate and the mission results. The plotted pin is the landing site, not the rover's final position, which is not plotted.",
        ar: "تقدم صفحة مهمة سبيريت من ناسا تاريخ الإطلاق، والجولة التي بلغت نحو 7.73 كم، وغرز العربة في 2009، وتاريخ آخر اتصال، وتاريخ انتهاء المهمة؛ وتقدم صفحة سبيريت لدى NASA NSSDC (2003-027A) تاريخ الإطلاق وهبوط 4 يناير 2004 وإحداثي الهبوط ونتائج المهمة. العلامة المعروضة هي موقع الهبوط، وليس موقع العربة النهائي غير المعروض."
      },
      model: "conceptual",
      modelKind: "opportunity",
      modelNote: {
        en: "Conceptual model of the Spirit rover, which shares the Mars Exploration Rover design with Opportunity. The six-wheel rocker-bogie arrangement, solar arrays, mast and arm are recognizable, but the model is not an engineering reconstruction.",
        ar: "نموذج تصوري للعربة سبيريت، التي تشترك في تصميم عربة استكشاف المريخ مع أوبورتيونيتي. ترتيب العجلات الست ونظام التعليق والألواح الشمسية والصاري والذراع مميزة، لكن النموذج ليس إعادة بناء هندسية."
      },
      components: [
        { anchor: [0, 0.25, 0.55], name: { en: "Rover body", ar: "جسم العربة" }, description: { en: "The warm electronics box housed the rover's core systems. The model simplifies its shape.", ar: "ضمّ صندوق الإلكترونيات الحساسة الأنظمة الأساسية للعربة. يبسط النموذج شكله." } },
        { anchor: [0, 0.85, 0], name: { en: "Solar arrays", ar: "الألواح الشمسية" }, description: { en: "Wing-like solar panels generated power. Their layout is shown conceptually.", ar: "ولّدت الألواح الشمسية الشبيهة بالأجنحة الطاقة. ويُعرض ترتيبها تصورياً." } },
        { anchor: [1.15, -0.35, 0.55], name: { en: "Six wheels", ar: "العجلات الست" }, description: { en: "Six wheels and a rocker-bogie suspension carried the rover across rough terrain.", ar: "حملت ست عجلات ونظام تعليق متأرجح العربة عبر تضاريس وعرة." } },
        { anchor: [0.25, 0.95, -0.35], name: { en: "Camera mast", ar: "صاري الكاميرات" }, description: { en: "The mast carried panoramic cameras above the body. The model shows a simplified head.", ar: "حمل الصاري كاميرات بانورامية فوق الجسم. يعرض النموذج رأساً مبسطاً." } },
        { anchor: [-0.85, 0.1, 0.45], name: { en: "Robotic arm", ar: "الذراع الآلية" }, description: { en: "The instrument deployment device placed tools against rocks and soil.", ar: "وضعت ذراع نشر الأجهزة الأدوات على الصخور والتربة." } },
        { anchor: [-0.2, 0.55, -0.7], name: { en: "High-gain antenna", ar: "الهوائي عالي الكسب" }, description: { en: "A directional antenna supported high-rate communications with Earth.", ar: "دعم هوائي موجّه اتصالات عالية المعدل مع الأرض." } }
      ],
      related: ["MARS-MER-OPPORTUNITY"],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A",
      sources: [
        { title: "Spirit mission — NASA Science", url: "https://science.nasa.gov/mission/mer-spirit/" },
        { title: "Spirit — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A" }
      ],
      events: [
        { date: "2003-06-10", title: "Spirit (MER-A) launches from Cape Canaveral", titleAr: "إطلاق سبيريت (MER-A) من كيب كانافيرال", source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A" },
        { date: "2004-01-04", title: "Spirit lands on Mars (UTC)", titleAr: "هبوط سبيريت على المريخ (بالتوقيت العالمي)", source: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=2003-027A" },
        { date: "2009-05-01", title: "Spirit becomes stuck in soft soil after breaking through a crust", titleAr: "غرز سبيريت في تربة رخوة بعد اختراق قشرة سطحية", source: "https://science.nasa.gov/mission/mer-spirit/" },
        { date: "2010-03-22", title: "Last communication with Spirit", titleAr: "آخر اتصال مع سبيريت", source: "https://science.nasa.gov/mission/mer-spirit/" },
        { date: "2011-05-25", title: "NASA concludes the Spirit mission", titleAr: "ناسا تعلن انتهاء مهمة سبيريت", source: "https://science.nasa.gov/mission/mer-spirit/" }
      ]
    },
    {
      id: "MARS-M20-BACKSHELL",
      name: {
        en: "Mars 2020 backshell and parachute",
        ar: "الغطاء الخلفي والمظلة — مارس 2020"
      },
      mission: "Mars 2020 / Perseverance",
      missionAr: "مارس 2020 / بيرسيفيرانس",
      missionId: "MARS-2020",
      missionLabel: { en: "Mars 2020 — Perseverance", ar: "مارس 2020 — بيرسيفيرانس" },
      world: "mars",
      worldLabel: "Mars",
      worldLabelAr: "المريخ",
      recordType: "debris",
      type: "Entry, descent and landing hardware",
      typeAr: "معدات الدخول والهبوط",
      status: "DISCARDED COMPONENT",
      operationalStatus: "Separated during the landing sequence",
      operationalStatusAr: "انفصلت أثناء تسلسل الهبوط",
      mode: "Passive hardware after separation",
      modeAr: "عتاد سلبي بعد الانفصال",
      location: "Jezero Crater landing region; the backshell-specific position is not supplied",
      locationAr: "منطقة الهبوط في فوهة جيزيرو؛ وموقع الغطاء الخلفي نفسه غير محدد",
      lat: 18.44463,
      lon: 77.45088,
      locationConfidence: "NASA NTRS Perseverance landing coordinate (18.44463°N, 77.45088°E), plotted as a mission marker only. It is not the backshell's position.",
      locationConfidenceAr: "إحداثي هبوط بيرسيفيرانس وفق NASA NTRS (18.44463° شمالاً، 77.45088° شرقاً)، ويُعرض كعلامة للمهمة فقط. وهو ليس موقع الغطاء الخلفي.",
      missionMarker: true,
      markerLabel: "Perseverance landing coordinate — not the backshell's exact position",
      markerLabelAr: "إحداثي هبوط بيرسيفيرانس — وليس موقع الغطاء الخلفي الدقيق",
      story: {
        en: "The backshell housed landing-critical components, including the parachute. NASA documents its separation during the landing sequence, and later imaging identified the parachute and backshell on the surface. The plotted pin is the rover landing coordinate and must not be read as the backshell's exact location.",
        ar: "ضمّ الغطاء الخلفي مكونات حيوية للهبوط، منها المظلة. توثق ناسا انفصاله أثناء تسلسل الهبوط، وحددت صور لاحقة المظلة والغطاء على السطح. العلامة المعروضة هي إحداثي هبوط العربة، وليست موقع الغطاء الدقيق."
      },
      then: "Entry and landing system",
      thenAr: "نظام الدخول والهبوط",
      missionStory: "Helped slow and guide the rover's landing.",
      missionStoryAr: "ساعد في إبطاء هبوط العربة وتوجيهه.",
      now: "Separated during entry, descent and landing; precise component location is not supplied.",
      nowAr: "انفصل أثناء الدخول والهبوط؛ والموقع الدقيق للمكوّن غير محدد.",
      significance: {
        en: "The backshell and parachute are part of the Mars 2020 entry, descent and landing system that delivered Perseverance to the surface. Their separated remains are a debris field, not an intact spacecraft.",
        ar: "الغطاء الخلفي والمظلة جزء من نظام الدخول والهبوط في مارس 2020 الذي أوصل بيرسيفيرانس إلى السطح. وبقاياهما المنفصلة حقل حطام، وليست مركبة سليمة."
      },
      evidence: {
        en: "The NASA NTRS citation provides the rover landing coordinate. NASA's photojournal page on Perseverance and Mars 2020 spacecraft components documents the parachute and backshell on the surface in separate locations. No coordinate is asserted for the backshell itself.",
        ar: "يوفر اقتباس NASA NTRS إحداثي هبوط العربة. وتوثق صفحة التصوير الصحفي لناسا عن مكونات بيرسيفيرانس ومارس 2020 وجود المظلة والغطاء الخلفي على السطح في موقعين منفصلين. ولا يُنسب إحداثي للغطاء نفسه."
      },
      model: "conceptual",
      modelKind: "m20-backshell",
      modelNote: {
        en: "Conceptual assembly of a backshell and parachute. Canopy gores, line count and structural details are simplified and are not engineering data.",
        ar: "تجميع تصوري للغطاء الخلفي والمظلة. قطاعات المظلة وعدد الحبال والتفاصيل الهيكلية مبسطة وليست بيانات هندسية."
      },
      components: [
        { anchor: [0, 0.45, 0.55], name: { en: "Backshell", ar: "الغطاء الخلفي" }, description: { en: "The protective shell covered the payload during entry and carried the parachute and antennas.", ar: "غطى الدرع الحمولة أثناء الدخول وحمل المظلة والهوائيات." } },
        { anchor: [0, 1.65, 0], name: { en: "Parachute canopy", ar: "قماش المظلة" }, description: { en: "The canopy generated drag after deployment. Its gore pattern is simplified.", ar: "ولّد القماش السحب بعد النشر. نمط قطاعاته مبسط." } },
        { anchor: [0.55, 1.05, 0.25], name: { en: "Suspension lines", ar: "حبال التعليق" }, description: { en: "Lines connected the canopy to the backshell. Their exact number is not shown.", ar: "ربطت الحبال المظلة بالغطاء الخلفي. ولا يُعرض عددها الدقيق." } },
        { anchor: [-0.55, 0.2, 0.1], name: { en: "Attachment ring", ar: "حلقة التثبيت" }, description: { en: "Structural fittings joined the parachute system to the shell. Details are conceptual.", ar: "ربطت تركيبات هيكلية نظام المظلة بالغطاء. التفاصيل تصورية." } }
      ],
      related: [],
      coordinateSource: "https://ntrs.nasa.gov/citations/20210024644",
      sources: [
        { title: "Perseverance and Mars 2020 spacecraft components on the surface — NASA Science", url: "https://science.nasa.gov/photojournal/perseverance-and-mars-2020-spacecraft-components-on-the-surface/" },
        { title: "Mars 2020 Perseverance mission — NASA Science", url: "https://science.nasa.gov/mission/mars-2020-perseverance/" },
        { title: "Perseverance landing coordinate — NASA NTRS", url: "https://ntrs.nasa.gov/citations/20210024644" }
      ],
      events: [
        { date: "2021-02-18", title: "Mars 2020 mission landing at Jezero", titleAr: "هبوط مهمة مارس 2020 في جيزيرو", source: "https://science.nasa.gov/mission/mars-2020-perseverance/" }
      ]
    },
    {
      id: "MARS-PATHFINDER-SOJOURNER",
      name: {
        en: "Sojourner rover",
        ar: "العربة الجوالة سوجورنر"
      },
      mission: "Mars Pathfinder",
      missionAr: "مارس باثفايندر",
      missionId: "MARS-PATHFINDER",
      missionLabel: { en: "Mars Pathfinder — Sojourner", ar: "مارس باثفايندر — سوجورنر" },
      world: "mars",
      worldLabel: "Mars",
      worldLabelAr: "المريخ",
      recordType: "artifact",
      type: "Robotic rover",
      typeAr: "عربة جوالة آلية",
      status: "MISSION ENDED",
      operationalStatus: "Last Pathfinder data received September 27, 1997; mission terminated March 10, 1998. The rover remains on Mars.",
      operationalStatusAr: "آخر بيانات وردت من باثفايندر في 27 سبتمبر 1997؛ وأُنهيت المهمة في 10 مارس 1998. ولا تزال العربة على المريخ.",
      mode: "Mobile robotic spacecraft",
      modeAr: "مركبة آلية متحركة",
      location: "Ares Vallis, Mars (the Mars Pathfinder landing site); landing site plotted, the rover's final position is not asserted",
      locationAr: "وادي آريس، المريخ (موقع هبوط مارس باثفايندر)؛ يُعرض موقع الهبوط، ولا يُحدَّد موقع العربة النهائي",
      lat: 19.33,
      lon: -33.55,
      locationConfidence: "The plotted pin is the NASA NSSDC Mars Pathfinder landing coordinate (19.33°N, 33.55°W), shown as a mission marker only. It is the landing site, not the rover's final position. Other NASA and JPL references quote slightly different values for the Ares Vallis landing site, so the pin is treated as the landing site at regional confidence rather than an exact point.",
      locationConfidenceAr: "العلامة المعروضة هي إحداثي هبوط مارس باثفايندر وفق NASA NSSDC (19.33° شمالاً، 33.55° غرباً)، وتُعرض كعلامة للمهمة فقط. وهي موقع الهبوط، وليست موقع العربة النهائي. وتذكر مراجع أخرى من ناسا ومختبر الدفع النفاث قيماً مختلفة قليلاً لموقع الهبوط في وادي آريس؛ لذلك تُعامل العلامة كموقع هبوط بثقة إقليمية لا كنقطة دقيقة.",
      missionMarker: true,
      markerLabel: "Mars Pathfinder landing site — not the rover's final position",
      markerLabelAr: "موقع هبوط مارس باثفايندر — وليس موقع العربة النهائي",
      story: {
        en: "Sojourner was the first wheeled vehicle driven on another planet. It arrived on Mars Pathfinder, which launched on December 4, 1996 and landed in Ares Vallis on July 4, 1997; the lander was renamed the Carl Sagan Memorial Station. The six-wheeled rover, about 280 mm high and 10.6 kg, rolled down a lander ramp and drove among nearby rocks. Its instruments included an alpha-proton-X-ray spectrometer (APXS) for rock and soil composition and colour and black-and-white imaging. Its primary objectives were scheduled for the first seven sols; it ultimately operated across 83 sols. The final data transmission received from Pathfinder was at 10:23 UTC on September 27, 1997, and after five months of unsuccessful attempts to restore communications the successful mission was terminated on March 10, 1998. The last transmission and the official mission closure are separate milestones. The rover remains on Mars; its exact final resting position is not documented, so no final coordinate is asserted here.",
        ar: "كانت سوجورنر أول مركبة بعجلات تُقاد على كوكب آخر. وقد وصلت ضمن مهمة مارس باثفايندر، التي أُطلقت في 4 ديسمبر 1996 وهبطت في وادي آريس في 4 يوليو 1997؛ وأُعيد تسمية المركبة الهبوطية إلى محطة كارل ساغان التذكارية. نزلت العربة ذات العجلات الست، التي يبلغ ارتفاعها نحو 280 ملم وكتلتها 10.6 كغم، عبر منحدر المركبة الهبوطية وسارت بين الصخور القريبة. وقد ضمّت أجهزتها مطياف ألفا-بروتون-أشعة سينية (APXS) لتحليل تركيب الصخور والتربة، ومنظومات تصوير ملونة وأبيض وأسود. وكانت أهدافها الأساسية مقررة في السبعة أيام المريخية الأولى؛ لكنها عملت في النهاية على مدى 83 يوماً مريخياً. وكان آخر إرسال بيانات ورد من باثفايندر في الساعة 10:23 بالتوقيت العالمي في 27 سبتمبر 1997، وبعد خمسة أشهر من المحاولات الفاشلة لاستعادة الاتصال أُنهيت المهمة الناجحة في 10 مارس 1998. وآخر إرسال والإغلاق الرسمي للمهمة محطتان منفصلتان. ولا تزال العربة على المريخ؛ وموقع استقرارها النهائي الدقيق غير موثق، لذلك لا يُنسب هنا إحداثي نهائي."
      },
      then: "Robotic Mars explorer",
      thenAr: "مستكشفة آلية للمريخ",
      missionStory: "Demonstrated a low-cost Mars landing and delivered the first rover to the surface of another planet.",
      missionStoryAr: "أثبتت إمكانية هبوط منخفض التكلفة على المريخ، وأنزلت أول عربة جوالة على سطح كوكب آخر.",
      now: "Mission ended; the rover remains on Mars, with the landing site plotted as a marker only and no final rover position asserted.",
      nowAr: "انتهت المهمة؛ ولا تزال العربة على المريخ، ويُعرض موقع الهبوط كعلامة فقط دون تحديد موقع العربة النهائي.",
      significance: {
        en: "Sojourner was the first rover to operate on Mars and the first complete mission of NASA's Discovery Program. Although it drove only a short distance, it demonstrated airbag landing, autonomous hazard avoidance and rover-lander communications, and its APXS measurements and images helped show that Mars was once warm and wet. It set the pattern for the exploration rovers that followed.",
        ar: "كانت سوجورنر أول عربة جوالة تعمل على المريخ، وأول مهمة مكتملة في برنامج ديسكفري التابع لناسا. ورغم أن مسافتها كانت قصيرة، فقد أثبتت الهبوط بالوسائد الهوائية وتجنّب المخاطر ذاتياً واتصالات العربة مع المركبة الهبوطية، وساعدت قياسات مطيافها وصورها في إظهار أن المريخ كان دافئاً ورطباً في الماضي. وقد أرست النمط الذي سارت عليه عربات الاستكشاف اللاحقة."
      },
      evidence: {
        en: "The NASA Science Mars Pathfinder page gives the December 4, 1996 launch, the July 4, 1997 landing in Ares Vallis, the rover mass and the returned data. The NSSDC Mars Pathfinder Rover page gives the six-wheel rocker-bogie design, the landing coordinate, the first-seven-sol primary objective and the loss of communications on September 27, 1997. NASA's Photojournal caption for the rover traverse image states that Sojourner spent 83 days of a planned seven-day mission, that the final data transmission was at 10:23 UTC on September 27, 1997, and that the mission was terminated on March 10, 1998. No source gives a final rover position, so none is plotted.",
        ar: "تقدم صفحة مارس باثفايندر من NASA Science تاريخ الإطلاق في 4 ديسمبر 1996، والهبوط في وادي آريس في 4 يوليو 1997، وكتلة العربة، والبيانات المستعادة. وتقدم صفحة عربة مارس باثفايندر لدى NASA NSSDC تصميم العجلات الست ونظام التعليق المتأرجح، وإحداثي الهبوط، والهدف الأساسي في السبعة أيام المريخية الأولى، وفقدان الاتصال في 27 سبتمبر 1997. ويذكر التعليق الصحفي لصورة مسار العربة من ناسا أن سوجورنر عملت 83 يوماً من مهمة مخطط لها سبعة أيام، وأن آخر إرسال للبيانات كان في الساعة 10:23 بالتوقيت العالمي في 27 سبتمبر 1997، وأن المهمة أُنهيت في 10 مارس 1998. ولا يقدم أي مصدر موقعاً نهائياً للعربة، لذلك لا يُعرض أي موقع."
      },
      model: "conceptual",
      modelKind: "sojourner",
      modelNote: {
        en: "Dedicated conceptual model of the Sojourner rover. The compact flat body, single top solar panel, six-wheel rocker-bogie, body-mounted front and rear cameras, and APXS swing arm reflect Sojourner's actual configuration. The model is schematic and is not an engineering reconstruction; small fittings and cable runs are simplified.",
        ar: "نموذج تصوري مخصص للعربة سوجورنر. يعكس الجسم المدمج المسطح، واللوح الشمسي المفرد في الأعلى، ونظام العجلات الست المتأرجح، والكاميرات الأمامية والخلفية المثبتة في الجسم، وذراع مطياف APXS التكوينَ الفعلي لسوجورنر. النموذج تخطيطي وليس إعادة بناء هندسية؛ والتركيبات الصغيرة والأسلاك مبسّطة."
      },
      components: [
        { anchor: [0, 0.18, 0.30], name: { en: "Rover body", ar: "جسم العربة" }, description: { en: "Sojourner's compact, flat aluminium chassis was about 280 mm tall and 10.6 kg. The warm electronics box inside kept sensitive components within operating temperature across the Martian day and night.", ar: "كان هيكل سوجورنر الألومنيومي المدمج المسطح ارتفاعه نحو 280 ملم وكتلته 10.6 كغم. وحافظ صندوق الإلكترونيات الحساسة الداخلي على درجة حرارة المكونات الحيوية ضمن نطاق التشغيل خلال النهار والليل المريخيين." } },
        { anchor: [0, 0.44, 0], name: { en: "Solar panel", ar: "اللوح الشمسي" }, description: { en: "A single flat GaAs/Ge solar array covering the rover's topside generated up to about 16 watts in full sunlight. Rechargeable backup batteries carried the rover through the Martian night.", ar: "ولّد لوح شمسي مسطح واحد من غاليوم أرسينيد / جرمانيوم يغطي الجانب العلوي للعربة ما يصل إلى نحو 16 واطاً في ضوء الشمس الكامل. وغطّت بطاريات احتياطية قابلة لإعادة الشحن الليل المريخي." } },
        { anchor: [0.46, -0.10, 0.46], name: { en: "Six wheels and rocker-bogie", ar: "العجلات الست ونظام التعليق المتأرجح" }, description: { en: "Six aluminium wheels on a rocker-bogie suspension allowed the rover to traverse loose, rocky terrain. All six wheels were driven independently.", ar: "حافظت ست عجلات ألومنيوم على نظام تعليق متأرجح على قدرة العربة على اجتياز التضاريس الحجرية الرخوة. وكانت جميع العجلات الست مدارة بشكل مستقل." } },
        { anchor: [0.18, 0.26, 0.60], name: { en: "Cameras", ar: "الكاميرات" }, description: { en: "Sojourner carried a stereoscopic forward-looking camera pair and a single rear-facing camera. All cameras were body-mounted rather than on a deployable mast.", ar: "حملت سوجورنر زوجاً من الكاميرات المجسّمة المدمجة في الجسم تنظر للأمام، وكاميرا مفردة تنظر للخلف. وكانت جميع الكاميرات مثبتة في الجسم لا على صاري قابل للنشر." } },
        { anchor: [0.58, -0.06, -0.62], name: { en: "Alpha-proton-X-ray spectrometer", ar: "مطياف ألفا-بروتون-أشعة سينية" }, description: { en: "The APXS was placed in contact with rocks and soil to measure elemental composition. Sojourner analysed several rocks, including Barnacle Bill and Yogi.", ar: "وُضع مطياف APXS في تلامس مع الصخور والتربة لقياس تركيبها العنصري. وحلّلت سوجورنر عدة صخور، منها بارنكل بيل ويوجي." } },
        { anchor: [0.28, 0.72, -0.44], name: { en: "UHF modem and antenna", ar: "المودم ومحوّل التردد فوق العالي" }, description: { en: "Sojourner communicated with the Mars Pathfinder lander via a short-range UHF radio link. All data passed through the lander before reaching Earth; Sojourner had no direct high-gain link.", ar: "تواصلت سوجورنر مع مركبة هبوط مارس باثفايندر عبر وصلة راديو UHF قصيرة المدى. مرّت جميع البيانات عبر مركبة الهبوط قبل الوصول إلى الأرض؛ ولم يكن لسوجورنر وصلة مباشرة عالية الكسب." } }
      ],
      related: [],
      coordinateSource: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=MESURPR",
      sources: [
        { title: "Mars Pathfinder — NASA Science", url: "https://science.nasa.gov/mission/mars-pathfinder/" },
        { title: "Mars Pathfinder Rover — NASA NSSDC", url: "https://nssdc.gsfc.nasa.gov/nmc/spacecraft/display.action?id=MESURPR" },
        { title: "Mars PathFinder Rover Traverse Image (PIA01238) — NASA Photojournal", url: "https://science.nasa.gov/photojournal/mars-pathfinder-rover-traverse-image/" }
      ],
      events: [
        { date: "1996-12-04", title: "Mars Pathfinder launches with the Sojourner rover", titleAr: "إطلاق مارس باثفايندر مع العربة سوجورنر", source: "https://science.nasa.gov/mission/mars-pathfinder/" },
        { date: "1997-07-04", title: "Mars Pathfinder lands in Ares Vallis", titleAr: "هبوط مارس باثفايندر في وادي آريس", source: "https://science.nasa.gov/mission/mars-pathfinder/" },
        { date: "1997-09-27", title: "Final data transmission received from Mars Pathfinder", titleAr: "استلام آخر إرسال بيانات من مارس باثفايندر", source: "https://science.nasa.gov/photojournal/mars-pathfinder-rover-traverse-image/" },
        { date: "1998-03-10", title: "Mars Pathfinder mission terminated", titleAr: "إنهاء مهمة مارس باثفايندر", source: "https://science.nasa.gov/photojournal/mars-pathfinder-rover-traverse-image/" }
      ]
    }
  ]
};
