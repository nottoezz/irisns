const pendingScripts = new Map();

function findExistingScript({ src, selector }) {
  if (typeof document === "undefined") {
    return null;
  }

  if (selector) {
    const node = document.querySelector(selector);
    if (node) {
      return node;
    }
  }

  if (!src) {
    return null;
  }

  const absoluteSrc = (() => {
    try {
      return new URL(src, document.baseURI).href;
    } catch {
      return src;
    }
  })();

  const scripts = document.getElementsByTagName("script");
  for (const script of scripts) {
    if (script.src === absoluteSrc || script.getAttribute("src") === src) {
      return script;
    }
  }

  return null;
}

export function loadExternalScript({
  src,
  selector,
  attributes = {},
  target,
  defer = true,
  async = true,
} = {}) {
  if (typeof document === "undefined") {
    return Promise.resolve(null);
  }

  if (!src && !selector) {
    return Promise.reject(new Error("loadExternalScript requires a src or selector"));
  }

  const existing = findExistingScript({ src, selector });
  if (existing) {
    const dataLoaded = existing.dataset?.loaded === "1";
    if (dataLoaded || existing.readyState === "complete") {
      return Promise.resolve(existing);
    }

    return new Promise((resolve, reject) => {
      existing.addEventListener(
        "load",
        () => {
          existing.dataset.loaded = "1";
          resolve(existing);
        },
        { once: true }
      );
      existing.addEventListener(
        "error",
        (event) => {
          reject(event?.error || new Error(`Failed to load script: ${src}`));
        },
        { once: true }
      );
    });
  }

  if (!src) {
    return Promise.reject(new Error("No script found for selector and no src provided"));
  }

  if (pendingScripts.has(src)) {
    return pendingScripts.get(src);
  }

  const script = document.createElement("script");
  script.src = src;
  script.async = async;
  script.defer = defer;

  Object.entries(attributes).forEach(([key, value]) => {
    if (value == null) {
      return;
    }

    if (key === "dataset" && typeof value === "object") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        if (dataValue != null) {
          script.dataset[dataKey] = String(dataValue);
        }
      });
      return;
    }

    if (key in script) {
      script[key] = value;
    } else {
      script.setAttribute(key, value);
    }
  });

  const appendTarget = target || document.body || document.head;
  if (!appendTarget) {
    return Promise.reject(new Error("Unable to find a target to append the script"));
  }

  const promise = new Promise((resolve, reject) => {
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "1";
        resolve(script);
      },
      { once: true }
    );

    script.addEventListener(
      "error",
      (event) => {
        pendingScripts.delete(src);
        script.remove();
        reject(event?.error || new Error(`Failed to load script: ${src}`));
      },
      { once: true }
    );
  });

  pendingScripts.set(src, promise);
  appendTarget.appendChild(script);
  return promise;
}

