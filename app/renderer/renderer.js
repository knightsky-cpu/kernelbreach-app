const screen = document.getElementById("screen");
const frameWrap = document.querySelector(".frame-wrap");

const ESCAPE_HTML = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;"
};
const ANSI_CLASS_ALLOWLIST = new Set([
  "ansi-bold",
  "ansi-dim",
  "ansi-blink",
  ...Array.from({ length: 8 }, (_, index) => `ansi-fg-${30 + index}`),
  ...Array.from({ length: 8 }, (_, index) => `ansi-fg-${90 + index}`),
  ...Array.from({ length: 8 }, (_, index) => `ansi-bg-${40 + index}`),
  "ansi-bg-100"
]);

const KEY_MAP = {
  ArrowUp: "\x1B[A",
  ArrowDown: "\x1B[B",
  ArrowLeft: "\x1B[D",
  ArrowRight: "\x1B[C",
  Enter: "\r",
  Escape: "\x1B",
  Backspace: "\x7F",
  " ": " "
};

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (char) => ESCAPE_HTML[char]);
}

function stripAnsi(text) {
  return text.replace(/\x1b\[[0-9;]*m/g, "");
}

function ansiToHtml(input) {
  let classes = [];
  let html = "";
  const ansiRegex = /\x1b\[([0-9;]*)m/g;
  let lastIndex = 0;

  function flush(text) {
    if (!text) return;
    const escaped = escapeHtml(text);
    if (classes.length === 0) {
      html += escaped;
      return;
    }
    const safeClasses = classes.filter((name) => ANSI_CLASS_ALLOWLIST.has(name));
    if (safeClasses.length === 0) {
      html += escaped;
      return;
    }
    html += `<span class="${safeClasses.join(" ")}">${escaped}</span>`;
  }

  let match;
  while ((match = ansiRegex.exec(input)) !== null) {
    flush(input.slice(lastIndex, match.index));
    const codes = match[1] ? match[1].split(";").map(Number) : [0];
    for (const code of codes) {
      if (code === 0) {
        classes = [];
      } else if (code === 1) {
        if (!classes.includes("ansi-bold")) classes.push("ansi-bold");
      } else if (code === 2) {
        if (!classes.includes("ansi-dim")) classes.push("ansi-dim");
      } else if (code === 5) {
        if (!classes.includes("ansi-blink")) classes.push("ansi-blink");
      } else if ((code >= 30 && code <= 37) || (code >= 90 && code <= 97)) {
        classes = classes.filter((name) => !name.startsWith("ansi-fg-"));
        classes.push(`ansi-fg-${code}`);
      } else if ((code >= 40 && code <= 47) || code === 100) {
        classes = classes.filter((name) => !name.startsWith("ansi-bg-"));
        classes.push(`ansi-bg-${code}`);
      }
    }
    lastIndex = match.index + match[0].length;
  }

  flush(input.slice(lastIndex));
  return html;
}

function normalizeKey(event) {
  if (event.ctrlKey || event.metaKey || event.altKey) {
    return null;
  }
  if (KEY_MAP[event.key]) {
    return KEY_MAP[event.key];
  }
  if (event.key.length === 1) {
    return event.key;
  }
  return null;
}

function measureGrid() {
  const probe = document.createElement("span");
  probe.textContent = "MMMMMMMMMM";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.whiteSpace = "pre";
  probe.style.font = getComputedStyle(screen).font;
  document.body.appendChild(probe);
  const rect = probe.getBoundingClientRect();
  probe.remove();
  const charWidth = rect.width / 10 || 9.6;
  const styles = getComputedStyle(screen);
  const lineHeight = parseFloat(styles.lineHeight) || 19.5;
  const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
  const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
  const usableWidth = Math.max(0, (frameWrap?.clientWidth ?? screen.clientWidth) - paddingX);
  const usableHeight = Math.max(0, (frameWrap?.clientHeight ?? screen.clientHeight) - paddingY);
  const cols = Math.floor(usableWidth / charWidth);
  const rows = Math.floor(usableHeight / lineHeight);
  return {
    cols: Math.max(40, cols),
    rows: Math.max(20, rows)
  };
}

function syncSize() {
  window.kernelBreach.sendResize(measureGrid());
}

window.kernelBreach.onFrame((lines) => {
  const maxLineLength = lines.reduce((max, line) => {
    return Math.max(max, stripAnsi(line).length);
  }, 0);
  screen.style.width = `${Math.max(1, maxLineLength)}ch`;
  screen.style.margin = "0 auto";
  screen.innerHTML = ansiToHtml(lines.join("\n"));
});

window.addEventListener("keydown", (event) => {
  const key = normalizeKey(event);
  if (!key) return;
  event.preventDefault();
  window.kernelBreach.sendKey(key);
});

window.addEventListener("resize", syncSize);
window.addEventListener("load", syncSize);
