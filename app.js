window.addEventListener("load", () => {
  const marker   = document.querySelector("#nft-marker");
  const arVideo  = document.querySelector("#ar-video");
  const videoEl  = document.querySelector("#marker-video");
  const statusBox  = document.querySelector("#status-box");
  const statusIcon = document.querySelector("#status-icon");
  const statusText = document.querySelector("#status-text");

  let isFound = false;

  // ── Imagen encontrada ──────────────────────────────────────────
  marker.addEventListener("markerFound", () => {
    if (isFound) return;
    isFound = true;

    // Mostrar el plano de video
    arVideo.setAttribute("visible", "true");

    // Reproducir video
    videoEl.play().catch((err) => {
      console.warn("Autoplay bloqueado:", err);
    });

    // Actualizar UI
    statusBox.classList.add("found");
    statusIcon.textContent = "▶️";
    statusText.textContent = "¡Imagen reconocida! Reproduciendo video…";
  });

  // ── Imagen perdida ─────────────────────────────────────────────
  marker.addEventListener("markerLost", () => {
    if (!isFound) return;
    isFound = false;

    // Ocultar video y pausar
    arVideo.setAttribute("visible", "false");
    videoEl.pause();
    videoEl.currentTime = 0;

    // Restaurar UI
    statusBox.classList.remove("found");
    statusIcon.textContent = "📷";
    statusText.textContent = "Apuntá la cámara a la imagen marcador";
  });
});