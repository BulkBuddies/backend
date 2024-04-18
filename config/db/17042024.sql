INSERT INTO category (name, created_at) values ('Electrónica', NOW());
INSERT INTO category (name, created_at) values ('Moda y Accesorios', NOW());
INSERT INTO category (name, created_at) values ('Hogar y Jardín', NOW());
INSERT INTO category (name, created_at) values ('Salud y Belleza', NOW());
INSERT INTO category (name, created_at) values ('Deportes y Aire Libre', NOW());
INSERT INTO category (name, created_at) values ('Alimentos y Bebidas', NOW());
INSERT INTO category (name, created_at) values ('Libros y Medios', NOW());
INSERT INTO category (name, created_at) values ('Juguetes y Niños', NOW());
INSERT INTO category (name, created_at) values ('Mascotas', NOW());
INSERT INTO category (name, created_at) values ('Automóviles y Motocicletas', NOW());

 INSERT INTO product (name, description, required_stock, unit_price, created_at, url, category_id) values 
 ('Audifonos con Cable ComfortSound', 'Auriculares con cable ligeros y cómodos para uso diario, con calidad de sonido nítida y diseño plegable para facilitar su transporte.', '1000', '6900', NOW(), 'https://example.com/audifonos-comfort', 'da5c0831-8790-410e-a308-c422bd1f1481'),
 ('Power Bank PocketCharge', 'Un cargador portátil compacto con capacidad para recargar dispositivos móviles como teléfonos y tablets, ideal para viajes o emergencias.', '2000', '9900', NOW(), 'https://example.com/powerbank-pocket', 'da5c0831-8790-410e-a308-c422bd1f1481');
 
 ('Vestido de Noche Estrella', 'Un elegante vestido de noche confeccionado en seda satinada y detalles de encaje, perfecto para ocasiones especiales.', '3000', '99990', NOW(), 'https://example.com/vestido_estrella', '73ab2a97-7421-4aeb-abc9-5e893bae6d49'),
 ('Bufanda de Punto SoftWrap', 'Una bufanda de punto suave y cálida en colores neutros, perfecta para agregar un toque de estilo y abrigo a cualquier atuendo.', '2300', '7990', NOW(), 'https://example.com/bufanda-punto', '73ab2a97-7421-4aeb-abc9-5e893bae6d49'),
 
 ('Plantas de Interior VarietyGreen', 'Una selección de plantas de interior fáciles de cuidar, como cactus y suculentas, para añadir un toque verde a tu hogar.', '1000', '7990', NOW(), 'https://example.com/plantas-interior', '43817c18-3bd8-49ec-bc4f-ac30953f5a5d'),
 ('Juego de Toallas SoftTouch', 'Un juego de toallas de baño suaves y absorbentes en colores neutros, perfectas para el uso diario en el baño.', '5000', '5599', NOW(), 'https://example.com/toallas-soft', '43817c18-3bd8-49ec-bc4f-ac30953f5a5d'),
 
 ('Kit de Maquillaje Glamour', 'Un completo kit de maquillaje que incluye sombras de ojos, labiales, rubor, y pinceles profesionales para lograr looks espectaculares.', '700', '4590', NOW(), 'https://example.com/maquillaje-glamour', '5bf0e468-780b-4b69-81bd-6c4c8d61c238'),
 ('Cepillo de Dientes SoftCare', 'Un cepillo de dientes suave con mango ergonómico y cerdas de nylon que proporcionan una limpieza efectiva y delicada para tus dientes y encías.', '660', '6599', NOW(), 'https://example.com/cepillo-soft', '5bf0e468-780b-4b69-81bd-6c4c8d61c238'),
 
 ('Pelota de Fútbol StreetKick', 'Una pelota de fútbol resistente diseñada para juegos casuales en la calle o el parque, con un diseño colorido y duradero.', '7000', '6990', NOW(), 'https://example.com/pelota-futbol', '130ddeaa-a659-4c2b-8f15-7b7c415da60c'),
 ('Botella de Agua SportHydrate', 'Una botella de agua reutilizable con diseño ergonómico y capacidad para 750 ml, ideal para mantenerse hidratado durante el ejercicio.', '1000', '3490', NOW(), 'https://example.com/botella-agua', '130ddeaa-a659-4c2b-8f15-7b7c415da60c'),
 
 ('Paquete de Snacks VarietyBite', 'Un surtido de snacks salados y dulces en paquetes individuales, perfecto para llevar de merienda o disfrutar en casa.', '500', '990', NOW(), 'https://example.com/snacks', 'bea49961-be72-4534-8487-f1c844b816b5'),
 ('Set de Té Sabores del Mundo', 'Un set de té con una variedad de sabores, que incluye té negro, verde y de hierbas, perfecto para disfrutar en cualquier momento del día.', '600', '890', NOW(), 'https://example.com/tea-world', 'bea49961-be72-4534-8487-f1c844b816b5'),

 ('Novela de Ficción BestSeller', 'Una novela popular de género ficción en formato de bolsillo, ideal para disfrutar en el tiempo libre o en viajes cortos.', '1000', '8990', NOW(), 'https://example.com/libro-best-seller', '6cecd3a0-3690-498c-842d-43e44bc23be1'),
 ('Película en Blu-ray Colección Clásicos', 'Una colección de películas clásicas remasterizadas en alta definición, que incluye títulos icónicos de diferentes géneros.', '1300', '8990', NOW(), 'https://example.com/peliculas-bluray', '6cecd3a0-3690-498c-842d-43e44bc23be1'),

 ('Set de Dibujo Creativo ArtPlay', 'Un set de dibujo que incluye lápices de colores, papel y plantillas, para fomentar la creatividad y la expresión artística en los niños.', '1000', '4990', NOW(), 'https://example.com/set-dibujo', '9eeb444f-91ed-4e50-a974-1ddcadd17d86'),
 ('Puzzle Educativo LearnFun', 'Un puzzle educativo con piezas grandes y coloridas, diseñado para ayudar a los niños a desarrollar habilidades cognitivas y motrices.', '3000', '2990', NOW(), 'https://example.com/puzzle-educativo', '9eeb444f-91ed-4e50-a974-1ddcadd17d86'),

 ('Juguete de Goma ChewFun', 'Un juguete de goma duradero para perros, diseñado para satisfacer su instinto de masticación y mantenerlos entretenidos durante horas.', '600', '990', NOW(), 'https://example.com/goma-chew', '34946c48-0871-4c89-858a-c0a3dcf84cdc'),
 ('Camas para perros', 'Diseñadas pensando en el confort y el bienestar de tu fiel amigo, estas camas están fabricadas con materiales suaves y duraderos que proporcionan el soporte adecuado para su cuerpo.', '600', '6990', NOW(), 'https://example.com/cama-perros', '34946c48-0871-4c89-858a-c0a3dcf84cdc'),

 ('Kit de Limpieza AutoShine', 'Un kit básico de limpieza para automóviles que incluye detergente para carrocería, paños de microfibra y cepillo para llantas.', '1000', '9990', NOW(), 'https://example.com/kit-limpieza', '3122ad61-5c89-4271-93b3-613487401afd'),
 ('Organizador de Maletero CargoMax', 'Un organizador plegable para maletero con varios compartimentos, ideal para mantener el coche ordenado y almacenar objetos de forma segura.', '650', '3990', NOW(), 'https://example.com/organizador-maletero', '3122ad61-5c89-4271-93b3-613487401afd');
