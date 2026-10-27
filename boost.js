// Efoyta investor conversion layer. Load AFTER script.js.
// Fill in ASK when you're ready, e.g. "ETB 5M to expand sourcing and build digital ordering"
const ASK = "";
const WA =
  "https://wa.me/251933773934?text=" +
  encodeURIComponent(
    "Hello Efoyta, I saw your investor page and would like to talk.",
  );

(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  // 1. Announcement bar becomes a CTA
  const ann = $(".announcement");
  if (ann)
    ann.innerHTML =
      '<span class="announcement-dot"></span> Now opening investor conversations — <a class="ann-link" href="#invest">Talk to the founders →</a>';

  // 2. Nav link
  const navCta = $(".nav-cta");
  if (navCta) {
    const a = document.createElement("a");
    a.href = "#why";
    a.textContent = "Why invest";
    a.addEventListener("click", () =>
      $(".nav-links")?.classList.remove("open"),
    );
    navCta.before(a);
  }

  // 3. "Why invest" section after traction
  const askBody = ASK
    ? `<strong>${ASK}</strong>`
    : `<strong>Let’s shape the right structure together.</strong>`;
  const askSub = ASK
    ? "The funding we’re seeking"
    : "We’ll walk you through our funding plan on a first call.";
  const why = document.createElement("section");
  why.className = "why section-pad";
  why.id = "why";
  why.innerHTML = `
    <div class="section-heading"><div><div class="eyebrow"><span></span> THE INVESTMENT CASE</div><h2>Why back Efoyta,<br><em>why today.</em></h2></div>
    <p class="section-intro">The market risk has been tested. What’s left is the part capital is best at: scaling a model that already works.</p></div>
    <div class="why-grid">
      <article class="why-card rv"><span class="why-n">01</span><h3>Demand is proven</h3><p>Real tonnes moved and real commissions earned in two categories — before any software was built.</p></article>
      <article class="why-card rv"><span class="why-n">02</span><h3>The gap is real</h3><p>Urban buyers want consistent quality and supply; producers want dependable buyers. We sit in between.</p></article>
      <article class="why-card rv"><span class="why-n">03</span><h3>Early entry point</h3><p>Join before digital systems and wider categories are in place, while the upside of building them is still ahead.</p></article>
    </div>
    <div class="unlock rv">
      <div class="unlock-ask"><span class="unlock-label">THE ASK</span>${askBody}<small>${askSub}</small>
        <a class="button button-lime" href="#contact">Request our funding plan <span>↗</span></a></div>
      <div class="unlock-list"><span class="unlock-label dark">YOUR CAPITAL UNLOCKS</span>
        <ul><li><b>Larger sourcing volumes</b> — working capital to buy more from farmers and suppliers.</li>
        <li><b>Digital ordering &amp; operations</b> — tools for inquiries, orders and customer records.</li>
        <li><b>New categories</b> — berbere, honey, teff and other agricultural goods.</li>
        <li><b>Stronger buyer relationships</b> — easier repeat orders for shops, retailers and consumers.</li></ul></div>
    </div>
    <div class="steps rv"><span class="unlock-label dark">HOW WE’LL WORK TOGETHER</span>
      <ol><li><b>Intro call</b><small>Meet the founders, ask anything.</small></li><li><b>Review</b><small>Go through our records and growth plan.</small></li><li><b>Partner</b><small>Agree terms and start building.</small></li></ol></div>`;
  $(".traction")?.after(why);

  // 4. Extra CTAs: WhatsApp next to hero + invest CTAs, clearer form button
  const wa = (cls) =>
    `<a class="button button-ghost ${cls}" href="${WA}" target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>`;
  $(".invest-ctas")?.insertAdjacentHTML("afterbegin", wa(""));
  const sub = $(".form-submit");
  if (sub) sub.innerHTML = "Send my inquiry <span>↗</span>";
  const hint = $(".form-hint");
  if (hint)
    hint.insertAdjacentHTML(
      "beforebegin",
      '<p class="form-trust">✓ Your details go only to the founders. We read every message personally.</p>',
    );

  // 5. Sticky CTA bar
  const bar = document.createElement("div");
  bar.className = "sticky-cta";
  bar.setAttribute("aria-hidden", "true");
  bar.innerHTML = `<p><strong>Interested in backing Efoyta?</strong><span> Speak to the founders directly.</span></p><a class="button button-lime" href="${WA}" target="_blank" rel="noopener noreferrer" tabindex="-1">WhatsApp <span>↗</span></a><a class="button button-line" href="#contact" tabindex="-1">Send inquiry</a>`;
  document.body.appendChild(bar);
  const contact = $("#contact"),
    invest = $("#invest");
  const toggleBar = () => {
    const past = window.scrollY > window.innerHeight * 0.8;
    const atEnd =
      invest && invest.getBoundingClientRect().top < window.innerHeight * 0.5;
    const show = past && !atEnd;
    bar.classList.toggle("show", show);
    bar.querySelectorAll("a").forEach((l) => (l.tabIndex = show ? 0 : -1));
    bar.setAttribute("aria-hidden", String(!show));
  };
  addEventListener("scroll", toggleBar, { passive: true });
  toggleBar();

  // 6. Scroll reveal + metric count-up
  if (!("IntersectionObserver" in window)) return;
  $$(
    ".metric-card,.model-card,.opportunity-stack article,.product-row",
  ).forEach((el) => el.classList.add("rv"));
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        io.unobserve(e.target);
      }),
    { threshold: 0.15 },
  );
  $$(".rv").forEach((el) => io.observe(el));

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const counter = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        counter.unobserve(e.target);
        const node = [...e.target.childNodes].find(
          (n) => n.nodeType === 3 && /\d/.test(n.textContent),
        );
        if (!node || reduce) return;
        const end = parseInt(node.textContent, 10),
          t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / 1200, 1);
          node.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
    { threshold: 0.6 },
  );
  $$(".metric-number").forEach((el) => counter.observe(el));
})();
