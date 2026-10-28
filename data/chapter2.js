
/*
 IELTS Quest — Chapter 2 植物研究
 M7–M14
 请放在 data/chapter2.js
 在 mission.html 中先加载 missions.js，再加载 chapter2.js
*/
(function () {
  const C = (word, meaning, ipa = "") => ({
    word, meaning, ipa, answers: [word]
  });
  const S = (word, meaning) => ({ word, meaning });
  const M = (id, title, titleZh, level, quizCount, story, core, review, support) => ({
    id,
    chapter: 2,
    title,
    titleZh,
    level,
    time: "15–25 min",
    quizCount,
    story: story.map(x => ({ en: x[0], zh: x[1] })),
    newCoreWords: core.map(x => C(...x)),
    reviewWords: review,
    supportWords: support.map(x => S(...x))
  });

  const chapter2 = [
    M(
      7,
      "Inside the Greenhouse",
      "走进植物温室",
      "Easy",
      8,
      [
        ["On Monday morning, Emma visited a botanical greenhouse with her science class.", "星期一早上，Emma和科学课同学参观了一座植物温室。"],
        ["Their guide explained that botany is the scientific study of plants.", "向导解释说，植物学是研究植物的科学。"],
        ["The greenhouse contained many kinds of vegetation, from small herbs to tall perennial plants.", "温室里有许多种植物，从小型香草到高大的多年生植物都有。"],
        ["Some plants needed bright sunlight, while others grew well in softer light.", "有些植物需要充足阳光，另一些在较柔和的光线下也能良好生长。"],
        ["Emma learned that every plant is a living organism that needs water, air and nutrients.", "Emma了解到，每株植物都是需要水、空气和营养物质的生物体。"],
        ["The guide introduced ecology and showed how plants interact with insects, soil and water.", "向导介绍了生态学，并展示植物如何与昆虫、土壤和水相互作用。"],
        ["Together, these living things and their surroundings form an ecosystem.", "这些生物与周围环境共同构成一个生态系统。"],
        ["One section was used for horticulture, where workers cultivated flowers and useful herbs.", "温室的一部分用于园艺，工作人员在那里栽培花卉和有用的香草。"],
        ["Before leaving, Emma noticed a sign encouraging visitors to choose eco-friendly products.", "离开前，Emma注意到一块标牌，鼓励游客选择环保产品。"]
      ],
      [
        ["botanical","植物的；植物学的"],
        ["botany","植物学"],
        ["vegetation","植物；草木"],
        ["herb","药草；香草"],
        ["perennial","多年生植物；长期的"],
        ["organism","有机体；生物"],
        ["ecology","生态学"],
        ["ecosystem","生态系统"],
        ["horticulture","园艺学；园艺"],
        ["eco-friendly","对生态环境友好的"]
      ],
      ["sunlight","environment"],
      [
        ["greenhouse","温室"],
        ["interact","相互作用"],
        ["surroundings","周围环境"],
        ["nutrients","营养物质"]
      ]
    ),

    M(
      8,
      "How a Plant Makes Energy",
      "植物如何获得能量",
      "Easy+",
      10,
      [
        ["A week later, Emma returned to the greenhouse to learn how plants make and use energy.", "一周后，Emma再次来到温室，学习植物如何制造并利用能量。"],
        ["Her teacher placed a healthy leaf under a lamp that produced strong sunlight.", "老师把一片健康的叶子放在一盏能产生强光的灯下。"],
        ["She explained that photosynthesis allows plants to use light energy to make food.", "她解释说，光合作用使植物能够利用光能制造养分。"],
        ["During this process, a plant can absorb carbon dioxide from the air.", "在这一过程中，植物可以从空气中吸收二氧化碳。"],
        ["It uses water and light energy and can release oxygen into the atmosphere.", "植物利用水和光能，并能向大气中释放氧气。"],
        ["Plants also respire, so respiration is another important process in living cells.", "植物也会呼吸，因此呼吸作用也是活细胞中的重要过程。"],
        ["Emma examined a small alga in a water sample and learned that algae can also carry out photosynthesis.", "Emma观察了水样中的一株小型藻类，并了解到藻类也能进行光合作用。"],
        ["The teacher explained that an enzyme can help a chemical reaction happen more efficiently.", "老师解释说，酶可以帮助化学反应更高效地进行。"],
        ["A catalyst can also speed up a reaction without being used up in the process.", "催化剂也能加快反应，而且不会在这一过程中被消耗。"],
        ["Emma understood that energy, gases and chemical reactions are closely connected with plant life.", "Emma明白了能量、气体和化学反应与植物生命密切相关。"]
      ],
      [
        ["photosynthesis","光合作用"],
        ["respire","呼吸"],
        ["respiration","呼吸作用"],
        ["dioxide","二氧化物"],
        ["absorb","吸收"],
        ["release","释放；发布"],
        ["alga","海藻；藻"],
        ["enzyme","酶"],
        ["catalyst","催化剂；促进因素"],
        ["energy","能源；能量；精力"]
      ],
      ["sunlight","atmosphere","organism"],
      [
        ["reaction","反应"],
        ["chemical","化学的"],
        ["sample","样品；样本"]
      ]
    ),

    M(
      9,
      "From Seed to Flower",
      "从种子到开花",
      "Easy+",
      12,
      [
        ["In spring, Emma joined a school experiment that followed plants from seed to flower.", "春天，Emma参加了一项学校实验，观察植物从种子到开花的过程。"],
        ["The students first sowed each seed in warm, moist soil.", "学生们首先把每一粒种子播种在温暖湿润的土壤中。"],
        ["With enough warmth and water, the seeds began to germinate.", "在足够的温度和水分条件下，种子开始发芽。"],
        ["A tiny shoot started to burgeon above the soil, and soon the young plants produced their first leaves.", "嫩芽开始从土壤上方萌发，很快幼苗长出了第一批叶片。"],
        ["Several weeks later, small buds appeared on the strongest plants.", "几周后，最健壮的植物上出现了小花蕾。"],
        ["Some plants began to flower early, while others took longer to blossom.", "有些植物较早开花，而另一些需要更长时间才绽放。"],
        ["When the whole bed was in bloom, the garden was full of colour.", "当整片花坛鲜花盛开时，花园里充满了色彩。"],
        ["The flowers produced a gentle scent, and several aromatic herbs smelled especially strong after rain.", "花朵散发出淡淡香味，几种芳香草本在雨后气味尤其浓郁。"],
        ["Bees carried pollen from one flower to another.", "蜜蜂把花粉从一朵花带到另一朵花。"],
        ["Later in the season, the plants began to ripen and some of them produced fruit.", "到了季节后期，植物开始成熟，其中一些结出了果实。"],
        ["Emma recorded the complete pattern of growth in her notebook.", "Emma在笔记本中记录了完整的生长过程。"]
      ],
      [
        ["sow","播种"],
        ["seed","种子；籽"],
        ["germinate","发芽；开始生长"],
        ["burgeon","发芽；迅速增长"],
        ["bud","芽；花蕾"],
        ["flower","开花；花朵"],
        ["blossom","开花；花朵"],
        ["bloom","花朵；开花"],
        ["scent","气味；香味"],
        ["aromatic","芳香的"],
        ["pollen","花粉；给……授粉"],
        ["ripen","成熟；使成熟"],
        ["fruit","结果实；果实"]
      ],
      ["sunlight","herb"],
      [
        ["moist","湿润的"],
        ["shoot","嫩芽；新枝"],
        ["growth","生长"]
      ]
    ),

    M(
      10,
      "A Day on the Research Farm",
      "研究农场的一天",
      "Medium-",
      15,
      [
        ["Emma's class visited an experimental farm where researchers studied how crops could be grown more efficiently.", "Emma的班级参观了一座实验农场，研究人员在那里研究如何更高效地种植作物。"],
        ["Some of the land was arable, so farmers could cultivate crops there every year.", "部分土地适合耕种，因此农民每年都可以在那里种植作物。"],
        ["The researchers explained that careful cultivation was important for healthy crop growth.", "研究人员解释说，细致的耕作对作物健康生长很重要。"],
        ["Before planting, a tractor was used to plough the soil.", "种植前，人们使用拖拉机犁地。"],
        ["Workers used a spade in smaller plots and a rake to break up rough soil.", "工作人员在较小的地块使用铲子，并用耙子把粗硬的土块弄松。"],
        ["The researchers compared several crop varieties to see which would yield the most food.", "研究人员比较了几个作物品种，以观察哪一种产量最高。"],
        ["They measured how the harvest changed when rainfall and temperature fluctuated.", "他们测量了降雨量和温度波动时收成如何变化。"],
        ["One field had recently been reclaimed and prepared for cultivation.", "其中一块田地最近刚被开垦并准备用于耕种。"],
        ["After the crops were ready, workers could pick vegetables and pluck fruit by hand.", "作物成熟后，工作人员可以用手采摘蔬菜和果实。"],
        ["Dry plant material was placed in a neat stack, while loose material formed a larger heap nearby.", "干燥的植物材料被整齐堆放，而松散材料则在附近形成了一大堆。"],
        ["A worker tied several stems into a bundle and carried a bunch of flowers to the farm shop.", "一名工人把几根茎捆成一束，并把一束鲜花带到农场商店。"],
        ["Inside the shop, the flowers were placed in a vase beside fresh produce from the day's harvest.", "在商店里，鲜花被插在花瓶中，旁边摆着当天收获的新鲜农产品。"],
        ["Emma realised that successful farming depends on both natural conditions and careful human management.", "Emma意识到，成功的农业既依赖自然条件，也依赖细致的人为管理。"]
      ],
      [
        ["arable","适于耕种的"],
        ["cultivate","耕作；培养"],
        ["cultivation","耕种；培养"],
        ["plough","犁；耕地"],
        ["spade","铲；锹"],
        ["rake","耙子；耙"],
        ["yield","出产；产量"],
        ["harvest","收割；收获；收成"],
        ["fluctuate","波动；起伏"],
        ["reclaim","开垦；开拓；利用"],
        ["pick","拾；摘"],
        ["pluck","采；摘"],
        ["stack","堆；垛；堆积"],
        ["heap","大而杂乱的堆"],
        ["bundle","捆；包；束"],
        ["bunch","一束；一串"],
        ["vase","花瓶"]
      ],
      ["rainfall","seed","ripen"],
      [
        ["crop","作物"],
        ["variety","品种"],
        ["management","管理"]
      ]
    ),

    M(
      11,
      "Why Plants Are Different",
      "植物为什么不同",
      "Medium",
      17,
      [
        ["At a university laboratory, Emma met a researcher who studied genetics and plant diversity.", "在一所大学实验室里，Emma遇到了一位研究遗传学和植物多样性的研究人员。"],
        ["The researcher explained that genes influence many characteristics of an organism.", "研究人员解释说，基因会影响生物体的许多特征。"],
        ["Sometimes a mutation changes genetic information and creates a new characteristic.", "有时突变会改变遗传信息并产生新的特征。"],
        ["Natural variation means that individuals of the same species are not exactly identical.", "自然变异意味着同一物种的个体并不完全相同。"],
        ["This variation contributes to biodiversity and can help populations survive changing conditions.", "这种变异有助于形成生物多样性，并能帮助种群在变化的环境中生存。"],
        ["Scientists classify plants by comparing important features such as leaves, flowers, seeds and genetic information.", "科学家通过比较叶片、花、种子和遗传信息等重要特征对植物进行分类。"],
        ["Plants reproduce in different ways, and their offspring may inherit useful characteristics.", "植物以不同方式繁殖，其后代可能继承有用的特征。"],
        ["Over many generations, populations can evolve as some characteristics become more common.", "经过许多代，随着某些特征变得更常见，种群可能逐渐进化。"],
        ["The team was testing hybridisation to combine characteristics from different plant varieties.", "研究团队正在测试杂交技术，以结合不同植物品种的特征。"],
        ["One experimental plant was more productive under dry conditions, while another grew better in shade.", "一种实验植物在干燥条件下产量更高，而另一种在阴凉处生长得更好。"],
        ["Emma saw that plant research does not simply describe nature; it can also influence future agriculture.", "Emma发现，植物研究不仅仅描述自然，也可能影响未来农业。"],
        ["The researcher said that every experimental outcome must be examined carefully before a new variety is widely used.", "研究人员表示，在新品种被广泛使用之前，每一个实验结果都必须经过仔细检验。"]
      ],
      [
        ["genetics","遗传学"],
        ["mutation","突变；变异"],
        ["variation","变种；变异"],
        ["diversity","多样性"],
        ["biodiversity","生物多样性"],
        ["classify","分类"],
        ["reproduce","繁殖"],
        ["evolve","进化；发展"],
        ["hybridisation","杂交"],
        ["productive","多产的；富有成效的"],
        ["experimental","实验的；试验性的"],
        ["outcome","结果"]
      ],
      ["organism","cultivate","shade"],
      [
        ["gene","基因"],
        ["offspring","后代"],
        ["identical","完全相同的"]
      ]
    ),

    M(
      12,
      "From Rainforest to Plantation",
      "从雨林到种植园",
      "Medium",
      19,
      [
        ["For her next field project, Emma travelled to a region where rainforest, jungle and farmland existed close together.", "在下一次野外项目中，Emma前往一个雨林、丛林和农田相邻的地区。"],
        ["The natural rainforest contained dense vegetation and many species living in a complex ecosystem.", "天然雨林中植被茂密，许多物种生活在复杂的生态系统中。"],
        ["Beyond the forest, a large plantation produced crops for local and international markets.", "森林之外，一座大型种植园为本地和国际市场生产作物。"],
        ["Farmers worked in open fields, while crops on a steep hillside were grown on a terrace.", "农民在开阔田地里劳作，而陡峭山坡上的作物则种在梯田上。"],
        ["A forestry officer explained that timber can be useful, but uncontrolled cutting can damage forest ecosystems.", "一名林业工作人员解释说，木材很有用，但无控制的砍伐会破坏森林生态系统。"],
        ["Near a work area, several logs had been cut from large trunks and branches.", "在作业区附近，几根原木由大树干和树枝砍下。"],
        ["The officer showed Emma the root system of a fallen tree and a heavy bough that had broken during a storm.", "工作人员向Emma展示了一棵倒树的根系，以及暴风雨中折断的一根大树枝。"],
        ["In a nearby meadow, grass grew around patches of reed and weed.", "在附近的草地上，青草生长在一片片芦苇和杂草周围。"],
        ["Farther away, workers stored hay and straw for agricultural use.", "更远处，工人储存干草和稻草供农业使用。"],
        ["The research station maintained a lawn with an old olive tree and several pine trees.", "研究站维护着一片草坪，其中有一棵老橄榄树和几棵松树。"],
        ["Emma understood that forests and farms provide useful materials, but they also need careful long-term management.", "Emma明白，森林和农场能提供有用材料，但也需要谨慎的长期管理。"],
        ["Good forestry aims to balance human needs with the health of the wider environment.", "良好的林业管理旨在平衡人类需求与更广泛环境的健康。"]
      ],
      [
        ["rainforest","雨林"],
        ["jungle","热带丛林；密林"],
        ["plantation","种植园；栽植"],
        ["field","原野；场地；野外"],
        ["terrace","梯田；露台"],
        ["forestry","林学；林业"],
        ["timber","木材；林木"],
        ["log","原木；日志"],
        ["trunk","树干；躯干；大箱子"],
        ["branch","树枝；分支"],
        ["root","根；生根"],
        ["bough","大树枝"],
        ["meadow","草地；牧场"],
        ["grass","草；草地"],
        ["reed","芦苇"],
        ["weed","杂草；除杂草"],
        ["hay","干草"],
        ["straw","稻草；麦秆"],
        ["lawn","草坪"],
        ["olive","橄榄；橄榄树"],
        ["pine","松树；松木"]
      ],
      ["vegetation","ecosystem","environment"],
      [
        ["dense","茂密的；密集的"],
        ["uncontrolled","未受控制的"],
        ["balance","平衡"]
      ]
    ),

    M(
      13,
      "When a Forest Is Under Threat",
      "森林受到威胁时",
      "Medium+",
      22,
      [
        ["During a dry summer, Emma joined a conservation team working near a protected forest.", "在一个干燥的夏季，Emma加入了一支在保护林附近工作的自然保护团队。"],
        ["Their main goal was to protect the forest and preserve habitats that supported many species.", "他们的主要目标是保护森林，并保存支撑许多物种生存的栖息地。"],
        ["The team explained that conservation is not only about individual trees but about the whole ecosystem.", "团队解释说，自然保护不仅关乎单棵树木，也关乎整个生态系统。"],
        ["That afternoon, smoke appeared above the hills and a bush fire began to spread.", "当天下午，山丘上方出现烟雾，一场林区大火开始蔓延。"],
        ["Firefighters worked quickly to extinguish the flames before they reached a larger area.", "消防人员迅速行动，在火焰蔓延到更大区域前将其扑灭。"],
        ["Even a short fire can destruct sensitive habitats and ruin years of plant growth.", "即使持续时间很短的火灾也可能破坏脆弱栖息地，毁掉多年植物生长成果。"],
        ["Some young plants may perish, while damaged trunks can later decay or rot.", "一些幼小植物可能死亡，而受损树干之后可能腐烂。"],
        ["If pressure continues for many years, repeated damage can undermine the stability of an ecosystem.", "如果压力持续多年，反复破坏可能逐渐削弱生态系统的稳定性。"],
        ["In extreme cases, rare plant species can move closer to extinction.", "在极端情况下，稀有植物物种可能更接近灭绝。"],
        ["The team studied the impact of fire, land use and climate on the forest.", "团队研究火灾、土地利用和气候对森林的影响。"],
        ["They wanted an effective protection plan that was also efficient enough to use limited staff and money well.", "他们希望制定一套有效的保护方案，同时也要足够高效，以合理使用有限的人力和资金。"],
        ["The final plan included seasonal fire checks and a favourable period for restoring damaged vegetation.", "最终方案包括季节性防火检查，以及恢复受损植被的有利时期。"],
        ["Emma learned that successful conservation depends on understanding both immediate danger and long-term patterns.", "Emma了解到，成功的自然保护既要理解眼前危险，也要理解长期变化模式。"]
      ],
      [
        ["protect","保护"],
        ["preserve","保护；维持；保存"],
        ["conservation","自然环境保护；保存"],
        ["bush fire","林区大火"],
        ["extinguish","扑灭；使破灭"],
        ["destruct","毁坏；自毁"],
        ["ruin","毁坏；毁灭；废墟"],
        ["perish","毁灭；消亡；腐烂"],
        ["decay","腐烂；衰败"],
        ["rot","腐烂；腐坏"],
        ["undermine","逐渐削弱；破坏"],
        ["extinction","灭绝"],
        ["impact","影响"],
        ["effective","有效的"],
        ["efficient","效率高的"],
        ["seasonal","季节性的"],
        ["favourable","有利的；肯定的"],
        ["pattern","模式；式样"]
      ],
      ["ecosystem","vegetation","climate","environment"],
      [
        ["habitat","栖息地"],
        ["sensitive","脆弱的；敏感的"],
        ["restore","恢复"]
      ]
    ),

    M(
      14,
      "Designing the Future Garden",
      "设计未来植物园",
      "Hard",
      26,
      [
        ["At the end of the course, Emma's team was asked to design an experimental garden for a changing climate.", "课程结束时，Emma的小组被要求为变化中的气候设计一座实验植物园。"],
        ["The project had to support biodiversity, remain productive and use water and energy efficiently.", "项目必须支持生物多样性、保持较高产出，并高效利用水和能源。"],
        ["The students examined the surroundings and identified areas with maximal sunlight and areas with minimal direct light.", "学生们考察周围环境，确定阳光最充足和直射光最少的区域。"],
        ["They selected an optimal position for each plant according to its needs.", "他们根据每种植物的需求选择最佳位置。"],
        ["Shade-tolerant plants were placed under taller vegetation, while short-day crops were grown where their exposure to light could be controlled.", "耐阴植物被种在较高植被下方，而短日照作物则种在可以控制光照时间的区域。"],
        ["Because warm and wet conditions can encourage fungus and mould, the team designed better air circulation around the beds.", "由于温暖潮湿的环境可能促进真菌和霉菌生长，团队为种植床设计了更好的空气流通。"],
        ["They measured nutrient uptake and checked whether each plant received enough water without wasting resources.", "他们测量营养物质摄取情况，并检查每株植物是否获得足够水分且不造成资源浪费。"],
        ["A simple irrigation mechanism helped distribute water, while a storage tank acted as a counterbalance during dry periods.", "一套简单的灌溉机制帮助分配水分，而储水箱在干旱时期起到调节平衡的作用。"],
        ["The group compared considerable differences in growth between several experimental varieties.", "小组比较了几个实验品种之间相当明显的生长差异。"],
        ["One variety produced a massive amount of leaves but little fruit, while another showed immense root growth.", "一个品种长出了大量叶片却很少结果，而另一个品种的根系生长非常旺盛。"],
        ["The students recorded carbon emission estimates for the equipment and tried to reduce unnecessary energy use.", "学生们记录设备的碳排放估算，并尝试减少不必要的能源使用。"],
        ["They discussed whether introducing a new plant could infringe environmental rules or create an unexpected ecological impact.", "他们讨论了引入新植物是否可能违反环境规定，或造成意外的生态影响。"],
        ["No single method produced a perfect outcome, so the team adjusted the design after each trial.", "没有任何一种方法能产生完美结果，因此团队在每次试验后都会调整设计。"],
        ["By combining botany, genetics, horticulture and conservation, Emma saw how plant research could solve practical problems.", "通过结合植物学、遗传学、园艺学和自然保护，Emma看到了植物研究如何解决实际问题。"],
        ["The final garden was not simply attractive; it was a small model of how scientific knowledge could help people protect ecosystems while producing useful crops.", "最终的植物园不仅美观，它还是一个小型模型，展示科学知识如何帮助人们在生产有用作物的同时保护生态系统。"]
      ],
      [
        ["maximal","最大的"],
        ["minimal","最小的；极小的"],
        ["optimal","最佳的；最理想的"],
        ["shade-tolerant","耐阴的"],
        ["short-day","短日照的"],
        ["fungus","真菌"],
        ["mould","霉菌；发霉"],
        ["circulation","流通；循环"],
        ["uptake","摄取；领会"],
        ["nutrient","营养物质"],
        ["mechanism","机制；构造"],
        ["counterbalance","平衡力；抵消"],
        ["considerable","相当多的；相当大的"],
        ["massive","巨大的；大规模的"],
        ["immense","巨大的"],
        ["emission","排放；排放物"],
        ["infringe","侵犯；违反"]
      ],
      [
        "biodiversity",
        "productive",
        "energy",
        "experimental",
        "outcome",
        "botany",
        "genetics",
        "horticulture",
        "conservation",
        "ecosystem",
        "impact",
        "vegetation"
      ],
      [
        ["exposure","暴露；接触"],
        ["irrigation","灌溉"],
        ["trial","试验"]
      ]
    )
  ];

  window.IELTS_QUEST_MISSIONS = [
    ...(window.IELTS_QUEST_MISSIONS || []),
    ...chapter2
  ];
})();
