<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPost;
use App\Models\Category;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::pluck('id', 'name')->toArray();
        BlogPost::truncate(); // Prevent duplicate seeding if run multiple times

        BlogPost::create([
            'category_id' => $categories['Actualité'],
            'title' => <<<'EOT'
Lancement officiel du cabinet DJENEPO PARTNERS SARL
EOT,
            'date' => '12 Juin 2026',
            'read_time' => '3 min',
            'excerpt' => <<<'EOT'
DJENEPO PARTNERS fait son entrée officielle en 2025 pour transformer vos interventions de développement en résultats mesurables et durables en Afrique de l'Ouest.
EOT,
            'content' => <<<'EOT'
C'est avec une grande fierté que nous annonçons le lancement officiel de DJENEPO PARTNERS SARL. Fondé en 2025 par un pool d'experts certifiés en Suivi-Évaluation (S&E) et en collaboration étroite avec des universitaires et des praticiens chevronnés du développement, le cabinet se donne pour mission d'accompagner les acteurs du changement (ONG, institutions publiques, partenaires techniques et financiers) vers une performance optimale.

Notre cœur de métier s'articule autour de la conception de cadres logiques, la mise en œuvre de systèmes de suivi-évaluation robustes, et le renforcement des capacités opérationnelles. Grâce à une présence active et une forte immersion terrain, notamment au Mali et dans la sous-région, nous garantissons des solutions parfaitement adaptées aux contextes locaux.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet Simandou'],
            'title' => <<<'EOT'
Suivi-Évaluation du projet minier Simandou en Guinée : Les enjeux environnementaux
EOT,
            'date' => '10 Juin 2026',
            'read_time' => '6 min',
            'excerpt' => <<<'EOT'
Comment le suivi-évaluation permet de mesurer l'impact environnemental du corridor de transport du méga-projet Simandou.
EOT,
            'content' => <<<'EOT'
Le projet de fer de Simandou en Guinée est le plus grand projet minier et d'infrastructure au monde. Pour garantir le respect des normes de biodiversité, un suivi-évaluation rigoureux de la faune, de la flore et des bassins versants le long du Transguinéen est mis en œuvre par des comités d'experts indépendants.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet ProCaR'],
            'title' => <<<'EOT'
Le ProCaR au Bénin : Amélioration des rendements agricoles
EOT,
            'date' => '08 Juin 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
L'utilisation d'indicateurs SMART pour suivre l'évolution de la productivité du maïs, riz et manioc dans le cadre du PADAAM.
EOT,
            'content' => <<<'EOT'
Le Programme Cadre des interventions du FIDA en milieu Rural au Bénin (ProCaR) montre comment la définition rigoureuse d'indicateurs de rendement permet de réajuster les approvisionnements en intrants auprès des producteurs vulnérables béninois.
EOT,
            'image_url' => '/assets/blog/procar_corn.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet RESI-2P'],
            'title' => <<<'EOT'
Le projet RESI-2P et la résilience communautaire au Burkina Faso
EOT,
            'date' => '06 Juin 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Comment mesurer la résilience face au changement climatique et aux crises sécuritaires au Burkina.
EOT,
            'content' => <<<'EOT'
Le Programme pour le renforcement de la résilience des petits producteurs (RESI-2P) déploie des enquêtes ménages dans les régions Nord et Centre-Ouest pour évaluer la capacité d'adaptation des populations burkinabè vulnérables (notamment les PDI).
EOT,
            'image_url' => '/assets/blog/resi_resilience.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet Simandou'],
            'title' => <<<'EOT'
Simandou Guinée : Cadre logique de la responsabilité sociale (RSE)
EOT,
            'date' => '04 Juin 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Analyse du cadre logique régissant les fonds d'investissement communautaire pour le projet de Simandou.
EOT,
            'content' => <<<'EOT'
Les investissements sociaux du projet Simandou en Guinée nécessitent un tableau de bord partagé avec les communautés locales pour suivre la construction des écoles, centres de santé et l'accès à l'eau potable.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet ProCaR'],
            'title' => <<<'EOT'
ProCaR : Rôle des coopératives de femmes dans le suivi de la chaîne de valeur maraîchère
EOT,
            'date' => '02 Juin 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Intégration d'une perspective de genre dans le système de suivi-évaluation du PADMAR au Bénin.
EOT,
            'content' => <<<'EOT'
