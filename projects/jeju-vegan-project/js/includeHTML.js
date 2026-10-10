function includeHTML() {
  const includeElements = document.querySelectorAll("[include-html]");
  const total = includeElements.length;
  let loaded = 0;

  if (!total) {
    document.dispatchEvent(new Event('includeHTMLLoaded'));
    return;
  }

  includeElements.forEach((el) => {
    const file = el.getAttribute("include-html");

    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        el.innerHTML = data;
        el.removeAttribute("include-html");
        loaded++;
        if (loaded === total) {
          document.dispatchEvent(new Event('includeHTMLLoaded'));
        }
      });
  });
}

includeHTML();