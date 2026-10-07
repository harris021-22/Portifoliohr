/* ==========================================================
   Andrew Harris web design — PROJETOS
   Para adicionar seus sites, edite a lista abaixo:
   - title:       nome do projeto
   - segmento:    categoria (aparece em maiúsculas ao lado do número)
   - description: breve descrição (aparece no card)
   - necessidade / entrega / design: textos da janela "Explorar projeto"
   - tags:        etiquetas (ex: "Design Visual", "Desenvolvimento Web")
   - image:       caminho do print do site (ex: "img/meusite.webp")
                  deixe "" para mostrar o espaço reservado
   - url:         link do site no ar (deixe "" se ainda não tiver)
   Mostra 3 projetos de início; o botão "Ver mais projetos"
   libera os próximos de 3 em 3 e some sozinho quando acabam.
   ========================================================== */
const projects = [
  {
    title: "Brisa Estética Integrativa",
    segmento: "Clínica de Estética",
    description: "Estética que cuida de você por inteiro. Cuidado integrativo, unindo técnica, sensibilidade e bem-estar para realçar sua beleza natural.",
    necessidade: "A cliente buscava uma presença digital que transmitisse acolhimento e calma, destacando o viés 'integrativo' de seus serviços de estética e promovendo o agendamento de consultas.",
    entrega: "Desenvolvimento de uma Landing Page otimizada para conversão, estruturada com apresentação de tratamentos, diferenciais da clínica, avaliações reais de clientes e integração fluida com o WhatsApp.",
    design: "Criação de um layout elegante e sereno, utilizando uma paleta de cores suaves, tipografia sofisticada (Playfair Display) e elementos visuais que remetem diretamente ao bem-estar e relaxamento.",
    tags: ["Landing Page", "Design de Interface", "Front-end"],
    image: "img/www.brisaesteticaintegrativa.com.br_ (2).png",
    url: "https://www.brisaesteticaintegrativa.com.br",
    depoimento: {
      texto: "Andrew é de confiança, entrou em contato comigo sugerindo um site para meu perfil do Google, foi super profissional e paciente. Atendeu a todas as expectativas (que não foram poucas) e entregou rápido, com todas as alterações necessárias. Eu gostei muito do site e tive muitos elogios. Recomendo e faria outros serviços com ele. Obrigada pela entrega. Nota 1000 👏🥳",
      autor: "Karina Gazetta"
    }
  },
  {
    title: "Igor Canzi",
    segmento: "Psicologia Clínica",
    description: "Psicólogo clínico e psicanalista. Atendimento on-line e presencial com escuta atenta, cuidadosa e singular.",
    necessidade: "O profissional precisava de uma plataforma digital para apresentar seus serviços de psicanálise (atendimento clínico, supervisão e palestras), transmitindo um ambiente seguro e acolhedor e facilitando o agendamento de consultas.",
    entrega: "Desenvolvimento de uma Landing Page moderna com design limpo, destacando as modalidades de atendimento, especialidades e um formulário direto para contato via WhatsApp com simulação em tempo real.",
    design: "Uso de uma paleta de cores serena e tipografia sofisticada (Cormorant Garamond e Manrope) para transmitir confiança, tranquilidade e profissionalismo, elementos fundamentais em saúde mental.",
    tags: ["Landing Page", "Design de Interface", "Front-end"],
    image: "img/psiigor.vercel.app_.png",
    url: "https://psiigorcanzi.vercel.app/"
  }
];

/* ---------- Renderização dos projetos ---------- */
const INITIAL_COUNT = 3;
const STEP = 3;
let visibleCount = INITIAL_COUNT;

const list = document.getElementById("portfolioList");
const loadMoreWrap = document.getElementById("loadMoreWrap");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const pad = n => String(n).padStart(2, "0");
const iconArrow = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="btn-icon" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';

function screenshot(p, alt) {
  if (p.image) return `<img src="${p.image}" alt="${alt}" loading="lazy">`;
  return `<div class="placeholder">
    <div class="placeholder__nav"><i></i><i></i><i></i><i></i></div>
    <div class="placeholder__body">
      <span class="placeholder__label">Seu site aqui</span>
      <b></b><b></b><em></em>
    </div>
  </div>`;
}

