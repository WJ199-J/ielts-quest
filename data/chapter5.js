/* IELTS Quest course source; existing story IDs and text preserved. Missing pronunciation supplied with per-word provenance. */
(function(){
const data=[
  {
    "id": 27,
    "chapter": 5,
    "title": "A New Campus",
    "titleZh": "走进新校园",
    "level": "Medium",
    "quizCount": 12,
    "story": [
      {
        "en": "Emma arrived at the university campus for orientation.",
        "zh": "Emma来到大学校园参加迎新活动。"
      },
      {
        "en": "As a fresher, she needed to register and enrol on her first course.",
        "zh": "作为一名大学新生，她需要登记并注册第一门课程。"
      },
      {
        "en": "A senior student showed her the dorm and the dining hall.",
        "zh": "一名高年级学生带她参观宿舍和食堂。"
      },
      {
        "en": "The library was beside a modern laboratory, where students could conduct an experiment.",
        "zh": "图书馆紧邻现代实验室，学生们可以在那里进行实验。"
      },
      {
        "en": "Emma was a novice at university life, but her mentor promised to help her acquire knowledge.",
        "zh": "Emma对大学生活还很陌生，但导师答应帮助她获取知识。"
      },
      {
        "en": "By evening, she felt that education was a journey rather than a single examination.",
        "zh": "傍晚时，她觉得教育是一段旅程，而不只是一次考试。"
      }
    ],
    "newCoreWords": [
      {
        "word": "university",
        "ipa": "/ˌjunəˈvɝsəti/",
        "meaning": "大学",
        "answers": [
          "university"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "campus",
        "ipa": "/ˈkæmpəs/",
        "meaning": "校园",
        "answers": [
          "campus"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "orientation",
        "ipa": "/ˌɔɹiɛnˈteɪʃən/",
        "meaning": "迎新介绍",
        "answers": [
          "orientation"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "fresher",
        "ipa": "/ˈfɹɛʃɚ/",
        "meaning": "大学一年级新生",
        "answers": [
          "fresher"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "register",
        "ipa": "/ˈɹɛdʒɪstɚ/",
        "meaning": "登记；注册",
        "answers": [
          "register"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "enrol",
        "ipa": "/ɛnˈɹoʊl/",
        "meaning": "注册课程",
        "answers": [
          "enrol"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "senior",
        "ipa": "/ˈsinjɚ/",
        "meaning": "高年级学生",
        "answers": [
          "senior"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "dorm",
        "ipa": "/ˈdɔɹm/",
        "meaning": "宿舍",
        "answers": [
          "dorm"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "dining hall",
        "ipa": "/ˈdaɪnɪŋ ˈhɔl/",
        "meaning": "食堂",
        "answers": [
          "dining hall"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "library",
        "ipa": "/ˈlaɪbɹɛˌɹi/",
        "meaning": "图书馆",
        "answers": [
          "library"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "laboratory",
        "ipa": "/ˈlæbɹəˌtɔɹi/",
        "meaning": "实验室",
        "answers": [
          "laboratory"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "experiment",
        "ipa": "/ɪkˈspɛɹəmənt/",
        "meaning": "实验",
        "answers": [
          "experiment"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "novice",
        "ipa": "/ˈnɑvəs/",
        "meaning": "新手",
        "answers": [
          "novice"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "mentor",
        "ipa": "/ˈmɛnˌtɔɹ/",
        "meaning": "导师",
        "answers": [
          "mentor"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "acquire",
        "ipa": "/əˈkwaɪɚ/",
        "meaning": "获得",
        "answers": [
          "acquire"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "knowledge",
        "ipa": "/ˈnɑlədʒ/",
        "meaning": "知识",
        "answers": [
          "knowledge"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "education",
        "ipa": "/ˌɛdʒəˈkeɪʃən/",
        "meaning": "教育",
        "answers": [
          "education"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      }
    ],
    "reviewWords": [
      "ecosystem"
    ],
    "supportWords": [
      {
        "word": "conduct",
        "meaning": "开展",
        "ipa": "/ˈkɑndəkt/ 或 /kɑˈndʌkt/",
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      }
    ]
  },
  {
    "id": 28,
    "chapter": 5,
    "title": "Learning Beyond the Textbook",
    "titleZh": "课堂之外的学习",
    "level": "Medium+",
    "quizCount": 12,
    "story": [
      {
        "en": "During the first semester, Emma followed a busy timetable and a detailed syllabus.",
        "zh": "第一个学期，Emma按照繁忙的课程表和详细的教学大纲学习。"
      },
      {
        "en": "Her curriculum included a compulsory seminar on scientific thinking.",
        "zh": "她的课程体系包括一门关于科学思维的必修研讨课。"
      },
      {
        "en": "The professor used a practical problem to inspire the class and stimulate discussion.",
        "zh": "教授用一个实际问题启发全班并激发讨论。"
      },
      {
        "en": "He wanted to emphasise that students should not cram facts without understanding them.",
        "zh": "他强调学生不应在不理解的情况下死记硬背。"
      },
      {
        "en": "A clear explanation could enable a beginner to grasp even an obscure idea.",
        "zh": "清晰的解释可以使初学者理解甚至晦涩的概念。"
      },
      {
        "en": "Emma worked with classmates to solve a puzzle, and the experience helped enhance her confidence.",
        "zh": "Emma和同学合作解决难题，这段经历增强了她的信心。"
      },
      {
        "en": "Before the deadline, the group prepared a presentation for an academic forum.",
        "zh": "截止日期之前，小组为学术论坛准备了展示。"
      }
    ],
    "newCoreWords": [
      {
        "word": "semester",
        "ipa": "/səˈmɛstɚ/",
        "meaning": "学期",
        "answers": [
          "semester"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "timetable",
        "ipa": "/ˈtaɪmˌteɪbəl/",
        "meaning": "课程表",
        "answers": [
          "timetable"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "syllabus",
        "ipa": "/ˈsɪləbəs/",
        "meaning": "教学大纲",
        "answers": [
          "syllabus"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "curriculum",
        "ipa": "/kɚˈɪkjələm/",
        "meaning": "课程体系",
        "answers": [
          "curriculum"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "compulsory",
        "ipa": "/kəmˈpʌlsɚi/",
        "meaning": "必修的；强制的",
        "answers": [
          "compulsory"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "seminar",
        "ipa": "/ˈsɛməˌnɑɹ/",
        "meaning": "研讨会",
        "answers": [
          "seminar"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "practical",
        "ipa": "/ˈpɹæktəkəl/",
        "meaning": "实际的",
        "answers": [
          "practical"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "inspire",
        "ipa": "/ˌɪnˈspaɪɹ/",
        "meaning": "激励；启发",
        "answers": [
          "inspire"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "stimulate",
        "ipa": "/ˈstɪmjəˌleɪt/",
        "meaning": "激发",
        "answers": [
          "stimulate"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "emphasise",
        "ipa": "/ˈemfəsaɪz/",
        "meaning": "强调",
        "answers": [
          "emphasise"
        ],
        "ipaAccent": "en-GB",
        "ipaSource": "人工校订英式宽式音标"
      },
      {
        "word": "cram",
        "ipa": "/ˈkɹæm/",
        "meaning": "临时死记硬背",
        "answers": [
          "cram"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "enable",
        "ipa": "/ɛˈneɪbəl/",
        "meaning": "使能够",
        "answers": [
          "enable"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "obscure",
        "ipa": "/əbˈskjʊɹ/",
        "meaning": "晦涩的",
        "answers": [
          "obscure"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "puzzle",
        "ipa": "/ˈpʌzəl/",
        "meaning": "难题",
        "answers": [
          "puzzle"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "enhance",
        "ipa": "/ɛnˈhæns/",
        "meaning": "提高；增强",
        "answers": [
          "enhance"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "deadline",
        "ipa": "/ˈdɛdˌlaɪn/",
        "meaning": "截止日期",
        "answers": [
          "deadline"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "academic",
        "ipa": "/ˌækəˈdɛmɪk/",
        "meaning": "学术的",
        "answers": [
          "academic"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "forum",
        "ipa": "/ˈfɔɹəm/",
        "meaning": "论坛",
        "answers": [
          "forum"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      }
    ],
    "reviewWords": [
      "knowledge",
      "experiment"
    ],
    "supportWords": [
      {
        "word": "grasp",
        "meaning": "理解",
        "ipa": "/ˈɡɹæsp/",
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      }
    ]
  },
  {
    "id": 29,
    "chapter": 5,
    "title": "The Research Assignment",
    "titleZh": "研究作业",
    "level": "Hard-",
    "quizCount": 12,
    "story": [
      {
        "en": "Emma joined an institute to study how students develop expertise.",
        "zh": "Emma加入一个研究所，研究学生如何形成专业能力。"
      },
      {
        "en": "Her supervisor asked her to distinguish quantitative data from qualitative evidence.",
        "zh": "导师要求她区分定量数据与定性证据。"
      },
      {
        "en": "She read an article and compared its argument with recent literature.",
        "zh": "她阅读一篇文章，并将其论点与近期文献比较。"
      },
      {
        "en": "A controversial issue emerged when two researchers reached different conclusions.",
        "zh": "两位研究人员得出不同结论时，一个有争议的问题出现了。"
      },
      {
        "en": "Emma developed a hypothesis and planned an empirical test.",
        "zh": "Emma提出假设，并计划进行实证检验。"
      },
      {
        "en": "The team used a systematic method to analyse the results and assess their quality.",
        "zh": "团队采用系统方法分析结果并评估质量。"
      },
      {
        "en": "Their findings suggested that motivation matters, but the effect depends on context.",
        "zh": "研究发现表明动机很重要，但效果取决于具体情境。"
      },
      {
        "en": "She learned that a scholar must acknowledge uncertainty rather than claim perfect knowledge.",
        "zh": "她认识到学者必须承认不确定性，而不能声称拥有完美知识。"
      }
    ],
    "newCoreWords": [
      {
        "word": "institute",
        "ipa": "/ˈɪnstəˌtut/",
        "meaning": "研究所",
        "answers": [
          "institute"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "expertise",
        "ipa": "/ˌɛkspɚˈtiz/",
        "meaning": "专业知识",
        "answers": [
          "expertise"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "quantitative",
        "ipa": "/ˈkwɑntɪˌteɪtɪv/",
        "meaning": "定量的",
        "answers": [
          "quantitative"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "data",
        "ipa": "/ˈdeɪtə/",
        "meaning": "数据",
        "answers": [
          "data"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "qualitative",
        "ipa": "/ˈkwɑləˌteɪtɪv/",
        "meaning": "定性的",
        "answers": [
          "qualitative"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "evidence",
        "ipa": "/ˈɛvədəns/",
        "meaning": "证据",
        "answers": [
          "evidence"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "article",
        "ipa": "/ˈɑɹtəkəl/",
        "meaning": "文章",
        "answers": [
          "article"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "literature",
        "ipa": "/ˈlɪtɚətʃɚ/",
        "meaning": "文献",
        "answers": [
          "literature"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "controversial",
        "ipa": "/ˌkɑntɹəˈvɝʃəl/",
        "meaning": "有争议的",
        "answers": [
          "controversial"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "issue",
        "ipa": "/ˈɪʃu/",
        "meaning": "问题",
        "answers": [
          "issue"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "hypothesis",
        "ipa": "/haɪˈpɑθəsəs/",
        "meaning": "假设",
        "answers": [
          "hypothesis"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "empirical",
        "ipa": "/ˌɛmˈpɪɹɪkəl/",
        "meaning": "实证的",
        "answers": [
          "empirical"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "systematic",
        "ipa": "/ˌsɪstəˈmætɪk/",
        "meaning": "系统的",
        "answers": [
          "systematic"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "analyse",
        "ipa": "/ˈænəˌlaɪz/",
        "meaning": "分析",
        "answers": [
          "analyse"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "assess",
        "ipa": "/əˈsɛs/",
        "meaning": "评估",
        "answers": [
          "assess"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "quality",
        "ipa": "/ˈkwɑləti/",
        "meaning": "质量",
        "answers": [
          "quality"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "motivation",
        "ipa": "/ˌmoʊtəˈveɪʃən/",
        "meaning": "动机",
        "answers": [
          "motivation"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "scholar",
        "ipa": "/ˈskɑlɚ/",
        "meaning": "学者",
        "answers": [
          "scholar"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      }
    ],
    "reviewWords": [
      "experiment",
      "scientific research"
    ],
    "supportWords": [
      {
        "word": "supervisor",
        "meaning": "指导老师",
        "ipa": "/ˈsupɚˌvaɪzɚ/",
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      }
    ]
  },
  {
    "id": 30,
    "chapter": 5,
    "title": "Designing a Better School",
    "titleZh": "设计更好的学校",
    "level": "Hard",
    "quizCount": 12,
    "story": [
      {
        "en": "At the end of the year, Emma proposed a scheme to improve secondary education.",
        "zh": "学年末，Emma提出一项改善中等教育的方案。"
      },
      {
        "en": "She argued that every literate student should also become numerate.",
        "zh": "她认为每位具备读写能力的学生也应具备计算能力。"
      },
      {
        "en": "The primary objective was to develop intellectual independence rather than reward memorisation.",
        "zh": "首要目标是培养独立思考能力，而非奖励机械记忆。"
      },
      {
        "en": "Her team compared traditional lessons with a flexible learning platform.",
        "zh": "她的团队比较传统课程与灵活的学习平台。"
      },
      {
        "en": "They wanted to motivate students, but they also needed to evaluate measurable achievement.",
        "zh": "他们希望激励学生，但也需要评估可衡量的成就。"
      },
      {
        "en": "The proposed system combined fundamental skills with advanced research projects.",
        "zh": "拟议体系将基础技能与高级研究项目结合。"
      },
      {
        "en": "Emma presented the plan to a panel of alumni and educational experts.",
        "zh": "Emma向校友和教育专家组成的评审团介绍方案。"
      },
      {
        "en": "Their feedback showed that genuine progress requires both discipline and creativity.",
        "zh": "反馈表明真正的进步既需要自律，也需要创造力。"
      }
    ],
    "newCoreWords": [
      {
        "word": "scheme",
        "ipa": "/ˈskim/",
        "meaning": "方案",
        "answers": [
          "scheme"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "secondary",
        "ipa": "/ˈsɛkəˌndɛɹi/",
        "meaning": "中等教育的",
        "answers": [
          "secondary"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "literate",
        "ipa": "/ˈlɪtɚət/",
        "meaning": "有读写能力的",
        "answers": [
          "literate"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "numerate",
        "ipa": "/ˈnuməɹət/",
        "meaning": "有计算能力的",
        "answers": [
          "numerate"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "primary",
        "ipa": "/ˈpɹaɪˌmɛɹi/",
        "meaning": "首要的；初级的",
        "answers": [
          "primary"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "intellectual",
        "ipa": "/ˌɪntəˈlɛktʃuəl/",
        "meaning": "智力的",
        "answers": [
          "intellectual"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "platform",
        "ipa": "/ˈplætˌfɔɹm/",
        "meaning": "平台",
        "answers": [
          "platform"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "motivate",
        "ipa": "/ˈmoʊtəˌveɪt/",
        "meaning": "激励",
        "answers": [
          "motivate"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "evaluate",
        "ipa": "/ɪˈvæljuˌeɪt/",
        "meaning": "评估",
        "answers": [
          "evaluate"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "achievement",
        "ipa": "/əˈtʃivmənt/",
        "meaning": "成就",
        "answers": [
          "achievement"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "system",
        "ipa": "/ˈsɪstəm/",
        "meaning": "体系",
        "answers": [
          "system"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "fundamental",
        "ipa": "/ˌfʌndəˈmɛntəl/",
        "meaning": "基础的",
        "answers": [
          "fundamental"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "advanced",
        "ipa": "/əˈdvænst/",
        "meaning": "高级的",
        "answers": [
          "advanced"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "alumni",
        "ipa": "/əˈlʌˌmnaɪ/",
        "meaning": "校友",
        "answers": [
          "alumni"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "educational",
        "ipa": "/ˌɛdʒəˈkeɪʃənəl/",
        "meaning": "教育的",
        "answers": [
          "educational"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      },
      {
        "word": "discipline",
        "ipa": "/ˈdɪsəplən/",
        "meaning": "纪律；训练",
        "answers": [
          "discipline"
        ],
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      }
    ],
    "reviewWords": [
      "curriculum",
      "academic",
      "practical"
    ],
    "supportWords": [
      {
        "word": "panel",
        "meaning": "评审小组",
        "ipa": "/ˈpænəl/",
        "ipaAccent": "en-US",
        "ipaSource": "CMU Pronouncing Dictionary · broad ARPAbet mapping"
      }
    ]
  }
];
window.IELTS_QUEST_MISSIONS=[...(window.IELTS_QUEST_MISSIONS||[]),...data.filter(m=>!(window.IELTS_QUEST_MISSIONS||[]).some(old=>Number(old.id)===Number(m.id)))];
})();
