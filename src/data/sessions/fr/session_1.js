export const session1FR = {
  id: 1,
  topic: "Session",
  totalquestions: 40,
  perQuestionScore: 1,
  image:"../session/img/q1.jpeg",
  title: "Session 1",
  description: "Session 1",
  language: "fr",

  quizz: [
    {
      id: 1,
      questions: ["Je m'arrête :"],
      choices: ["A au niveau du panneau", "B au niveau de la ligne"],
      correctAnswer: [1],
      explaination:
        "Où s’arrêter à un stop ?    Lorsque j’arrive à un stop, l'arrêt dans tous les cas est obligatoire à hauteur de la ligne d'effet, placée de manière à ce que je puisse voir correctement l’intersection avant de repartir.",
      assets: {
        img: ["../session/img/q1.jpeg"],
        question: "../session/audio/fr/q1.mp3",
        explaination: "../session/audio/fr/exp1.mp3",
      },
    },
    {
      id: 2,
      questions: ["Ce panneau annonce la fin :"],
      choices: [
        "A d'une sortie d'école ",
        "B d'une aire piétonne",
        "C d'un passage pour piétons",
      ],
      correctAnswer: [0],
      explaination:
        "Qu'indique ce panneau ?    La sortie d'une aire piétonne ! Cette zone était réservée à la circulation des piétons. Ils y étaient prioritaires face aux véhicules ayant l'autorisation d'y circuler (desserte locale, livraison, etc). Les règles de circulation générales s'appliquent de nouveau.",
      assets: {
        img: ["../session/img/q2.jpeg"],
       
        question: "../session/audio/fr/q2.mp3",
        explaination: "../session/audio/fr/exp2.mp3",
      },
    },
    {
      id: 3,
      questions: ["À 100 km/h, le champ de vision est d'environ :"],
      choices: ["A 45°", "B 75°", "C 90°"],
      correctAnswer: [0],
      explaination:
        "En fonction de quoi le champ de vision varie-t-il ?    L'âge, certaines maladies et la vitesse. À 100 km/h, le champ de vision est d'environ 45°. À 130 km/h, il est d'environ 30°.",
      assets: {
        img: ["../session/img/q3.jpeg"],
       
        question: "../session/audio/fr/q3.mp3",
        explaination: "../session/audio/fr/exp3.mp3",
      },
    },
    {
      id: 4,
      questions: ['Avec une roue "galette", je roule au maximum :'],
      choices: ["A à 50km/h", "B à 80km/h", "C à 100km/h"],
      correctAnswer: [1],
      explaination:
        'Qu\'est-ce qu\'une roue "galette" ? C\'est une roue de secours qui est moins large qu\'une roue "classique". Je l\'installe suite à une crevaison. Avec ce type de roue, je ne dois pas dépasser 80 km/h et je me rends dès que possible chez le garagiste pour la remplacer par une roue "classique".',
      assets: {
        img: ["../session/img/q4.jpeg"],
        
        question: "../session/fr/audio/q4.mp3",
        explaination: "../session/fr/audio/exp4.mp3",
      },
    },
    {
      id: 5,
      questions: ["Dans cette situation :"],
      choices: ["A Je ralentis", "B J'accélère"],
      correctAnswer: [0],
      explaination:
        "Pourquoi l'usager qui me suit fait-il des appels de phares ?    Pour que j'accélère. J'aborde un virage dangereux. Malgré la pression de l'usager derrière moi, je ralentis pour aborder le virage en sécurité.",
      assets: {
        img: ["../session/img/q5_1.jpeg", "../session/img/q5_2.jpeg"],
       
        question: "../session/audio/fr/q5.mp3",
        explaination: "../session/audio/fr/exp5.mp3",
      },
    },
    {
      id: 6,
      questions: ["Le PTAC c'est :"],
      choices: [
        "A le poid total autorisé en circulation",
        "B le poid total autorisé en charge",
      ],
      correctAnswer: [1],
      explaination:
        "Que signifie PTAC ?    Poids Total Autorisé en Charge. C'est le poids maximal de mon véhicule chargement compris. Si je dépasse le PTAC indiqué sur le certificat d'immatriculation, j'encours une forte amende et l'immobilisation de mon véhicule. De plus, les risques d'accidents sont importants.",
      assets: {
        img: ["../session/img/q6.jpeg"],
       
        question: "../session/audio/fr/q6.mp3",
        explaination: "../session/audio/fr/exp6.mp3",
      },
    },

    {
      id: 7,
      questions: ["À 200 mètres, je peux m'arrêter :"],
      choices: [
        "A pour téléphoner",
        "B en cas d'urgence",
        "C pour pique-niquer",
        "D pour faire pause",
      ],
      correctAnswer: [1],
      explaination:
        "Qu'indique la signalisation ?    Elle signale à 200 m un emplacement d'arrêt d'urgence. Comme son nom l'indique, je ne pourrais m'y arrêter... qu'en cas d'urgence (panne, malaise, etc) ! En aucun cas je n'utilise la bande d'arrêt d'urgence ou un emplacement d'arrêt d'urgence, pour passer un appel 'non-urgent'. Je peux me reposer, pique-niquer ou encore téléphoner sur des aires de repos ou de services. J'en profiterai pour me détendre et prendre un café !",
      assets: {
        img: ["../session/img/q7.jpeg"],
       
        question: "../session/audio/fr/q7.mp3",
        explaination: "../session/audio/fr/exp7.mp3",
      },
    },
    {
      id: 8,
      questions: [
        "Que je sois conducteur ou passager avant, avant d'ouvrir la portière pour sortir de mon véhicule, je contrôle :",
        " - uniquement le rétroviseur extérieur gauche",
        "- uniquement le rétroviseur extérieur droit",
      ],
      choices: ["A Oui", "B Non", "C Oui", "D Non"],
      correctAnswer: [1, 3],
      explaination: `Quels sont les risques lors de l'ouverture d'une portière ? 
        Cela peut gêner la circulation des autres usagers. 
        Côté trottoir, les piétons peuvent être gênés. 
        Côté route les voitures, les vélos, etc. peuvent être gênés. 
        Ce qui peut les obliger à faire un écart de trajectoire ou à freiner. 
        Le risque d'accident est alors important. Je contrôle donc dans le rétroviseur extérieur ET l'angle mort l'absence d'usager, du côté de la portière que je vais ouvrir. 
        En ouvrant la portière avec la main opposée, naturellement je me tourne légèrement et contrôle l'angle mort.`,
      assets: {
        img: ["../session/img/q8.jpeg"],
       
        question: "../session/audio/fr/q8.mp3",
        explaination: "../session/audio/fr/exp8.mp3",
      },
    },
    {
      id: 9,
      questions: ["Je transporte deux enfants à l'arrière de mon véhicule :"],
      choices: [
        "A Je désactive l'airbag passager",
        "B J'enclenche la sécurité enfant",
      ],
      correctAnswer: [1],
      explaination:
        "Comment assurer la sécurité de passagers enfants ?  Lorsque les enfants sont bien installés et attachés dans leur siège, à l’arrière de mon véhicule, je m’assure de leur sécurité en enclenchant la sécurité enfant. Je n’ai pas besoin dans ce cas de désactiver l’airbag passager.",
      assets: {
        img: ["../session/img/q9.jpeg"],
       
        question: "../session/audio/fr/q9.mp3",
        explaination: "../session/audio/fr/exp9.mp3",
      },
    },
    {
      id: 10,
      questions: [
        "La distance d'arrêt est égale à la distance parcourue pendant le temps de freinage :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        "Qu'est-ce que la distance d'arrêt ?  C'est la distance parcourue entre le moment où je détecte l'obstacle et le moment où mon véhicule s'arrête. La distance d'arrêt comprend donc la distance parcourue pendant le temps de réaction et la distance de freinage.",
      assets: {
        img: ["../session/img/q10.jpeg"],
       
        question: "../session/audio/fr/q10.mp3",
        explaination: "../session/audio/fr/exp10.mp3",
      },
    },
    {
      id: 11,
      questions: ["Ce panneau annonce :"],
      choices: [
        "A une fin d'interdiction",
        "B l'entrée dans une zone de travaux",
      ],
      correctAnswer: [0],
      explaination:
        "Qu'indique ce panneau ?  La fin de toutes les interdictions précédemment signalées aux véhicules en mouvement. Je reste vigilant et applique les règles de circulation générales (position sur la chaussée, limitation de vitesse, etc).",
      assets: {
        img: ["../session/img/q11.jpeg"],
       
        question: "../session/audio/fr/q11.mp3",
        explaination: "../session/audio/fr/exp11.mp3",
      },
    },
    {
      id: 12,
      questions: ["Un motocycle tend sa jambe en guise :"],
      choices: ["A de remerciement", "B de mécontentement"],
      correctAnswer: [0],
      explaination:
        "Que fait-il ?  Ce geste est très répandu. C'est un signe de remerciement facile à réaliser pour les motards. Lorsque je facilite le passage à un motard en serrant à droite par exemple. Quand j'ai compris son souhait de me dépasser, celui-ci me remercie d'avoir pris en compte ses difficultés.",
      assets: {
        img: ["../session/img/q12.jpeg"],
       
        question: "../session/audio/fr/q12.mp3",
        explaination: "../session/audio/fr/exp12.mp3",
      },
    },
    {
      id: 13,
      questions: ["Dans cette situation :"],
      choices: [
        "A Je reste dans cette voix",
        "B Je me place immédiatement sur la file de gauche",
      ],
      correctAnswer: [0],
      explaination:
        "Que se passe-t-il ?  Le panneau signale que ma voie va être supprimée dans 400 m. Je dois changer de voie. Si je change de voie immédiatement la distance de sécurité avec le véhicule noir sera insuffisante. Je ralentis pour l'augmenter. Je me placerai dans la voie à ma gauche quand la distance de sécurité sera suffisante.",
      assets: {
        img: ["../session/img/q13.jpeg"],
       
        question: "../session/audio/fr/q13.mp3",
        explaination: "../session/audio/fr/exp13.mp3",
      },
    },
    {
      id: 14,
      questions: ["Dans cette situation :"],
      choices: [
        "A J'éteins les feux immédiatement",
        "B Je garde les feux de croisement",
        "C Je ralentis.",
        "D Je maintiens l'allure",
      ],
      correctAnswer: [1, 2],
      explaination:
        "Que se passe-t-il ?  J'approche de la sortie du tunnel. Je garde les feux de croisement le temps de la traversée du tunnel. Et je ralentis pour permettre à mes yeux de s'habituer au changement de luminosité.",
      assets: {
        img: ["../session/img/q14.jpeg"],
       
        question: "../session/audio/fr/q14.mp3",
        explaination: "../session/audio/fr/exp14.mp3",
      },
    },
    {
      id: 15,
      questions: ["Dans cette situation"],
      choices: ["A Je me rabat à droite", "B Je continue le dépassement"],
      correctAnswer: [1],
      explaination:
        "Que se passe-t-il ?  Un engin d'entretien est en action sur la voie de droite. J'adapte mon comportement et l'allure, pour limiter le risque d'accident. Je continue le dépassement en restant dans cette voie. En dépassant l'engin, je serrerai le bord gauche de ma voie, sans chevaucher le zébra central.",
      assets: {
        img: ["../session/img/q15.jpeg"],
       
        question: "../session/audio/fr/q15.mp3",
        explaination: "../session/audio/fr/exp15.mp3",
      },
    },

    {
      id: 16,
      questions: [
        "Le réglage du volant :",
        "- se fait en hauteur",
        "- permet d'avoir une meilleure visibilité",
      ],
      choices: [
        "A OUI",
        "B NON",
        "C sur la route",
        "D sur le tableau de bord",
      ],
      correctAnswer: [0, 2, 3],
      explaination:
        "Pourquoi est-il important de régler le volant (si mon véhicule le permet) ?  Cela améliore ma position de conduite et ma visibilité. En effet, si le volant se situe trop dans mon champ de vision, il masque en partie ce qui se passe devant moi et les informations du tableau de bord.",
      assets: {
        img: ["../session/img/q16.jpeg"],
       
        question: "../session/audio/fr/q16.mp3",
        explaination: "../session/audio/fr/exp16.mp3",
      },
    },
    {
      id: 17,
      questions: [
        "L'ESP :",
        "- aide à éviter les dérapages",
        "- permet de rouler plus vite dans les virages",
      ],
      choices: ["A OUI", "B NON", "C OUI", "D NON"],
      correctAnswer: [0, 3],
      explaination:
        "Qu'est-ce que l'ESP ?  Ce système agit sur la direction du véhicule pour éviter une sortie de trajectoire. Il améliore donc le contrôle de la trajectoire et évite les dérapages.",
      assets: {
        img: ["../session/img/q17.jpeg"],
       
        question: "../session/audio/fr/q17.mp3",
        explaination: "../session/audio/fr/exp17.mp3",
      },
    },
    {
      id: 18,
      questions: ["La prise d'alcool :"],
      choices: [
        "A augmente le temps de réaction",
        "B diminue le temps de réaction",
      ],
      correctAnswer: [0],
      explaination:
        "Quels sont les effets de l'alcool sur le cerveau ?  L'alcool altère la compréhension et l'analyse du cerveau. Il met alors plus de temps à traiter l'information. De ce fait, le temps de réaction est augmenté.",
      assets: {
        img: ["../session/img/q18.jpeg"],
       
        question: "../session/audio/fr/q18.mp3",
        explaination: "../session/audio/fr/exp18.mp3",
      },
    },
    {
      id: 19,
      questions: ["Dans cette situation:"],
      choices: ["A Je m'arrête", "B Je passe"],
      correctAnswer: [1],
      explaination:
        "Comment interpréter cette situation ?\nJe circule en agglomération et arrive à hauteur d’un rétrécissement de la chaussée. Deux véhicules devant moi sont déjà engagés et je ne vois aucun usager arrivant en face. Je peux donc m’engager également à leur suite. Inutile de m’arrêter ici.",
      assets: {
        img: ["../session/img/q19.jpeg"],
        
       question: "../session/fr/audio/q19.mp3",
        explaination: "../session/fr/audio/exp19.mp3",
      },
    },
    {
      id: 20,
      questions: [
        "Pour limiter la consommation de carburant, je place en premier lieu mes bagages de préférence :",
      ],
      choices: [
        "A dans le coffre",
        "B dans le coffre de toit",
        "C sur une galerie",
      ],
      correctAnswer: [0],
      explaination:
        "En fonction de quoi la consommation de carburant varie-t-elle ?  De la vitesse, du poids du véhicule, de son état et de son chargement. Un chargement augmente la consommation. Un coffre de toit ou une galerie l'augmente encore plus (à cause de la résistance à l'air).",
      assets: {
        img: ["../session/img/q20.jpeg"],
       
        question: "../session/audio/fr/q20.mp3",
        explaination: "../session/audio/fr/exp20.mp3",
      },
    },
    {
      id: 21,
      questions: [" ",
        "Avant de sortir de mon véhicule en panne, j'enfile mon gilet haute visibilité :",
        "Je positionne le triangle de présignalisation à :",
      ],
      choices: ["A Oui", "B Non", "C 30 mètres", "D 60 mètres"],
      correctAnswer: [0, 2],
      explaination:
        "Comment dépanner mon véhicule en toute sécurité ?  Lorsque mon véhicule est en panne et que je dois en descendre, il est important que je ne prenne aucun risque pour ma sécurité. Dans un premier temps, j’enfile donc mon gilet haute visibilité puis je vais placer le triangle de présignalisation à au moins 30 mètres en amont, sauf si mon véhicule se trouve sur autoroute.",
      assets: {
        img: ["../session/img/q21.jpeg"],
       
        question: "../session/audio/fr/q21.mp3",
        explaination: "../session/audio/fr/exp21.mp3",
      },
    },
    {
      id: 22,
      questions: ["L' aquaplanage :", "-  c'est quand l'eau : ", "- entraine:"],
      correctAnswer: [0, 3],
      choices: [
        "A n'est plus évacuée par le pneu",
        "B est évacuée trop brusquement par le pneu",
        "C le blocage des roues",
        "D une perte de contrôle du véhicule",
      ],
      explaination:
        "Qu'est-ce que l'aquaplanage (ou aquaplaning) ?  C'est quand les pneus ne peuvent plus évacuer l'eau qui est sur la route. Les pneus glissent sur une fine couche d'eau. Impossible alors de contrôler le véhicule. Pour éviter ce phénomène, j'utilise des pneus en bon état et adapte l'allure en fonction des conditions météo.",
      assets: {
        img: ["../session/img/q22.jpeg"],
       
        question: "../session/audio/fr/q22.mp3",
        explaination: "../session/audio/fr/exp22.mp3",
      },
    },

    {
      id: 23,
      questions: [
        "Pour vérifier le fonctionnement des feux stop, je demande à quelqu'un de vérifier derrière pendant que j'appuie sur la pédale de frein :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [0],
      explaination:
        "À quoi servent les feux stop ? À signaler aux usagers qui me suivent que je freine. Je dois en avoir au moins deux à l'arrière toujours visibles et en état de fonctionnement. Ils peuvent éviter un accident grave ! Pour vérifier qu'ils fonctionnent, je peux demander à quelqu'un de vérifier qu'ils s'allument tous au moment où j'appuie sur la pédale de frein.",
      assets: {
        img: ["../session/img/q23.jpeg"],
       
        question: "../session/audio/fr/q23.mp3",
        explaination: "../session/audio/fr/exp23.mp3",
      },
    },

    {
      id: 24,
      questions: ["Les véhicules sont arrêtés après l'intersection :"],
      choices: ["A Je passe", "B Je m'arrête"],
      correctAnswer: [1],
      explaination:
        "Est-il conseillé de s’arrêter au feu vert ? La question peut sembler étonnante. Pourtant, en passant au feu vert pour franchir une intersection, vous devez vous assurer de ne pas encombrer la rue inutilement. Si la circulation n’est pas fluide et ne vous permet pas de franchir totalement l’intersection, arrêtez-vous au feu. Vous passerez, au vert bien sûr, quand la circulation vous le permettrA",
      assets: {
        img: ["../session/img/q24.jpeg"],
       
        question: "../session/audio/fr/q24.mp3",
        explaination: "../session/audio/fr/exp24.mp3",
      },
    },

    {
      id: 25,
      questions: ["Cette commande permet de régler :"],
      choices: [
        "A le dégivrage arrière",
        "B les rétroviseurs extérieurs",
        "C la climatisation",
      ],
      correctAnswer: [1],
      explaination:
        "À quoi sert ce bouton ? Le pictogramme représente clairement de petits rétroviseurs : l'un à droite, l'autre à gauche. Ce bouton me permet donc de régler les rétroviseurs extérieurs. La position sur '0' indique que le réglage est verrouillé. Si je le mets sur la gauche ou la droite, je peux manipuler mon rétroviseur extérieur correspondant.",
      assets: {
        img: ["../session/img/q25.jpeg"],
       
        question: "../session/audio/fr/q25.mp3",
        explaination: "../session/audio/fr/exp25.mp3",
      },
    },
    {
      id: 26,
      questions: [
        "Le freinage reste toujours prioritaire sur le régulateur de vitesse :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [0],
      explaination:
        "Qu’est-ce qu’un régulateur de vitesse ? Le régulateur de vitesse est un équipement d'aide à la conduite qui me permet de conserver une allure constante sans que j’aie à garder le pied sur l'accélérateur. Les commandes manuelles me permettant d’augmenter ou de réduire cette allure. Il est désactivé dès que j’appuie sur le frein ou l'embrayage. Lorsque je dois freiner, je le fais donc en utilisant la pédale.",
      assets: {
        img: ["../session/img/q26.jpeg"],
       
        question: "../session/audio/fr/q26.mp3",
        explaination: "../session/audio/fr/exp26.mp3",
      },
    },
    {
      id: 27,
      questions: ["Je tourne à gauche. Je cède le passage :"],
      choices: ["A à droite", "B en face", "C à gauche"],
      correctAnswer: [0, 1],
      explaination:
        "Quel est le régime de priorité à cette intersection ? En l'absence de panneau et de marquage, c'est une priorité à droite. Pour tourner à gauche je dois traverser la voie des usagers en face. Je leur cède le passage avant de m'engager pour ne pas gêner la circulation.",
      assets: {
        img: ["../session/img/q27.jpeg"],
       
        question: "../session/audio/fr/q27.mp3",
        explaination: "../session/audio/fr/exp27.mp3",
      },
    },
    {
      id: 28,
      questions: ["Dans cette situation: ","Je me prépare à m'arrêter :", "Je ralentis :"],
      choices: ["A Oui", "B Non", "C Oui", "D Non"],
      correctAnswer: [0, 2],
      explaination:
        "Que se passe-t-il ? Le feu vert m'autorise à m'engager. La circulation devant est ralentie. Je vais franchir une traversée de voie de tramways. L'arrêt de tramways n'est pas loin et des piétons vont traverser. Même si le feu est vert, je ralentis. Le temps d'arriver à la traversée de tramways, les piétons traverseront. Je m'apprête à m'arrêter.",
      assets: {
        img: ["../session/img/q28.jpeg"],
        
        question: "../session/fr/audio/q28.mp3",
        explaination: "../session/fr/audio/exp28.mp3",
      },
    },
    {
      id: 29,
      questions: ["Ce voyant peut indiquer que :"],
      choices: [
        "A Le frein à main est serré",
        "B L'ABS est désactivé",
        "C Le niveau de liquide de freins est bas",
      ],
      correctAnswer: [0, 2],
      explaination:
        "Quel est le message principal de ce voyant ? Le système de freinage est soit en action, soit défectueux. Tout dépend du moment où il est allumé. Lorsque je suis à l'arrêt avec le frein à main serré, ce voyant signale que le frein à main est serré. En circulation ou si le frein à main est desserré, il signale un problème dans le circuit de freinage. Il y a un risque de perte d'efficacité du freinage.",
      assets: {
        img: ["../session/img/q29.jpeg"],
       
        question: "../session/audio/fr/q29.mp3",
        explaination: "../session/audio/fr/exp29.mp3",
      },
    },
    {
      id: 30,
      questions: ["L'indice principal se trouve :"],
      choices: ["A en zone A", "B en zone B", "C en zone C", "D en zone D"],
      correctAnswer: [3],
      explaination:
        "Qu'est-ce qu'un 'indice principal' ? C'est le risque principal ! Je dois être plus particulièrement attentif à la zone présentant le plus de risques. En zone A, un véhicule me suit mais ne présente pas de danger. En B, le véhicule en sens inverse est encore loin. En C, des cyclistes sont présents devant moi. La largeur de la chaussée est insuffisante pour les dépasser. Enfin en D, une portière peut s'ouvrir à tout moment. Je suis particulièrement vigilant à ce qui se passe dans les véhicules stationnés, avant de les dépasser à bonne distance.",
      assets: {
        img: ["../session/img/q30.jpeg"],
       
        question: "../session/audio/fr/q30.mp3",
        explaination: "../session/audio/fr/exp30.mp3",
      },
    },
    {
      id: 31,
      questions: [
        "Ce panneau indique : ",
        "Peuvent circuler sur la voie à droite :",
      ],
      choices: [
        "A une zone de rencontre",
        "B une voie verte",
        "C les cyclomoteurs",
        "D le cyclistes",
      ],
      correctAnswer: [1, 3],
      explaination:
        "Qu'indique ce panneau ? Une voie verte qui se situe à droite de la chaussée. C'est une voie réservée à la circulation des usagers non motorisés. Les cyclomotoristes ne peuvent donc pas y circuler.",
      assets: {
        img: ["../session/img/q31.jpeg"],
       
        question: "../session/audio/fr/q31.mp3",
        explaination: "../session/audio/fr/exp31.mp3",
      },
    },
    {
      id: 32,
      questions: ["L'intermodalité consiste à :"],
      choices: [
        "A utiliser un véhicule avec plusieurs passagers",
        "B associer pour un trajet plusieurs modes de transport",
        "C alterner les jours d'utilisation du véhicule",
      ],
      correctAnswer: [1],
      explaination:
        "Qu'est-ce que c'est l'intermodalité ? C'est lorsque j'utilise plusieurs modes de transport pour effectuer un trajet. Ce dispositif permet de limiter les embouteillages, la pollution sonore et atmosphérique en ville. Il s'agit de zones, principalement situées à l'entrée des villes. Ces pôles permettent d'utiliser un parking pour stationner mon véhicule à la journée et d'emprunter les transports en commun.",
      assets: {
        img: ["../session/img/q32.jpeg"],
       
        question: "../session/audio/fr/q32.mp3",
        explaination: "../session/audio/fr/exp32.mp3",
      },
    },
    {
      id: 33,
      questions: [
        "Je voyage seul avec mon enfant de 9 ans, il s'installe à l'avant pour ne pas s'ennuyer :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        "Où doit s’installer mon enfant de 9 ans ? La règle est claire, un enfant de moins de 10 ans doit être installé à l’arrière du véhicule sur un réhausseur adapté à sa morphologie. Le fait qu’il puisse s’ennuyer ne constitue pas une excuse valable pour s’installer à l’avant ! Ce serait potentiellement dangereux pour sa sécurité.",
      assets: {
        img: ["../session/img/q33.jpeg"],
       
        question: "../session/audio/fr/q33.mp3",
        explaination: "../session/audio/fr/exp33.mp3",
      },
    },

    {
      id: 34,
      questions: [
        "Dans cette situation, pour être bien placé, je circule sur la voie :",
      ],
      choices: ["A de gauche", "B centrale", "C de droite"],
      correctAnswer: [1],
      explaination:
        "Qu'indique la signalisation ? Les flèches lumineuses au-dessus des voies signalent les voies ouvertes et fermées à la circulation. La flèche orange indique que la voie de droite va être fermée à la circulation. Et je dois circuler dans la voie la plus à droite de ma direction. Je reste sur la voie centrale.",
      assets: {
        img: ["../session/img/q34_1.jpeg","../session/img/q34_2.jpeg"],
       
        question: "../session/audio/fr/q34.mp3",
        explaination: "../session/audio/fr/exp34.mp3",
      },
    },
    {
      id: 35,
      questions: ["Dans cette situation:"],
      choices: [
        "A Je dépasse",
        "B Je klaxonne",
        "C Je reste derrière le cycliste",
      ],
      correctAnswer: [2],
      explaination:
        "Comment agir dans cette situation ? Le cycliste qui circule devant moi roule bien sur sa droite, me permettant de le dépasser. Cependant, pour effectuer ce dépassement, je vais m’assurer de ne prendre aucun risque. Un véhicule arrive en face. Ce n’est pas du tout le moment de me déporter sur la gauche. Je risquerais une collision avec ce véhicule. Inutile de klaxonner, car il n’y a pas de danger immédiat.",
      assets: {
        img: ["../session/img/q35.jpeg"],
       
        question: "../session/audio/fr/q35.mp3",
        explaination: "../session/audio/fr/exp35.mp3",
      },
    },
    {
      id: 36,
      questions: ["Je klaxonne :"],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        "Que puis-je faire ? Le tracteur encombre une bonne partie de ma voie. Il m'est interdit de franchir ou de chevaucher la ligne continue centrale pour le dépasser. Je ralentis pour maintenir une distance de sécurité suffisante en attendant de pouvoir le dépasser en sécurité.",
      assets: {
        img: ["../session/img/q36.jpeg"],
       
        question: "../session/audio/fr/q36.mp3",
        explaination: "../session/audio/fr/exp36.mp3",
      },
    },
    {
      id: 37,
      questions: [
        "Je suis responsable d'une collision. Les dégâts matériels de mon véhicule seront pris en charge par mon assurance, si je dispose d'une garantie :",
      ],
      choices: [
        "A Responsabilité civile",
        "B bris de glace",
        "C dommages tous accidents",
        "D dommages - collision",
      ],
      correctAnswer: [2, 3],
      explaination:
        'Quelle est la garantie minimum obligatoire ? La Responsabilité civile. Elle prend en charge les dégâts matériels et corporels causés aux tiers. Si je veux que les dégâts de mon véhicule soient pris en charge, suite à une collision où je suis responsable, je dois avoir la garantie "dommages tous accidents" ou "dommages - collision".',
      assets: {
        img: ["../session/img/q37.jpeg"],
       
        question: "../session/audio/fr/q37.mp3",
        explaination: "../session/audio/fr/exp37.mp3",
      },
    },
    {
      id: 38,
      questions: [
        "À l'arrêt à un feu rouge, je peux passer un bref appel téléphonique :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [1],
      explaination:
        "Quelles sont les conséquences d'un appel téléphonique ? Je risque de mettre plus de temps à comprendre les indices de conduite et de gêner les autres usagers. Conduire avec un téléphone portable en main ou à l'aide d'un kit mains libres est interdit (135€ d'amende et retrait de 3 points).",
      assets: {
        img: ["../session/img/q38.jpeg"],
       
        question: "../session/audio/fr/q38.mp3",
        explaination: "../session/audio/fr/exp38.mp3",
      },
    },
    {
      id: 39,
      questions: [
        "Le contrôle technique est à réaliser avant la quatrième année de circulation du véhicule :",
      ],
      choices: ["A Oui", "B Non"],
      correctAnswer: [0],
      explaination:
        "Quelle est la périodicité du contrôle technique ? Il doit être effectué avant la quatrième année de mise en circulation du véhicule, puis tous les deux ans. Si je ne respecte pas cette échéance, j'encours une amende de 4e classe et l'immobilisation du véhicule.",
      assets: {
        img: ["../session/img/q39.jpeg"],
       
        question: "../session/audio/fr/q39.mp3",
        explaination: "../session/audio/fr/exp39.mp3",
      },
    },
    {
      id: 40,
      questions: ["Dans cette situation:"],
      choices: [
        "A Je fais un appel de feux stop",
        "B J'active les clignotants gauches",
        "C J'accélère",
      ],
      correctAnswer: [1],
      explaination:
        "Que dois-je faire lors d'un changement de direction ? J'avertis les usagers que je rencontre. J'adapte l'allure et je me positionne correctement. J'allume les clignotants gauches pour signaler mon intention de changer de direction à l'usager qui me suit.",
      assets: {
        img: ["../session/img/q40_1.jpeg","../session/img/q40_2.jpeg"],
       
        question: "../session/audio/fr/q40.mp3",
        explaination: "../session/audio/fr/exp40.mp3",
      },
    },
  ],
};
