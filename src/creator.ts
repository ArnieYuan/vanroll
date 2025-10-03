import './creator.css';

// DOM Element Selections
const urlInput = document.getElementById('urlInput') as HTMLInputElement | null;
const launchButton = document.getElementById('launchButton') as HTMLButtonElement | null;
const messageBox = document.getElementById('messageBox') as HTMLDivElement | null;

const inputView = document.getElementById('inputView') as HTMLDivElement | null;
const iframeView = document.getElementById('iframeView') as HTMLDivElement | null;
const floatingIframe = document.getElementById('floatingIframe') as HTMLIFrameElement | null;
const backButton = document.getElementById('backButton') as HTMLButtonElement | null;
const currentUrlDisplay = document.getElementById('currentUrlDisplay') as HTMLSpanElement | null;
const dragHandle = document.getElementById('dragHandle') as HTMLDivElement | null;
const urlCarousel = document.getElementById('urlCarousel') as HTMLDivElement | null;

// Global array to store history of embedded URLs
const embeddedUrls: string[] = [];
let currentActiveUrl: string | null = null;

/**
 * Utility function to display messages (errors or success) in the message box.
 * @param {string} message - The text to display.
 * @param {'error' | 'success' | 'clear'} type - The type of message.
 */
function showMessage(message: string, type: 'error' | 'success' | 'clear'): void {
	if (!messageBox) return;

	messageBox.textContent = message;
	messageBox.className = 'mt-4 p-3 rounded-lg text-sm';

	if (type === 'error') {
		messageBox.classList.add('bg-red-100', 'text-red-800', 'block');
	} else if (type === 'success') {
		messageBox.classList.add('bg-green-100', 'text-green-800', 'block');
	} else {
		messageBox.classList.add('hidden');
	}
}

/**
 * Renders the URL carousel at the bottom of the floating window.
 */
function renderCarousel(): void {
	if (!urlCarousel) return;

	urlCarousel.innerHTML = ''; // Clear existing items

	if (embeddedUrls.length === 0) {
		// Keep the placeholder text visible if no URLs
		urlCarousel.innerHTML = '<p class="text-sm text-v-subtle italic ml-2">No embedded URLs yet.</p>';
		return;
	}

	embeddedUrls.forEach(url => {
		const item = document.createElement('button');

		// Truncate the full URL for clear display in the carousel
		const MAX_LENGTH = 40;
		let displayUrl = url;
		if (url.length > MAX_LENGTH) {
			// Truncate the URL and add an ellipsis
			displayUrl = url.substring(0, MAX_LENGTH - 3) + '...';
		}

		// Set the display text to the (truncated) full URL
		item.textContent = displayUrl;
		item.title = url; // Full URL as tooltip
		item.dataset.url = url;

		// Add common classes
		item.classList.add('carousel-item', 'transition', 'duration-150');

		// Set active/inactive state classes
		if (url === currentActiveUrl) {
			item.classList.add('carousel-item-active');
		} else {
			item.classList.add('carousel-item-inactive');
		}

		// Attach click handler to switch the iframe source
		item.addEventListener('click', () => {
			if (url !== currentActiveUrl) {
				setIframeUrl(url);
				renderCarousel(); // Re-render to update active state
			}
		});

		urlCarousel.appendChild(item);
	});
	// Scroll to the active item (or the end)
	urlCarousel.scrollLeft = urlCarousel.scrollWidth;
}

/**
 * Sets the iframe source and updates the active URL tracker.
 * @param {string} url - The URL to load.
 */
function setIframeUrl(url: string): void {
	if (!floatingIframe || !currentUrlDisplay) return;

	floatingIframe.src = url;
	currentUrlDisplay.textContent = url;
	currentActiveUrl = url;
}

/**
 * Switches the view to display the embedded iframe.
 * @param {string} url - The URL to load into the iframe.
 */
