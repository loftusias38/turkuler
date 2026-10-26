// YouTube videosu yalnız tıklanınca yüklenir (hız ve gizlilik)
document.addEventListener("click", function (ev) {
  var b = ev.target.closest(".oynat");
  if (!b || b.querySelector("iframe")) return;
  var f = document.createElement("iframe");
  f.src = "https://www.youtube-nocookie.com/embed/" + b.dataset.id + "?autoplay=1&rel=0";
  f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  f.allowFullscreen = true; f.title = b.getAttribute("aria-label") || "Video";
  b.appendChild(f);
});
// arama ve süzgeç
(function () {
  var izgara = document.getElementById("izgara"); if (!izgara) return;
  var kartlar = Array.prototype.slice.call(izgara.children), ara = document.getElementById("ara");
  var sonuc = document.getElementById("sonuc"), bos = document.getElementById("bos"), duygu = "", kanal = "";
  function tr(s) { return s.toLocaleLowerCase("tr"); }
  function uygula() {
    var q = tr(ara.value.trim()), n = 0;
    kartlar.forEach(function (k) {
      var ok = (!q || k.dataset.ara.indexOf(q) > -1) && (!duygu || (" " + k.dataset.duygu + " ").indexOf(" " + duygu + " ") > -1) && (!kanal || k.dataset.kanal === kanal);
      k.hidden = !ok; if (ok) n++;
    });
    sonuc.textContent = n + " eser"; bos.hidden = n > 0;
  }
  ara.addEventListener("input", uygula);
  document.querySelectorAll(".filtre").forEach(function (b) {
    b.addEventListener("click", function () {
      duygu = b.dataset.f; kanal = "";
      document.querySelectorAll(".filtre").forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); });
      uygula();
    });
  });
  document.querySelectorAll(".filtre-kanal").forEach(function (b) {
    b.addEventListener("click", function () { kanal = b.dataset.k; duygu = "";
      document.querySelectorAll(".filtre").forEach(function (x) { x.setAttribute("aria-pressed", x.dataset.f === "" ? "true" : "false"); });
      uygula(); document.getElementById("eserler").scrollIntoView(); });
  });
})();