La collecte de données désagrégées par sexe au sein du ProCaR permet de mesurer la redistribution équitable des revenus liés au maraîchage et l'accès autonome des femmes béninoises au microcrédit agricole.
EOT,
            'image_url' => '/assets/blog/procar_young_farmer.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet RESI-2P'],
            'title' => <<<'EOT'
RESI-2P : Utilisation des technologies mobiles pour les enquêtes d'impact au Burkina
EOT,
            'date' => '30 Mai 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Le déploiement de KoboToolbox pour évaluer en temps réel la sécurité alimentaire sous le projet RESI-2P.
EOT,
            'content' => <<<'EOT'
L'utilisation de tablettes et de formulaires géolocalisés permet aux coordinateurs du programme RESI-2P de cartographier instantanément les niveaux de vulnérabilité alimentaire dans les 36 communes cibles du Burkina Faso.
EOT,
            'image_url' => '/assets/blog/resi_tablet.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet Simandou'],
            'title' => <<<'EOT'
Le rôle de l'évaluation indépendante dans le projet Simandou
EOT,
            'date' => '28 Mai 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Pourquoi les audits d'évaluation externes sont indispensables à la transparence financière de Simandou.
EOT,
            'content' => <<<'EOT'
La complexité des infrastructures ferroviaires et portuaires du projet Simandou en Guinée impose des évaluations externes régulières menées par des cabinets spécialisés pour rassurer les bailleurs internationaux.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Méthodologie'],
            'title' => <<<'EOT'
Méthodologie S&E : Construire une théorie du changement solide
EOT,
            'date' => '25 Mai 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Guide pratique pour l'élaboration d'une théorie du changement basée sur des résultats vérifiables.
EOT,
            'content' => <<<'EOT'
Une bonne théorie du changement doit modéliser clairement les hypothèses critiques reliant les intrants aux impacts à long terme, en s'appuyant sur des indicateurs d'effets intermédiaires qualitatifs.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet ProCaR'],
            'title' => <<<'EOT'
ProCaR : Accompagnement technique des producteurs au Bénin
EOT,
            'date' => '22 Mai 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Bilan à mi-parcours de l'appui technique à la production sous serres et hors sol (PADMAR).
EOT,
            'content' => <<<'EOT'
L'introduction de solutions innovantes pour le maraîchage dans le cadre du ProCaR (PADMAR) a permis d'améliorer la productivité face aux changements climatiques chez les agriculteurs béninois formés.
EOT,
            'image_url' => '/assets/blog/procar_greenhouse.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet RESI-2P'],
            'title' => <<<'EOT'
RESI-2P : Le rôle clé de la capitalisation des leçons apprises (suite Neer-Tamba)
EOT,
            'date' => '20 Mai 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Comment documenter les bonnes pratiques d'adaptation climatique issues des projets agricoles burkinabè.
EOT,
            'content' => <<<'EOT'
La capitalisation sous le projet RESI-2P met en lumière les techniques de gestion participative des ressources naturelles héritées du projet Neer-Tamba, combinées à de nouvelles stratégies de résilience agricole.
EOT,
            'image_url' => '/assets/blog/resi_resilience.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet Simandou'],
            'title' => <<<'EOT'
Simandou : Comment piloter le suivi de la faune sauvage
EOT,
            'date' => '18 Mai 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Utilisation de technologies de télédétection pour protéger l'écosystème à proximité des zones minières.
EOT,
            'content' => <<<'EOT'
Le plan de gestion environnementale de Simandou en Guinée s'appuie sur des colliers satellites et des pièges photographiques pour suivre la migration des chimpanzés d'Afrique de l'Ouest.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Méthodologie'],
            'title' => <<<'EOT'
Méthodologie : La redevabilité envers les populations bénéficiaires
EOT,
            'date' => '15 Mai 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Mettre en place des mécanismes de plaintes et retours d'information efficaces.
EOT,
            'content' => <<<'EOT'
Un système de suivi-évaluation inclusif doit intégrer des comités communautaires locaux pour recueillir et traiter les plaintes afin de garantir l'éthique de chaque intervention humanitaire ou de développement.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet ProCaR'],
            'title' => <<<'EOT'
ProCaR : Aménagement de pistes rurales et accès au marché au Bénin
EOT,
            'date' => '12 Mai 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Suivre l'évolution de l'accès au marché grâce au renforcement des infrastructures de transport.
EOT,
            'content' => <<<'EOT'
