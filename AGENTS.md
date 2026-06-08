<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

Le site web « Dɔni — Apprenez sans limites » doit être développé comme une plateforme institutionnelle professionnelle de haute qualité, répondant aux exigences suivantes :

1. **Identité et statut professionnel** : Assurer un statut légal complet avec un copyright unique et personnalisé, incluant toutes les mentions légales obligatoires conformes à la réglementation en vigueur sur les plateformes de formation en ligne. Tous les contenus textuels doivent être rédigés avec un langage précis, rigoureux et adapté à un public institutionnel, sans faute d'orthographe ni de grammaire.

2. **Charte graphique exclusive** : Adopter un design 100 % professionnel et expert, excluant formellement toute icône bichrome, tout emoji et tout élément graphique non institutionnel. Privilégier une identité visuelle sobre, cohérente, élégante et adaptée au secteur de l'éducation et de la formation institutionnelle, avec une typographie lisible et une palette de couleurs sobres et professionnelles.

3. **Ensemble complet des pages fonctionnelles** : Intégrer l'ensemble des pages nécessaires au bon fonctionnement de la plateforme institutionnelle, incluant au minimum :
   - Une page d'accueil présentant la mission, les valeurs et l'offre de formation de Dɔni
   - Une page à propos détaillant l'identité institutionnelle, l'équipe et l'histoire de la plateforme
   - Une page des formations/catalogue des contenus d'apprentissage
   - Une page de détail pour chaque formation proposée
   - Une page de contact avec formulaire de mise en relation et coordonnées institutionnelles
   - Une page des mentions légales, de politique de confidentialité et de conditions générales d'utilisation
   - Une page de FAQ répondant aux questions les plus fréquentes des utilisateurs
   - Une page d'inscription/connexion sécurisée pour les apprenants
   - Une page de présentation des partenaires institutionnels si applicable

4. **Normes de qualité** : Le site doit respecter les normes d'accessibilité web, être responsive pour s'adapter à tous les supports, garantir une navigation fluide et intuitive, et répondre aux exigences de performance SEO propres aux plateformes institutionnelles.


Pour l'application **Dɔni — Apprenez sans limites**, ajoutez l'ensemble des fonctionnalités core, complémentaires et de gestion nécessaires à son bon fonctionnement, en suivant les étapes et exigences ci-dessous :

### 1. Fonctionnalités utilisateur principales à implémenter
- Système d'authentification complet : inscription par email/téléphone, connexion sécurisée, récupération de mot de passe, connexion via comptes Google/Facebook, et gestion de profil utilisateur (modification des informations personnelles, upload de photo de profil, suivi de progression)
- Catalogue de formations structuré par catégories (académiques, professionnelles, loisirs), avec système de recherche avancée (filtres par niveau, prix, durée, note) et fonctionnalité de sauvegarde des formations favorites
- Système d'apprentissage intégré : lecture de cours en ligne (vidéos HD, documents PDF/texte, quiz intégrés par module), suivi de progression automatique, génération de certificats de réussite téléchargeables à la fin d'une formation
- Système de paiement sécurisé pour les formations payantes, avec gestion des abonnements mensuels/annuels, accès à des formations gratuites, et historique des transactions
- Espace de messagerie entre apprenants et formateurs, forum de discussion par formation, et système de notifications (rappel de cours, nouvelle publication, message reçu)

### 2. Fonctionnalités d'administration à ajouter
- Tableau de bord administrateur pour le suivi des statistiques clés (nombre d'inscrits, chiffre d'affaires, taux d'achèvement des formations)
- Interface de gestion des formations (ajout, modification, suppression de cours et de leurs contenus), des utilisateurs (apprenants et formateurs) et des avis sur les formations
- Système de modération des contenus publiés sur les forums et des avis pour garantir la conformité aux règles de l'application

### 3. Exigences techniques et de qualité
- Assurer la compatibilité de toutes les nouvelles fonctionnalités avec les versions existantes de l'application mobile (iOS 15+, Android 10+) et web
- Mettre en place un chiffrement des données utilisateurs (informations personnelles, coordonnées bancaires) conforme au RGPD
- Intégrer un système de tests unitaires et fonctionnels pour valider le bon fonctionnement de chaque fonctionnalité avant sa mise en production
- Garantir une expérience utilisateur fluide, avec des temps de chargement des contenus inférieurs à 2 secondes, et une interface cohérente avec la charte graphique existante de Dɔni

### 4. Livrables et critères de réussite
- L'ensemble des fonctionnalités listées sont opérationnelles sans bug bloquant
- Un rapport de test détaillant les vérifications effectuées sur chaque fonctionnalité
- Une documentation technique mise à jour décrivant l'implémentation des nouvelles fonctionnalités pour l'équipe de maintenance
- Taux de satisfaction utilisateur sur les nouvelles fonctionnalités supérieur à 4,5/5 lors des tests bêta
<!-- END:nextjs-agent-rules -->
