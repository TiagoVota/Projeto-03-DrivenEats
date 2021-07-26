// Lista com os itens selecionados. Inicialmente não há nenhum
let selected_items = [null, null, null]
// Lista com os pedidos realizados
let orders = [[null, null], [null, null], [null, null]]
// Valor total da ordem de compra
let total_value = 0


function add_selected_item(element_dish) {
    // Pega a seção de pratos e verifica qual classe é (comida, bebida ou sobremesa)
    // e coloca esse item na lista de itens selecionados, no seu devido lugar
    const section_element = element_dish.parentNode.parentNode  // Pega a seção efetivamente
    // Em cada seção a função primeiro pré-estabelece que não nenhum item selecionado para nossa lista
    // após isso, procura por um item selecionado na seção
    if (section_element.classList.contains('food')) {
        // Comida
        selected_items[0] = null
        if (element_dish.classList.contains('selected-dish')) {
            selected_items[0] = element_dish
        }
        
    } else if (section_element.classList.contains('drink')) {
        // Bebida
        selected_items[1] = null
        if (element_dish.classList.contains('selected-dish')) {
            selected_items[1] = element_dish
        }

    } else if (section_element.classList.contains('dessert')) {
        // Sobremesa
        selected_items[2] = null
        if (element_dish.classList.contains('selected-dish')) {
            selected_items[2] = element_dish
        }
    }
}


// Verifica se todos os itens estão selecionados, retorna um booleano
function is_all_selected() {
    // Verifica se todos os três itens estão selecionados
    for (let i = 0; i < 3; i++) {
        if (selected_items[i] === null) {
            return false
        }
    }
    return true
}


// Faço as mudanças no botão caso possa finalizar ordem
function activate_button() {
    const button_element = document.querySelector('.ready-to-finalize-button')
    
    // Muda aparência e texto botão se todas as classes estão selecionadas
    if (is_all_selected()) {
        // Altera aparência e texto do botão para pronto
        button_element.classList.add('ready_to_finalize_order')
        button_element.innerHTML = 'Fechar pedido'
    } else {
        // Altera aparência e texto do botão para não pronto ainda
        button_element.classList.remove('ready_to_finalize_order')
        button_element.innerHTML = 'Selecione os 3 itens<br/>para fechar o pedido'
    }
}


function select_dish(element_dish) {
    // Pegando parte dos pratos (".dishes")
    const father_element = element_dish.parentNode

    // Buscando prato selecionado
    const selected_dish_element = father_element.querySelector('.selected-dish')
    
    
    // Caso haja um prato previamente selecionado
    if (selected_dish_element !== null && selected_dish_element !== element_dish) {
        // Remove a seleção do prato
        selected_dish_element.classList.remove('selected-dish')
        // Escolhe o ion-icon de selecionado desse prato e desativa
        let check_item_element_selected = selected_dish_element.querySelector('ion-icon')
        check_item_element_selected.classList.add('hidden')
    }
    
    // Ativa/desativa caixa de seleção
    element_dish.classList.toggle('selected-dish')
    // Pega o ion-icon desse prato e ativa
    let check_item_element = element_dish.querySelector('ion-icon')
    check_item_element.classList.toggle('hidden')

    // Adiciona o item selecionado à lista de itens selecionados
    add_selected_item(element_dish)

    // Ativa/desativa botão para finalizar ordem
    activate_button()
}


function make_order_list() {
    //  Fazer lista com as compras, cada elemento da lista é um prato assim:
    // [nome do prato, preço do prato]
    total_value = 0  // Por segurança, reinicia o valor total do pedido
    for (let i=0; i<3; i++) {
        let dish_name = selected_items[i].querySelector('.dish-title')
        let dish_price = selected_items[i].querySelector('.dish-price')

        orders[i][0] = dish_name.innerText
        orders[i][1] = dish_price.innerText

        total_value += currency_to_number(orders[i][1])
    }
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


function change_innerHTML(element, class_name, new_value) {
    return element.querySelector(class_name).innerHTML = new_value
}


function update_order_screen(element=document) {
    // Atualiza as ordens finais do cliente
    make_order_list()

    // Vamos atualizar manualmente para não abusar muita dos recursos que não aprendemos
    change_innerHTML(element, '.detail-food-title', orders[0][0])
    change_innerHTML(element, '.detail-food-price', orders[0][1].replace('R$ ', ''))
    change_innerHTML(element, '.detail-drink-title', orders[1][0])
    change_innerHTML(element, '.detail-drink-price', orders[1][1].replace('R$ ', ''))
    change_innerHTML(element, '.detail-dessert-title', orders[2][0])
    change_innerHTML(element, '.detail-dessert-price', orders[2][1].replace('R$ ', ''))
    change_innerHTML(element, '.detail-total-price', number_to_currency(total_value))
}


function change_visibility_final_screen() {
    // Aparece ou remove a tela final
    const finalize_order_screen = document.querySelector('.finalize-order-screen')
    finalize_order_screen.classList.toggle('hidden')
}


function send_to_final_screen() {
    // Verifica se todos os pedidos foram escolhidos antes de ir para próxima tela
    if (!is_all_selected()) {
        return {}
    }

    // Atualiza os detalhes da ordem de compra com o pedido
    update_order_screen()

    change_visibility_final_screen()
}


function make_order_message(name, address) {
    // Verificação se o nome ou o endereço não foram preenchidos
    if (name === null || name === '') {
        name = 'Um fora da lei >.<'
    }
    if (address === null || address === '') {
        address = 'Um lugar fantasma u.u'
    }

    // Faz a mensagem
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
    // Gerar link para abrir o whatsapp com a mensagem pronta
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

    // Abre o WhatsApp em outra página
    window.open(whatsapp_link)
}