L'évaluation des aménagements de pistes rurales et des magasins de stockage construits sous l'égide du ProCaR montre une hausse du flux commercial et une meilleure rentabilité pour les filières maïs, riz et manioc.
EOT,
            'image_url' => '/assets/blog/procar_market.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet RESI-2P'],
            'title' => <<<'EOT'
RESI-2P : Renforcement des capacités des acteurs communaux au Burkina
EOT,
            'date' => '10 Mai 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Former les comités de gestion pour assurer la durabilité des infrastructures hydrauliques.
EOT,
            'content' => <<<'EOT'
Le transfert de compétences sous le programme RESI-2P passe par des ateliers de planification participative au niveau communal, garantissant une meilleure gestion des ressources en eau et des bas-fonds aménagés.
EOT,
            'image_url' => '/assets/blog/resi_water.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet Simandou'],
            'title' => <<<'EOT'
Suivi des chantiers de chemin de fer : Le cas Transguinéen (Simandou)
EOT,
            'date' => '08 Mai 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
L'utilisation d'images satellites pour vérifier l'état d'avancement de la ligne ferroviaire.
EOT,
            'content' => <<<'EOT'
Pour suivre plus de 600 km de voies ferrées en construction, le projet Simandou en Guinée utilise la télédétection spatiale pour documenter les terrassements et la stabilité des talus de manière automatisée.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Méthodologie'],
            'title' => <<<'EOT'
Méthodologie : La collecte de données en zone de conflit ou difficile d'accès
EOT,
            'date' => '06 Mai 2026',
            'read_time' => '6 min',
            'excerpt' => <<<'EOT'
Stratégies de suivi à distance pour les projets de développement en milieu complexe.
EOT,
            'content' => <<<'EOT'
Le suivi à distance via des relais locaux formés, la triangulation par téléphonie mobile et l'évaluation par imagerie thermique permettent de maintenir une continuité du suivi-évaluation en zones d'insécurité.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1509062522246-3755977927d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet ProCaR'],
            'title' => <<<'EOT'
ProCaR : Évaluation d'impact sur l'emploi des jeunes ruraux au Bénin
EOT,
            'date' => '04 Mai 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Combien d'emplois créés à travers le développement des filières agricoles béninoises ?
EOT,
            'content' => <<<'EOT'
L'étude d'impact montre que l'accès aux financements et partenariats productifs du ProCaR a permis l'insertion durable de plus de 1 200 jeunes dans l'entrepreneuriat agricole au Bénin.
EOT,
            'image_url' => '/assets/blog/procar_young_farmer.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet RESI-2P'],
            'title' => <<<'EOT'
RESI-2P : Intégration des personnes déplacées internes (PDI) au Burkina
EOT,
            'date' => '02 Mai 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Suivi des indicateurs d'inclusion sociale et de sécurité alimentaire dans les zones d'accueil.
EOT,
            'content' => <<<'EOT'
Le suivi-évaluation du programme RESI-2P met l'accent sur l'accès aux terres et aux ressources pour les populations déplacées par la crise sécuritaire, soutenant ainsi l'Offensive agropastorale du gouvernement.
EOT,
            'image_url' => '/assets/blog/resi_radio.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet Simandou'],
            'title' => <<<'EOT'
Simandou : Suivi des réinstallations des populations locales en Guinée
EOT,
            'date' => '30 Avril 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Respecter le standard de performance 5 de la SFI sur l'acquisition de terres.
EOT,
            'content' => <<<'EOT'
Le suivi-évaluation continu des nouveaux sites de réinstallation garantit la restauration durable des moyens de subsistance des foyers déplacés le long du tracé minier de Simandou.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Méthodologie'],
            'title' => <<<'EOT'
Méthodologie : Mesurer l'empowerment des femmes de manière quantitative
EOT,
            'date' => '28 Avril 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Utilisation de l'indice WEAI (Women's Empowerment in Agriculture Index).
EOT,
            'content' => <<<'EOT'
L'indice WEAI permet de mesurer le contrôle sur les ressources productives, les décisions d'achat et le leadership communautaire des femmes au sein des coopératives agricoles sahéliennes.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet ProCaR'],
            'title' => <<<'EOT'
ProCaR : Suivi-évaluation de la résilience financière des producteurs au Bénin
EOT,
            'date' => '25 Avril 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Évaluation de l'accès aux marchés et de la réduction de la pauvreté rurale.
EOT,
            'content' => <<<'EOT'
Les données du ProCaR révèlent une stabilisation et une hausse des revenus des petits producteurs béninois, renforçant leur sécurité alimentaire et nutritionnelle face aux chocs économiques.
EOT,
            'image_url' => '/assets/blog/procar_corn.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet RESI-2P'],
            'title' => <<<'EOT'
