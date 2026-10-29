
/* IELTS Quest | Chapter 3 | 动物保护 */
(function () {
const M = (id,title,titleZh,level,quizCount,story,core,review,support) => ({
  id,chapter:3,title,titleZh,level,quizCount,
  story:story.map(([en,zh])=>({en,zh})),
  newCoreWords:core.map(([word,meaning])=>({
    word,ipa:"",meaning,answers:[word]
  })),
  reviewWords:review,
  supportWords:support.map(([word,meaning])=>({word,meaning}))
});

const data = [
M(15,"The Wildlife Survey","野生动物调查","Easy",8,
[
["Emma met a biologist and a zoologist at a wildlife centre.","Emma在野生动物中心见到一位生物学家和一位动物学家。"],
["They explained that wildlife includes many different species.","他们解释说，野生动物包括许多不同物种。"],
["A mammal usually feeds its young with milk, while a reptile has a different body structure.","哺乳动物通常用乳汁喂养幼崽，而爬行动物的身体结构不同。"],
["A primate is a member of a group that includes monkeys and humans.","灵长类动物所属的类群包括猴子和人类。"],
["A vertebrate has a backbone, but many insects do not.","脊椎动物有脊柱，但许多昆虫没有。"],
["The guide called all the animals of the region its fauna and all its plants its flora.","向导把该地区所有动物称为动物群，把所有植物称为植物群。"],
["Emma realised that each creature plays a role in the ecosystem.","Emma意识到每一种生物都在生态系统中发挥作用。"]
],
[
["biologist","生物学家"],["zoologist","动物学家"],
["wildlife","野生动物"],["species","物种"],
["mammal","哺乳动物"],["reptile","爬行动物"],
["primate","灵长类动物"],["vertebrate","脊椎动物"],
["fauna","动物群"],["flora","植物群"],
["creature","生物；动物"]
],
["ecosystem","organism"],
[["backbone","脊柱"]]
),

M(16,"A Morning with the Herd","动物群的一天","Easy+",9,
[
["At sunrise, Emma watched a herd of deer move through the valley.","日出时，Emma看着一群鹿穿过山谷。"],
["Above them, a flock of birds crossed the sky.","它们上方，一群鸟飞过天空。"],
["Near a tree, a swarm of insects gathered around flowers.","树旁，一大群昆虫聚集在花朵周围。"],
["The guide explained that every animal has an ancestor and may leave descendants.","向导解释说，每种动物都有祖先，也可能留下后代。"],
["Some offspring stay close to their parents until they mature.","有些幼崽在成熟之前一直待在父母身边。"],
["During the breeding season, animals may choose a mate and reproduce.","在繁殖季节，动物可能选择配偶并繁殖。"],
["A farmer nearby kept a small subgroup of sheep separate from the larger herd.","附近一位农民把一小群羊与大羊群分开。"],
["Emma learned that animal groups change as young animals grow.","Emma了解到，动物群体会随着幼崽成长而变化。"]
],
[
["herd","兽群；牧群"],["flock","鸟群；羊群"],
["swarm","昆虫群"],["ancestor","祖先"],
["descendant","后代"],["offspring","子代；幼崽"],
["mature","成熟"],["breed","繁殖；品种"],
["mate","配偶；交配"],["reproduce","繁殖"],
["subgroup","小组；亚群"]
],
["species","wildlife"],
[["valley","山谷"],["breeding season","繁殖季节"]]
),

M(17,"Clues by the River","河边的动物线索","Medium-",11,
[
["Emma followed a track beside the river and found the trace of a fox.","Emma沿河边的足迹前进，发现狐狸留下的痕迹。"],
["The fox had sharp claws, while a nearby bird used its beak to pick up food.","狐狸有锋利的爪子，而附近一只鸟用喙拾取食物。"],
["The bird spread its wings, and a loose feather fell to the ground.","鸟儿展开翅膀，一根松动的羽毛落到地上。"],
["A small mammal with thick fur hid behind a rock.","一只皮毛厚实的小型哺乳动物躲在石头后。"],
["An insect landed on Emma's sleeve but did not bite or sting her.","一只昆虫落在Emma袖子上，但没有咬她或蜇她。"],
["Far away, a dog began to bark, and a larger animal gave a deep roar.","远处一只狗开始吠叫，一只更大的动物发出低沉的吼声。"],
["The guide said that animal behaviour can reveal where food and danger are found.","向导说，动物行为可以揭示食物和危险的位置。"],
["Emma recorded each observation rather than disturbing the animals.","Emma记录了每项观察，而没有打扰动物。"]
],
[
["track","足迹；追踪"],["trace","痕迹；追溯"],
["fox","狐狸"],["claw","爪子"],["beak","鸟喙"],
["wing","翅膀"],["feather","羽毛"],["fur","毛皮"],
["insect","昆虫"],["bite","咬"],["sting","蜇；刺痛"],
["bark","吠叫"],["roar","吼叫"],["behaviour","行为"]
],
["mammal","species"],
[["sleeve","袖子"],["observation","观察"]]
),

M(18,"The Night Watch","夜间观察","Medium",12,
[
["The team returned after dark to observe nocturnal animals.","团队天黑后返回，观察夜行性动物。"],
["Some animals creep quietly through the grass, guided by instinct.","有些动物凭借本能悄悄爬过草地。"],
["Others become dormant in cold weather, and some enter hibernation.","另一些动物在寒冷天气中进入休眠状态，有些还会冬眠。"],
["A predator searched for prey, but the prey escaped into a narrow hole.","一只捕食者寻找猎物，但猎物逃进一个狭窄的洞。"],
["The guide explained that a carnivore may devour meat while a herbivore feeds on plants.","向导解释说，食肉动物可能吞食肉类，而食草动物以植物为食。"],
["Animals also secrete useful substances and excrete waste.","动物还会分泌有用物质并排泄废物。"],
["A sensitive animal may detect a sound that humans cannot hear.","敏感的动物可能察觉到人类听不到的声音。"],
["Emma was surprised by the intelligence of some animals and their intuitive responses to danger.","一些动物的智力及其对危险的直觉反应令Emma惊讶。"]
],
[
["nocturnal","夜间活动的"],["creep","缓慢爬行"],
["instinct","本能"],["dormant","休眠的"],
["hibernation","冬眠"],["predator","捕食者"],
["prey","猎物"],["carnivore","食肉动物"],
["devour","吞食"],["herbivore","食草动物"],
["secrete","分泌"],["excrete","排泄"],
["sensitive","敏感的"],["intelligence","智力"],
["intuitive","直觉的"]
],
["behaviour","wildlife"],
[["detect","察觉"],["substance","物质"]]
),

M(19,"The Rescue Centre","救护中心","Medium+",10,
[
["Emma visited a rescue centre where a keeper cared for vulnerable animals.","Emma参观了一个救护中心，饲养员在那里照顾脆弱的动物。"],
["Some animals had suffered injuries, while others had been kept captive.","有些动物受过伤，另一些曾被圈养。"],
["A shepherd had found a young animal far from its herd and brought it for treatment.","一位牧羊人在远离兽群的地方发现一只幼崽，并把它送来治疗。"],
["The centre did not try to tame every animal because wild behaviour can be essential for survival.","中心没有试图驯服所有动物，因为野生行为可能对生存至关重要。"],
["Staff worked to protect species threatened by habitat loss and possible extermination.","工作人员努力保护受到栖息地丧失和可能被消灭威胁的物种。"],
["They explained that subsistence becomes difficult when an animal cannot find enough food.","他们解释说，当动物找不到足够食物时，维持生存就会变得困难。"],
["The goal was to help animals exist safely in the wild rather than depend permanently on people.","目标是帮助动物在野外安全生存，而不是永久依赖人类。"],
["Emma prepared a report about conservation and the ethical treatment of wildlife.","Emma写了一份关于自然保护和善待野生动物的报告。"],
["She noted that a defensive response can occur after an animal undergoes stress, and that people must not exterminate threatened species.","她指出，动物经历压力后可能出现防御反应，而人们绝不能消灭受威胁的物种。"]
],
[
["keeper","饲养员"],["vulnerable","脆弱的；易受伤害的"],
["suffer","遭受"],["captive","被关押的"],
["shepherd","牧羊人"],["tame","驯服"],
["exterminate","消灭；根除"],
["subsistence","勉强维持生活"],
["exist","存在；生存"],
["defensive","防御性的"],
["undergo","经历；经受"]
],
["conservation","wildlife","species"],
[["injury","受伤"],["ethical","伦理的"]]
),

M(20,"A Plan for the Wild","野生动物保护方案","Hard",10,
[
["Emma's final assignment was to design a wildlife monitoring programme.","Emma的最终作业是设计一项野生动物监测方案。"],
["A biologist would classify species and record the size of each herd, flock and swarm.","生物学家将对物种分类，并记录各兽群、鸟群和虫群的规模。"],
["A zoologist would track predators and prey without changing their natural behaviour.","动物学家将在不改变自然行为的前提下追踪捕食者和猎物。"],
["The team would compare breeding success, offspring survival and signs of disease.","团队将比较繁殖成功率、幼崽存活情况以及疾病迹象。"],
["They would also examine whether nocturnal animals were disturbed by artificial light.","他们还会检查夜行性动物是否受到人造光干扰。"],
["Some species were especially vulnerable because their habitats were becoming smaller.","一些物种因栖息地不断缩小而尤其脆弱。"],
["The researchers hoped to preserve biodiversity and prevent extinction through practical conservation measures.","研究人员希望通过切实可行的保护措施保存生物多样性并防止灭绝。"],
["Emma concluded that protecting wildlife requires scientific evidence, patient observation and cooperation with local communities.","Emma得出结论：保护野生动物需要科学证据、耐心观察以及与当地社区合作。"]
],
[
["monitoring","监测"],["classify","分类"],
["breeding","繁殖"],["survival","存活"],
["artificial","人工的"],["habitat","栖息地"],
["biodiversity","生物多样性"],
["extinction","灭绝"],["preserve","保护；保存"],
["conservation","自然保护"]
],
[
"biologist","zoologist","species","predator",
"prey","offspring","nocturnal","vulnerable"
],
[["evidence","证据"],["cooperation","合作"]]
)
];

window.IELTS_QUEST_MISSIONS = [
  ...(window.IELTS_QUEST_MISSIONS || []),
  ...data
];
})();
