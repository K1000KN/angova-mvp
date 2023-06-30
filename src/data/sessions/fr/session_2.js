export const session2 = {
  id: 2,
  topic: "Session",
  totalquestions: 40,
  perQuestionScore: 1,
  image: "./images/session2.png",
  title: "Session 2",
  description: "Session 2",

  quizz: [
    {
      id: 41,
      questions: ["Le geste de la cycliste m'indique :"],
      choices: [
        "A qu'elle va doubler la voiture noire par la droite",
        "B qu'elle tourne à droite",
      ],
      correctAnswer: [1],
      explaination:
        "Que signifie le geste de la cycliste ? N’ayant aucun clignotant ni feux stop, un cycliste ne peut communiquer que par gestes. Ici, la cycliste a tourné la tête pour contrôler la présence d’un véhicule à l’arrière puis a indiqué la droite avec son bras. Cela signifie qu'elle va donc tourner dans la prochaine rue à droite. Il est possible qu’elle se déporte légèrement sur la gauche pour ne pas trop serrer son virage. Je reste prudent et derrière elle.",
      assets: {
        img: ["../session/img/q41.jpeg"],
        
        question: "../session/fr/audio/q41.mp3",
        explaination: "../session/fr/audio/exp41.mp3",
      },
    },
    {
      id: 42,
      questions: ["Faire un appel lumineux de jour peut être sanctionné :"],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        "Pour quelle raison puis-je faire un appel lumineux de jour ? Pour communiquer avec les usagers en face de moi. Par exemple pour les inviter à passer avant moi. Faire un appel de phare n'est pas illégal.",
      assets: {
        img: ["../session/img/q42.jpeg"],
        
        question: "../session/fr/audio/q42.mp3",
        explaination: "../session/fr/audio/exp42.mp3",
      },
    },
    {
      id: 43,
      questions: [
        "Après avoir effectué une vidange, l'huile moteur doit être vidée :",
      ],
      choices: ["A dans les égouts", "B ou à la déchetterie"],
      correctAnswer: [1],
      explaination:
        "Puis-je utiliser n'importe quelle huile moteur ? Les huiles sont plus ou moins visqueuses. Une huile pas adaptée au moteur de ma voiture peut créer de graves soucis mécaniques. Je dois être vigilant aux indications présentes dans le carnet d'entretien et dans la notice d'utilisation. La vidange peut être réalisée par mes soins ou par un garagiste. Dans tous les cas, l'huile usagée doit être jetée à la déchetterie.",
      assets: {
        img: ["../session/img/q43.jpeg"],
        
        question: "../session/fr/audio/q43.mp3",
        explaination: "../session/fr/audio/exp43.mp3",
      },
    },
    {
      id: 44,
      questions: [" ",
        "Dans cette configuration, je peux rouler sans danger :",
        "Je mets en danger mon chien :"
      ],
      choices: ["A Oui", "B Non", "C Oui", "D Non"],
      correctAnswer: [1, 2],
      explaination:
        "Quels sont les risques avec un animal ? Même si vous pensez bien le connaître, un animal peut avoir des réactions imprévisibles lorsqu’il se trouve dans un véhicule, vous empêchant alors de rester concentré sur votre conduite. Il peut également être blessé en cas de freinage brutal. Pour éviter tout risque, les animaux doivent être installés dans le coffre ou à l’arrière avec une ceinture adaptée.",
      assets: {
        img: ["../session/img/q44.jpeg"],
        
        question: "../session/fr/audio/q44.mp3",
        explaination: "../session/fr/audio/exp44.mp3",
      },
    },
    {
      id: 45,
      questions: [
        "Lorsque je m'éloigne du véhicule :",
        "- je laisse le certificat d'immatriculation à l'intérieur",
        "- je retire tous les objets de valeurs apparents",
      ],
      choices: ["A Oui", "B Non", "C Oui", "D Non"],
      correctAnswer: [1, 2],
      explaination:
        "Pourquoi faut-il prendre certaines précautions avant de s'éloigner du véhicule ?\nPour éviter de tenter les voleurs. Je vérifie qu'aucun objet de valeur ne soit apparent, que j'ai pris les documents importants avec moi et que toutes les vitres et portières sont fermées.",
      assets: {
        img: ["../session/img/q45.jpeg"],
        
        question: "../session/fr/audio/q45.mp3",
        explaination: "../session/fr/audio/exp45.mp3",
      },
    },
    {
      id: 46,
      questions: [" ",
        "La polyconsommation :",
        "- multiplie le risque d'accident :",
      ],
      choices: [
        "A - diminue l'alcoolémie",
        "B - provoque des effets indésirables",
        "C par 14",
        "D par 19",
      ],
      correctAnswer: [1, 3],
      explaination:
        "Qu'est-ce que la polyconsommation ?\nC'est le fait de consommer simultanément des drogues avec de l'alcool ou avec des médicaments, etc. Chacune de ces substances augmente le risque d'accident. Les statistiques d’accidentalité routière montrent que la polyconsommation multiplie le risque d'accident par 29.",
      assets: {
        img: ["../session/img/q46.jpeg"],
        
        question: "../session/fr/audio/q46.mp3",
        explaination: "../session/fr/audio/exp46.mp3",
      },
    },
    {
      id: 47,
      questions: ["Les feux de position :", "- sont visibles", "- permettent"],
      choices: [
        "A - à 150 mètres",
        "B - à 300 mètres",
        "C d'être mieux vu",
        "D de mieux voir",
      ],
      correctAnswer: [0, 2],
      explaination:
        "Que faut-il savoir sur les feux de position ?\nChaque véhicule doit en avoir au moins deux. Ils ne s'utilisent seuls que de nuit en agglomération éclairée. Ils sont visibles à 150 m seulement et permettent juste d'être mieux vu.",
      assets: {
        img: ["../session/img/q47.jpeg"],
        
        question: "../session/fr/audio/q47.mp3",
        explaination: "../session/fr/audio/exp47.mp3",
      },
    },
    {
      id: 48,
      questions: ["Dans cette situation:"],
      choices: ["A - Je passe le feu", "B Je m'arrête au feu"],
      correctAnswer: [1],
      explaination:
        "Pourquoi s'arrêter ?\nLa règle est que tous les usagers doivent s'arrêter face à un feu orange. En effet, le feu orange annonce l’arrivée imminente du signal lumineux rouge, qui impose l’arrêt à hauteur du feu. De plus, personne ne me suit, je peux m'arrêter en toute sécurité.",
      assets: {
        img: ["../session/img/q48.jpeg"],
        
        question: "../session/fr/audio/q48.mp3",
        explaination: "../session/fr/audio/exp48.mp3",
      },
    },
    {
      id: 49,
      questions: [
        "Je souhaite tourner à droite, je double les cyclistes avant de tourner :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        'Comment décider si je dépasse ou non des cyclistes ?\nIci, je vais arriver à hauteur d’un "cédez le passage" où je souhaite tourner à droite. Dépasser serait extrêmement dangereux. Je n’en ai pas le temps avant l’intersection et je prendrais aussi le risque de couper la route à ces cyclistes provocant alors un fort risque d’accident. Je ralentis, respecte le "cédez le passage" et laisse passer les cyclistes avant de tourner.',
      assets: {
        img: ["../session/img/q49.jpeg"],
        
        question: "../session/fr/audio/q49.mp3",
        explaination: "../session/fr/audio/exp49.mp3",
      },
    },
    {
      id: 50,
      questions: [
        "Bien entendre permet :",
        "- de mieux localiser les dangers éventuels",
        "- de mieux percevoir les informations",
      ],
      choices: ["A Oui", "B Non", "C Oui", "D Non"],
      correctAnswer: [0, 2],
      explaination:
        "L'ouïe est-elle importante dans la perception des indices ?\n90 % des informations passent par la vue. Mais il ne faut pas négliger les indices sonores (sirènes des véhicules d'intervention d'urgence, klaxons, etc). Bien entendre me permet ainsi de mieux localiser les informations.",
      assets: {
        img: ["../session/img/q50.jpeg"],
        
        question: "../session/fr/audio/q50.mp3",
        explaination: "../session/fr/audio/exp50.mp3",
      },
    },
    {
      id: 51,
      questions: ["Je peux utiliser les feux de position seuls :"],
      choices: [
        "A de nuit en ville éclairée",
        "B dans un tunnel éclairé en agglomération",
        "C pour être vu",
        "D pour mieux voir",
      ],
      correctAnswer: [0, 1, 2],
      explaination:
        "À quoi servent les feux de position ?\nIls sont visibles à 150 m. Ils sont peu puissants et peuvent être utilisés que dans les zones déjà bien éclairées. Je les utilise en ville éclairée ou même dans un tunnel éclairé en ville. Il est recommandé d'utiliser les feux de croisement qui permettent d'être détectés beaucoup plus facilement.",
      assets: {
        img: ["../session/img/q51.jpeg"],
        
        question: "../session/fr/audio/q51.mp3",
        explaination: "../session/fr/audio/exp51.mp3",
      },
    },
    {
      id: 52,
      questions: [
        "À l'arrêt je conserve aussi un espace de sécurité devant moi :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [0],
      explaination:
        "Sur la route, je dois toujours respecter une distance minimale avec le conducteur qui me précède. Cela me permet d’adapter ma conduite et d’avoir le temps de réagir en cas de souci devant moi. À l’arrêt, je dois également conserver une distance qui me permettra d’effectuer une manœuvre si nécessaire sans reculer. Si le véhicule devant moi ne redémarre pas parce qu’il est en panne par exemple, je pourrai le dépasser sans difficulté si besoin.",
      assets: {
        img: ["../session/img/q52.jpeg"],
        
        question: "../session/fr/audio/q52.mp3",
        explaination: "../session/fr/audio/exp52.mp3",
      },
    },
    {
      id: 53,
      questions: [ " ",
        "Les voyants rouges signalent :",
        "En circulant, le voyant n°3 s'est allumé. Il m'alerte :",
      ],
      choices: [
        "A un élément non dangereux",
        "B une anomalie de fonctionnement",
        "C de la température élevé du liquide de refroidissement",
        "D d'une baisse du niveau de l'huile moteur",
      ],
      correctAnswer: [1, 2],
      explaination:
        "Qu'indiquent les voyants rouges ? Ils signalent une anomalie de fonctionnement. Si en circulant, l'un d'eux s'allume, je m'arrête dès que possible en sécurité. Les éléments non dangereux sont signalés par des voyants orange. Le voyant n°3 signale une surchauffe du liquide de refroidissement.",
      assets: {
        img: ["../session/img/q53.jpeg"],
        
        question: "../session/fr/audio/q53.mp3",
        explaination: "../session/fr/audio/exp53.mp3",
      },
    },

    {
      id: 54,
      questions: [
        "Je règle la ceinture de sécurité pour qu'elle passe bien au milieu de mon cou :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        "Quels sont les risques suite à une mauvaise installation de la ceinture de sécurité ?\nSi elle est mal placée, le système de la ceinture de sécurité ne peut pas fonctionner correctement. Par exemple, si elle est au milieu de mon cou, elle peut m'entailler la chair.",
      assets: {
        img: ["../session/img/q54.jpeg"],
        
        question: "../session/fr/audio/q54.mp3",
        explaination: "../session/fr/audio/exp54.mp3",
      },
    },
    {
      id: 55,
      questions: [
        "Un GPS mal paramétré est source :",
        "- de distraction.",
        "- de danger",
      ],
      choices: ["A Oui", "B Non", "C Oui", "D Non"],
      correctAnswer: [0, 2],
      explaination:
        "Quels sont les risques avec un GPS mal paramétré (système de localisation par satellite) ?\nSi je ne fais pas attention, je peux me retrouver à contresens. Dans mon agacement, je risque d'être tenté de reparamétrer le GPS en circulant. Ce qui va réduire l'attention sur la conduite. Je mets régulièrement à jour mon GPS et je le paramètre toujours en étant à l'arrêt !",
      assets: {
        img: ["../session/img/q55.jpeg"],
        
        question: "../session/fr/audio/q55.mp3",
        explaination: "../session/fr/audio/exp55.mp3",
      },
    },
    {
      id: 56,
      questions: [
        "Le temps de réaction dépend :",
        "- de la forme du conducteur",
        "- dure en moyenne",
      ],
      choices: ["A Oui", "B Non", "C 1 seconde", "D 2 secondes"],
      correctAnswer: [0, 2],
      explaination:
        "Qu'est-ce que le temps de réaction ?\nC'est le temps entre le moment où je perçois un danger, où je le comprends, l'analyse et prends la décision d'agir. Il dure en moyenne 1 seconde, si je suis en état de conduire.",
      assets: {
        img: ["../session/img/q56.jpeg"],
        
        question: "../session/fr/audio/q56.mp3",
        explaination: "../session/fr/audio/exp56.mp3",
      },
    },
    {
      id: 57,
      questions: [
        "L'utilisation d'un défibrillateur automatisé externe (DAE) :",
      ],
      choices: [
        "A nécessite une formation spécifique",
        "B peut sauver des vies",
        "C est dangereuse pour la victime",
        "D est réservé à son propriétaire",
      ],
      correctAnswer: [1],
      explaination:
        "Qu'est-ce qu'un DAE ?\nC'est un appareil qui analyse le rythme cardiaque d'une victime en arrêt cardio-vasculaire. Si besoin, l'appareil administre automatiquement une décharge électrique pour rétablir un rythme cardiaque correct. Pas besoin de formation pour l'utiliser. Il suffit de suivre les instructions écrites et sonores de l'appareil.",
      assets: {
        img: ["../session/img/q57.jpeg"],
        
        question: "../session/fr/audio/q57.mp3",
        explaination: "../session/fr/audio/exp57.mp3",
      },
    },
    {
      id: 58,
      questions: ["Je dépasse immédiatement :"],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        "Pourquoi ne pas dépasser ?\nJe me suis rapproché du véhicule de devant, en réduisant la distance de sécurité qui nous sépare. En contrôlant mon rétroviseur, je peux constater qu'une voiture se trouve actuellement sur la voie de gauche et va me dépasser. Je ne dépasse donc pas immédiatement et par souci de sécurité je ralentis pour augmenter ma distance de sécurité et ne prendre aucun risque. Le véhicule derrière moi se situant à une bonne distance, peut adapter son allure.",
      assets: {
        img: ["../session/img/q58.jpeg"],
        
        question: "../session/fr/audio/q58.mp3",
        explaination: "../session/fr/audio/exp58.mp3",
      },
    },
    {
      id: 59,
      questions: ["Je peux tourner à gauche :"],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        "Quels sont les indices ? Le feu tricolore à droite et ma position sur la chaussée. Le feu représente une flèche qui va tout droit. Je suis donc obligé de continuer tout droit à cette intersection.",
      assets: {
        img: ["../session/img/q59.jpeg"],
        
        question: "../session/fr/audio/q59.mp3",
        explaination: "../session/fr/audio/exp59.mp3",
      },
    },
    {
      id: 60,
      questions: [
        "Pour dépasser ces cyclistes hors agglomération :",
        "- J'empiète sur la ligne continue",
        "- Je laisse un espace latéral minimum",
      ],
      choices: ["A Oui", "B Non", "C d'1 mètre", "D d'1 mètre 50"],
      correctAnswer: [0, 3],
      explaination:
        "Peut-on dépasser les cyclistes malgré la ligne continue ?\nLa ligne continue interdit de dépasser tous les véhicules à moteur. Je peux donc dépasser les cyclistes. Mais je peux uniquement chevaucher la ligne à hauteur des cyclistes pour respecter la distance latérale de sécurité imposée, mais en aucun cas franchir complètement cette ligne. Hors agglomération, la distance latérale de sécurité à respecter est de 1.50 m.",
      assets: {
        img: ["../session/img/q60.jpeg"],
        
        question: "../session/fr/audio/q60.mp3",
        explaination: "../session/fr/audio/exp60.mp3",
      },
    },
    {
      id: 61,
      questions: ["Je suis obligé :", "- de tourner", "- de m'arrêter"],
      choices: ["A à droite", "B à gauche", "C Oui", "D Non"],
      correctAnswer: [0, 3],
      explaination:
        "Qu'indique la signalisation ? Le marquage au sol et le panneau m'imposent de céder le passage. Les panneaux de sens interdit précisent que la circulation dans cette rue est à sens unique. Je suis obligé de tourner à droite. Si aucun usager n'arrive, je pourrai m'engager sans m'arrêter.",
      assets: {
        img: ["../session/img/q61.jpeg"],
        
        question: "../session/fr/audio/q61.mp3",
        explaination: "../session/fr/audio/exp61.mp3",
      },
    },
    {
      id: 62,
      questions: [
        "Je roule à 130km/h. J'augmente ma distance de sécurité avec le véhicule de devant :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [0],
      explaination:
        'Comment savoir si l\'inter-distance est suffisante ?\nComme l\'indique le panneau sur la droite, on estime sur autoroute une distance nécessaire de "deux traits" entre deux véhicules pour rouler en sécurité. Cela correspond à un temps de 2 secondes : une seconde de réaction et une seconde de "marge de sécurité". Ici, un trait seulement me sépare du camion devant moi. J\'augmente donc la distance de sécurité en ralentissant.',
      assets: {
        img: ["../session/img/q62.jpeg"],
        
        question: "../session/fr/audio/q62.mp3",
        explaination: "../session/fr/audio/exp62.mp3",
      },
    },
    {
      id: 63,
      questions: ["Dans cette situation :"],
      choices: ["A Je maintiens l'allure", "B J'accélère", "C Je m'arrête"],
      correctAnswer: [2],
      explaination:
        "Que se passe-t-il ? Le véhicule devant moi indique son intention de tourner à gauche. Et un piéton à droite manifeste son intention de traverser. Je m'arrête pour laisser le piéton traverser. Pendant ce temps, le véhicule devant pourra manœuvrer en sécurité.",
      assets: {
        img: ["../session/img/q63.jpeg"],
        
        question: "../session/fr/audio/q63.mp3",
        explaination: "../session/fr/audio/exp63.mp3",
      },
    },
    {
      id: 64,
      questions: ["Je peux conduire en toute sécurité avec les chaussures :"],
      choices: ["A en A", "B en B", "C en C"],
      correctAnswer: [1],
      explaination:
        "Les chaussures que j'utilise ont-elles une influence sur ma conduite ?\nDes talons ont tendance à me déstabiliser voire à me faire tordre les pieds. Des tongs ont tendance à mal tenir mon pied et je peux les perdre parfois ! En conduite, je ne dois pas prendre de tels risques. Si j'ai besoin de chaussures à talons ou de tongs, je les mets une fois arrivé ! Mais je conduis avec des chaussures adaptées!",
      assets: {
        img: ["../session/img/q64.jpeg"],
        
        question: "../session/fr/audio/q64.mp3",
        explaination: "../session/fr/audio/exp64.mp3",
      },
    },
    {
      id: 65,
      questions: ["À 50 km/h, je parcours en 1 seconde environ :"],
      choices: ["A 15 mètres", "B 5 mètres"],
      correctAnswer: [0],
      explaination:
        "Comment connaître la distance parcourue en une seconde ? En multipliant par 3 le chiffre des dizaines de la vitesse. À 50 km/h, je parcours (5x3) 15 m.",
      assets: {
        img: ["../session/img/q65.jpeg"],
        
        question: "../session/fr/audio/q65.mp3",
        explaination: "../session/fr/audio/exp65.mp3",
      },
    },
    {
      id: 66,
      questions: [
        "Dans cette situation"," - Le risque peut venir :",
        "- Je mets le pied devant le frein :",
      ],
      choices: ["A de droite", "B de gauche", "C Oui", "D Non"],
      correctAnswer: [0, 1, 2],
      explaination:
        "Quels sont les risques ?\nJ'aborde une intersection où la visibilité est masquée. Un usager peut arriver. La camionnette à droite masque la visibilité à droite. Un piéton peut traverser devant elle ou un autre usager peut sortir du parking. Je mets le pied devant le frein, hiérarchise les dangers pour les traiter correctement et éviter un accident.",
      assets: {
        img: ["../session/img/q66.jpeg"],
        
        question: "../session/fr/audio/q66.mp3",
        explaination: "../session/fr/audio/exp66.mp3",
      },
    },
    {
      id: 67,
      questions: [
        "L'utilisation d'un mode de transport alternatif à l'automobile :",
      ],
      choices: [
        "A fluidifie la circulation",
        "B diminue la pollution et le bruit",
        "C augmente le risque d'accident",
      ],
      correctAnswer: [0, 1],
      explaination:
        "Quels sont les modes de transport alternatifs ?\nLes transports en commun, le covoiturage, la marche à pied, le vélo, etc. En favorisant ce type de déplacement, j'aide à fluidifier la circulation, je ne perds pas de temps à chercher une place de stationnement et je contribue à la réduction du bruit et des rejets atmosphériques.",
      assets: {
        img: ["../session/img/q67.jpeg"],
        
        question: "../session/fr/audio/q67.mp3",
        explaination: "../session/fr/audio/exp67.mp3",
      },
    },
    {
      id: 68,
      questions: [
        "Je suis responsable d'un délit de fuite, si je ne m'arrête pas :",
        "- après avoir assisté à un accident avec des blessés :",
        "- après avoir occasionné un accident :",
      ],
      choices: ["A Oui", "B Non", "C Oui", "D Non"],
      correctAnswer: [1, 2],
      explaination:
        "Qu'est-ce qu'un délit de fuite ?\nC'est le fait de ne pas s'arrêter après avoir occasionné un accident (avec ou sans blessé). Cela peut entraîner 3 ans de prison et 75 000 € d'amende au moins. Si je suis témoin d'un accident dans lequel des personnes sont blessées et que je n'apporte pas mon aide, je suis responsable de non-assistance à personne en danger (ce qui est différent d'un délit de fuite).",
      assets: {
        img: ["../session/img/q68.jpeg"],
        
        question: "../session/fr/audio/q68.mp3",
        explaination: "../session/fr/audio/exp68.mp3",
      },
    },
    {
      id: 69,
      questions: [
        "Le temps qui me sépare du véhicule de devant est suffisant :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [0],
      explaination:
        "La distance de sécurité est-elle suffisante ici ?\nLa distance de sécurité séparant 2 véhicules doit être équivalente à celle parcourue en 2 secondes : une seconde pour le temps de réaction et une seconde de marge. Pour l’évaluer, je peux repérer un objet fixe, telle la balise verte. Je prononce 2 fois un mot de 4 syllabes comme ‘’sécurité’’ dès que le véhicule précédent passe à hauteur de cette balise. Si l’avant de mon véhicule arrive au repère avant que j’ai fini, la distance est insuffisante. Dans cette situation, je suis à bonne distance du véhicule précédent.",
      assets: {
        img: ["../session/img/q69.jpeg"],
        
        question: "../session/fr/audio/q69.mp3",
        explaination: "../session/fr/audio/exp69.mp3",
      },
    },
    {
      id: 70,
      questions: [
        "Mon véhicule a un seul feu de brouillard arrière, celui-ci doit être :",
      ],
      choices: ["A à droite", "B ou à gauche"],
      correctAnswer: [1],
      explaination:
        "À quoi servent les feux de brouillard arrière ? Ils sont très puissants et éblouissants, si je ne les utilise pas correctement. Ainsi, je les utilise uniquement par temps de brouillard ou de chutes de neige. La loi impose que chaque véhicule soit équipé d'au moins un feu de brouillard arrière à gauche. Cela me permet de ne pas être confondu avec une moto.",
      assets: {
        img: ["../session/img/q70.jpeg"],
        
        question: "../session/fr/audio/q70.mp3",
        explaination: "../session/fr/audio/exp70.mp3",
      },
    },
    {
      id: 71,
      questions: ["Dans cette situation :"],
      choices: [
        "A J'accélère",
        "B Je ralentis",
        "C Je serre à droite",
        "D Je passe",
      ],
      correctAnswer: [1, 2, 3],
      explaination:
        "Quels sont les risques ? La rue est étroite, à double sens de circulation et est bordée d'habitations et de trottoirs étroits. Le risque d'accident est important. Je ralentis et serre à droite. Lorsque je serai à côté du camion, je garderai le pied devant le frein pour m'arrêter si nécessaire.",
      assets: {
        img: ["../session/img/q71.jpeg"],
        
        question: "../session/fr/audio/q71.mp3",
        explaination: "../session/fr/audio/exp71.mp3",
      },
    },
    {
      id: 72,
      questions: ["Je désactive le régulateur de vitesse :"],
      choices: ["A Oui", "B Non"],
      correctAnswer: [0],
      explaination:
        "Qu'est-ce que le régulateur de vitesse ? Ce système permet de paramétrer une vitesse fixe et constante. J'arrive à une barrière de péage ou je vais devoir m'arrêter (pour payer ou prendre un ticket). Je désactive le régulateur.",
      assets: {
        img: ["../session/img/q72.jpeg"],
        
        question: "../session/fr/audio/q72.mp3",
        explaination: "../session/fr/audio/exp72.mp3",
      },
    },
    {
      id: 73,
      questions: [
        "Dans cette situation", "- La signalisation :",
        "- Je dépasse :",
      ],
      choices: [
        "A autorise le dépassement",
        "B interdit le dépassement",
        "C Oui",
        "D Non",
      ],
      correctAnswer: [1, 3],
      explaination:
        "Comment savoir si le dépassement est autorisé ?\nPlusieurs conditions doivent être réunies. Tout d'abord, la signalisation doit le permettre. Ensuite, la manœuvre ne doit gêner aucun usager. La visibilité vers l'avant doit être bonne et je dois pouvoir me replacer dans la voie de circulation dès que possible. La flèche au sol indique que je circule sur une route à double sens et interdit de dépasser.",
      assets: {
        img: ["../session/img/q73.jpeg"],
        
        question: "../session/fr/audio/q73.mp3",
        explaination: "../session/fr/audio/exp73.mp3",
      },
    },
    {
      id: 74,
      questions: ["La signalisation indique à 150 m :"],
      choices: [
        "A une intersection",
        "B l'obligation de s'arrêter",
        'C un "Cédez-le-passage"',
        "D l'obligation de céder le passage",
      ],
      correctAnswer: [0, 1, 3],
      explaination:
        "Qu'indique la signalisation ?\nUn stop à 150 m. Je vais donc aborder une intersection où je vais devoir m'arrêter pour céder le passage aux véhicules venant de gauche et de droite.",
      assets: {
        img: ["../session/img/q74.jpeg"],
        
        question: "../session/fr/audio/q74.mp3",
        explaination: "../session/fr/audio/exp74.mp3",
      },
    },
    {
      id: 75,
      questions: [" ",
        "Ce véhicule est équipé d'un contrôle automatique de la pression des pneus :",
        "Cet équipement règle automatiquement la pression des pneus :",
      ],
      choices: ["A Oui", "B Non", "C Oui", "D Non"],
      correctAnswer: [0, 3],
      explaination:
        "À quoi sert le contrôle automatique de la pression des pneus ?\nLe voyant orange en bas du cadran du compte-tours indique que mon véhicule est équipé d’un contrôle automatique de la pression des pneus. Ce système, appelé TPMS, permet d’être alerté grâce au voyant allumé, assorti éventuellement d’une alerte sonore, en cas de pression insuffisante des pneus. Ce système de sécurité permet d’être plus vigilant et de réduire les risques d’accident dûs à des pneus sous-gonflés.",
      assets: {
        img: ["../session/img/q75.jpeg"],
        
        question: "../session/fr/audio/q75.mp3",
        explaination: "../session/fr/audio/exp75.mp3",
      },
    },
    {
      id: 76,
      questions: ["Je vais tout droit, à l'intersection. Le feu est vert:"],
      choices: [
        "A Je continue dans ma voie",
        "B Je m'arrête immédiatement",
        "C J'allume le clignotant droit",
      ],
      correctAnswer: [0],
      explaination:
        "Quelle est la règle de circulation ?\nLe feu est vert. Les véhicules devant moi avancent, puisqu’ils n’ont pas leur feux stop allumés. Les usagers à gauche sont arrêtés. Je peux continuer dans ma voie avec prudence en restant dans ma voie et en m'assurant qu'aucun d'eux ne va me couper la route. Ce qui fait que je peux dépasser par la droite. C'est un des seuls cas où il est autorisé de dépasser par la droite. Je ne change pas de voie donc je n'active pas le clignotant. Mais je reste prudent !",
      assets: {
        img: ["../session/img/q76.jpeg"],
        
        question: "../session/fr/audio/q76.mp3",
        explaination: "../session/fr/audio/exp76.mp3",
      },
    },
    {
      id: 77,
      questions: ["Dans cette situation:"],
      choices: [
        "A Je maintiens la trajectoire",
        "B ou je serre à gauche de ma voie",
      ],
      correctAnswer: [1],
      explaination:
        "Quels sont les risques ? Des usagers sont arrêtés sur la bande d'arrêt d'urgence. Si je n'adapte pas mon comportement, il y a un risque d'accident. Je serre à gauche de ma voie pour anticiper un éventuel écart du policier.",
      assets: {
        img: ["../session/img/q77.jpeg"],
        
        question: "../session/fr/audio/q77.mp3",
        explaination: "../session/fr/audio/exp77.mp3",
      },
    },
    {
      id: 78,
      questions: [
        "L'affichage de l'étiquette énergie est obligatoire sur les véhicules neufs en vente:",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [0],
      explaination:
        "Qu'est-ce que l'étiquette énergie ? C'est un affichage obligatoire sur les véhicules neufs en vente. Il y est indiqué notamment le type de carburant du véhicule désigné, sa consommation en carburant, sa quantité de rejet de gaz carbonique, etc.",
      assets: {
        img: ["../session/img/q78.jpeg"],
        
        question: "../session/fr/audio/q78.mp3",
        explaination: "../session/fr/audio/exp78.mp3",
      },
    }
  ],
};
