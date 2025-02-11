describe('Formulário de Cadastro de Produtos', () => {
  
  beforeEach(() => {
    // Carregar a página antes de cada teste
    cy.visit('http://127.0.0.1:5500/index.html'); 
  });

  it('Deve exibir erro se o nome do produto for inválido', () => {
    // Tenta cadastrar um produto com nome inválido
    cy.get('#nome').type('A');
    cy.get('#codigo').type('12345');
    cy.get('#categoria').select('Eletrônicos');
    cy.get('#preco').type('10.00');
    cy.get('#quantidade').type('10');
    
    cy.get('button[type="submit"]').click();

    // Validação da mensagem de erro
    cy.get('#errorNome').should('contain', 'O nome deve ter entre 3 e 100 caracteres.');
  });

  it('Deve exibir erro se o código do produto for inválido', () => {
    // Tenta cadastrar um produto com código inválido
    cy.get('#nome').type('Produto Teste');
    cy.get('#codigo').type('1234'); // Código inválido (menos de 5 dígitos)
    cy.get('#categoria').select('Eletrônicos');
    cy.get('#preco').type('10.00');
    cy.get('#quantidade').type('10');
    
    cy.get('button[type="submit"]').click();

    // Validação da mensagem de erro
    cy.get('#errorCodigo').should('contain', 'O código deve ter entre 5 e 10 dígitos numéricos.');
  });

  it('Deve exibir erro se o preço for menor ou igual a 0', () => {
    // Tenta cadastrar um produto com preço inválido
    cy.get('#nome').type('Produto Teste');
    cy.get('#codigo').type('12345');
    cy.get('#categoria').select('Eletrônicos');
    cy.get('#preco').type('0'); // Preço inválido (menor ou igual a 0)
    cy.get('#quantidade').type('10');
    
    cy.get('button[type="submit"]').click();

    // Validação da mensagem de erro
    cy.get('#errorPreco').should('contain', 'O preço deve ser maior que 0.');
  });

  it('Deve exibir erro se a quantidade for inválida', () => {
    // Tenta cadastrar um produto com quantidade inválida
    cy.get('#nome').type('Produto Teste');
    cy.get('#codigo').type('12345');
    cy.get('#categoria').select('Eletrônicos');
    cy.get('#preco').type('10.00');
    cy.get('#quantidade').type('-1'); // Quantidade inválida (número negativo)
    
    cy.get('button[type="submit"]').click();

    // Validação da mensagem de erro
    cy.get('#errorQuantidade').should('contain', 'A quantidade deve ser um número inteiro maior ou igual a 0.');
  });

  it('Deve cadastrar um produto válido', () => {
    // Cadastra um produto válido
    cy.get('#nome').type('Produto Teste');
    cy.get('#codigo').type('12345');
    cy.get('#categoria').select('Eletrônicos');
    cy.get('#preco').type('10.00');
    cy.get('#quantidade').type('10');
    
    cy.get('button[type="submit"]').click();

    // Valida se o produto foi adicionado à lista
    cy.get('#listaProdutos')
      .should('contain', 'Produto Teste')
      .and('contain', 'Eletrônicos')
      .and('contain', 'R$10.00')
      .and('contain', 'Quantidade: 10');
  });

  it('Deve exibir erro se o código do produto já existir', () => {
    // Primeiro, cadastra um produto válido
    cy.get('#nome').type('Produto Teste');
    cy.get('#codigo').type('12345');
    cy.get('#categoria').select('Eletrônicos');
    cy.get('#preco').type('10.00');
    cy.get('#quantidade').type('10');
    
    cy.get('button[type="submit"]').click();

    // Tenta cadastrar um produto com o mesmo código
    cy.get('#nome').type('Outro Produto');
    cy.get('#codigo').type('12345'); // Código já existente
    cy.get('#categoria').select('Alimentos');
    cy.get('#preco').type('15.00');
    cy.get('#quantidade').type('5');
    
    cy.get('button[type="submit"]').click();

    // Valida se a mensagem de erro aparece
    cy.get('#errorCodigo').should('contain', 'O código do produto deve ser único.');
  });

});
