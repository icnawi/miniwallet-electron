import i18next from 'i18next';
import detector from 'i18next-browser-languagedetector';
import backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

export const supportedLngs = ['en', 'ru', 'cn'];
export const i18n = i18next;

i18n
    .use(backend)
    .use(detector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs,
        interpolation: {
            escapeValue: false
        },
        react: {
            wait: true,
            useSuspense: false
        }
    });
