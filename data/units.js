/* IELTS Quest B-plan unit layer.
 * Existing Missions remain the progressive learning steps. A Unit groups the
 * Missions in one chapter and owns the 100-item coverage target plus a
 * 50-question checkpoint. No vocabulary is duplicated to inflate readiness.
 */
(function () {
  "use strict";

  const chapterTitles = [
    ["自然地理", "Natural Geography"], ["植物研究", "Plant Life"],
    ["动物保护", "Animal World"], ["太空探索", "Space Exploration"],
    ["教育与学习", "Education"], ["科技与发明", "Technology"],
    ["文化与历史", "Culture & History"], ["语言与交流", "Language"],
    ["媒体与休闲", "Media & Leisure"], ["材料与制造", "Materials"],
    ["服装与时尚", "Clothing"], ["食物与饮食", "Food"],
    ["建筑与居住", "Buildings"], ["交通与旅行", "Transport"],
    ["政府与政治", "Government"], ["经济与商业", "Economy"],
    ["法律与规则", "Law"], ["冲突与和平", "Conflict & Peace"],
    ["人物与关系", "People"], ["行为与能力", "Behaviour"],
    ["健康与医疗", "Health"], ["时间与变化", "Time"]
  ];

  /* Original-source enrichment is kept at Unit level so accepted Mission
   * stories, IDs, scores and completion history do not change. */
  const supplementalByChapter = {
    1: [
      ["hydrosphere", "/ˈhaɪdrəʊsfɪə/", "n.", "水圈；大气中的水汽", "the earth's hydrosphere", "All the water of the earth's surface is included in the hydrosphere.", "地球表面的水都属于水圈的范畴。", 13],
      ["lithosphere", "/ˈlɪθəʊsfɪə/", "n.", "岩石圈", "the earth's lithosphere", "The hydrosphere and the lithosphere together form the earth's surface.", "水圈与岩石圈一起形成地球表面。", 13],
      ["oxygen", "/ˈɒksɪdʒən/", "n.", "氧气", "oxygen supply", "Hydrogen and oxygen are gases.", "氢气和氧气都是气体。", 13],
      ["oxide", "/ˈɒksaɪd/", "n.", "氧化物", "metal oxide", "Oxide is a part of our daily life.", "氧化物是日常生活的一部分。", 13],
      ["carbon dioxide", "/ˌkɑːbən daɪˈɒksaɪd/", "n.", "二氧化碳", "carbon dioxide emissions", "Soft drinks usually contain carbon dioxide.", "软饮料中通常含有二氧化碳。", 13],
      ["hydrogen", "/ˈhaɪdrədʒən/", "n.", "氢气", "hydrogen gas", "Two parts hydrogen and one part oxygen produce water.", "两份氢和一份氧会产生水。", 13],
      ["core", "/kɔː/", "n.", "中心；核心；地核", "the earth's core", "He is the core of the working group.", "他是工作小组的核心。", 13],
      ["crust", "/krʌst/", "n.", "地壳；外壳", "the earth's crust", "The crust on the snow was thick enough to walk on.", "雪上的硬壳厚得足以行走。", 13],
      ["mantle", "/ˈmæntl/", "n.", "地幔；斗篷", "the earth's mantle", "The mantle lies between the crust and the core.", "地幔位于地壳和地核之间。", 13],
      ["horizon", "/həˈraɪzən/", "n.", "地平线；眼界", "on the horizon", "I could see a ship on the horizon.", "我看见地平线上有一艘船。", 13],
      ["disaster", "/dɪˈzɑːstə/", "n.", "灾难", "a natural disaster", "There was a great flood disaster in East China.", "华东发生了严重的洪灾。", 13],
      ["mishap", "/ˈmɪshæp/", "n.", "小事故；不幸", "a minor mishap", "A mishap prevented him from attending the meeting.", "一场小事故使他没能参加会议。", 14],
      ["catastrophic", "/ˌkætəˈstrɒfɪk/", "adj.", "灾难性的", "catastrophic consequences", "The consequences could have been catastrophic.", "后果本可能是灾难性的。", 14],
      ["calamity", "/kəˈlæməti/", "n.", "灾难；不幸", "cause a calamity", "A hurricane would be a calamity for this coastal region.", "飓风会给这片沿海地区带来灾难。", 14],
      ["endanger", "/ɪnˈdeɪndʒə/", "v.", "危及；使遭受危险", "endanger public health", "Working without rest may endanger your health.", "不停休息地工作可能危及健康。", 14],
      ["jeopardise", "/ˈdʒepədaɪz/", "v.", "危害；危及", "jeopardise someone's life", "Careless actions may jeopardise your chances of success.", "粗心的行为可能危及你成功的机会。", 14],
      ["destructive", "/dɪˈstrʌktɪv/", "adj.", "破坏性的；有害的", "destructive force", "Jealousy is an extremely destructive emotion.", "嫉妒是一种极具破坏性的情绪。", 14],
      ["El Nino", "/el ˈniːnjəʊ/", "n.", "厄尔尼诺现象", "an El Nino event", "El Nino changed the weather pattern that year.", "厄尔尼诺现象改变了那一年的天气模式。", 14],
      ["greenhouse", "/ˈɡriːnhaʊs/", "n.", "温室；暖房", "the greenhouse effect", "The flowers are grown in the greenhouse.", "这些花是在温室里种植的。", 14],
      ["phenomenon", "/fəˈnɒmɪnən/", "n.", "现象", "a natural phenomenon", "Snow is an almost unknown phenomenon in Egypt.", "在埃及，雪几乎是一种未知现象。", 14],
      ["pebble", "/ˈpebl/", "n.", "鹅卵石", "a smooth pebble", "The boy drew a pebble out of the bag.", "男孩从袋子里拿出一块鹅卵石。", 14],
      ["magnet", "/ˈmæɡnət/", "n.", "磁铁", "a strong magnet", "He picked up all the pins with a magnet.", "他用磁铁捡起了所有大头针。", 14],
      ["volcano", "/vɒlˈkeɪnəʊ/", "n.", "火山", "an active volcano", "The volcano erupted and buried two small towns.", "火山喷发并掩埋了两座小镇。", 15],
      ["erupt", "/ɪˈrʌpt/", "v.", "爆发；喷发", "erupt suddenly", "Hot lava erupted from the crust.", "滚烫的熔岩从地壳中喷发出来。", 15],
      ["magma", "/ˈmæɡmə/", "n.", "岩浆", "molten magma", "Some minerals are made when magma cools and solidifies.", "有些矿物在岩浆冷却凝固时形成。", 16],
      ["tsunami", "/tsuːˈnɑːmi/", "n.", "海啸", "a devastating tsunami", "A terrible tsunami followed the earthquake.", "地震之后发生了一场可怕的海啸。", 16],
      ["thermodynamic", "/ˌθɜːməʊdaɪˈnæmɪk/", "adj.", "热力的；热力学的", "thermodynamic laws", "His theory violates current thermodynamic laws.", "他的理论违反了现行热力学定律。", 16],
      ["smog", "/smɒɡ/", "n.", "烟雾；雾霾", "dense smog", "The smog was so bad that children stayed indoors.", "雾霾严重得孩子们只能待在室内。", 16],
      ["fume", "/fjuːm/", "n.", "有害烟气", "petrol fumes", "Petrol fumes from cars are poisoning the atmosphere.", "汽车排放的汽油烟气正在污染大气。", 16],
      ["mist", "/mɪst/", "n.", "薄雾；水汽", "a light mist", "She could hardly see through the mist.", "她透过薄雾几乎看不清东西。", 16],
      ["drought", "/draʊt/", "n.", "干旱；旱灾", "severe drought", "Many areas have suffered severe drought this year.", "许多地区今年遭受了严重干旱。", 16],
      ["torrent", "/ˈtɒrənt/", "n.", "激流；洪流", "a torrent of water", "A torrent of water poured down the mountain.", "一股洪流从山上奔涌而下。", 16],
      ["earthquake", "/ˈɜːθkweɪk/", "n.", "地震", "a powerful earthquake", "Several countries counted the losses caused by the earthquake.", "几个国家统计了地震造成的损失。", 16],
      ["seismic", "/ˈsaɪzmɪk/", "adj.", "地震的；地震引起的", "seismic activity", "The discovery of seismic activity suggests geological change.", "地震活动的发现表明发生了地质变化。", 17]
    ].map(([word, ipa, pos, meaning, collocation, example, translation, sourcePage]) => ({
      word, ipa, pos, meaning, collocations: [collocation], answers: [word], example, translation,
      source: "雅思词汇真经·Chapter 1", sourcePage
    })),
    3: [
      ["botanist", "/ˈbɒtənɪst/", "n.", "植物学家", "a field botanist", "The botanist recorded every plant found beside the river.", "植物学家记录了河边发现的每一种植物。", 32],
      ["ecologist", "/iˈkɒlədʒɪst/", "n.", "生态学家", "a marine ecologist", "An ecologist studied how the wetland supported local wildlife.", "一位生态学家研究了湿地如何维系当地野生动物。", 32],
      ["amphibian", "/æmˈfɪbiən/", "n.", "两栖动物", "an endangered amphibian", "A frog is an amphibian that lives both on land and in water.", "青蛙是一种既生活在陆地也生活在水中的两栖动物。", 32],
      ["throng", "/θrɒŋ/", "n.", "人群；一大群", "a throng of visitors", "A throng of visitors gathered near the panda enclosure.", "一大群游客聚集在熊猫围栏附近。", 33],
      ["crowd", "/kraʊd/", "n.", "人群；群体", "a large crowd", "The crowd stayed quiet while the young birds were released.", "幼鸟被放归时，人群保持安静。", 33],
      ["beast", "/biːst/", "n.", "野兽；动物", "a wild beast", "The camera trap captured an image of a large nocturnal beast.", "相机陷阱拍到了一只大型夜行野兽。", 33],
      ["brute", "/bruːt/", "n.", "野兽；残暴的人", "a powerful brute", "The injured brute was treated before returning to the forest.", "这只受伤的野兽接受治疗后回到了森林。", 33],
      ["derive", "/dɪˈraɪv/", "v.", "起源于；获得", "derive from", "Many domestic breeds derive from wild ancestors.", "许多家养品种起源于野生祖先。", 33],
      ["stem", "/stem/", "v.", "起源于；来自", "stem from", "The decline may stem from the loss of nesting sites.", "这种下降可能源于筑巢地的丧失。", 33],
      ["feed", "/fiːd/", "v.", "喂养；以……为食", "feed on", "Young penguins feed on fish brought back by their parents.", "小企鹅以父母带回的鱼为食。", 34],
      ["interbreed", "/ˌɪntəˈbriːd/", "v.", "杂交；异种繁殖", "interbreed with", "Closely related species may interbreed in the same habitat.", "亲缘关系接近的物种可能在同一栖息地杂交。", 34],
      ["proliferate", "/prəˈlɪfəreɪt/", "v.", "迅速繁殖；激增", "proliferate rapidly", "Insects proliferate rapidly when food is abundant.", "食物充足时昆虫会迅速繁殖。", 34],
      ["sterility", "/stəˈrɪləti/", "n.", "不育；贫瘠", "cause sterility", "The researchers examined whether pollution caused sterility in fish.", "研究人员检查污染是否导致鱼类不育。", 34],
      ["hybridise", "/ˈhaɪbrɪdaɪz/", "v.", "使杂交", "hybridise two species", "Scientists can hybridise related plants under controlled conditions.", "科学家可以在受控条件下使相关植物杂交。", 34],
      ["courtship", "/ˈkɔːtʃɪp/", "n.", "求偶行为", "courtship behaviour", "The male bird displayed bright feathers during courtship.", "雄鸟在求偶期间展示鲜艳的羽毛。", 34],
      ["lay", "/leɪ/", "v.", "产卵；放置", "lay eggs", "Sea turtles return to the beach to lay their eggs.", "海龟回到沙滩产卵。", 34],
      ["hatch", "/hætʃ/", "v.", "孵化；孵出", "hatch from an egg", "The chicks hatch after several weeks of incubation.", "雏鸟经过数周孵化后破壳而出。", 34],
      ["brood", "/bruːd/", "n.", "一窝幼鸟；一窝幼兽", "a brood of chicks", "The mother guarded a brood of chicks beneath her wings.", "母鸟把一窝雏鸟护在翅膀下。", 35],
      ["spawn", "/spɔːn/", "v.", "产卵；大量繁殖", "spawn in rivers", "Salmon return to fresh water to spawn.", "鲑鱼返回淡水产卵。", 35],
      ["skin", "/skɪn/", "n.", "皮肤；外皮", "thick skin", "The animal's thick skin protects it from sharp rocks.", "这种动物厚厚的皮肤保护它免受尖锐岩石伤害。", 35],
      ["fin", "/fɪn/", "n.", "鳍", "dorsal fin", "The dolphin's dorsal fin was visible above the water.", "海豚的背鳍露在水面上。", 35],
      ["plume", "/pluːm/", "n.", "羽毛；羽饰", "a plume of feathers", "The bird raised its colourful plume to attract a mate.", "这只鸟竖起彩色羽饰吸引配偶。", 35],
      ["bristle", "/ˈbrɪsl/", "n.", "刚毛；短硬毛", "stiff bristles", "The animal uses stiff bristles to sense nearby movement.", "这种动物用坚硬的刚毛感知附近的动静。", 35],
      ["curl", "/kɜːl/", "n.", "卷曲；卷毛", "a curl of fur", "A curl of fur covered the cub's ear.", "一绺卷毛盖住了幼兽的耳朵。", 35],
      ["paw", "/pɔː/", "n.", "爪；脚掌", "front paw", "The fox left a clear paw print in the snow.", "狐狸在雪地里留下了清晰的爪印。", 35],
      ["worm", "/wɜːm/", "n.", "蠕虫；虫", "an earthworm", "The young bird pulled a worm from the soil.", "幼鸟从土里拉出一条虫。", 36],
      ["pest", "/pest/", "n.", "害虫；有害动物", "control pests", "Farmers introduced natural predators to control the pest.", "农民引入天敌来控制害虫。", 36],
      ["parasite", "/ˈpærəsaɪt/", "n.", "寄生虫；寄生生物", "a harmful parasite", "The parasite lives on its host and takes nutrients from it.", "这种寄生生物依附宿主并从中吸取营养。", 36]
    ].map(([word, ipa, pos, meaning, collocation, example, translation, sourcePage]) => ({
      word, ipa, pos, meaning, collocations: [collocation], answers: [word], example, translation,
      source: "雅思词汇真经·Chapter 3", sourcePage
    })),
    4: [
      ["terrestrial", "/təˈrestriəl/", "adj.", "地球的；陆地的", "terrestrial life", "The mission searched for signs of terrestrial life.", "这项任务寻找陆地生命的迹象。", 46],
      ["interstellar", "/ˌɪntəˈstelə/", "adj.", "星际的", "interstellar space", "The probe will travel through interstellar space.", "探测器将穿越星际空间。", 46],
      ["cosmos", "/ˈkɒzmɒs/", "n.", "宇宙", "the known cosmos", "Astronomers continue to explore the known cosmos.", "天文学家继续探索已知宇宙。", 46],
      ["celestial", "/səˈlestiəl/", "adj.", "天体的；天空的", "a celestial body", "The telescope tracked a distant celestial body.", "望远镜追踪了一个遥远的天体。", 46],
      ["astronaut", "/ˈæstrənɔːt/", "n.", "宇航员", "a trained astronaut", "The astronaut practised the repair inside a simulator.", "宇航员在模拟器中练习维修。", 46],
      ["astrology", "/əˈstrɒlədʒi/", "n.", "占星术", "study astrology", "Astrology is not the same discipline as astronomy.", "占星术与天文学不是同一门学科。", 46],
      ["crater", "/ˈkreɪtə/", "n.", "陨石坑；火山口", "an impact crater", "The rover photographed a wide crater on the surface.", "探测车拍摄了地表上的一个宽阔陨石坑。", 46],
      ["dust", "/dʌst/", "n.", "尘埃；灰尘", "cosmic dust", "Cosmic dust gathered on the instrument's outer panel.", "宇宙尘埃聚集在仪器外板上。", 46],
      ["ash", "/æʃ/", "n.", "灰；灰烬", "volcanic ash", "The sample contained fine particles of volcanic ash.", "样本含有细小的火山灰颗粒。", 46],
      ["envelope", "/ˈenvələʊp/", "n.", "包层；外壳", "a gaseous envelope", "The planet is surrounded by a thin gaseous envelope.", "这颗行星被一层稀薄的气体包层环绕。", 47],
      ["chunk", "/tʃʌŋk/", "n.", "大块；厚块", "a chunk of rock", "A chunk of rock broke away from the asteroid.", "一大块岩石从小行星上脱落。", 47],
      ["spaceship", "/ˈspeɪsʃɪp/", "n.", "宇宙飞船", "aboard a spaceship", "The crew tested every system aboard the spaceship.", "机组人员测试了宇宙飞船上的每个系统。", 47],
      ["propulsion", "/prəˈpʌlʃən/", "n.", "推进；推进力", "propulsion system", "The propulsion system changed the craft's speed.", "推进系统改变了飞行器的速度。", 47],
      ["pressure", "/ˈpreʃə/", "n.", "压力；压强", "air pressure", "The cabin maintains safe air pressure for the crew.", "舱室为机组人员维持安全气压。", 47],
      ["module", "/ˈmɒdjuːl/", "n.", "舱；模块", "a lunar module", "The lunar module separated from the main spacecraft.", "登月舱与主飞船分离。", 47],
      ["dynamics", "/daɪˈnæmɪks/", "n.", "动力学；动态", "orbital dynamics", "The team modelled the orbital dynamics before launch.", "团队在发射前建立了轨道动力学模型。", 47],
      ["vent", "/vent/", "n.", "通风口；排气口", "an exhaust vent", "Gas escaped through a small vent in the module.", "气体从舱体的一个小排气口逸出。", 47],
      ["tail", "/teɪl/", "n.", "尾部；彗尾", "a comet's tail", "Solar radiation makes a comet's tail visible.", "太阳辐射使彗尾变得可见。", 47],
      ["flyby", "/ˈflaɪbaɪ/", "n.", "飞掠；近旁飞行", "a lunar flyby", "The probe completed a close flyby of the moon.", "探测器完成了一次近距离月球飞掠。", 47],
      ["expedition", "/ˌekspəˈdɪʃən/", "n.", "考察；远征", "a scientific expedition", "The expedition collected samples from the polar region.", "考察队从极地地区采集了样本。", 47],
      ["ecliptic", "/ɪˈklɪptɪk/", "n.", "黄道", "the plane of the ecliptic", "Most planets orbit close to the plane of the ecliptic.", "大多数行星沿接近黄道面的轨道运行。", 48],
      ["spectacle", "/ˈspektəkl/", "n.", "壮观景象；奇观", "a celestial spectacle", "The eclipse created a rare celestial spectacle.", "日食形成了罕见的天文奇观。", 48],
      ["diameter", "/daɪˈæmɪtə/", "n.", "直径", "measure the diameter", "Scientists estimated the asteroid's diameter from the images.", "科学家根据图像估算了小行星的直径。", 48],
      ["radius", "/ˈreɪdiəs/", "n.", "半径", "within a radius", "No debris was detected within a ten-kilometre radius.", "十公里半径内没有探测到碎片。", 48],
      ["substance", "/ˈsʌbstəns/", "n.", "物质", "a chemical substance", "The sample contained an unknown substance.", "样本中含有一种未知物质。", 48],
      ["sample", "/ˈsɑːmpl/", "n.", "样本；样品", "collect a sample", "The rover collected a soil sample near the crater.", "探测车在陨石坑附近采集了土壤样本。", 48],
      ["composition", "/ˌkɒmpəˈzɪʃən/", "n.", "组成；成分", "chemical composition", "The instrument measured the rock's chemical composition.", "仪器测量了岩石的化学成分。", 48],
      ["compound", "/ˈkɒmpaʊnd/", "n.", "化合物", "an organic compound", "The detector identified a simple organic compound.", "探测器识别出一种简单的有机化合物。", 48],
      ["fossil", "/ˈfɒsl/", "n.", "化石", "fossil evidence", "Researchers searched the ancient rock for fossil evidence.", "研究人员在古老岩石中寻找化石证据。", 48],
      ["quantum", "/ˈkwɒntəm/", "n.", "量子；定量", "quantum physics", "Quantum physics explains the behaviour of very small particles.", "量子物理解释极小粒子的行为。", 49],
      ["gas", "/ɡæs/", "n.", "气体", "a cloud of gas", "A cloud of gas surrounded the young star.", "一团气体环绕着这颗年轻恒星。", 49],
      ["fluid", "/ˈfluːɪd/", "n.", "流体；液体", "a dense fluid", "The model shows how a dense fluid moves under pressure.", "模型展示了高密度流体如何在压力下运动。", 49],
      ["solid", "/ˈsɒlɪd/", "n.", "固体", "a solid surface", "The lander touched down on a solid surface.", "着陆器降落在坚实的表面。", 49],
      ["particle", "/ˈpɑːtɪkl/", "n.", "粒子；微粒", "a charged particle", "The sensor detected a stream of charged particles.", "传感器探测到一股带电粒子流。", 49],
      ["synthesise", "/ˈsɪnθəsaɪz/", "v.", "合成；综合", "synthesise a compound", "The laboratory can synthesise the compound under low pressure.", "实验室可以在低压下合成这种化合物。", 49],
      ["atom", "/ˈætəm/", "n.", "原子", "a hydrogen atom", "A hydrogen atom contains one proton and one electron.", "一个氢原子含有一个质子和一个电子。", 49],
      ["formation", "/fɔːˈmeɪʃən/", "n.", "形成；构造", "planet formation", "The model describes the early formation of rocky planets.", "该模型描述了岩石行星的早期形成。", 49],
      ["nuclear", "/ˈnjuːkliə/", "adj.", "原子核的；核能的", "nuclear reaction", "A star produces energy through nuclear reactions.", "恒星通过核反应产生能量。", 49],
      ["molecule", "/ˈmɒlɪkjuːl/", "n.", "分子", "a water molecule", "Each water molecule contains hydrogen and oxygen.", "每个水分子都含有氢和氧。", 49],
      ["dimension", "/daɪˈmenʃən/", "n.", "维度；尺寸", "a third dimension", "The simulation shows the orbit in three dimensions.", "模拟以三维方式展示轨道。", 49],
      ["electron", "/ɪˈlektrɒn/", "n.", "电子", "an orbiting electron", "An electron carries a negative electric charge.", "电子带负电荷。", 49]
    ].map(([word, ipa, pos, meaning, collocation, example, translation, sourcePage]) => ({
      word, ipa, pos, meaning, collocations: [collocation], answers: [word], example, translation,
      source: "雅思词汇真经·Chapter 4", sourcePage
    })),
    5: [
      ["accommodation", "/əˌkɒməˈdeɪʃən/", "n.", "住宿；住处", "student accommodation", "The university provides accommodation for first-year students.", "大学为一年级学生提供住宿。", 63],
      ["canteen", "/kænˈtiːn/", "n.", "食堂；餐厅", "the school canteen", "Students discussed the assignment in the canteen.", "学生们在食堂讨论作业。", 63],
      ["quantity", "/ˈkwɒntəti/", "n.", "数量", "a large quantity of", "The experiment produced a large quantity of data.", "这项实验产生了大量数据。", 63],
      ["author", "/ˈɔːθə/", "n.", "作者", "the original author", "The author explains the theory in the final chapter.", "作者在最后一章解释了这个理论。", 64],
      ["tale", "/teɪl/", "n.", "故事；传说", "a traditional tale", "The class compared two versions of a traditional tale.", "全班比较了一个传统故事的两个版本。", 64],
      ["fiction", "/ˈfɪkʃən/", "n.", "小说；虚构作品", "science fiction", "She chose a work of science fiction for her book report.", "她为读书报告选择了一部科幻作品。", 64],
      ["story", "/ˈstɔːri/", "n.", "故事", "a short story", "Each student analysed the structure of a short story.", "每位学生都分析了一篇短篇故事的结构。", 64],
      ["diary", "/ˈdaɪəri/", "n.", "日记", "keep a diary", "Keeping a study diary helped her review each lesson.", "写学习日记帮助她复习每节课。", 64],
      ["poetry", "/ˈpəʊətri/", "n.", "诗歌", "modern poetry", "The seminar focused on imagery in modern poetry.", "研讨课重点讨论现代诗歌中的意象。", 64],
      ["magazine", "/ˌmæɡəˈziːn/", "n.", "杂志", "an academic magazine", "The library subscribes to an educational magazine.", "图书馆订阅了一本教育杂志。", 64],
      ["journal", "/ˈdʒɜːnl/", "n.", "期刊；日志", "an academic journal", "The study was published in an academic journal.", "这项研究发表在一份学术期刊上。", 64],
      ["coverage", "/ˈkʌvərɪdʒ/", "n.", "报道；覆盖范围", "media coverage", "The project received wide media coverage.", "这个项目得到了广泛的媒体报道。", 64],
      ["bibliography", "/ˌbɪbliˈɒɡrəfi/", "n.", "参考书目", "compile a bibliography", "Every essay must include a complete bibliography.", "每篇论文都必须包含完整的参考书目。", 64],
      ["encyclopedia", "/ɪnˌsaɪkləˈpiːdiə/", "n.", "百科全书", "consult an encyclopedia", "The student consulted an encyclopedia for background information.", "学生查阅百科全书获取背景信息。", 64],
      ["biography", "/baɪˈɒɡrəfi/", "n.", "传记", "write a biography", "She read a biography of the scientist before the lecture.", "她在讲座前读了这位科学家的传记。", 64],
      ["documentary", "/ˌdɒkjuˈmentri/", "n.", "纪录片", "an educational documentary", "The teacher showed an educational documentary in class.", "老师在课堂上播放了一部教育纪录片。", 64],
      ["series", "/ˈsɪəriːz/", "n.", "系列；连续", "a series of lectures", "The department organised a series of public lectures.", "系里组织了一系列公开讲座。", 65],
      ["record", "/ˈrekɔːd/", "n.", "记录；档案", "an academic record", "The registrar updated the student's academic record.", "注册处更新了这名学生的学业记录。", 65],
      ["file", "/faɪl/", "n.", "文件；档案", "a digital file", "Please upload the assignment as a single digital file.", "请将作业作为一个电子文件上传。", 65],
      ["profile", "/ˈprəʊfaɪl/", "n.", "简介；概况", "a student profile", "The platform creates a learning profile for each student.", "平台为每名学生建立学习档案。", 65],
      ["draft", "/drɑːft/", "n.", "草稿", "a first draft", "Her tutor commented on the first draft of the essay.", "导师对她论文的初稿作了评论。", 65],
      ["sketch", "/sketʃ/", "n.", "草图；概述", "a rough sketch", "He drew a rough sketch to explain the experiment.", "他画了一张草图来解释实验。", 65],
      ["brochure", "/ˈbrəʊʃə/", "n.", "小册子", "a course brochure", "The course brochure lists the available modules.", "课程手册列出了可选模块。", 65],
      ["manual", "/ˈmænjuəl/", "n.", "手册；指南", "an instruction manual", "Students followed the laboratory safety manual.", "学生遵循实验室安全手册。", 65],
      ["frame", "/freɪm/", "n.", "框架；构架", "a theoretical frame", "The lecturer provided a frame for analysing the results.", "讲师提供了分析结果的框架。", 65],
      ["catalogue", "/ˈkætəlɒɡ/", "n.", "目录", "the library catalogue", "Use the library catalogue to locate the book.", "使用图书馆目录查找这本书。", 65],
      ["inventory", "/ˈɪnvəntri/", "n.", "清单；目录", "an equipment inventory", "The technician checked the laboratory equipment inventory.", "技术员核对了实验室设备清单。", 65],
      ["index", "/ˈɪndeks/", "n.", "索引", "consult the index", "The index directs readers to the relevant pages.", "索引把读者引向相关页面。", 65],
      ["category", "/ˈkætəɡəri/", "n.", "类别", "a broad category", "Each source was placed in the correct category.", "每项资料都被归入正确类别。", 65],
      ["content", "/ˈkɒntent/", "n.", "内容", "course content", "The tutor updated the course content before term began.", "导师在学期开始前更新了课程内容。", 65],
      ["context", "/ˈkɒntekst/", "n.", "上下文；背景", "in context", "New vocabulary is easier to remember when learned in context.", "在语境中学习新词更容易记住。", 65]
    ].map(([word, ipa, pos, meaning, collocation, example, translation, sourcePage]) => ({
      word, ipa, pos, meaning, collocations: [collocation], answers: [word], example, translation,
      source: "雅思词汇真经·Chapter 5", sourcePage
    }))
  };

  const units = chapterTitles.map(([titleZh, title], index) => ({
    id: `chapter-${String(index + 1).padStart(2, "0")}-unit-01`,
    chapter: index + 1,
    unit: 1,
    title,
    titleZh,
    targetItemCount: 100,
    readinessFloor: 90,
    readinessCeiling: 120,
    targetQuizCount: 50,
    sourceCoverageStatus: index < 5 ? "chapter-source-mapped" : "mapping",
    supplementalItems: supplementalByChapter[index + 1] || [],
    missionIds: []
  }));

  function uniqueCoreWords(missions) {
    const unique = new Map();
    missions.forEach(mission => (mission.newCoreWords || []).forEach(item => {
      const key = String(item.word || "").trim().toLowerCase();
      if (key && !unique.has(key)) unique.set(key, item);
    }));
    return [...unique.values()];
  }

  function hydrate(missions = window.IELTS_QUEST_MISSIONS || []) {
    return units.map(unit => {
      const grouped = missions.filter(mission => Number(mission.chapter) === unit.chapter);
      const words = uniqueCoreWords(grouped);
      const allItems = uniqueCoreWords([{ newCoreWords: [...words, ...unit.supplementalItems] }]);
      const itemCount = allItems.length;
      return Object.freeze({
        ...unit,
        missionIds: grouped.map(mission => mission.id),
        itemCount,
        gapToTarget: Math.max(0, unit.targetItemCount - itemCount),
        contentReady: itemCount >= unit.readinessFloor && itemCount <= unit.readinessCeiling
      });
    });
  }

  window.IELTS_QUEST_UNITS = hydrate();
  window.IELTS_QUEST_UNIT_HELPERS = Object.freeze({ hydrate, uniqueCoreWords });
})();
