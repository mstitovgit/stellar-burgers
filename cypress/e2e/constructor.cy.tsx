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
    cy.get('[data-cy-category="bun"]')
      .first()
      .invoke('attr', 'data-cy-id')
      .then((bunId) => {
        cy.get('[data-cy-category="bun"]').first().find('button').click();
        cy.get('[data-cy="burger-constructor"]')
          .find(`[data-cy-id="${bunId}"]`)
          .should('exist');
      });
  });

  it('Должен добавить выбранную начинку в конструктор и проверить ее ID', () => {
    cy.get('[data-cy-category="main"]')
      .first()
      .invoke('attr', 'data-cy-id')
      .then((bunId) => {
        cy.get('[data-cy-category="main"]').first().find('button').click();
        cy.get('[data-cy="burger-constructor"]')
          .find(`[data-cy-id="${bunId}"]`)
          .should('exist');
      });
  });

  it('Тест работы модальных окон', () => {
    cy.get('[data-cy="ingredient-link"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="ingredient-link"]').first().click();
    cy.get('[data-cy="modal"]').should('exist');
    cy.get('[data-cy="overlay-modal"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Тест создания заказа', () => {
    cy.wait('@getUser');

    cy.get('[data-cy-category="bun"]').first().find('button').click();
    cy.get('[data-cy-category="main"]').first().find('button').click();
    cy.get('[data-cy="order-button"]').click();
    cy.wait('@createOrder');
    cy.get('[data-cy="modal"]').contains('12345');
    cy.get('[data-cy="close-modal-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-cy="constructor-ingredient"]').should('not.exist');
  });
});
