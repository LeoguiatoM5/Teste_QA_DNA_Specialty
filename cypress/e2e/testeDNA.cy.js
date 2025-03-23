describe('Cliente Novartis', () => {
  beforeEach(() => {
    cy.visit('https://homologacaoesp.interplayers.com.br/PRJ/Novartis/Acesso.aspx');
    cy.wait(2000); // Espera 2 segundos antes de prosseguir
  });

  it('Caso de Teste: Login Inválido', () => {
    cy.get('#ContentPlaceHolder1_Control_pnlLogin_Login1_UserName').type('Ent', { delay: 300 });
    cy.wait(1000);
    cy.get('#ContentPlaceHolder1_Control_pnlLogin_Login1_Password').type('12378', { delay: 300 });
    cy.wait(1000);
    cy.get('#ContentPlaceHolder1_Control_pnlLogin_Login1_LoginButton').click();
    cy.wait(2000);
    cy.get(':nth-child(3) > td').should('contain', "Usuário ou Senha inválidos.");
  });

  it('Caso de teste: Fluxo com Login Válido, Acesse a Aba de pedidos e filtre o CNPJ (Fictício)', () => {
    cy.get('#ContentPlaceHolder1_Control_pnlLogin_Login1_UserName').type('Entire', { delay: 300 });
    cy.wait(1000);
    cy.get('#ContentPlaceHolder1_Control_pnlLogin_Login1_Password').type('12345678', { delay: 300 });
    cy.wait(1000);
    cy.get('#ContentPlaceHolder1_Control_pnlLogin_Login1_LoginButton').click();
    cy.wait(3000);
    cy.url().should('not.include', 'Acesso.aspx');

    cy.get(':nth-child(7) > .sf-with-ul', { timeout: 10000 })
      .should('be.visible')
      .click({ delay: 500 });

    cy.wait(2000);
    cy.contains('Novo Pedido').should('be.visible').click({ delay: 500 });

    // Caso de buscar CNPJ
    cy.visit('https://homologacaoesp.interplayers.com.br/PRJ/Novartis/Pedido/CriacaoEdicaoPedido.aspx?cod=2C507992-68F8-429D-AF5A-AA51017168DC|59');
    cy.wait(2000);
    cy.get('#cphCadastro_txtFiltroCNPJ').type('41.917.691/0001-70', { delay: 300 });
    cy.wait(1000);
    cy.get('#cphCadastro_btnBuscarCliente').click();
    cy.wait(3000);

    cy.get('.mensagem-erro', { timeout: 10000 }).then(($el) => {
      const errorMessage = $el.text().trim();

      if (errorMessage.includes('CNPJ não encontrado')) {
        cy.log('SUCESSO: Mensagem "CNPJ não encontrado" foi exibida corretamente.');
      } else {
        throw new Error('ERRO: A mensagem esperada "CNPJ não encontrado" não foi exibida!');
      }
    });
  });
});
