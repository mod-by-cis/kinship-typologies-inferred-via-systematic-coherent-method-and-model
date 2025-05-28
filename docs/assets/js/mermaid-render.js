import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@11.6/dist/mermaid.esm.min.mjs";

// Inicjalizacja Mermaid
mermaid.initialize({ 
  startOnLoad: false ,
  theme: 'neutral',
  securityLevel: 'loose',
  layout: 'elk',
  themeVariables: {
    fontFamily: 'monospace',
  }
});

export async function renderMermaidFromFile(id, filePath) {
  console.log(id);
  const container = document.getElementById(id);
  if (!container) {
    console.warn(`Brak elementu o ID "${id}"`);
    return;
  }

  const res = await fetch(filePath);
  if (!res.ok) {
    console.error(`Nie udało się wczytać pliku Mermaid z ${filePath}`);
    return;
  }

  const graphDefinition = await res.text();
  const { svg } = await mermaid.render(`graph-${id}`, graphDefinition);
  container.innerHTML = svg;
}
