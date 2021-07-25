// Lista com os itens selecionados. Inicialmente não há nenhum
let selected_items = [null, null, null]


function add_selected_item(element_dish) {
    // Pega a seção de pratos e verifica qual classe é (comida, bebida ou sobremesa)
    // e coloca esse item na lista de itens selecionados, no seu devido lugar
    section_element = element_dish.parentNode.parentNode  // Pega a seção efetivamente
    if (section_element.classList.contains('food')) {
        
        selected_items[0] = null
        if (element_dish.classList.contains('selected-dish')) {
            
            selected_items[0] = element_dish
        }
    } else if (section_element.classList.contains('drink')) {
        
        selected_items[1] = null
        if (element_dish.classList.contains('selected-dish')) {
            
            selected_items[1] = element_dish
        }
    } else if (section_element.classList.contains('dessert')) {
        
        selected_items[2] = null
        if (element_dish.classList.contains('selected-dish')) {
            
            selected_items[2] = element_dish
        }
    }
    console.log(selected_items)
}

// Quero verificar se todos os itens foram selecionados, por isso farei uma função
// para fazer essa verificação toda vez que um item é selecionado/não selecionado
function is_all_selected() {
    for (let i = 0; i < 3; i++) {
        // Verifica se possui três itens selecionados
        if (selected_items[i] === null) {
            return false
        }
    }
    return true
}

// Faço as mudanças no botão para finalizar ordem
function activate_button() {
    button_element = document.querySelector('.finalize-order-button')
    is_ready = is_all_selected()
    
    // Muda aparência e texto botão se todas as classes estão selecionadas
    if (is_ready) {
        // Altera aparência e texto do botão
        button_element.classList.add('ready_to_finalize_order')
        button_element.innerHTML = 'Fechar pedido'
    } else {
        button_element.classList.remove('ready_to_finalize_order')
        button_element.innerHTML = 'Selecione os 3 itens<br/>para fechar o pedido'
    }
}

function select_dish(element_dish) {
    // Pegando parte dos pratos
    father_element = element_dish.parentNode

    // Buscando prato selecionado
    selected_dish_element = father_element.querySelector('.selected-dish')
    
    
    // Caso haja um prato previamente selecionado
    if (selected_dish_element !== null && selected_dish_element !== element_dish) {
        // Remove a seleção do prato
        selected_dish_element.classList.remove('selected-dish')
        // Escolhe o ion-icon de selecionado desse prato e desativa
        check_item_element_selected = selected_dish_element.querySelector('ion-icon')
        check_item_element_selected.classList.add('hidden-item')
    }
    
    // Ativa/desativa caixa de seleção
    element_dish.classList.toggle('selected-dish')
    // Pega o ion-icon desse prato e ativa
    check_item_element = element_dish.querySelector('ion-icon')
    check_item_element.classList.toggle('hidden-item')

    // Adiciona o item selecionado à lista de itens selecionados
    add_selected_item(element_dish)

    // Ativa/desativa botão para finalizar ordem
    activate_button()
}