function projectHTML(p, i) {
  const visit = p.url
    ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="link-external">Visitar site ↗</a>`
    : "";
  return `
    <article class="project-item js-reveal" data-index="${i}">
      <div class="project-media" data-open="${i}" role="button" tabindex="0" aria-label="Explorar projeto ${p.title}">
        <div class="browser-frame">
          <div class="bf-header"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
          <div class="bf-body">${screenshot(p, "Site " + p.title)}</div>
        </div>
      </div>
      <div class="project-info">
        <div class="pi-meta">
          <span class="pi-num">${pad(i + 1)}</span>
          <span class="pi-dash"></span>
          <span class="pi-cat">${p.segmento}</span>
        </div>
        <h2>${p.title}</h2>
        <p>${p.description}</p>
        <div class="pi-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        <div class="pi-actions">
          <button type="button" class="btn btn-primary btn-explore" data-open="${i}">Explorar projeto ${iconArrow}</button>
          ${visit}
        </div>
      </div>
    </article>`;
}

function render(prevCount = 0) {
  list.innerHTML = projects.slice(0, visibleCount).map((p, i) =>
    (i > 0 ? '<div class="project-divider" aria-hidden="true"></div>' : "") + projectHTML(p, i)
  ).join("");
  loadMoreWrap.hidden = visibleCount >= projects.length;
  list.querySelectorAll(".project-item").forEach((el, i) => {
    if (i < prevCount) el.classList.add("is-revealed");
    else observeReveal([el]);
  });
}

loadMoreBtn.addEventListener("click", () => {
  const prev = visibleCount;
  visibleCount += STEP;
  render(prev);
});

/* ---------- Modal "Explorar projeto" ---------- */
const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBodyContent");

function openProject(i) {
  const p = projects[i];
  if (!p) return;
  const detail = (label, text) => `
    <div>
      <strong>${label}</strong>
      <span>${text}</span>
    </div>`;
  modalBody.innerHTML = `
    <div class="modal-split">
      <div class="modal-split-info">
        <div class="pi-meta"><span class="pi-cat">${pad(i + 1)} — ${p.segmento}</span></div>
        <h2 id="modalTitle">${p.title}</h2>
        <div class="modal-case-details">
          ${detail("Necessidade de apresentação", p.necessidade)}
          ${detail("Trabalho realizado", p.entrega)}
          ${detail("Decisões de design e navegação", p.design)}
          ${p.depoimento ? detail("Depoimento do cliente", `<em>"${p.depoimento.texto}"</em><br>— <strong>${p.depoimento.autor}</strong>`) : ""}
        </div>
        <div class="pi-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
        ${p.url ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Visitar site do projeto ↗</a>` : ""}
      </div>
      <div class="modal-split-media">
        <div class="browser-frame">
          <div class="bf-header"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
          <div class="bf-body">${screenshot(p, p.title)}</div>
        </div>
      </div>
    </div>`;
  modal.showModal();
  document.body.style.overflow = "hidden";
}
function closeProject() {
  if (modal.open) modal.close();
}
modal.addEventListener("close", () => { document.body.style.overflow = ""; });
document.getElementById("closeModal").addEventListener("click", closeProject);
modal.addEventListener("click", e => {
  const r = modal.getBoundingClientRect();
  if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) closeProject();
});
list.addEventListener("click", e => {
  const t = e.target.closest("[data-open]");
  if (t) openProject(Number(t.dataset.open));
});
list.addEventListener("keydown", e => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches(".project-media")) {
    e.preventDefault();
    openProject(Number(e.target.dataset.open));
  }
});

/* ---------- Menu mobile ---------- */
const toggleBtn = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");
const setMenu = open => {
  navMenu.classList.toggle("is-open", open);
  document.body.classList.toggle("is-menu-open", open);
  toggleBtn.setAttribute("aria-expanded", open);
  toggleBtn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
};
toggleBtn.addEventListener("click", () => setMenu(!navMenu.classList.contains("is-open")));
navMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && navMenu.classList.contains("is-open")) { setMenu(false); toggleBtn.focus(); }
});
document.addEventListener("click", e => {
  if (navMenu.classList.contains("is-open") && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) setMenu(false);
});

/* ---------- Rodapé ---------- */
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("backToTopBtn").addEventListener("click", e => {
  e.preventDefault();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
});

/* ---------- Animações de entrada ---------- */
document.body.classList.add("js-loaded");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const io = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      requestAnimationFrame(() => requestAnimationFrame(() => entry.target.classList.add("is-revealed")));
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" })
  : null;

function observeReveal(els) {
  els.forEach(el => {
    if (!io || reduceMotion) el.classList.add("is-revealed");
    else io.observe(el);
  });
}

render();
observeReveal(document.querySelectorAll(".js-reveal:not(.project-item), .cta-reveal"));