RESI-2P : Accès aux marchés pour les entreprises rurales des jeunes et femmes
EOT,
            'date' => '22 Avril 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Suivi du développement des micro-entreprises agricoles financées par le FIDA au Burkina Faso.
EOT,
            'content' => <<<'EOT'
La facilitation de l'accès au marché par le RESI-2P se traduit par un accroissement direct des revenus des femmes et des jeunes (y compris les personnes handicapées), mesuré via des enquêtes de rentabilité périodiques.
EOT,
            'image_url' => '/assets/blog/resi_water.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet Simandou'],
            'title' => <<<'EOT'
Simandou : Suivi de la qualité de l'air et des poussières fines en Guinée
EOT,
            'date' => '20 Avril 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Le suivi des capteurs d'émission de poussière à proximité des mines de Simandou.
EOT,
            'content' => <<<'EOT'
Des stations de mesure connectées transmettent quotidiennement les niveaux de particules PM10 et PM2.5 pour ajuster les opérations d'arrosage des pistes d'accès minières.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Méthodologie'],
            'title' => <<<'EOT'
Méthodologie : Concevoir un Cadre de Mesure de la Performance (CMP) agile
EOT,
            'date' => '18 Avril 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Comment concevoir un CMP capable d'intégrer de nouveaux indicateurs en cours de projet.
EOT,
            'content' => <<<'EOT'
La flexibilité des cadres de mesure permet aux équipes de projet de s'adapter aux crises sanitaires ou sécuritaires sans perdre la traçabilité des indicateurs de base du programme.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet ProCaR'],
            'title' => <<<'EOT'
ProCaR : Suivi des chaînes de valeur du maïs, riz et manioc (PADAAM)
EOT,
            'date' => '15 Avril 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Évaluation de la transformation et du stockage au Bénin.
EOT,
            'content' => <<<'EOT'
Le suivi-évaluation du programme PADAAM (ProCaR) permet de garantir la rentabilité des filières clés, avec une nette amélioration de la transformation locale du manioc et du conditionnement du riz béninois.
EOT,
            'image_url' => '/assets/blog/procar_market.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet RESI-2P'],
            'title' => <<<'EOT'
RESI-2P : Le rôle de la communication locale dans le partage des résultats S&E
EOT,
            'date' => '12 Avril 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Vulgariser les acquis du programme "Kakoadb-Jànsùli" auprès des communautés burkinabè.
EOT,
            'content' => <<<'EOT'
La restitution des données S&E en langues locales (Mooré, Dioula) permet aux bénéficiaires du programme RESI-2P de s'approprier les résultats et de renforcer la redevabilité des comités locaux.
EOT,
            'image_url' => '/assets/blog/resi_radio.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet Simandou'],
            'title' => <<<'EOT'
Simandou : Suivi des retombées économiques sur le PIB guinéen
EOT,
            'date' => '10 Avril 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Les indicateurs de croissance macroéconomiques liés au minerai de fer de Simandou.
EOT,
            'content' => <<<'EOT'
Le S&E macroéconomique mené en lien avec le ministère des Finances de Guinée permet d'évaluer la création de richesses locales indirectes et le développement des PME locales sous-traitantes.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Méthodologie'],
            'title' => <<<'EOT'
Méthodologie : L'intégration des ODD (Objectifs de Développement Durable)
EOT,
            'date' => '08 Avril 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Comment aligner et évaluer vos projets de développement par rapport à l'Agenda 2030.
EOT,
            'content' => <<<'EOT'
