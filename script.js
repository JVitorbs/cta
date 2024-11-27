let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function addContact() {
    // Captura os valores dos campos de entrada
    const name = document.getElementById("contactInput").value;
    const cellphone = document.getElementById("cellphoneInput").value;
    const relationship = document.getElementById("relationshipInput").value;

    // Verifica se todos os campos foram preenchidos
    if (name && cellphone && relationship) {
        // Cria um novo objeto de contato
        const contact = {
            name,
            cellphone,
            relationship
        };

        // Adiciona o contato à lista de contatos
        contacts.push(contact);

        // Salva os contatos no localStorage
        localStorage.setItem("contacts", JSON.stringify(contacts));

        // Limpa os campos de entrada
        document.getElementById("contactInput").value = "";
        document.getElementById("cellphoneInput").value = "";
        document.getElementById("relationshipInput").value = "";

        // Atualiza a lista de contatos na tela
        displayContacts();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

function deleteContact(index) {
    // Pergunta ao usuário se tem certeza de que deseja excluir
    const confirmDelete = confirm("Tem certeza que deseja excluir este contato?");
    if (confirmDelete) {
        // Remove o contato da lista
        contacts.splice(index, 1);

        // Atualiza o localStorage com a lista de contatos atualizada
        localStorage.setItem("contacts", JSON.stringify(contacts));

        // Atualiza a lista na tela
        displayContacts();
    }
}

function displayContacts() {
    // Obtém o elemento da lista de contatos
    const contactList = document.getElementById("contactList");

    // Limpa a lista atual
    contactList.innerHTML = "";

    // Adiciona os contatos à lista
    contacts.forEach((contact, index) => {
        const li = document.createElement("li");

        // Cria o conteúdo do item de contato
        li.innerHTML = `
            <span><strong>${contact.name}</strong> - ${contact.cellphone} (${contact.relationship})</span>
            <button class="delete-button" onclick="deleteContact(${index})">X</button>
        `;

        // Adiciona o item à lista
        contactList.appendChild(li);
    });
}

// Carregar os contatos assim que a página for carregada
window.onload = function() {
    displayContacts();
}

// Envia alerta para contatos de emergência
function sendAlert() {
    if (contacts.length > 0) {
        contacts.forEach(contact => {
            console.log(`Enviando alerta para: ${contact}`);
        });
    } else {
        alert("Nenhum contato configurado. Adicione contatos de emergência.");
    }
}

// Função para o botão SOS
function triggerSOS() {
    alert("Botão SOS ativado! Enviando alerta para contatos de emergência.");
    sendAlert();
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', function () {
    if (document.getElementById('contactList')) {
        displayContacts();
    }
});


// Função para abrir e fechar a barra lateral
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('open');
}