(() => {
  const root = document.querySelector('[data-development-page]');
  if (!root) return;
  const records = globalThis.DelNorteDevelopments || [];
  const params = new URLSearchParams(location.search);
  const category = params.get('categoria') === 'pozo' ? 'pozo' : 'terrenos';
  const current = records.filter(record => record.category === category).sort((a, b) => (a.displayOrder ?? 100) - (b.displayOrder ?? 100) || Number(Boolean(b.photos?.length)) - Number(Boolean(a.photos?.length)));
  const selected = params.get('id');
  const isLand = category === 'terrenos';
  const title = isLand ? 'Terrenos y loteos' : 'Edificios en pozo';
  const lead = isLand
    ? 'Explorá nuestros proyectos de terrenos y loteos. Consultá sus características con el equipo.'
    : 'Conocé nuestros proyectos de edificios en pozo y consultá sus características con el equipo.';
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const contactUrl = (name, projectCategory = 'terrenos') => {
    const number = projectCategory === 'terrenos' ? '5492964478765' : '5492964617729';
    return `https://wa.me/${number}?text=${encodeURIComponent(`Hola, quisiera recibir información sobre ${name}.`)}`;
  };
  const price = item => `USD ${new Intl.NumberFormat('es-AR').format(item.priceFrom)}`;
  const image = item => `<figure class="development-image"><img src="${escapeHTML(item.image)}" alt="${escapeHTML(item.imageAlt)}" width="1440" height="1921" decoding="async"><figcaption>Render del proyecto</figcaption></figure>`;
  const heading = root.querySelector('[data-development-heading]');
  const mediaItems = item => [
    ...item.photos.map(photo => ({ ...photo, type: 'image' })),
    ...(item.videos || []).map(video => ({ ...video, type: 'video' }))
  ];
  const gallery = item => {
    const media = mediaItems(item);
    return `<section class="development-gallery" data-development-gallery="${escapeHTML(item.id)}" aria-label="Fotos y videos de ${escapeHTML(item.name)}"><div class="development-gallery-stage"><button class="photo-button" type="button" data-development-expand aria-label="Ampliar imagen del proyecto"><img data-development-image src="${escapeHTML(media[0].src)}" alt="${escapeHTML(media[0].label)}" width="1440" height="1921" decoding="async"></button><video data-development-video controls playsinline preload="none" hidden></video><button class="gallery-arrow development-gallery-prev" type="button" data-development-move="-1" aria-label="Foto o video anterior">${icon('chevron_left')}</button><button class="gallery-arrow development-gallery-next" type="button" data-development-move="1" aria-label="Foto o video siguiente">${icon('chevron_right')}</button></div><p class="development-gallery-caption" data-development-caption role="status">1 / ${media.length} · ${escapeHTML(media[0].label)}</p><div class="development-gallery-thumbnails">${media.map((entry, index) => `<button type="button" data-development-photo="${index}" aria-label="Ver ${entry.type === 'video' ? 'video' : 'imagen'}: ${escapeHTML(entry.label)}" aria-current="${index === 0}"><img src="${escapeHTML(entry.type === 'video' ? (entry.poster || item.image) : entry.src)}" alt="" loading="lazy" width="60" height="80">${entry.type === 'video' ? '<span class="development-video-badge" aria-hidden="true">▶</span>' : ''}</button>`).join('')}</div></section>`;
  };
  const landProjectMarkup = (item, detail = false) => {
    const articleClass = detail ? 'development-detail' : 'development-card';
    const priceLabel = `<p class="development-card-price">Contado desde ${escapeHTML(price(item))}</p>${item.financedFrom ? `<p>Financiado desde USD ${new Intl.NumberFormat('es-AR').format(item.financedFrom)} · hasta el 75%</p>` : ''}${item.cashNote ? `<p>${escapeHTML(item.cashNote)}</p>` : ''}`;
    const facts = `<ul class="development-facts">${item.facts.map(fact => `<li>${escapeHTML(fact)}</li>`).join('')}</ul>`;
    const financing = `<div class="development-financing"><h2>Financiación</h2><ul>${item.financing.map(term => `<li>${escapeHTML(term)}</li>`).join('')}</ul></div>`;
    return `<article class="${articleClass} development-card-with-image development-detail-with-image development-land">${gallery(item)}<div class="development-card-copy development-detail-copy"><span class="development-index">TERRENOS · EN VENTA</span><h2>${escapeHTML(item.name)}</h2><p>${escapeHTML([item.address, item.city].filter(Boolean).join(' · '))}</p>${priceLabel}${facts}${financing}<a class="button-primary" href="${contactUrl(item.name, item.category)}" target="_blank" rel="noopener noreferrer">Consultar a Noelia por WhatsApp</a></div></article>`;
  };
  const buildingProjectMarkup = item => {
    const groups = item.factGroups || [{ title: 'Características', indexes: item.facts.map((_, index) => index) }];
    const facts = `<div class="development-fact-groups">${groups.map(group => `<section class="development-fact-group"><h3>${escapeHTML(group.title)}</h3><ul>${group.indexes.map(index => `<li>${escapeHTML(item.facts[index])}</li>`).join('')}</ul></section>`).join('')}</div>`;
    const financing = item.financingSteps?.length
      ? `<ol class="development-financing-steps">${item.financingSteps.map(step => `<li><span class="development-step-title">${escapeHTML(step.title)}</span><strong>${escapeHTML(step.value)}</strong><p>${escapeHTML(step.description)}</p></li>`).join('')}</ol>${item.financingNotes?.length ? `<ul class="development-financing-notes">${item.financingNotes.map(note => `<li>${escapeHTML(note)}</li>`).join('')}</ul>` : ''}`
      : `<ul>${item.financing.map(term => `<li>${escapeHTML(term)}</li>`).join('')}</ul>`;
    const inquiry = `Hola, me interesa ${item.name}. Quisiera consultar disponibilidad, planos, lista de precios y financiación de las unidades.`;
    const url = `https://wa.me/5492964617729?text=${encodeURIComponent(inquiry)}`;
    return `<article class="development-detail development-detail-with-image development-building">${gallery(item)}<div class="development-detail-copy"><span class="development-index development-building-heading"><strong class="development-city">${escapeHTML(item.city)}</strong></span><h2 class="development-title">${escapeHTML(item.name)}</h2><p class="development-location">${escapeHTML(item.address)} · ${escapeHTML(item.city)}</p><div class="development-price-block">${item.priceFrom ? `<span class="eyebrow">VALORES DE LANZAMIENTO DESDE</span><p class="development-price">${escapeHTML(price(item))}</p>` : '<p class="development-price">Consultar valores</p>'}</div>${facts}</div><div class="development-building-bottom"><section class="development-financing"><h3>${item.financingUntil ? 'Financiación de lanzamiento' : 'Financiación'}</h3>${item.financingUntil ? `<p class="development-financing-deadline">Hasta ${escapeHTML(item.financingUntil.toLowerCase())}.</p>` : ''}${financing}</section><div class="development-building-inquiry"><p class="development-delivery"><span class="eyebrow">ENTREGA ESTIMADA</span><strong>${escapeHTML(item.delivery)}</strong></p><p class="development-note">Consultanos por disponibilidad, planos, lista de precios y financiación de cada unidad.</p><a class="button-primary" href="${url}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp</a></div></div></article>`;
  };
  const content = root.querySelector('[data-development-content]');
  const record = current.find(item => item.id === selected) || (!selected && current.length === 1 ? current[0] : undefined);
  document.title = `${record ? record.name : title} · Del Norte Propiedades`;

  if (heading) heading.innerHTML = `<p class="eyebrow">DESARROLLOS · DEL NORTE</p><h1>${record ? escapeHTML(record.name) : escapeHTML(title)}</h1><p class="section-description">${record ? escapeHTML(record.description) : escapeHTML(lead)}</p>`;

  if (!content) return;
  if (record) {
    const facts = record.facts?.length ? `<ul class="development-facts">${record.facts.map(fact => `<li>${escapeHTML(fact)}</li>`).join('')}</ul>` : '';
    const city = record.city ? `<p class="development-location">${escapeHTML(record.city)}</p>` : '';
    if (record.category === 'terrenos' && record.photos?.length) {
      content.innerHTML = `${landProjectMarkup(record, true)}${selected ? `<a class="text-link development-back" href="desarrollos.html?categoria=${category}">${icon('arrow_back')} Volver a ${escapeHTML(title)}</a>` : ''}`;
      setupGallery(record);
      return;
    }
    if (record.image) {
      content.innerHTML = `${buildingProjectMarkup(record)}${selected ? `<a class="text-link development-back" href="desarrollos.html?categoria=${category}">${icon('arrow_back')} Volver a ${escapeHTML(title)}</a>` : ''}`;
      setupGallery(record);
      return;
    }
    content.innerHTML = `<article class="development-detail"><div class="development-mark" aria-hidden="true">${isLand ? '01' : '02'}</div><div class="development-detail-copy">${city}${facts}<p class="development-pending">${escapeHTML(record.verification)}</p><a class="button-primary" href="${contactUrl(record.name, record.category)}" target="_blank" rel="noopener noreferrer">Consultar por WhatsApp <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a></div></article>${selected ? `<a class="text-link development-back" href="desarrollos.html?categoria=${category}">${icon('arrow_back')} Volver a ${escapeHTML(title)}</a>` : ''}`;
    return;
  }

  content.innerHTML = `<div class="development-grid${isLand ? '' : ' development-full-list'}">${current.map((item, index) => item.category === 'terrenos' && item.photos?.length ? landProjectMarkup(item) : item.category === 'pozo' && item.photos?.length ? buildingProjectMarkup(item) : `<article class="development-card ${item.image ? 'development-card-with-image' : ''}">${item.image ? image(item) : ''}<div class="development-card-copy"><span class="development-index">${String(index + 1).padStart(2, '0')} / ${isLand ? 'TERRENOS' : 'EN POZO'}</span><h2>${escapeHTML(item.name)}</h2>${item.city ? `<p>${escapeHTML(item.city)}</p>` : ''}${item.priceFrom ? `<p class="development-card-price">Desde ${escapeHTML(price(item))}</p>` : '<p class="development-card-price">Consultar valores</p>'}${item.cardSummary ? `<p>${escapeHTML(item.cardSummary)}</p>` : ''}${item.delivery ? `<p>Entrega estimada: ${escapeHTML(item.delivery.toLowerCase())}</p>` : ''}<a class="text-link" href="desarrollos.html?categoria=${category}&amp;id=${encodeURIComponent(item.id)}">Ver ficha del desarrollo ${icon('north_east')}</a></div></article>`).join('')}</div>`;
  current.filter(item => item.photos?.length).forEach(setupGallery);

  function icon(name) { return `<span class="material-symbols-outlined" aria-hidden="true">${name}</span>`; }

  function setupGallery(item) {
    const galleryRoot = root.querySelector(`[data-development-gallery="${item.id}"]`);
    if (!galleryRoot) return;
    const media = mediaItems(item);
    let active = 0;
    let opener;
    const viewer = document.createElement('dialog');
    viewer.className = 'development-viewer';
    viewer.setAttribute('aria-label', `Fotos y videos de ${item.name}`);
    viewer.innerHTML = `<button type="button" class="icon-button" data-development-close aria-label="Cerrar galería ampliada">${icon('close')}</button><img alt=""><video controls playsinline preload="none" hidden></video><button class="gallery-arrow development-gallery-prev" type="button" data-development-move="-1" aria-label="Foto o video anterior">${icon('chevron_left')}</button><button class="gallery-arrow development-gallery-next" type="button" data-development-move="1" aria-label="Foto o video siguiente">${icon('chevron_right')}</button><p role="status"></p>`;
    root.append(viewer);
    const mainVideo = galleryRoot.querySelector('[data-development-video]');
    const viewerVideo = viewer.querySelector('video');
    const showMedia = (image, video, entry) => {
      video.pause();
      const isVideo = entry.type === 'video';
      image.hidden = isVideo;
      video.hidden = !isVideo;
      if (isVideo) {
        if (video.getAttribute('src') !== entry.src) video.src = entry.src;
        video.setAttribute('aria-label', entry.label);
        if (entry.poster) video.poster = entry.poster;
      } else {
        image.src = entry.src;
        image.alt = entry.label;
      }
    };
    const update = (autoplay = false) => {
      const entry = media[active];
      const caption = `${active + 1} / ${media.length} · ${entry.label}`;
      showMedia(galleryRoot.querySelector('[data-development-image]'), mainVideo, entry);
      galleryRoot.querySelector('[data-development-expand]').hidden = entry.type === 'video';
      showMedia(viewer.querySelector('img'), viewerVideo, entry);
      galleryRoot.querySelector('[data-development-caption]').textContent = caption;
      galleryRoot.querySelectorAll('[data-development-photo]').forEach(button => button.setAttribute('aria-current', String(Number(button.dataset.developmentPhoto) === active)));
      viewer.querySelector('p').textContent = caption;
      if (autoplay && entry.type === 'video') {
        root.querySelectorAll('video').forEach(video => video.pause());
        const video = viewer.open ? viewerVideo : mainVideo;
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };
    const move = direction => { active = (active + direction + media.length) % media.length; update(true); };
    const handleGalleryClick = event => {
      const step = event.target.closest('[data-development-move]');
      const thumbnail = event.target.closest('[data-development-photo]');
      if (step) move(Number(step.dataset.developmentMove));
      if (thumbnail) { active = Number(thumbnail.dataset.developmentPhoto); update(true); }
      const expand = event.target.closest('[data-development-expand]');
      if (expand) { opener = expand; update(); viewer.showModal(); document.body.classList.add('dialog-open'); viewer.querySelector('[data-development-close]').focus(); }
      if (event.target.closest('[data-development-close]')) viewer.close();
    };
    galleryRoot.addEventListener('click', handleGalleryClick);
    viewer.addEventListener('click', handleGalleryClick);
    viewer.addEventListener('close', () => { viewerVideo.pause(); document.body.classList.remove('dialog-open'); opener?.focus(); });
    const handleGalleryKeydown = event => {
      if (event.target.tagName === 'VIDEO') return;
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
    };
    galleryRoot.addEventListener('keydown', handleGalleryKeydown);
    viewer.addEventListener('keydown', handleGalleryKeydown);
    update();
  }
})();
