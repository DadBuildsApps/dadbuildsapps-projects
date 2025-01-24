import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {DataProvider} from "/src/providers/DataProvider"
import {LanguageProvider} from "/src/providers/LanguageProvider"
import {ThemeProvider} from "/src/providers/ThemeProvider"
import {GlobalStateProvider} from "/src/providers/GlobalStateProvider"
import {FeedbacksProvider} from "/src/providers/FeedbacksProvider"
import {WindowProvider} from "/src/providers/WindowProvider"
import App from "/src/components/App.jsx"
import Preloader from "/src/components/Preloader.jsx"
import PrivacyPolicy from "/src/components/policy/PrivacyPolicy.jsx"

const AppProviders = ({ children }) => (
    <DataProvider>
        <LanguageProvider>
            <FeedbacksProvider>
                <WindowProvider>
                    <ThemeProvider>
                        <GlobalStateProvider>
                            {children}
                        </GlobalStateProvider>
                    </ThemeProvider>
                </WindowProvider>
            </FeedbacksProvider>
        </LanguageProvider>
    </DataProvider>
)

let container = null

document.addEventListener("DOMContentLoaded", function () {
    if (container) return;

    container = document.getElementById("root");

    // Check the current path
    const isPrivacyPolicy = window.location.pathname === "/privacy-policy";

    createRoot(container).render(
        <StrictMode>
            {isPrivacyPolicy ? (
                // Render only PrivacyPolicy for /privacy-policy
                <PrivacyPolicy />
            ) : (
                // Render the default app structure for other paths
                <Preloader>
                    <AppProviders>
                        <App />
                    </AppProviders>
                </Preloader>
            )}
        </StrictMode>
    );
});
