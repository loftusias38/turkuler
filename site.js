// Video yalnız tıklanınca yüklenir
document.addEventListener("click", function (ev) {
  var b = ev.target.closest(".oynat");
  if (!b || b.querySelector("iframe")) return;
  var f = document.createElement("iframe");
  f.src = "https://www.youtube-nocookie.com/embed/" + b.dataset.id + "?autoplay=1&rel=0";
  f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  f.allowFullscreen = true; f.title = b.getAttribute("aria-label") || "Video";
  b.appendChild(f);
});
// Mobil menü
(function () {
  var b = document.querySelector(".menu-ac"), m = document.getElementById("menu");
  if (!b) return;
  b.addEventListener("click", function () { var a = m.classList.toggle("acik"); b.setAttribute("aria-expanded", a); });
})();
// Eserler: arama, kanal ve duygu süzgeci
(function () {
  var izgara = document.getElementById("izgara"); if (!izgara) return;
  var kartlar = Array.prototype.slice.call(izgara.children), ara = document.getElementById("ara"), sec = document.getElementById("kanal");
  var sonuc = document.getElementById("sonuc"), bos = document.getElementById("bos"), duygu = "";
  var p = new URLSearchParams(location.search);
  if (p.get("q")) ara.value = p.get("q");
  if (p.get("kanal")) sec.value = p.get("kanal");
  function tr(s) { return s.toLocaleLowerCase("tr"); }
  function uygula() {
    var q = tr(ara.value.trim()), k = sec.value, n = 0;
    kartlar.forEach(function (c) {
      var ok = (!q || c.dataset.ara.indexOf(q) > -1) && (!duygu || (" " + c.dataset.duygu + " ").indexOf(" " + duygu + " ") > -1) && (!k || c.dataset.kanal === k);
      c.hidden = !ok; if (ok) n++;
    });
    sonuc.textContent = n + " eser"; bos.hidden = n > 0;
  }
  ara.addEventListener("input", uygula); sec.addEventListener("change", uygula);
  document.querySelectorAll(".filtre").forEach(function (b) {
    b.addEventListener("click", function () {
      duygu = b.dataset.f;
      document.querySelectorAll(".filtre").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      uygula();
    });
  });
  uygula();
})();
// Kaydırınca beliren bölümler
(function () {
  if (!("IntersectionObserver" in window)) return;
  document.documentElement.classList.add("js");
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("gorunur"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -8% 0px" });
  document.querySelectorAll(".raf,.bolum>ul>li,.eser-izgara,.hik-not").forEach(function (el, i) {
    if (el.matches(".bolum>ul>li")) el.style.transitionDelay = (i % 6) * 45 + "ms";
    io.observe(el);
  });
})();
