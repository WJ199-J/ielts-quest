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
    sourceCoverageStatus: index === 0 ? "chapter-source-mapped" : "mapping",
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
