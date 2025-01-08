import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import GlobalStyle from "./globalStyles.js";
import { store } from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <GlobalStyle />
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);
