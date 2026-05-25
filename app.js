window.addEventListener("load", () => {
  const marker   = document.querySelector("#nft-marker");
  const arVideo  = document.querySelector("#ar-video");
  const videoEl  = document.querySelector("#marker-video");
  const statusBox  = document.querySelector("#status-box");
  const statusIcon = document.querySelector("#status-icon");
  const statusText = document.querySelector("#status-text");

  // ── DEBUG: estado del video ──────────────────────────────────
  console.log("📹 src del video:", videoEl.src);
  console.log("📹 readyState:", videoEl.readyState);
  // 0 = sin datos, 1 = metadata, 2 = algo de datos, 3 = puede reproducir, 4 = listo

  videoEl.addEventListener("error", (e) => {
    console.error("❌ Error en el video:", videoEl.error);
    statusText.textContent = "Error al cargar el video: " + (videoEl.error?.message || "archivo no encontrado");
  });

  videoEl.addEventListener("canplay", () => {
    console.log("✅ Video listo para reproducir");
  });

  videoEl.addEventListener("playing", () => {
    console.log("▶️ Video reproduciéndose");
  });

  let isFound = false;

  marker.addEventListener("markerFound", () => {
    if (isFound) return;
    isFound = true;

    console.log("🎯 Marcador encontrado");
    arVideo.setAttribute("visible", "true");

    videoEl.play()
      .then(() => console.log("✅ play() ejecutado"))
      .catch((err) => console.error("❌ play() bloqueado:", err));

    statusBox.classList.add("found");
    statusIcon.textContent = "▶️";
    statusText.textContent = "¡Imagen reconocida! Reproduciendo video…";
  });

  marker.addEventListener("markerLost", () => {
    if (!isFound) return;
    isFound = false;

    arVideo.setAttribute("visible", "false");
    videoEl.pause();
    videoEl.currentTime = 0;

    statusBox.classList.remove("found");
    statusIcon.textContent = "📷";
    statusText.textContent = "Apuntá la cámara a la imagen marcador";
  });
});