Chaque cadre logique de projet doit explicitement lier ses résultats intermédiaires aux cibles spécifiques des ODD (ODD 1, ODD 2, ODD 5, ODD 13) pour faciliter les synthèses d'impact nationales.
EOT,
            'image_url' => 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]);
        BlogPost::create([
            'category_id' => $categories['Projet ProCaR'],
            'title' => <<<'EOT'
ProCaR : Suivi-évaluation des aménagements hydro-agricoles au Bénin
EOT,
            'date' => '05 Avril 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Impact de l'irrigation et des aménagements de bas-fonds sur les récoltes.
EOT,
            'content' => <<<'EOT'
Les évaluations réalisées sur les sites du ProCaR montrent que les nouveaux aménagements hydro-agricoles ont permis une augmentation des rendements rizicoles et une meilleure gestion de l'eau en saison sèche.
EOT,
            'image_url' => '/assets/blog/procar_greenhouse.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Astuces & Outils'],
            'title' => <<<'EOT'
KoboToolbox : Optimiser vos formulaires pour la collecte hors-ligne
EOT,
            'date' => '10 Juin 2026',
            'read_time' => '6 min',
            'excerpt' => <<<'EOT'
Découvrez les meilleures pratiques pour structurer vos formulaires KoboToolbox et éviter les pertes de données en zone rurale.
EOT,
            'content' => <<<'EOT'
La collecte de données en milieu rural pose souvent le défi de la connectivité. KoboToolbox offre des fonctionnalités hors-ligne robustes. Dans cet article, nous partageons nos astuces pour pré-charger les listes (cascading selects), utiliser le GPS de manière optimale sans internet, et gérer les médias (photos) pour ne pas saturer la mémoire des tablettes des enquêteurs.
EOT,
            'image_url' => '/assets/blog/blog_kobo.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Astuces & Outils'],
            'title' => <<<'EOT'
Excel avancé : 5 formules indispensables pour le suivi-évaluation
EOT,
            'date' => '12 Juin 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Maîtrisez INDEX/EQUIV, SOMMEPROD et d'autres fonctions pour automatiser vos tableaux de bord.
EOT,
            'content' => <<<'EOT'
Bien que de nombreux outils spécialisés existent, Excel reste le socle du suivi-évaluation (S&E). Apprenez à combiner RECHERCHEX avec des listes déroulantes dynamiques pour créer des rapports interactifs. Nous verrons également comment utiliser SOMME.SI.ENS pour consolider les données de vos bénéficiaires par région et par genre en quelques clics.
EOT,
            'image_url' => '/assets/blog/blog_excel.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Astuces & Outils'],
            'title' => <<<'EOT'
Power BI : Créer un tableau de bord interactif pour vos projets
EOT,
            'date' => '15 Juin 2026',
            'read_time' => '7 min',
            'excerpt' => <<<'EOT'
Passez des rapports statiques aux visualisations dynamiques pour impressionner vos bailleurs de fonds.
EOT,
            'content' => <<<'EOT'
Power BI révolutionne la manière dont les résultats de projets sont présentés. Ce tutoriel vous guide dans la connexion de Power BI directement à vos bases de données KoboToolbox via API, la modélisation en étoile de vos données, et la création de cartes interactives pour visualiser l'impact de vos interventions sur le territoire national.
EOT,
            'image_url' => '/assets/blog/blog_powerbi.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Intelligence Artificielle'],
            'title' => <<<'EOT'
L'Intelligence Artificielle au service du S&E : Cas pratiques
EOT,
            'date' => '18 Juin 2026',
            'read_time' => '5 min',
            'excerpt' => <<<'EOT'
Comment les algorithmes d'IA permettent de prédire les tendances et d'identifier les anomalies dans vos bases de données.
EOT,
            'content' => <<<'EOT'
L'intégration de l'IA dans les processus d'évaluation transforme notre façon d'analyser l'impact. En utilisant le machine learning pour détecter des valeurs aberrantes dans les enquêtes terrain en temps réel, ou en appliquant des modèles prédictifs pour anticiper les baisses de rendement agricole, l'IA devient l'allié incontournable du spécialiste S&E.
EOT,
            'image_url' => '/assets/blog/blog_ai.png'
        ]);
        BlogPost::create([
            'category_id' => $categories['Intelligence Artificielle'],
            'title' => <<<'EOT'
Claude AI : Gagner du temps dans la capitalisation qualitative
EOT,
            'date' => '20 Juin 2026',
            'read_time' => '4 min',
            'excerpt' => <<<'EOT'
Utilisez l'assistant Claude pour synthétiser des centaines de pages d'entretiens (Focus Group).
EOT,
            'content' => <<<'EOT'
L'analyse qualitative demande énormément de temps. Avec des IA comme Claude d'Anthropic, il est désormais possible de traiter des dizaines de transcriptions de Focus Group Discussions (FGD) en quelques secondes. Découvrez comment formuler les bons "prompts" pour extraire les thématiques récurrentes, les citations clés et générer la trame de votre rapport de capitalisation tout en gardant un esprit critique.
EOT,
            'image_url' => '/assets/blog/blog_claude.png'
        ]);
    }
}
