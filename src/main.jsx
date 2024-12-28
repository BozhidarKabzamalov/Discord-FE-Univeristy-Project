import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import GlobalStyle from "./globalStyles.js";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <GlobalStyle />
        <App />
    </BrowserRouter>
);
