<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'slug' => 'planification',
                'service_category_id' => 1,
                'title' => 'Planification Stratégique',
                'tagline' => 'Des projets bien conçus dès le départ',
                'desc' => "Nous aidons vos équipes à construire des cadres d'intervention cohérents, à définir des théories du changement réalistes et à aligner vos activités sur vos objectifs de développement.",
                'features' => [
                    "Élaboration de cadres logiques et logiques d'intervention",
                    'Construction de théories du changement participatives',
                    'Analyse des parties prenantes et cartographie des acteurs',
                    'Formulation de projets et programmes',
                    'Alignement stratégique sur les ODD',
                ],
                'icon' => 'FiCompass',
            ],
            [
                'slug' => 'suivi',
                'service_category_id' => 2,
                'title' => 'Suivi-Évaluation',
                'tagline' => 'Mesurer pour mieux agir',
                'desc' => "DJENEPO PARTNERS conçoit et met en place des systèmes de suivi-évaluation robustes qui permettent à vos équipes de mesurer l'impact réel de leurs interventions et de prendre des décisions fondées sur des données.",
                'features' => [
                    "Conception de cadres de mesure de la performance (CMP)",
                    "Développement d'indicateurs SMART et tableaux de bord",
                    "Mise en place de systèmes de collecte de données",
                    'Évaluations intermédiaires et finales',
                    'Analyse et capitalisation des résultats',
                ],
                'icon' => 'FiTrendingUp',
            ],
            [
                'slug' => 'formation',
                'service_category_id' => 3,
                'title' => 'Formation & Renforcement des Capacités',
                'tagline' => 'Investir dans les hommes',
                'desc' => 'Nous développons et animons des programmes de formation sur mesure qui renforcent durablement les compétences des équipes projet, des coordinateurs terrain et des responsables de suivi-évaluation.',
                'features' => [
                    "Formations en gestion axée sur les résultats (GAR)",
                    'Ateliers de renforcement en suivi-évaluation',
                    'Formation à la collecte de données mobile (KoboToolbox, ODK)',
                    'Mentoring et accompagnement des équipes',
                    'Développement de guides et outils pédagogiques',
                ],
                'icon' => 'FiUsers',
            ],
            [
                'slug' => 'appui',
                'service_category_id' => 1,
                'title' => 'Appui Technique',
                'tagline' => 'Un accompagnement opérationnel sur le terrain',
                'desc' => 'Nos experts interviennent directement auprès de vos équipes pour apporter un soutien technique ciblé dans la mise en œuvre de vos projets et programmes de développement.',
                'features' => [
                    "Accompagnement à la mise en œuvre de projets",
                    'Revues de performances et audits de projet',
                    "Facilitation d'ateliers et de réunions stratégiques",
                    'Rédaction de rapports et documents techniques',
                    'Conseil en stratégie organisationnelle',
                ],
                'icon' => 'FiLayers',
            ],
            [
                'slug' => 'recherche',
                'service_category_id' => 2,
                'title' => 'Recherche & Analyses',
                'tagline' => 'Des données pour guider vos décisions',
                'desc' => 'Nous réalisons des études de base, des enquêtes terrain et des analyses sectorielles qui alimentent la prise de décision éclairée et améliorent la conception des interventions.',
                'features' => [
                    'Études de base et de fin de projet',
                    "Enquêtes ménages et sondages d'opinion",
                    'Analyses de contexte et diagnostics sectoriels',
                    'Cartographie des besoins et vulnérabilités',
                    "Rapports d'analyse et de synthèse",
                ],
                'icon' => 'FiBarChart2',
            ],
            [
                'slug' => 'coaching',
                'service_category_id' => 1,
                'title' => 'Coaching Organisationnel',
                'tagline' => 'Renforcer votre organisation de l\'intérieur',
                'desc' => 'Nous accompagnons les organisations dans leur développement institutionnel, la structuration de leurs processus internes et l\'amélioration de leur gouvernance pour une efficacité accrue.',
                'features' => [
                    'Diagnostic organisationnel et plan de développement',
                    'Structuration des processus internes',
                    'Amélioration de la gouvernance et des procédures',
                    'Gestion du changement organisationnel',
                    'Développement de politiques et manuels de procédures',
                ],
                'icon' => 'FiBookOpen',
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['slug' => $service['slug']],
                $service
            );
        }
    }
}
