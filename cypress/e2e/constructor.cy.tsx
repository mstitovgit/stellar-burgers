const bunListSelector = '[data-cy-category="bun"]';
const mainListSelector = '[data-cy-category="main"]';
const constructorSelector = '[data-cy="burger-constructor"]';
const modalSelector = '[data-cy="modal"]';
const closeModalBtnSelector = '[data-cy="close-modal-button"]';
const ingredientLinkSelector = '[data-cy="ingredient-link"]';

describe('Интеграционные тесты', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
      'createOrder'
    );

    cy.window().then((window) => {
      window.localStorage.setItem('refreshToken', 'mockRefreshTokenValue');
    });
    cy.setCookie('accessToken', 'mockAccessTokenValue');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    cy.window().then((window) => {
      window.localStorage.removeItem('refreshToken');
    });
    cy.clearCookie('accessToken');
  });

  it('Должен добавить выбранную булку в конструктор и проверить ее ID', () => {
    cy.get(bunListSelector)
      .first()
      .invoke('attr', 'data-cy-id')
      .then((bunId) => {
        cy.get(bunListSelector).first().find('button').click();
        cy.get(constructorSelector)
          .find(`[data-cy-id="${bunId}"]`)
          .should('exist');
      });
  });

  it('Должен добавить выбранную начинку в конструктор и проверить ее ID', () => {
    cy.get(mainListSelector)
      .first()
      .invoke('attr', 'data-cy-id')
      .then((bunId) => {
        cy.get(mainListSelector).first().find('button').click();
        cy.get(constructorSelector)
          .find(`[data-cy-id="${bunId}"]`)
          .should('exist');
      });
  });

  it('Тест работы модальных окон', () => {
    cy.get(ingredientLinkSelector).first().click();
    cy.get(modalSelector).should('exist');
    cy.get(closeModalBtnSelector).click();
    cy.get(modalSelector).should('not.exist');
    cy.get(ingredientLinkSelector).first().click();
    cy.get(modalSelector).should('exist');
    cy.get('[data-cy="overlay-modal"]').click({ force: true });
    cy.get(modalSelector).should('not.exist');
  });

  it('Тест создания заказа', () => {
    cy.wait('@getUser');

    cy.get(bunListSelector).first().find('button').click();
    cy.get(mainListSelector).first().find('button').click();
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');
    cy.get(modalSelector).contains('12345');
    cy.get(closeModalBtnSelector).click();
    cy.get(modalSelector).should('not.exist');
    cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
  });
});
