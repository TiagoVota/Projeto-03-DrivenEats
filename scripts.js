// Lista com os itens selecionados. Inicialmente não há nenhum
let selected_items = [null, null, null]


function add_selected_item(element_dish) {
    // Pega a seção de pratos e verifica qual classe é (comida, bebida ou sobremesa)
    // e coloca esse item na lista de itens selecionados, no seu devido lugar
    let section_element = element_dish.parentNode.parentNode  // Pega a seção efetivamente
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
    const button_element = document.querySelector('.finalize-order-button')
    let is_ready = is_all_selected()
    
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
    const father_element = element_dish.parentNode

    // Buscando prato selecionado
    const selected_dish_element = father_element.querySelector('.selected-dish')
    
    
    // Caso haja um prato previamente selecionado
    if (selected_dish_element !== null && selected_dish_element !== element_dish) {
        // Remove a seleção do prato
        selected_dish_element.classList.remove('selected-dish')
        // Escolhe o ion-icon de selecionado desse prato e desativa
        let check_item_element_selected = selected_dish_element.querySelector('ion-icon')
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

function currency_to_number(currency) {
    // Função que pega valor em moeda (R$) e retorna ele como numeral
    currency = currency.replace('R$ ', '')
    currency = currency.replace(',', '.')
    return Number(currency)
}

function number_to_currency(number) {
    // Função que pega valor numeral e retorna ele como uma string em R$
    return number.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
}

function make_order_message(name, address) {
    //  Fazer lista com as compras, cada elemento da lista é um prato assim:
    // [nome do prato, preço do prato]
    let orders = []
    let total_value = 0

    for (let i=0; i<3; i++) {
        // console.log(selected_item)
        let dish_name = selected_items[i].querySelector('.dish-title')
        let dish_price = selected_items[i].querySelector('.dish-price')

        orders.push([])
        orders[i].push(dish_name.innerText)
        orders[i].push(currency_to_number(dish_price.innerText))

        total_value += orders[i][1]
    }

    let text_order = `Olá, gostaria de fazer o pedido:
    - *Prato*: ${orders[0][0]}
    - *Bebida*: ${orders[1][0]}
    - *Sobremesa*: ${orders[2][0]}
    *Total*: ${number_to_currency(total_value)}

    *Nome*: ${name}
    *Endereço*: ${address}`
    
    return text_order
}

function link_to_whatsapp(restaurant_text_number, text_order) {
    const url_base = 'https://wa.me/'

    const text_url = encodeURIComponent(text_order)

    const final_url = url_base + restaurant_text_number + '?text=' + text_url
    
    return final_url
}

function send_message_whatsapp() {
    // Recolhendo os dados do cliente
    const name = prompt('Qual o seu nome?')
    const address = prompt('Qual o endereço de entrega?')

    // Função que cria a mensagem
    let text_order = make_order_message(name, address)

    // Função que cria o link
    let whatsapp_link = link_to_whatsapp('5547992312249', text_order)
    console.log(whatsapp_link)

    // Abre o WhatsApp em outra página
    window.open(whatsapp_link)
}
