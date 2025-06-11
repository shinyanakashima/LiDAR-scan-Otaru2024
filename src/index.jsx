import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client"; // ← React 18以降はこれ！

import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>
	);
} else {
	console.error("Element with id 'root' not found.");
}
