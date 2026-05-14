-- Amaryllis Corp — 7 propriétés seed
-- À exécuter dans l'éditeur SQL Supabase après schema.sql

insert into properties (name, description, address, city, price_per_night, max_guests, bedrooms, bathrooms, amenities) values

('Villa Ti-Amaryllis',
 'Villa créole avec piscine à débordement face à la mer des Caraïbes. Terrasse panoramique, jardin tropical et accès direct à la plage du Diamant.',
 '12 Chemin des Colibris', 'Le Diamant, Martinique',
 245, 6, 3, 2,
 ARRAY['Piscine', 'Vue mer', 'Accès plage', 'Climatisation', 'Wifi', 'Terrasse', 'Barbecue']),

('Villa Corail',
 'Magnifique villa coloniale à Saint-François avec vue sur le lagon. Idéale pour les familles, à 5 minutes des plages de Grande-Terre.',
 '8 Allée des Frangipanis', 'Saint-François, Guadeloupe',
 220, 8, 4, 2,
 ARRAY['Piscine', 'Jardin tropical', 'Climatisation', 'Wifi', 'Cuisine équipée', 'Terrasse']),

('Villa Azur',
 'Villa contemporaine avec piscine privée et vue imprenable sur la Méditerranée. À 10 minutes du centre de Nice, idéale pour explorer la Côte d''Azur.',
 '24 Route des Corniches', 'Nice, Côte d''Azur',
 280, 6, 3, 2,
 ARRAY['Piscine', 'Vue mer', 'Climatisation', 'Wifi', 'Parking', 'Terrasse', 'Jacuzzi']),

('Mas des Oliviers',
 'Authentique mas provençal restauré au cœur du Luberon. Pierres apparentes, voûtes en brique et jardin paysager de 2000 m². Calme et authenticité garantis.',
 '5 Route de Murs', 'Gordes, Provence',
 195, 4, 2, 1,
 ARRAY['Piscine', 'Jardin', 'Wifi', 'Climatisation', 'Barbecue', 'Parking', 'Pétanque']),

('Chalet Blanc',
 'Chalet de montagne entièrement rénové avec vue sur le Mont-Blanc. Skis aux pieds en hiver, randonnées en été. Sauna et espace bien-être inclus.',
 '18 Chemin des Alpages', 'Chamonix, Alpes',
 320, 8, 4, 3,
 ARRAY['Sauna', 'Vue montagne', 'Ski au pied', 'Wifi', 'Parking', 'Cheminée', 'Jacuzzi']),

('Appartement Marais',
 'Bel appartement haussmannien au cœur du Marais parisien. Parquet ancien, moulures et luminosité exceptionnelle. À deux pas des musées et restaurants.',
 '37 Rue des Rosiers', 'Paris 4ème',
 150, 3, 1, 1,
 ARRAY['Wifi', 'Cuisine équipée', 'Digicode', 'Métro à 2 min', 'Parquet', 'Lumineux']),

('Riad des Jardins',
 'Somptueux riad traditionnel en pleine médina de Marrakech. Patio fleuri avec fontaine, salon berbère et terrasse sur les toits. Service de conciergerie inclus.',
 '14 Derb Moulay Abdelkader', 'Marrakech, Maroc',
 180, 6, 3, 2,
 ARRAY['Patio', 'Terrasse sur les toits', 'Wifi', 'Conciergerie', 'Petit-déjeuner', 'Hammam', 'Climatisation']);
