(() => {
  // El registro conserva datos, fotos, fuente y estado de publicación por separado.
  // Las fichas cerradas o con datos contradictorios quedan fuera de los catálogos públicos.
  const propertyPhotos = (slug, count, { cleanFirst = false } = {}) => Array.from({ length: count }, (_, index) =>
    `imagenes/propiedades/${slug}/${slug}-${String(index + 1).padStart(2, '0')}${cleanFirst && index === 0 ? '-limpia' : ''}.jpg`);
  const archivedPhotoPaths = (date, id, count) => Array.from({ length: count }, (_, index) =>
    `imagenes/archivo-originales-instagram/${date}_${id}/delnorte.propiedades_${id}_${index}.jpg`);
  const sourceFor = id => `https://www.instagram.com/p/${id}/`;
  const galleryGroups = {
    DOYygHhANc6: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Ambiente principal', indexes: [6, 7, 8, 9] },
      { label: 'Cocina', indexes: [3, 4, 5] },
      { label: 'Baño', indexes: [10, 11] },
      { label: 'Espacios comunes', indexes: [1, 2] },
      { label: 'Del Norte Propiedades', indexes: [12] }
    ],
    DefbmXRGpWq: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Living-comedor y acceso', indexes: [3, 2, 1] },
      { label: 'Cocina', indexes: [4, 5] },
      { label: 'Dormitorios y circulación', indexes: [9, 10, 11, 12, 8, 7] },
      { label: 'Baño y toilette', indexes: [13, 6] }
    ],
    DYAMViQgJsY: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Living-comedor', indexes: [1, 3] },
      { label: 'Cocina', indexes: [2] },
      { label: 'Dormitorios y placares', indexes: [8, 5, 6] },
      { label: 'Baños', indexes: [4, 7] },
      { label: 'Patio', indexes: [9] }
    ],
    DeaME7gGqCx: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Living-comedor', indexes: [1, 6] },
      { label: 'Cocina', indexes: [2, 3] },
      { label: 'Dormitorios y circulación', indexes: [9, 14, 13, 7, 8, 10] },
      { label: 'Baño y toilette', indexes: [5, 11, 12] },
      { label: 'Patio y exterior', indexes: [4, 15] }
    ],
    DdMt6xHmiKp: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Living-comedor', indexes: [2, 3] },
      { label: 'Cocina', indexes: [4, 5, 6] },
      { label: 'Dormitorios y circulación', indexes: [11, 12, 13, 14, 1, 8, 9, 10, 15] },
      { label: 'Baño y toilette', indexes: [7, 16] }
    ],
    DeIXru5mncY: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Living con hogar y circulación', indexes: [1, 2, 7] },
      { label: 'Cocina-comedor', indexes: [4, 5] },
      { label: 'Dormitorios', indexes: [9, 10] },
      { label: 'Baño y toilette', indexes: [6, 8] },
      { label: 'Quincho con parrilla', indexes: [3] },
      { label: 'Patio', indexes: [11] }
    ],
    DeIJre_muqb: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Living-comedor', indexes: [1, 2, 3] },
      { label: 'Cocina', indexes: [4, 5, 6] },
      { label: 'Dormitorios', indexes: [10, 11, 12, 13, 14] },
      { label: 'Baños', indexes: [7, 9] },
      { label: 'Lavadero', indexes: [8] },
      { label: 'Exterior', indexes: [15] }
    ],
    Dd9xBY2GjP0: [
      { label: 'Vista general de la cochera', indexes: [0] },
      { label: 'Acceso a la cochera', indexes: [1] }
    ],
    Dd9vtifGp4z: [
      { label: 'Fachada', indexes: [11] },
      { label: 'Ambientes principales', indexes: [1, 7] },
      { label: 'Cocina', indexes: [0] },
      { label: 'Dormitorios y placares', indexes: [2, 4, 5, 8] },
      { label: 'Circulación', indexes: [6] },
      { label: 'Baño', indexes: [9] },
      { label: 'Lavadero', indexes: [3] },
      { label: 'Vista exterior', indexes: [10] }
    ],
    DdXRi7gGlfa: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Living-comedor', indexes: [1] },
      { label: 'Cocina', indexes: [2] },
      { label: 'Dormitorios y circulación', indexes: [4, 5, 3] },
      { label: 'Baño', indexes: [6] },
      { label: 'Vista al exterior', indexes: [7] }
    ],
    DczHePGmjeT: [
      { label: 'Fachada', indexes: [0] },
      { label: 'Living-comedor', indexes: [1] },
      { label: 'Cocina', indexes: [2, 3] },
      { label: 'Dormitorio y placard', indexes: [4, 5] },
      { label: 'Baño', indexes: [6] },
      { label: 'Acceso', indexes: [7] }
    ]
  };

  const properties = [
    {
      id: 'pellegrini-940', publishedAt: '2026-10-22', title: 'Dúplex en Pellegrini 940',
      operation: 'venta', type: 'duplex', city: 'rio-grande', neighborhood: 'Barrio Mutual',
      address: 'Pellegrini N° 940', bedrooms: 3, bathrooms: 1, toilets: 1,
      area: 125.4, areaLabel: '125,40 m² construidos', uncoveredArea: 62.75, lotArea: 135.43,
      price: 160000, currency: 'USD', availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Alquilado hasta el 03/01/2027.', showOccupancyOnCard: true,
      summary: 'Dúplex de tres dormitorios en Barrio Mutual, Río Grande, con 125,40 m² construidos sobre un terreno de 135,43 m². Cuenta con living, cocina-comedor, quincho con parrilla, lavadero, patio y entrada para vehículo. Apto para crédito hipotecario.',
      features: ['Tres dormitorios', 'Baño completo', 'Toilette', 'Living', 'Cocina-comedor', 'Quincho con parrilla', 'Lavadero', 'Entrada para vehículo', 'Patio', '125,40 m² construidos', '62,75 m² libres', 'Terreno de 135,43 m²', 'Apto para crédito hipotecario'],
      tenancyDetails: ['Contrato de alquiler vigente hasta el 03/01/2027.', 'Valor mensual del alquiler: $1.238.800.'],
      saleConditions: ['Los gastos se abonan aparte del precio de venta.'], conditions: '',
      source: 'Ficha proporcionada por Del Norte Propiedades.', whatsapp: '5492964610103',
      cardPhotoIndex: 0, heroPhotoIndex: 0, cardPhotoAlt: 'Frente del complejo de dúplex en Pellegrini 940, Barrio Mutual',
      photos: propertyPhotos('duplex-pellegrini-940', 21),
      galleryGroups: [
        { label: 'Frente y acceso para vehículo', indexes: [0, 1, 2] },
        { label: 'Living y comedor', indexes: [3, 4, 5] },
        { label: 'Cocina', indexes: [6, 7] },
        { label: 'Quincho con parrilla', indexes: [8] },
        { label: 'Lavadero', indexes: [9] },
        { label: 'Patio', indexes: [10] },
        { label: 'Escalera y circulación', indexes: [11, 12, 20] },
        { label: 'Dormitorios y placares', indexes: [13, 14, 15, 16] },
        { label: 'Baño completo', indexes: [17, 18] },
        { label: 'Toilette', indexes: [19] }
      ]
    },
    {
      id: 'islas-malvinas-944-duplex-8', publishedAt: '2026-10-22', title: 'Dúplex 8 en Islas Malvinas 944',
      operation: 'venta', type: 'duplex', city: 'rio-grande', neighborhood: 'Zona Centro',
      address: 'Islas Malvinas N° 944, dúplex 8', bedrooms: 3, bathrooms: 1, toilets: 1,
      area: 97.88, areaLabel: '97,88 m² cubiertos', uncoveredArea: 59.67, price: 99000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true, occupancy: '',
      summary: 'Dúplex recientemente remodelado en Zona Centro, Río Grande, con tres dormitorios, 97,88 m² cubiertos y 59,67 m² descubiertos. Cuenta con cocina con parrilla, living-comedor, patio y entrada para vehículo.',
      features: ['Tres dormitorios', 'Baño completo en planta alta', 'Toilette en planta baja', 'Cocina con parrilla', 'Living-comedor', 'Patio', 'Lavadero', 'Entrada para vehículo', 'Recientemente remodelado', '97,88 m² cubiertos y 59,67 m² descubiertos'],
      saleConditions: ['Los gastos se abonan aparte del precio de venta.'], conditions: '',
      source: 'Ficha proporcionada por Del Norte Propiedades.', whatsapp: '5492964610103',
      cardPhotoIndex: 0, heroPhotoIndex: 0,
      cardPhotoAlt: 'Cocina con parrilla del dúplex 8 en Islas Malvinas 944',
      photos: propertyPhotos('duplex-islas-malvinas-944-8', 12),
      galleryGroups: [
        { label: 'Cocina y parrilla', indexes: [0, 1, 2] },
        { label: 'Living-comedor en planta baja', indexes: [3, 4] },
        { label: 'Escalera y circulación', indexes: [5, 6] },
        { label: 'Dormitorios en planta alta', indexes: [7, 8, 9] },
        { label: 'Baño en planta alta', indexes: [10] },
        { label: 'Toilette en planta baja', indexes: [11] }
      ]
    },
    {
      id: 'vidal-herrera-agp', publishedAt: '2026-10-22', title: 'Casa a remodelar + departamento',
      operation: 'venta', type: 'casas', city: 'rio-grande', neighborhood: 'Barrio AGP',
      address: 'Vidal N° 710-756, esquina Herrera', bedrooms: 5, bathrooms: 2, toilets: 1,
      area: 169, areaLabel: '169 m² construidos en total', lotArea: 260, price: 90000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Casa desocupada · Departamento alquilado hasta el 31/12/2027.', showOccupancyOnCard: true,
      summary: 'Casa a remodelar más departamento en esquina, en Barrio AGP, Río Grande. La casa presenta filtraciones y requiere inversión en refacciones. El conjunto suma 169 m² construidos sobre un terreno de 260 m².',
      features: ['Casa: cuatro dormitorios', 'Casa: baño completo y toilette', 'Casa: cocina-comedor amplio y living', 'Casa: quincho/garage con parrilla y lavadero', 'Casa: patio con reja', 'Departamento: un dormitorio y baño', 'Departamento: cocina-living-comedor', '169 m² construidos en total', 'Terreno de 260 m²'],
      tenancyDetails: ['Departamento alquilado hasta el 31/12/2027.', 'Valor mensual del alquiler: $412.600.', 'Casa desocupada.'],
      saleConditions: ['La casa presenta filtraciones y requiere remodelación.', 'Precio más gastos de comisión inmobiliaria y escritura.'],
      conditions: '', source: 'Ficha proporcionada por Del Norte Propiedades.',
      whatsapp: '5492964610103', cardPhotoIndex: 0, heroPhotoIndex: 0,
      cardPhotoAlt: 'Casa y departamento en esquina sobre Vidal y Herrera, Barrio AGP',
      photos: propertyPhotos('casa-departamento-vidal-herrera-agp', 26),
      galleryGroups: [
        { label: 'Frente de la casa y el departamento', indexes: [0, 1, 2, 3] },
        { label: 'Casa · Quincho/garage y parrilla', indexes: [4, 5, 6] },
        { label: 'Casa · Lavadero', indexes: [7] },
        { label: 'Casa · Dormitorios', indexes: [8, 10, 11, 12] },
        { label: 'Casa · Baño', indexes: [9] },
        { label: 'Casa · Cocina y living-comedor', indexes: [13, 14, 15, 16, 17, 18] },
        { label: 'Departamento · Cocina-living-comedor', indexes: [19, 20, 21] },
        { label: 'Departamento · Dormitorio y placard', indexes: [22, 23] },
        { label: 'Departamento · Circulación', indexes: [24] },
        { label: 'Departamento · Baño', indexes: [25] }
      ]
    },
    {
      id: 'quincho-el-murtillar', publishedAt: '2026-10-21', title: 'Quincho amoblado en El Murtillar',
      operation: 'venta', type: 'casas', city: 'rio-grande', neighborhood: 'El Murtillar',
      address: 'Barrio El Murtillar', bedrooms: null, bathrooms: 1,
      area: 80, areaLabel: '80 m² cubiertos', lotArea: 1000, price: 90000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Quincho monoambiente amoblado de 80 m², sobre un terreno de 1.000 m² en El Murtillar, Río Grande. Cuenta con cocina-comedor, living con hogar, parrilla y vista al mar.',
      features: ['Quincho monoambiente de 80 m²', 'Terreno de 1.000 m²', 'Cocina-comedor', 'Baño completo', 'Living con hogar', 'Parrilla', 'Amoblado', 'Vista al mar'],
      cadastralDetails: [['Macizo', '4'], ['Parcela', '8'], ['Sección', 'X'], ['Plano', 'T.F. 2-58-10'], ['Partida', '24713']],
      saleConditions: ['Se escuchan ofertas.', 'No apto para crédito hipotecario.'],
      conditions: '',
      source: 'Ficha proporcionada por Del Norte Propiedades.',
      whatsapp: '5492964610103', cardPhotoIndex: 0, heroPhotoIndex: 0,
      cardPhotoAlt: 'Vista exterior del quincho en El Murtillar, con el mar de fondo',
      photos: propertyPhotos('quincho-el-murtillar', 17),
      galleryGroups: [
        { label: 'Fachada y entorno', indexes: [0, 1] },
        { label: 'Living con hogar', indexes: [14, 15, 16] },
        { label: 'Cocina y parrilla', indexes: [12, 13] },
        { label: 'Comedor y vista al mar', indexes: [2, 3, 4, 5, 6, 7, 8, 9, 10] },
        { label: 'Baño completo', indexes: [11] }
      ]
    },
    {
      id: 'indira-gandhi-833', publishedAt: '2026-10-19', title: 'Dúplex en Indira Gandhi 833',
      operation: 'venta', type: 'duplex', city: 'rio-grande', neighborhood: 'Barrio CGT',
      address: 'Indira Gandhi N° 833, Barrio CGT', bedrooms: 2, bathrooms: 1, toilets: 1,
      area: 80, areaLabel: '80 m² cubiertos aprox.', price: 85000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Alquilado hasta el 01/02/2027.', showOccupancyOnCard: true,
      summary: 'Dúplex de aproximadamente 80 m² cubiertos en Barrio CGT, con dos dormitorios con placard, patio trasero y entrada para vehículo. En venta con contrato de alquiler vigente.',
      features: ['80 m² cubiertos aproximadamente', 'Dos dormitorios con placard', 'Cocina', 'Living-comedor', 'Baño completo en planta alta y toilette en planta baja', 'Patio trasero', 'Calefacción por caldera y radiadores', 'Entrada para vehículo'],
      tenancyDetails: ['Contrato vigente hasta el 01/02/2027.', 'Ajustes cada 6 meses por IPC.', 'Alquiler de referencia (03/2026): $896.000 mensuales.'],
      conditions: '',
      source: 'Ficha proporcionada por Del Norte Propiedades.',
      whatsapp: '5492964610103', cardPhotoIndex: 0, heroPhotoIndex: 0,
      cardPhotoAlt: 'Frente del dúplex en Indira Gandhi 833, Barrio CGT',
      photos: propertyPhotos('duplex-indira-gandhi-833', 11),
      galleryGroups: [
        { label: 'Frente', indexes: [0] },
        { label: 'Living-comedor', indexes: [1, 2, 3, 4] },
        { label: 'Cocina', indexes: [5] },
        { label: 'Toilette en planta baja', indexes: [6] },
        { label: 'Dormitorios y placares', indexes: [7, 8] },
        { label: 'Antebaño y baño en planta alta', indexes: [9, 10] }
      ]
    },
    {
      id: 'DOYygHhANc6', publishedAt: '2025-09-09', title: 'Monoambiente amoblado en Edificio Turek Centro',
      operation: 'venta', type: 'monoambientes', city: 'rio-grande', neighborhood: 'Zona Centro',
      address: 'Rivadavia N° 467, entre Lasserre y Mackinlay', bedrooms: 0, bathrooms: null,
      area: 30, areaLabel: '30 m² cubiertos', price: 48000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Alquilado hasta el 30/09/2028', showOccupancyOnCard: true,
      summary: 'Monoambiente totalmente amoblado de 30 m² cubiertos, ubicado en el primer piso al contrafrente del Edificio Turek Centro, en el centro de Río Grande.',
      features: ['Totalmente amoblado', 'Primer piso al contrafrente', 'Lavandería en el edificio', 'Bajas expensas', 'No apto crédito hipotecario'],
      conditions: 'El precio incluye los muebles. Gastos de sellado y comisión inmobiliaria aparte.',
      whatsapp: '5492964610103', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del Edificio Turek Centro en Rivadavia N° 467, Río Grande',
      photos: propertyPhotos('monoambiente-amoblado-turek-centro', 13)
    },
    {
      id: 'DefbmXRGpWq', publishedAt: '2026-10-14', title: 'Dúplex en Ushuaia al 700',
      operation: 'alquiler', type: 'duplex', city: 'rio-grande', neighborhood: 'Barrio Mutual',
      address: 'Ushuaia al 700, Barrio Mutual', bedrooms: 2, bathrooms: 1, toilets: 1,
      area: null, areaLabel: '', price: 930000, currency: 'ARS',
      rentalFormat: true, availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Dúplex de dos dormitorios en Barrio Mutual, con cocina amplia separada, patio trasero y entrada para auto.',
      features: ['Dos dormitorios con placard', 'Un baño completo y un toilette', 'Cocina amplia separada', 'Living-comedor', 'Doble hall de entrada', 'Patio trasero', 'Entrada para auto', 'Tanque de agua y bomba', 'Calefacción por caldera y radiadores'],
      contractConditions: ['Duración: 2 años.', 'Ajustes: cada 6 meses mediante el índice IPC.', 'Los servicios se abonan por separado del alquiler.'],
      extraCosts: ['Luz', 'Gas', 'Proporción de impuestos municipales'],
      whatsapp: '5492964617729', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del dúplex en alquiler en Ushuaia al 700, Barrio Mutual',
      photos: propertyPhotos('duplex-ushuaia-700-barrio-mutual', 14, { cleanFirst: true })
    },
    {
      id: 'DYAMViQgJsY', publishedAt: '2026-05-06', title: 'Casa en Los Canelos 1267',
      operation: 'venta', type: 'casas', city: 'rio-grande', neighborhood: 'Barrio Aeropuerto',
      address: 'Los Canelos N° 1267, Barrio Aeropuerto', bedrooms: 3, bathrooms: 2,
      area: 110, areaLabel: '110 m² construidos', lotArea: 200, price: 93000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Precio rebajado de US$ 110.000 a US$ 93.000.',
      summary: 'Casa unifamiliar de mampostería revestida en lenga, con 110 m² construidos sobre un lote de 200 m², en Barrio Aeropuerto. Recién pintada y lista para mudarse.',
      features: ['Tres dormitorios', 'Dos baños completos', 'Living cómodo y luminoso', 'Amplia cocina-comedor', 'Lavadero independiente', 'Patio libre', 'Entrada para vehículo', 'Calefacción por caldera y radiadores', 'Excelente iluminación natural', 'Recién pintada', 'Apta crédito hipotecario'],
      conditions: 'Precio más gastos de comisión inmobiliaria y escritura.',
      whatsapp: '5492964610103', cardPhotoIndex: 0, heroPhotoIndex: 0,
      cardPhotoAlt: 'Fachada de madera de la casa en Barrio Aeropuerto',
      heroPhotoAlt: 'Fachada de madera de la casa en Barrio Aeropuerto',
      photos: propertyPhotos('casa-barrio-aeropuerto', 10),
      videos: [{ src: 'videos/propiedades/los-canelos-1267-recorrido.mp4', poster: 'assets/properties/casa-barrio-aeropuerto/recorrido-poster.webp', label: 'Recorrido de la casa en Los Canelos 1267' }]
    },
    {
      id: 'DeaME7gGqCx', publishedAt: '2026-10-12', title: 'Dúplex en Barrio Mutual',
      operation: 'venta', type: 'duplex', city: 'rio-grande', neighborhood: 'Barrio Mutual',
      address: 'Houssay, entre Buenos Aires y Av. Santa Fe', bedrooms: 2, bathrooms: 1, toilets: 1,
      area: 57, areaLabel: '57 m² cubiertos', uncoveredArea: 24, price: 85000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Propiedad desocupada, lista para habitar o alquilar. Disponibilidad inmediata.',
      summary: 'Dúplex de dos plantas sobre calle Houssay, en una zona residencial de Barrio Mutual, a pocas cuadras del Parque de los Cien Años.',
      features: ['57 m² cubiertos y 24 m² descubiertos', 'Dos dormitorios pequeños con placares', 'Living-comedor', 'Cocina con amoblamientos Johnson', 'Un baño en planta alta y un toilette en planta baja', 'Conexión para lavarropas', 'Patio trasero con posibilidad de ampliación', 'Pequeño patio delantero', 'Espacio para estacionar vehículo', 'Calefacción por caldera y radiadores', 'Tanque de reserva de agua y bomba', 'Apto crédito hipotecario'],
      conditions: 'Precio más gastos de comisión inmobiliaria y escritura.',
      whatsapp: '5492964610103', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del dúplex en Barrio Mutual',
      photos: propertyPhotos('duplex-barrio-mutual', 16, { cleanFirst: true })
    },
    {
      id: 'DdMt6xHmiKp', publishedAt: '2026-09-12', title: 'Dúplex en Pellegrini al 900',
      operation: 'alquiler', type: 'duplex', city: 'rio-grande', neighborhood: 'Barrio Mutual',
      address: 'Pellegrini N° 936, Barrio Mutual', bedrooms: 2, bathrooms: 1, toilets: 1,
      area: null, areaLabel: '', price: 950000, currency: 'ARS',
      rentalFormat: true,
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Amplio dúplex de dos dormitorios en Pellegrini al 900, Barrio Mutual.',
      features: ['Dos dormitorios con placard', 'Un baño completo y un toilette', 'Cocina', 'Living-comedor', 'Depósito bajo escalera', 'Espacio para lavarropas', 'Cortinas y bomba de agua', 'Calefacción por caldera y radiadores', 'Sin entrada para vehículos', 'A pasos del CEMEP'],
      contractConditions: ['Duración: 2 años.', 'Ajustes: cada 6 meses mediante el índice IPC.', 'Los servicios se abonan por separado del alquiler.'],
      extraCosts: ['Proporción de impuestos municipales', 'Luz', 'Gas'],
      whatsapp: '5492964617729', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del dúplex en alquiler en Pellegrini al 900, Barrio Mutual',
      photos: propertyPhotos('duplex-pellegrini-900-barrio-mutual', 17, { cleanFirst: true }),
      videos: [{ src: 'videos/propiedades/pellegrini-900-recorrido.mp4', poster: 'assets/properties/duplex-pellegrini-900-barrio-mutual/recorrido-poster.webp', label: 'Recorrido del dúplex' }]
    },
    {
      id: 'DeIXru5mncY', publishedAt: '2026-10-05', title: 'Dúplex sobre calle Entre Ríos',
      operation: 'venta', type: 'duplex', city: 'rio-grande', neighborhood: 'Barrio Mutual',
      address: 'Entre Ríos, a pasos de la bicisenda', bedrooms: 2, bathrooms: 1, toilets: 1,
      area: 92, areaLabel: '92 m² cubiertos', semiCoveredArea: 13.86, lotArea: 116,
      price: 100000, currency: 'USD', availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Alquilado hasta el 30/06/2027.', showOccupancyOnCard: true,
      summary: 'Dúplex en venta sobre calle Entre Ríos, a pasos de la bicisenda, en un sector residencial de Barrio Mutual. Una alternativa para inversión, actualmente alquilado hasta el 30/06/2027.',
      features: ['92 m² cubiertos', '13,86 m² semicubiertos', 'Terreno de 116 m²', 'Dos dormitorios con placard', 'Cocina', 'Comedor', 'Living con hogar a leña', 'Un baño completo y un toilette', 'Quincho/lavadero con parrilla', 'Patio interno', 'Entrada techada para vehículos', 'Apto crédito hipotecario'],
      conditions: 'Precio más gastos de comisión inmobiliaria y escritura.',
      whatsapp: '5492964610103', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del dúplex en venta sobre calle Entre Ríos, Barrio Mutual',
      photos: propertyPhotos('duplex-entre-rios-barrio-mutual', 12)
    },
    {
      id: 'DeIJre_muqb', publishedAt: '2026-10-05', title: 'Casa en Barrio Las Barrancas',
      operation: 'venta', type: 'casas', city: 'rio-grande', neighborhood: 'Las Barrancas',
      address: 'Rakela 154, Barrio Las Barrancas', bedrooms: 3, bathrooms: 2,
      area: 130, areaLabel: '130 m² construidos', lotArea: 237, price: 170000, currency: 'USD',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: 'Alquilada hasta el 31/07/2028.',
      showOccupancyOnCard: true,
      summary: 'Casa amplia, luminosa y funcional de dos plantas, en un entorno residencial de Barrio Las Barrancas. Se ofrece en venta actualmente alquilada, una alternativa para inversión.',
      features: ['130 m² construidos sobre un lote de 237 m²', 'Tres dormitorios', 'Dos baños, uno con ducha', 'Living-comedor amplio y luminoso', 'Cocina y lavadero', 'Depósito bajo escalera', 'Patio amplio con posibilidad de ampliación', 'Excelente iluminación natural', 'Portón y entrada para vehículo', 'Calefacción por caldera y radiadores', 'Aberturas de PVC', 'Apta crédito hipotecario'],
      conditions: '',
      whatsapp: '5492964610103', cardPhotoIndex: 0,
      cardPhotoAlt: 'Fachada de la casa en venta en Barrio Las Barrancas',
      photos: propertyPhotos('casa-barrio-las-barrancas', 16, { cleanFirst: true })
    },
    {
      id: 'Dd9xBY2GjP0', publishedAt: '2026-10-01', title: 'Cochera en Edificio Turek',
      operation: 'alquiler', type: 'cocheras', city: 'rio-grande', neighborhood: '',
      address: 'Edificio Turek · Gálvez 547', bedrooms: null, bathrooms: null,
      area: null, areaLabel: '', price: 90000, currency: 'ARS', priceNote: 'expensas e impuestos incluidos',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Cochera totalmente cubierta en el subsuelo del Edificio Turek, con portón eléctrico y mando a distancia.',
      features: ['Ubicada en subsuelo', 'Portón eléctrico y mando a distancia', 'Apta para autos, camionetas y motos', 'Uso exclusivo para guardar vehículos'],
      conditions: 'Expensas e impuestos incluidos. No se permite usarla como depósito. Contrato por un año, con ajuste a los seis meses.',
      rentalFormat: true,
      contractConditions: ['Duración: 1 año.', 'Ajustes: a los 6 meses.', 'No se permite usarla como depósito.'],
      extraCosts: [],
      costNotes: ['Expensas e impuestos incluidos en el alquiler.'],
      whatsapp: '5492964617729', cardPhotoIndex: 0,
      cardPhotoAlt: 'Cochera cubierta en el subsuelo del Edificio Turek',
      photos: propertyPhotos('cochera-edificio-turek', 2, { cleanFirst: true })
    },
    {
      id: 'Dd9vtifGp4z', publishedAt: '2026-10-19', source: 'https://www.instagram.com/p/Der1zHaGnFw/', title: 'Departamento en Finocchio al 1500',
      operation: 'alquiler', type: 'departamentos', city: 'rio-grande', neighborhood: 'Zona Centro',
      address: 'Finocchio al 1500', bedrooms: 2, bathrooms: 1,
      area: null, areaLabel: '', price: 530000, currency: 'ARS', priceNote: '+ impuestos',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Departamento en planta baja con dos dormitorios, cocina, lavadero y living-comedor.',
      features: ['Dos dormitorios con placard: uno amplio y otro pequeño', 'Baño completo con bañera y mampara', 'Cocina', 'Lavadero', 'Living-comedor', 'Ubicado en planta baja', 'Amplios espacios de guardado'],
      conditions: 'Contrato por dos años, con ajuste cada seis meses por índice IPC. Precio más impuestos.',
      rentalFormat: true,
      contractConditions: ['Duración: 2 años.', 'Ajustes: cada 6 meses mediante el índice IPC.'],
      extraCosts: ['Impuestos'],
      whatsapp: '5492964617729', cardPhotoIndex: 11,
      cardPhotoAlt: 'Frente del edificio en Finocchio al 1500, Zona Centro',
      photos: [...propertyPhotos('departamento-finocchio-1500', 12).slice(1), 'imagenes/propiedades/departamento-finocchio-1500/departamento-finocchio-1500-13-principal.jpg']
    },
    {
      id: 'DeH7lENGoxL', publishedAt: '2026-10-05', title: 'Publicación en revisión',
      operation: 'alquiler', type: 'departamentos', city: 'rio-grande', neighborhood: '',
      address: '', bedrooms: null, bathrooms: null, area: null, areaLabel: '', price: null, currency: 'ARS',
      availabilityStatus: 'review-pending', publicListing: false,
      occupancy: 'La descripción de Instagram y las fotos locales no coinciden con claridad. Dirección y tipo de inmueble pendientes de verificar.',
      summary: '', features: [], conditions: '', whatsapp: '5492964617729',
      photos: archivedPhotoPaths('2026-10-05', 'DeH7lENGoxL', 10)
    },
    {
      id: 'DVzC9oKjzON', publishedAt: '2026-03-12', title: 'Publicación en revisión',
      operation: null, type: null, city: null, neighborhood: '', address: '',
      bedrooms: null, bathrooms: null, area: null, areaLabel: '', price: null, currency: 'ARS',
      availabilityStatus: 'review-pending', publicListing: false,
      occupancy: 'Las fotos locales muestran un cartel de ALQUILA y la dirección Alfredo Gálvez 542, Depto. 5; la información pegada la identifica como VENTA. Verificar que las fotos correspondan a esta publicación antes de usarla.',
      summary: '', features: [], conditions: '', whatsapp: '5492964617729',
      photos: archivedPhotoPaths('2026-03-12', 'DVzC9oKjzON', 15)
    },
    {
      id: 'DdXRi7gGlfa', publishedAt: '2026-09-16', title: 'Departamento en Belgrano y San Martín',
      operation: 'alquiler', type: 'departamentos', city: 'rio-grande', neighborhood: '',
      address: 'Av. Belgrano esquina Av. San Martín', bedrooms: 2, bathrooms: 1,
      area: null, areaLabel: '', price: 900000, currency: 'ARS', priceNote: '+ expensas',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Departamento en primer piso, con vista al frente y excelente luminosidad, en Av. Belgrano esquina Av. San Martín.',
      features: ['Dos dormitorios cómodos con placard', 'Cocina con barra', 'Living-comedor', 'Baño completo', 'Lavandería en el edificio'],
      conditions: 'Contrato por dos años, ajuste semestral por IPC y expensas, luz, gas y seguro contra incendio aparte.',
      rentalFormat: true,
      contractConditions: ['Duración: 2 años.', 'Ajustes: cada 6 meses mediante el índice IPC.'],
      extraCosts: ['Expensas', 'Luz', 'Gas', 'Seguro contra incendio'],
      whatsapp: '5492964617729', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del edificio en Belgrano y San Martín',
      photos: propertyPhotos('departamento-belgrano-san-martin', 8, { cleanFirst: true }),
      videos: [{ src: 'videos/propiedades/belgrano-san-martin-recorrido.mp4', poster: 'assets/properties/departamento-belgrano-san-martin/recorrido-poster.webp', label: 'Recorrido del departamento' }]
    },
    {
      id: 'DczHePGmjeT', publishedAt: '2026-09-02', title: 'Departamentos en Barrio Buenavista',
      operation: 'alquiler', type: 'departamentos', city: 'rio-grande', neighborhood: 'Barrio Buenavista',
      address: 'Gálvez al 500', bedrooms: 1, bathrooms: 1,
      area: null, areaLabel: '', price: 700000, currency: 'ARS', priceNote: 'sin expensas',
      availabilityStatus: 'confirmed', publicListing: true,
      occupancy: '',
      summary: 'Departamentos en primer piso, con cocina con barra y living-comedor, en Barrio Buenavista.',
      features: ['Un dormitorio con placard', 'Baño completo con ducha y mampara', 'Cocina con barra', 'Living-comedor', 'Ubicados en primer piso', 'Sin expensas', 'No se aceptan mascotas'],
      conditions: 'Contrato por un año, con aumento a los seis meses por índice IPC. Luz y gas se abonan aparte. No se aceptan mascotas.',
      rentalFormat: true,
      contractConditions: ['Duración: 1 año.', 'Ajustes: a los 6 meses mediante el índice IPC.', 'No se aceptan mascotas.'],
      extraCosts: ['Luz', 'Gas'],
      costNotes: ['Sin expensas.'],
      whatsapp: '5492964617729', cardPhotoIndex: 0,
      cardPhotoAlt: 'Frente del edificio de departamentos en Gálvez al 500, Barrio Buenavista',
      photos: propertyPhotos('departamentos-barrio-buenavista', 8, { cleanFirst: true })
    }
  ].map(property => ({ ...property, source: property.source || sourceFor(property.id), galleryGroups: galleryGroups[property.id] || property.galleryGroups || [] }));

  const formatPrice = property => {
    if (property.price == null) return 'Consultar precio';
    const currency = property.currency === 'USD' ? 'USD' : '$';
    return `${currency} ${new Intl.NumberFormat('es-AR').format(property.price)}${property.priceNote && !property.rentalFormat ? ` ${property.priceNote}` : ''}`;
  };
  const formatDate = date => date ? new Intl.DateTimeFormat('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'
  }).format(new Date(`${date}T12:00:00Z`)) : 'fecha no informada';
  const isPublicOpportunity = property => property.publicListing && ['confirmed', 'pending-confirmation'].includes(property.availabilityStatus);

  function filterProperties(items, { operation = 'todas', type = 'todas', city = 'todas', bedrooms = 'todos', confirmedOnly = false } = {}) {
    return items.filter(property =>
      isPublicOpportunity(property) &&
      (operation === 'todas' || property.operation === operation) &&
      (type === 'todas' || property.type === type) &&
      (city === 'todas' || property.city === city) &&
      (bedrooms === 'todos' || property.bedrooms === Number(bedrooms)) &&
      (!confirmedOnly || property.availabilityStatus === 'confirmed')
    ).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }

  globalThis.DelNorteCatalog = { properties, formatPrice, formatDate, filterProperties, isPublicOpportunity };
})();
