/// <reference types="vite/client" />

interface ImportMetaEnv {
    /** Overrides the contact form's backend endpoint. Optional - see .env.example. */
    readonly VITE_CONTACT_API_URL?: string;
}
