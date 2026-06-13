import './index.css';

interface ShimEntry {
  name: string;
  domain: string;
  file: string;
  description: string;
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingState = document.getElementById('loading-state');
  const errorState = document.getElementById('error-state');
  const errorMessage = document.getElementById('error-message');
  const shimsGrid = document.getElementById('shims-grid');

  async function loadShims() {
    try {
      const response = await fetch('/public/shims/index.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const shims: ShimEntry[] = await response.json();
      renderShims(shims);

      if (loadingState) loadingState.style.display = 'none';
      if (shimsGrid) {
        shimsGrid.style.display = 'grid';
        shimsGrid.classList.remove('hidden');
      }
    } catch (error) {
      console.error("Failed to load shims:", error);
      if (loadingState) loadingState.style.display = 'none';
      if (errorState) {
        errorState.style.display = 'block';
        errorState.classList.remove('hidden');
      }
      if (errorMessage) {
        errorMessage.textContent = error instanceof Error ? error.message : "Unknown error";
      }
    }
  }

  function renderShims(shims: ShimEntry[]) {
    if (!shimsGrid) return;

    shimsGrid.innerHTML = ''; // Clear existing content

    if (shims.length === 0) {
      shimsGrid.innerHTML = '<div class="col-span-full text-center text-v-subtle py-10">No shims available at the moment.</div>';
      return;
    }

    shims.forEach(shim => {
      const card = document.createElement('div');
      card.className = 'bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col h-full';

      card.innerHTML = `
        <div class="flex-grow">
          <h3 class="text-xl font-bold text-gray-900 mb-1">${escapeHtml(shim.name)}</h3>
          <p class="text-sm text-v-accent font-mono mb-4">${escapeHtml(shim.domain)}</p>
          <p class="text-gray-600 text-sm mb-6">${escapeHtml(shim.description)}</p>
        </div>
        <div class="mt-auto border-t border-gray-100 pt-4 flex justify-between items-center">
          <span class="text-xs text-gray-500 font-mono">${escapeHtml(shim.file)}</span>
          <a href="https://shims.vanroll.com/${encodeURIComponent(shim.file)}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-blue-600 hover:text-blue-800 transition duration-150">
            View JSON &rarr;
          </a>
        </div>
      `;

      shimsGrid.appendChild(card);
    });
  }

  // Basic HTML escaping to prevent XSS
  function escapeHtml(unsafe: string) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
  }

  loadShims();
});
