// =================================================
// 0️⃣ FUNÇÕES DE INTERFACE E RESET
// =================================================

function animation() { // Função que anima o carregamento da página
    const main = document.querySelector('main');
    const body = document.querySelector('body');

    body.style.overflow = 'hidden';
    main.style.opacity = '0';
    main.style.marginTop = '2000px';
    
    setTimeout(() => {
        main.style.transition = 'all 2s';
        main.style.opacity = '1';
        main.style.marginTop = '';
        
        setTimeout(() => {
            body.style.overflow = ''
        }, 2000)

    }, 400);
}

function reset() { // Função que reseta a página (inputs etc.)
    lucide.createIcons();
}

// =================================================
// 1️⃣ FUNÇÕES DE LÓGICA
// =================================================

const socialColors = { // Objeto que guarda as cores das redes sociais
  "LinkedIn": "#0A66C2",
  "Instagram": "#DD2A7B",
  "X/Twitter": "#1DA1F2",
  "GitHub": "#0FBF3E",
  "YouTube": "red",
  "Discord": "#5865F2",
  "Steam": "#1387b8",
  "Facebook": "#0866ff",
  "TikTok": "#EE1D52"
};

let pickedEmoji = false; // Variável que guarda se já escolheu emoji no modal de edição
let customLinksArray = JSON.parse(document.getElementById('customLinksInput').value); // Array com os links existentes

function socialColorsEnter(btn) { // Função que coloca cor no ícone e texto da rede social
    const icon = btn.querySelector('i');
    const p = btn.querySelector('p');
    const secondColor = icon.getAttribute('secondColor');
    const color = icon.getAttribute('color');

    icon.style.color = socialColors[p.textContent];

    p.style.color = socialColors[p.textContent];
    p.style.textDecoration = 'underline';
}

function socialColorsOut(btn) { // Função que remove cor no ícone e texto da rede social
    const icon = btn.querySelector('i');
    const p = btn.querySelector('p');
    const secondColor = icon.getAttribute('secondColor');
    const color = icon.getAttribute('color');

    icon.style.color = 'white';

    p.style.color = 'white';
    p.style.textDecoration = '';
}

async function clickUpdater() { // Função que atualiza os cliques - fetch na API
    const at = document.querySelector('.userAt').textContent.replace('@', '');
    
    try {
        const response = await fetch(`http://localhost:3000/user/${at}/clicks`, {
            method: "PUT"
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        updateInfo();
    } catch (error) {
        console.error('Falha ao atualizar clicks:', error);
    }
}

async function updateInfo() { // Função que atualiza as informações (Cliques e CTR) - fetch na API
    const ctr = document.getElementById('ctr');
    const clicks = document.getElementById('clicks');
    const views = document.getElementById('views');

    const at = document.querySelector('.userAt').textContent.replace('@', '');
    try {
        const response = await fetch(`http://localhost:3000/user/${at}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        });
    
        const data = await response.json();
    
        const ctrValue = (data.clicks / data.views) * 100;
        const limitedCtr = Math.min(ctrValue, 100).toFixed(0);
        clicks.textContent = data.clicks;
        views.textContent = data.views;
        ctr.textContent = limitedCtr + '%'
    } catch (error) {
        console.error('Falha ao atualizar clicks, visualizações e CTR:', error);
    }
}

function closeModal() { // Função que fecha o modal de adicionar link personalizado
    const addButton = document.getElementById('addLink');
    const dialog = document.querySelector('dialog');

    const sections = document.querySelectorAll('section');

    sections.forEach(section => section.style.filter = 'blur(0px)');
    
    dialog.style.marginTop = '1000px';

    setTimeout(() => {
        dialog.setAttribute('open', 'false');
        dialog.style.marginTop = '';
    }, 400)

    addButton.setAttribute('disabled', 'true')
}

function removeLink(event) { // Função que remove links na parte de edição
    const target = event.target;
    const parent = target.closest('.editLink');
    const name = parent.querySelector('.title');

    const linkIndex = customLinksArray.findIndex(l => l.name == name);

    customLinksArray.splice(linkIndex, 1);
    const customLinksInput = document.getElementById('customLinksInput');
    customLinksInput.value = JSON.stringify(customLinksArray)

    parent.remove();
}

function addLink(name, url, emoji, bio) { // Função que adiciona links na parte de edição
    const newLink = {
        "name": name,
        "url": url,
        "emoji": emoji,
        "bio": bio
    }


    const linksParent = document.getElementById('editLinks');
    const newLinkElement = document.createElement('a');
    newLinkElement.classList.add('link')
    newLinkElement.classList.add('editLink')
    newLinkElement.innerHTML = 
    `
        <div class="linkIcon bgModified">${emoji}</div>
        <div class="linkText">
            <h2 class="title">${name}</h2>
            <p class="subtitle">${bio}<p>
        </div>
        <svg class="removeLinkIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" aria-hidden="true" class="lucide lucide-x removeLink"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
    `
    editLinks.appendChild(newLinkElement);
    removeLinksEvent(newLinkElement);

    customLinksArray.push(newLink);
    const customLinksInput = document.getElementById('customLinksInput');
    customLinksInput.value = JSON.stringify(customLinksArray)
}

function verifyFieldsLinks() { // Função que verifica os inputs de links
    const inputs = document.querySelectorAll('#addLinks input.required');
    let allValid = false;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            allValid = false;
            break;
        } else {
            allValid = true;
        }
    }

    const addBtn = document.getElementById('addLink');

    if (allValid == true && pickedEmoji == true) {
        addBtn.removeAttribute('disabled');
    } else {
        addBtn.setAttribute('disabled', 'true');
    }
}

async function verifyPassword() { // Função que pede a senha na hora de editar perfil
    function openModal() { // Função que abre o modal de adicionar link personalizado
        const sections = document.querySelectorAll('section');

        sections.forEach(section => section.style.filter = 'blur(2px)');

        const dialog = document.querySelector('dialog');
        dialog.setAttribute('open', 'true');
        dialog.style.marginTop = '1000px';
        
        setTimeout(() => {
            dialog.style.marginTop = '0px'
        }, 200)
    }

    const password = prompt("Digite sua senha");
    const at = document.querySelector('.userAt').textContent.replace('@', '');

    if (!password) {
        return;
    }

    const response = await fetch(`http://localhost:3000/auth/password/${at}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: password })
    });

    const result = await response.json();

    if (result.resultado) {
        openModal();
    } else {
        alert("Senha incorreta")
    }
}

function selectColor(currentColor) { // Função que administra a seleção de cores (e coloca no input)
    const colors = document.querySelectorAll('.color');
    const colorInput = document.getElementById('colorInput')

    colors.forEach(color => color.classList.remove('selected'));

    currentColor.classList.add('selected');

    colorInput.value = currentColor.id;

    colorInput.dispatchEvent(new Event("change"))
}

function updateColor() { // Função que atualiza a cor no modal de edição
    const colorInput = document.getElementById("colorInput");
    const currentColor = colorInput.value;
    const color = document.getElementById(currentColor)
    selectColor(color);
}

// =================================================
// 2️⃣ FUNÇÕES QUE CRIAM OS OUVINTES DE EVENTO
// =================================================

function closeEvent() { // Adiciona os event listeners no botão de fechar modal
    const closeButton = document.getElementById("cancelEdit");

    closeButton.addEventListener('click', closeModal);
}

function editEvent() { // Adiciona os event listeners no botão de abrir modal
    const editButton = document.getElementById("editProfile");

    editButton.addEventListener('click', () => {
        verifyPassword();
    })
}

function clickEvents() { // Adiciona os eventos ao clicar em algum link (a), para atualiza o campo de cliques
    const a = document.querySelectorAll('a');

    a.forEach(a => {
        a.addEventListener('click', clickUpdater);
        a.addEventListener('mousedown', (event) => {
            if (event.button == 1) {
                clickUpdater();
            }
        })
    });
}

function socialEvents() { // Adiciona o eventos de quando colocar ou tirar o mouse de cima da rede social
    const socialButtons = document.querySelectorAll('.socialMedia');

    socialButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            socialColorsEnter(btn)
        });

        btn.addEventListener('mouseleave', () => {
            socialColorsOut(btn)
        });
    })
}

