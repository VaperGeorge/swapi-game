# SwapiGame

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.1.

## Project information

Project based on latest Angular to show you that I already can work with the latests features like new `control flow`, `inject()`, `standalone` etc.
Of course I used the RxJs to make the project reactive and tried to used as less static variables as I could to have an Angular way of working.

### Material

Angular Material used asd UI library to have a beauty project in a simple way. Didn't override them, but if it will be needed I have an experience to do it.

### Comments in code

I didn't add the comment into the code as I believe that code should be written in the way to be easy understandable by other developers and such code don't need to have a comments

### Unit tests

Unit tests done with Karma for a few files to show you that I know how to work with them.

Added to:

- [info-card.component.spec.ts](./src/app/info-card/info-card.component.spec.ts)
- [type-selection.component.spec](./src/app/type-selection/type-selection.component.spec.ts)
- [persons.service.spec](./src/shared/services/persons.service.spec.ts)

### E2E tests

E2E tests done using Playwright and covered 3 pages: **start, selection, game**. ['game.spec.ts](./e2e/pages/game.spec.ts) have a different scenarios when user select `People` option or `Starship` option.

### App structure

```
src/
├── app/
│ ├── game/ Standalone page component what collect the main logic inside
│ ├── info-card/ Standalone component with OnPush strategy with UI only information
│ ├── start/ Standalone page component with simple logic and OnPush strategy
│ ├── type-selection/ Standalone page component with simple logic
│ ├── app.component.ts / Root standalone component logic
│ ├── app.component.html / Root component template
├── assets/ Static assets like images, fonts, and mock data for e2e tests.
├── shared/
│ ├── constants/ Contain a constant variables shader through the app
│ ├── enums/ Contain enums used in app
│ ├── interfaces/ Contain an interfaces used in app
│ ├── services/ Services for data fetching and stored information
├── environments/ Environment-specific configurations
├── index.html/ Main HTML file
├── main.ts/ Entry point for Angular application
├── polyfills.ts/ Polyfills for compatibility
├── styles.scss/ Global styles
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
