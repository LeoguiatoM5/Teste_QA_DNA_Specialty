describe('Cadastro de Login', () => {
  
  beforeEach(() => {
    cy.visit('https://hom-specialty-sso-web.azurewebsites.net/login');
  });

  it('Login com dados invalidos',  () => {
    // Aguarda o carregamento do campo de usuário antes de interagir
   
    
    cy.get('[data-testid="login-email"]').type('teste@gmail.com');
    cy.get('[data-testid="login-password"]').type('123456');
    
    cy.get('[data-testid="login-signIn"]').click();

    
   

   
  });

  it('Login com dados validos',  () => {
    // Aguarda o carregamento do campo de usuário antes de interagir


    cy.get('[data-testid="login-email"]').type('suporte@dnaspecialty.com.br');
    cy.get('[data-testid="login-password"]').type('123@Mudar');

    cy.get('[data-testid="login-signIn"]').click();

    cy.get('.mat-select-arrow-wrapper').click();
    cy.wait(8000)
  
    cy.get('#mat-option-0').click();

    cy.get('.mat-dialog-actions > .mat-raised-button').click();

  });


  

});