function removeLinksEvent(targetLink) { // Adiciona os event listeners nos botões de remover links personalizados (depois de criar)
    const removeBtn = targetLink.querySelector('.removeLinkIcon')

    removeBtn.addEventListener('click', removeLink);
}

function removeLinkEvent() { // Adiciona evento para remover link na aba de edição
    const removeIcons = document.querySelectorAll('.removeLink');

    removeIcons.forEach(removeIcon => {
        removeIcon.addEventListener('click', (event) => {
            removeLink(event);
        })
    });
}

function addLinkEvent() { // Adiciona evento para adicionar link na aba de edição
    const addLinkBtn = document.getElementById('addLink');

    const name = document.getElementById('linkName');
    const url = document.getElementById('linkUrl');
    const bio = document.getElementById('linkBio');
    const emoji = document.getElementById('linkEmoji');

    addLinkBtn.addEventListener('click', () => {
        addLink(name.value, url.value, emoji.value, bio.value);
    })
}

function emojiPickerEvent() { // Adiciona os event listeners no seletor de emojis
    const emojiInput = document.getElementById('linkEmoji');
    const emojiPicker = document.querySelector('emoji-picker')

    emojiPicker.addEventListener('emoji-click', event => {
        emojiInput.value = event.detail.unicode
        pickedEmoji = true;
        verifyFieldsLinks();
    });
}

function verifyInputsEvent() { // Adiciona evento para verificar os valores de inputs
    const inputs = document.querySelectorAll('#addLinks input');

    inputs.forEach(input => {
        input.addEventListener('keyup', () => {
            verifyFieldsLinks();
        })
    })
}

function submitEvent() { // Adiciona evento para enviar o formulário de edição de perfil
    const saveBtn = document.getElementById('saveEdit');

    saveBtn.addEventListener('click', () => {
        document.querySelector('form').submit();
    })
}

function colorsEvents() { // Adiciona os event listeners nas cores
    const colors = document.querySelectorAll('.color');

    colors.forEach(color => {
        color.addEventListener('click', () => {
            selectColor(color);
        })
    })
}

// Função que junta todos as funções de event listeners
function allEvents() { // Chama todas elas aqui dentro (menos a de remover link, que é chamada sempre que um novo link é criado)
    socialEvents();
    clickEvents();
    editEvent();
    closeEvent();
    removeLinkEvent();
    addLinkEvent();
    emojiPickerEvent();
    verifyInputsEvent();
    submitEvent();
    colorsEvents();
    updateColor();
}


// =================================================
// 3️⃣ FUNÇÃO QUE RODA QUANDO A PÁGINA É CARREGADA
// =================================================

document.addEventListener('DOMContentLoaded', () => {
    reset(); // Chama a função de reset
    animation(); // Chama a função de animação

    allEvents();
})