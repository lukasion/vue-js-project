# "Delegations" Application — Employee Delegation Management

[![CI](https://github.com/lukasion/vue-js-project/actions/workflows/main.yml/badge.svg)](https://github.com/lukasion/vue-js-project/actions/workflows/main.yml)

## Short Description
This application is designed for managing employee delegations in small and medium-sized businesses. It allows you to store data on delegations, expenses, mileage, and company settings.

## Main Features
- Manage company settings (name, NIP, address) — store: [useSettingsStore](src/stores/settings.store.ts) (type: [AppSettings](src/types/AppSettings.ts))
- Settings view: [src/pages/Settings.vue](src/pages/Settings.vue)
- Employee view: [src/pages/Employees.vue](src/pages/Employees.vue)
- Localization (Polish): [src/i18n/pl.json](src/i18n/pl.json)
- Helper decorators for Pinia: [src/utils/PiniaDecorators.ts](src/utils/PiniaDecorators.ts)

## Technologies
- Vue 3
- Vuetify 3
- Pinia (state management) — store with persistence: [useSettingsStore](src/stores/settings.store.ts)
- Vite as bundler: [vite.config.js](vite.config.js)
- TypeScript (model types: e.g. [AppSettings](src/types/AppSettings.ts), [Vehicle](src/types/Vehicle.ts))

## Quick Start
1. Install dependencies:
    ```sh 
    npm install
    ```

2. Run the app in development mode:
    ```sh
    npm run dev
    ```

3. Build for production:
   ```sh
   npm run build
   ```

## Important File Structure
- src/main.js — application entry point, initializes Pinia, Vuetify, and i18n
- src/App.vue — main application layout
- src/components/Sidebar.vue — navigation panel with components:
  - src/components/NavigationAvatar.vue
  - src/components/NavigationList.vue
- src/stores/settings.store.ts — settings store ([useSettingsStore](src/stores/settings.store.ts))
- src/i18n/pl.json — Polish translations

## Developer Guidelines
- The settings data is stored in Pinia and saved locally with the help of pinia-plugin-persistedstate. Check useSettingsStore to modify the state structure.
- Decorators simplify the connection between components and the store — see [src/utils/PiniaDecorators.ts](src/utils/PiniaDecorators.ts).
- To add new translations, update src/i18n/pl.json.

## Configuration Files
- Project and dependency configuration: package.json
- Vite configuration: vite.config.js
- TypeScript settings: tsconfig.json
- ESLint configuration: eslint.config.ts

## Contact / Development
The repository contains the basic application structure — you can expand modules for delegations, expense handling, mileage logs, or integrations with CSV/PDF export.

## License
None. You can add a LICENSE file if you plan to publish.
