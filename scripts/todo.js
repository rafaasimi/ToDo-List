// Referenciando os elementos da DOM
var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var buttonElement = document.querySelector('#app button');

// var todos = [
//     'Fazer café',
//     'Estudar JavaScript',
//     'Acessar comunidade da Rocketset' 
// ];

// Buca meus valores no localStorage e converte novamente de JSON -> Array
// Se não conseguir jogar um valor aceitavel (json->array) retorna um valor vazio
var todos = JSON.parse(localStorage.getItem('list_todos')) || [];

// Criando função para criar a 'Li' dentro da 'Ul' 
function renderTodos(){
    // Limpo minha lista para que não haja itens duplicados
    listElement.innerHTML = '';

    // For para percorrer Arrays e retornar seus valores
    for (todo of todos){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);
        
        var linkElement = document.createElement('a');
        // Adiciono um atributo href ao meu 'a'
        linkElement.setAttribute('href', '#');

        // Crio uma variavel para guardar a posição do item
        var pos = todos.indexOf(todo);
        // Add um atributo com o valor da posição ao item 'li'
        linkElement.setAttribute('onclick', 'deleteTodo('+ pos +')');

        var linkText = document.createTextNode('Excluir');

        // Adiciono o texto: "Excluir" dentro do elemento 'a'
        linkElement.appendChild(linkText);


        // Add texto dentro da 'Li' e a opção de excluir
        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        // Add 'Li' dentro da 'Ul'
        listElement.appendChild(todoElement);
    }
}

// Renderizo minha lista automaticamente
renderTodos();

// Função para adicionar tarefas
function addTodo(){
    // Recupero o valor do input
    var todoText = inputElement.value;

    // Adiciono no final do meu Array
    todos.push(todoText);

    // Limpo meu input
    inputElement.value = '';
    
    // Renderizo novamente minha lista
    renderTodos();

    saveToStorage();
}

// Adicionar tarefa somente depois de clicar no botão
buttonElement.onclick = addTodo;

function deleteTodo(pos){
    // Splice = Deleta 1 item de acordo com a posição passada
    todos.splice(pos, 1);
    renderTodos();

    saveToStorage();
}

function saveToStorage() {
    // Salva meu array no localstorage e converte para JSON (string)
    // LocalStorage não suporta salvar vetores/objetos
    localStorage.setItem('list_todos', JSON.stringify(todos));
}