function showIframeView(url: string): void {
	if (!inputView || !iframeView || !urlCarousel || !dragHandle) return;

	// 1. Set the new URL as active
	setIframeUrl(url);

	// 2. Add URL to history if new
	if (!embeddedUrls.includes(url)) {
		embeddedUrls.push(url);
	}

	// 3. Update UI states
	inputView.classList.add('hidden');
	iframeView.classList.remove('hidden');
	urlCarousel.classList.remove('hidden'); // SHOW CAROUSEL

	// 4. Render the carousel
	renderCarousel();

	// 5. Initialize dragging
	dragElement(iframeView, dragHandle);
}

/**
 * Switches the view back to the URL input form.
 */
function goBackToInput(): void {
	if (!floatingIframe || !inputView || !iframeView || !urlCarousel) return;

	floatingIframe.src = ''; // Clear iframe content
	currentActiveUrl = null; // Clear active URL
	embeddedUrls.length = 0; // Clear history

	inputView.classList.remove('hidden');
	iframeView.classList.add('hidden');
	urlCarousel.classList.add('hidden'); // HIDE CAROUSEL

	showMessage('', 'clear'); // Clear messages on the input view

	// Re-apply original positioning for future launch
	iframeView.style.top = '50%';
	iframeView.style.left = '50%';
	iframeView.style.transform = 'translate(-50%, -50%)';
}

/**
 * Makes an HTML element draggable using mouse events.
 * @param {HTMLElement} element - The element to make draggable.
 * @param {HTMLElement} handle - The handle element to initiate dragging.
 */
function dragElement(element: HTMLElement, handle: HTMLElement): void {
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

	// Start dragging when the mouse is pressed down on the handle
	handle.onmousedown = dragMouseDown;

	function dragMouseDown(e: MouseEvent) {
		e.preventDefault();

		// Get the initial mouse cursor position at startup
		pos3 = e.clientX;
		pos4 = e.clientY;

		// Crucial step: remove the transform property used for initial centering
		element.style.removeProperty('transform');

		// Call a function whenever the cursor moves
		document.onmousemove = elementDrag;
		document.onmouseup = closeDragElement;

		// Change cursor to 'grabbing' state
		handle.style.cursor = 'grabbing';
	}

	function elementDrag(e: MouseEvent) {
		e.preventDefault();

		// Calculate the new cursor position
		pos1 = pos3 - e.clientX; // Difference in X
		pos2 = pos4 - e.clientY; // Difference in Y
		pos3 = e.clientX; // New X position
		pos4 = e.clientY; // New Y position

		// Set the element's new position
		let newTop = element.offsetTop - pos2;
		let newLeft = element.offsetLeft - pos1;

		// Boundary check (prevent dragging completely off-screen)
		newTop = Math.max(0, newTop);
		newLeft = Math.max(0, newLeft);
		newTop = Math.min(newTop, window.innerHeight - element.offsetHeight);
		newLeft = Math.min(newLeft, window.innerWidth - element.offsetWidth);

		element.style.top = newTop + "px";
		element.style.left = newLeft + "px";
	}

	function closeDragElement() {
		// Stop moving when mouse button is released
		document.onmouseup = null;
		document.onmousemove = null;
		handle.style.cursor = 'grab'; // Change cursor back
	}
}

/**
 * Validates the URL and launches the embedded iframe view.
 */
function launchEmbeddedWebpage(): void {
	if (!urlInput) return;

	showMessage('', 'clear'); // Clear previous messages
	const url = urlInput.value.trim();

	if (!url) {
		showMessage('Please enter a valid URL.', 'error');
		return;
	}

	// Simple URL validation and normalization
	let validatedUrl: string;
	try {
		// Try to create a URL object to validate and normalize
		const tempUrl = new URL(url.startsWith('http') ? url : 'https://' + url);
		validatedUrl = tempUrl.href;
	} catch (e) {
		showMessage('Invalid URL format. Please ensure it is a proper web address.', 'error');
		return;
	}

	// Proceed to the iframe view
	showIframeView(validatedUrl);
}

launchButton?.addEventListener('click', launchEmbeddedWebpage);
backButton?.addEventListener('click', goBackToInput);

// Initial message to warn about iframe limitations
window.onload = () => {
	showMessage('Note: Some websites block embedding in an iframe due to security policies. You may see a blank page or an error for those sites.', 'error');
};