//listar produtos
//criar produtos
//editar produto
//alterar status
//deletar
//filtrar por categoria
//filtrar por pesquisa(ingrediente)
//modal com dropdown de classe + dados do produto

// O que é IGUAL ao Categories:
// useEffect para buscar a lista ao entrar na tela.
// handleOpenCreate para abrir modal em branco.
// handleOpenEdit(prod) para abrir modal preenchido com o produto.
// handleDelete(id) para excluir.
// handleToggleActive(id) para ativar/desativar o produto.
// handleSubmit que decide se é edit ou create.
// O mesmo componente <Modal> reaproveitado.
// O que tem de NOVO em relação ao Categories:
// Campos do formulário no Modal:

// Em vez de só name, o produto tem: name, price, description e um <select> (dropdown) para escolher a Categoria.
// Por causa do dropdown, Products.jsx também vai buscar a lista de categorias no useEffect para preencher as opções (<option>).
// A Barra de Filtros no topo da lista:

// Um campo de pesquisa simples (input de texto) para filtrar pelo nome ou ingrediente/descrição.
// Botões ou um select com as Categorias (ex: Todos, Lanches, Bebidas).
// Leitura da navegação vinda de Categories:

// Se o usuário clicou em "Adicionar Produtos" lá na tela de categorias, o Products.jsx já abre o modal com aquela categoria selecionada.
