import logo from '../assets/logo.png'

export interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  content: string
  image: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Lancement officiel du cabinet DJENEPO PARTNERS SARL',
    category: 'Actualité',
    date: '12 Juin 2026',
    readTime: '3 min',
    excerpt: 'DJENEPO PARTNERS fait son entrée officielle en 2025 pour transformer vos interventions de développement en résultats mesurables et durables en Afrique de l\'Ouest.',
    content: `C'est avec une grande fierté que nous annonçons le lancement officiel de DJENEPO PARTNERS SARL. Fondé en 2025 par un pool d'experts certifiés en Suivi-Évaluation (S&E) et en collaboration étroite avec des universitaires et des praticiens chevronnés du développement, le cabinet se donne pour mission d'accompagner les acteurs du changement (ONG, institutions publiques, partenaires techniques et financiers) vers une performance optimale.

Notre cœur de métier s'articule autour de la conception de cadres logiques, la mise en œuvre de systèmes de suivi-évaluation robustes, et le renforcement des capacités opérationnelles. Grâce à une présence active et une forte immersion terrain, notamment au Mali et dans la sous-région, nous garantissons des solutions parfaitement adaptées aux contextes locaux.`,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Associés Fondateurs', avatar: logo }
  },
  {
    id: '2',
    title: 'Suivi-Évaluation du projet minier Simandou en Guinée : Les enjeux environnementaux',
    category: 'Projet Simandou',
    date: '10 Juin 2026',
    readTime: '6 min',
    excerpt: 'Comment le suivi-évaluation permet de mesurer l\'impact environnemental du corridor de transport du méga-projet Simandou.',
    content: `Le projet de fer de Simandou en Guinée est le plus grand projet minier et d'infrastructure au monde. Pour garantir le respect des normes de biodiversité, un suivi-évaluation rigoureux de la faune, de la flore et des bassins versants le long du Transguinéen est mis en œuvre par des comités d'experts indépendants.`,
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '3',
    title: 'Le ProCaR au Bénin : Amélioration des rendements agricoles',
    category: 'Projet ProCaR',
    date: '08 Juin 2026',
    readTime: '4 min',
    excerpt: 'L\'utilisation d\'indicateurs SMART pour suivre l\'évolution de la productivité du maïs, riz et manioc dans le cadre du PADAAM.',
    content: `Le Programme Cadre des interventions du FIDA en milieu Rural au Bénin (ProCaR) montre comment la définition rigoureuse d'indicateurs de rendement permet de réajuster les approvisionnements en intrants auprès des producteurs vulnérables béninois.`,
    image: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '4',
    title: 'Le projet RESI2P et la résilience communautaire au Sahel',
    category: 'Projet RESI2P',
    date: '06 Juin 2026',
    readTime: '5 min',
    excerpt: 'Comment mesurer la résilience face au changement climatique à travers le projet RESI2P dans la sous-région.',
    content: `Le projet RESI2P (Résilience et Innovation Participative des Populations) déploie des enquêtes ménages périodiques pour évaluer la capacité d'adaptation des populations sahéliennes face aux chocs climatiques récurrents.`,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '5',
    title: 'Simandou Guinée : Cadre logique de la responsabilité sociale (RSE)',
    category: 'Projet Simandou',
    date: '04 Juin 2026',
    readTime: '5 min',
    excerpt: 'Analyse du cadre logique régissant les fonds d\'investissement communautaire pour le projet de Simandou.',
    content: `Les investissements sociaux du projet Simandou en Guinée nécessitent un tableau de bord partagé avec les communautés locales pour suivre la construction des écoles, centres de santé et l'accès à l'eau potable.`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '6',
    title: 'ProCaR : Rôle des coopératives de femmes dans le suivi de la chaîne de valeur maraîchère',
    category: 'Projet ProCaR',
    date: '02 Juin 2026',
    readTime: '4 min',
    excerpt: 'Intégration d\'une perspective de genre dans le système de suivi-évaluation du PADMAR au Bénin.',
    content: `La collecte de données désagrégées par sexe au sein du ProCaR permet de mesurer la redistribution équitable des revenus liés au maraîchage et l'accès autonome des femmes béninoises au microcrédit agricole.`,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '7',
    title: 'RESI2P : Utilisation des technologies mobiles pour les enquêtes d\'impact',
    category: 'Projet RESI2P',
    date: '30 Mai 2026',
    readTime: '4 min',
    excerpt: 'Le déploiement de KoboToolbox pour évaluer en temps réel la sécurité alimentaire sous le projet RESI2P.',
    content: `L'utilisation de tablettes et de formulaires géolocalisés permet aux coordinateurs du projet RESI2P de cartographier instantanément les niveaux de vulnérabilité alimentaire des ménages ruraux.`,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '8',
    title: 'Le rôle de l\'évaluation indépendante dans le projet Simandou',
    category: 'Projet Simandou',
    date: '28 Mai 2026',
    readTime: '5 min',
    excerpt: 'Pourquoi les audits d\'évaluation externes sont indispensables à la transparence financière de Simandou.',
    content: `La complexité des infrastructures ferroviaires et portuaires du projet Simandou en Guinée impose des évaluations externes régulières menées par des cabinets spécialisés pour rassurer les bailleurs internationaux.`,
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '9',
    title: 'Méthodologie S&E : Construire une théorie du changement solide',
    category: 'Méthodologie',
    date: '25 Mai 2026',
    readTime: '5 min',
    excerpt: 'Guide pratique pour l\'élaboration d\'une théorie du changement basée sur des résultats vérifiables.',
    content: `Une bonne théorie du changement doit modéliser clairement les hypothèses critiques reliant les intrants aux impacts à long terme, en s'appuyant sur des indicateurs d'effets intermédiaires qualitatifs.`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '10',
    title: 'ProCaR : Accompagnement technique des producteurs au Bénin',
    category: 'Projet ProCaR',
    date: '22 Mai 2026',
    readTime: '4 min',
    excerpt: 'Bilan à mi-parcours de l\'appui technique à la production sous serres et hors sol (PADMAR).',
    content: `L'introduction de solutions innovantes pour le maraîchage dans le cadre du ProCaR (PADMAR) a permis d'améliorer la productivité face aux changements climatiques chez les agriculteurs béninois formés.`,
    image: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '11',
    title: 'RESI2P : Le rôle clé de la capitalisation des leçons apprises',
    category: 'Projet RESI2P',
    date: '20 Mai 2026',
    readTime: '4 min',
    excerpt: 'Comment documenter les bonnes pratiques d\'adaptation climatique pour la réplication.',
    content: `La capitalisation sous le projet RESI2P met en lumière les techniques traditionnelles de gestion de l'eau combinées à des prévisions météorologiques locales par SMS pour sécuriser les cultures.`,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '12',
    title: 'Simandou : Comment piloter le suivi de la faune sauvage',
    category: 'Projet Simandou',
    date: '18 Mai 2026',
    readTime: '5 min',
    excerpt: 'Utilisation de technologies de télédétection pour protéger l\'écosystème à proximité des zones minières.',
    content: `Le plan de gestion environnementale de Simandou en Guinée s'appuie sur des colliers satellites et des pièges photographiques pour suivre la migration des chimpanzés d'Afrique de l'Ouest.`,
    image: 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '13',
    title: 'Méthodologie : La redevabilité envers les populations bénéficiaires',
    category: 'Méthodologie',
    date: '15 Mai 2026',
    readTime: '4 min',
    excerpt: 'Mettre en place des mécanismes de plaintes et retours d\'information efficaces.',
    content: `Un système de suivi-évaluation inclusif doit intégrer des comités communautaires locaux pour recueillir et traiter les plaintes afin de garantir l'éthique de chaque intervention humanitaire ou de développement.`,
    image: 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '14',
    title: 'ProCaR : Aménagement de pistes rurales et accès au marché au Bénin',
    category: 'Projet ProCaR',
    date: '12 Mai 2026',
    readTime: '5 min',
    excerpt: 'Suivre l\'évolution de l\'accès au marché grâce au renforcement des infrastructures de transport.',
    content: `L'évaluation des aménagements de pistes rurales et des magasins de stockage construits sous l'égide du ProCaR montre une hausse du flux commercial et une meilleure rentabilité pour les filières maïs, riz et manioc.`,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '15',
    title: 'RESI2P : Le renforcement des capacités des autorités locales en S&E',
    category: 'Projet RESI2P',
    date: '10 Mai 2026',
    readTime: '4 min',
    excerpt: 'Former les élus communaux pour assurer la durabilité des aménagements hydro-agricoles.',
    content: `Le transfert de compétences sous le projet RESI2P passe par des ateliers de planification de budget participatif orienté vers la maintenance locale des digues et micro-barrages.`,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '16',
    title: 'Suivi des chantiers de chemin de fer : Le cas Transguinéen (Simandou)',
    category: 'Projet Simandou',
    date: '08 Mai 2026',
    readTime: '5 min',
    excerpt: 'L\'utilisation d\'images satellites pour vérifier l\'état d\'avancement de la ligne ferroviaire.',
    content: `Pour suivre plus de 600 km de voies ferrées en construction, le projet Simandou en Guinée utilise la télédétection spatiale pour documenter les terrassements et la stabilité des talus de manière automatisée.`,
    image: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '17',
    title: 'Méthodologie : La collecte de données en zone de conflit ou difficile d\'accès',
    category: 'Méthodologie',
    date: '06 Mai 2026',
    readTime: '6 min',
    excerpt: 'Stratégies de suivi à distance pour les projets de développement en milieu complexe.',
    content: `Le suivi à distance via des relais locaux formés, la triangulation par téléphonie mobile et l'évaluation par imagerie thermique permettent de maintenir une continuité du suivi-évaluation en zones d'insécurité.`,
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '18',
    title: 'ProCaR : Évaluation d\'impact sur l\'emploi des jeunes ruraux au Bénin',
    category: 'Projet ProCaR',
    date: '04 Mai 2026',
    readTime: '5 min',
    excerpt: 'Combien d\'emplois créés à travers le développement des filières agricoles béninoises ?',
    content: `L'étude d'impact montre que l'accès aux financements et partenariats productifs du ProCaR a permis l'insertion durable de plus de 1 200 jeunes dans l'entrepreneuriat agricole au Bénin.`,
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '19',
    title: 'RESI2P : Le rôle des comités villageois d\'alerte précoce au Sahel',
    category: 'Projet RESI2P',
    date: '02 Mai 2026',
    readTime: '4 min',
    excerpt: 'Suivi communautaire des indicateurs de sécheresse et de risques agro-climatiques.',
    content: `La mise en place de pluviomètres paysans sous le projet RESI2P responsabilise les communautés en leur permettant de diffuser des alertes rapides en cas de déficit hydrique marqué.`,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '20',
    title: 'Simandou : Suivi des réinstallations des populations locales en Guinée',
    category: 'Projet Simandou',
    date: '30 Avril 2026',
    readTime: '5 min',
    excerpt: 'Respecter le standard de performance 5 de la SFI sur l\'acquisition de terres.',
    content: `Le suivi-évaluation continu des nouveaux sites de réinstallation garantit la restauration durable des moyens de subsistance des foyers déplacés le long du tracé minier de Simandou.`,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '21',
    title: 'Méthodologie : Mesurer l\'empowerment des femmes de manière quantitative',
    category: 'Méthodologie',
    date: '28 Avril 2026',
    readTime: '5 min',
    excerpt: 'Utilisation de l\'indice WEAI (Women\'s Empowerment in Agriculture Index).',
    content: `L'indice WEAI permet de mesurer le contrôle sur les ressources productives, les décisions d'achat et le leadership communautaire des femmes au sein des coopératives agricoles sahéliennes.`,
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '22',
    title: 'ProCaR : Suivi-évaluation de la résilience financière des producteurs au Bénin',
    category: 'Projet ProCaR',
    date: '25 Avril 2026',
    readTime: '4 min',
    excerpt: 'Évaluation de l\'accès aux marchés et de la réduction de la pauvreté rurale.',
    content: `Les données du ProCaR révèlent une stabilisation et une hausse des revenus des petits producteurs béninois, renforçant leur sécurité alimentaire et nutritionnelle face aux chocs économiques.`,
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '23',
    title: 'RESI2P : Évaluation participative de la gestion des ressources pastorales',
    category: 'Projet RESI2P',
    date: '22 Avril 2026',
    readTime: '5 min',
    excerpt: 'Suivi de la cohésion sociale autour des couloirs de transhumance au Sahel.',
    content: `La mise en place de chartes de transhumance suivies par des comités paritaires agriculteurs-éleveurs sous le projet RESI2P a permis de réduire de 70% les conflits d'usage de l'eau.`,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '24',
    title: 'Simandou : Suivi de la qualité de l\'air et des poussières fines en Guinée',
    category: 'Projet Simandou',
    date: '20 Avril 2026',
    readTime: '4 min',
    excerpt: 'Le suivi des capteurs d\'émission de poussière à proximité des mines de Simandou.',
    content: `Des stations de mesure connectées transmettent quotidiennement les niveaux de particules PM10 et PM2.5 pour ajuster les opérations d'arrosage des pistes d'accès minières.`,
    image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '25',
    title: 'Méthodologie : Concevoir un Cadre de Mesure de la Performance (CMP) agile',
    category: 'Méthodologie',
    date: '18 Avril 2026',
    readTime: '5 min',
    excerpt: 'Comment concevoir un CMP capable d\'intégrer de nouveaux indicateurs en cours de projet.',
    content: `La flexibilité des cadres de mesure permet aux équipes de projet de s'adapter aux crises sanitaires ou sécuritaires sans perdre la traçabilité des indicateurs de base du programme.`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '26',
    title: 'ProCaR : Suivi des chaînes de valeur du maïs, riz et manioc (PADAAM)',
    category: 'Projet ProCaR',
    date: '15 Avril 2026',
    readTime: '5 min',
    excerpt: 'Évaluation de la transformation et du stockage au Bénin.',
    content: `Le suivi-évaluation du programme PADAAM (ProCaR) permet de garantir la rentabilité des filières clés, avec une nette amélioration de la transformation locale du manioc et du conditionnement du riz béninois.`,
    image: 'https://images.unsplash.com/photo-1576085898323-218339e3b43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '27',
    title: 'RESI2P : Le rôle de la radio communautaire dans le partage des résultats de S&E',
    category: 'Projet RESI2P',
    date: '12 Avril 2026',
    readTime: '4 min',
    excerpt: 'Vulgariser les données et les leçons apprises auprès des populations non-alphabétisées.',
    content: `La diffusion d'émissions de radio locales en langues vernaculaires sous le projet RESI2P garantit une véritable transparence démocratique sur la gestion des budgets de développement.`,
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '28',
    title: 'Simandou : Suivi des retombées économiques sur le PIB guinéen',
    category: 'Projet Simandou',
    date: '10 Avril 2026',
    readTime: '5 min',
    excerpt: 'Les indicateurs de croissance macroéconomiques liés au minerai de fer de Simandou.',
    content: `Le S&E macroéconomique mené en lien avec le ministère des Finances de Guinée permet d'évaluer la création de richesses locales indirectes et le développement des PME locales sous-traitantes.`,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '29',
    title: 'Méthodologie : L\'intégration des ODD (Objectifs de Développement Durable)',
    category: 'Méthodologie',
    date: '08 Avril 2026',
    readTime: '5 min',
    excerpt: 'Comment aligner et évaluer vos projets de développement par rapport à l\'Agenda 2030.',
    content: `Chaque cadre logique de projet doit explicitement lier ses résultats intermédiaires aux cibles spécifiques des ODD (ODD 1, ODD 2, ODD 5, ODD 13) pour faciliter les synthèses d'impact nationales.`,
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  },
  {
    id: '30',
    title: 'ProCaR : Suivi-évaluation des aménagements hydro-agricoles au Bénin',
    category: 'Projet ProCaR',
    date: '05 Avril 2026',
    readTime: '4 min',
    excerpt: 'Impact de l\'irrigation et des aménagements de bas-fonds sur les récoltes.',
    content: `Les évaluations réalisées sur les sites du ProCaR montrent que les nouveaux aménagements hydro-agricoles ont permis une augmentation des rendements rizicoles et une meilleure gestion de l'eau en saison sèche.`,
    image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    author: { name: 'DJENEPO PARTNERS', role: 'Cabinet Conseil', avatar: logo }
  }
]

