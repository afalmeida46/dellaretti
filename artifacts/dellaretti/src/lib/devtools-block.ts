let blocked = false;

function shutdown() {
  if (blocked) return;
  blocked = true;
  try {
    document.documentElement.innerHTML = "";
    document.body.innerHTML = "";
  } catch {}
  try {
    window.location.replace("about:blank");
  } catch {}
  try {
    window.open("", "_self");
    window.close();
  } catch {}
  setTimeout(() => {
    try {
      window.location.href = "about:blank";
    } catch {}
  }, 50);
}

function blockKeys(e: KeyboardEvent) {
  const key = e.key?.toLowerCase();
  if (
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && (key === "i" || key === "j" || key === "c")) ||
    (e.metaKey && e.altKey && (key === "i" || key === "j" || key === "c")) ||
    (e.ctrlKey && key === "u") ||
    (e.metaKey && key === "u") ||
    (e.ctrlKey && key === "s") ||
    (e.metaKey && key === "s")
  ) {
    e.preventDefault();
    e.stopPropagation();
    shutdown();
    return false;
  }
}

function blockContextMenu(e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();
  return false;
}

function detectDevtoolsBySize() {
  const threshold = 160;
  const widthDiff = window.outerWidth - window.innerWidth;
  const heightDiff = window.outerHeight - window.innerHeight;
  if (widthDiff > threshold || heightDiff > threshold) {
    shutdown();
  }
}

function detectDevtoolsByDebugger() {
  const start = performance.now();
  // eslint-disable-next-line no-debugger
  debugger;
  const elapsed = performance.now() - start;
  if (elapsed > 100) {
    shutdown();
  }
}

export function installDevtoolsBlocker() {
  if (typeof window === "undefined") return;

  document.addEventListener("keydown", blockKeys, { capture: true });
  document.addEventListener("contextmenu", blockContextMenu, { capture: true });

  setInterval(detectDevtoolsBySize, 700);
  setInterval(detectDevtoolsByDebugger, 1500);

  window.addEventListener("resize", detectDevtoolsBySize);
}
