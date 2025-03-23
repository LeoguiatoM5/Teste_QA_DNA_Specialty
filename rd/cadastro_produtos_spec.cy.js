describe('Cadastro de Login', () => {
  
  beforeEach(() => {
    // Carregar a página antes de cada teste
    cy.visit('https://hom-specialty-sso-web.azurewebsites.net/login');
  });

  it('Login com dados inválidos', () => {
    // Aguarda o carregamento do campo de usuário antes de interagir
    cy.get('[data-testid="login-email"]').type('teste@gmail.com');
    cy.get('[data-testid="login-password"]').type('123456');
    
    cy.get('[data-testid="login-signIn"]').click();

    // Verifica se há uma mensagem de erro ou algo relacionado a login inválido
   
  });

  it('Login com dados válidos', () => {
    // Intercepta a requisição de login antes de qualquer ação
    cy.intercept('POST', 'https://hom-specialty-sso-api.azurewebsites.net/api/auth/token').as('loginRequest');
    
    // Aguarda o carregamento do campo de usuário antes de interagir
    cy.get('[data-testid="login-email"]').type('suporte@dnaspecialty.com.br');
    cy.get('[data-testid="login-password"]').type('123@Mudar');

    cy.get('[data-testid="login-signIn"]').click();

    // Espera pela requisição de login
    cy.wait('@loginRequest', { timeout: 10000 }); // Aumenta o tempo de espera para 10 segundos

    // Verifica se a requisição de login retornou com status 200
    cy.get('@loginRequest').its('response.statusCode').should('eq', 200);

    // Adiciona espera explícita para a requisição de permissões
  

    // Aguarde a navegação e a nova página carregar após login


    // Selecione a opção de menu
    cy.get('.mat-select-arrow-wrapper').click();
    cy.get('#mat-option-0').click();

    // Confirmar a ação no diálogo
    cy.get('.mat-dialog-actions > .mat-raised-button').invoke('removeAttr', '#').click();

    // Verificar se o token foi armazenado corretamente
    cy.window().then((win) => {
      const token = win.localStorage.getItem('Specialty.SSO.Token');
      expect(token).to.exist; // Verifica se o token existe
      if (token) {
        cy.wrap(token).as('authToken'); // Salvar token na alias para futuros testes
      }
    });
  });
});