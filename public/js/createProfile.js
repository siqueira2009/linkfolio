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

    const inputs = document.querySelectorAll('input');
    const fowardBtn = document.getElementById('foward');
    const backBtn = document.getElementById('back');
    const addButton = document.getElementById('addLink');
    
    inputs.forEach(input => {
        input.value = "";
    });

    fowardBtn.setAttribute('disabled', 'true')
    backBtn.setAttribute('disabled', 'true')
    addButton.setAttribute('disabled', 'true');
}

// =================================================
// 1️⃣ FUNÇÕES DE LÓGICA
// =================================================

class Link { // Classe de LINK
    constructor(id, name, url, emoji, bio) {
        this.id = id,
        this.name = name,
        this.url = url,
        this.emoji = emoji,
        this.bio = bio
    }
}

const stepsTitles = { // Objeto que guarda os títulos de cada etapa
    "step0": "Escolha sua personalização",
    "step1": "Onde podemos te encontrar?",
    "step2": "Algo interessante sobre você?"
}

let socials = { // Objeto que guarda o @ de cada rede social (null para vazio)
    'instagram': null,
    'linkedin': null,
    'x/twitter': null,
    'github': null,
    'youtube': null,
    'discord': null,
    'steam': null,
    'facebook': null,
    'tiktok': null
}

let customLinksArray = [] // Array com os links

let currentStep = 0; // Variável que guarda a etapa atual
let selectedEmoji = false; // Variável que guarda se o emoji foi selecioado
let totalCustomLinks = 0; // Variável que guarda a quantidade de links costumizados

function stepControl(e) { // Função que administra o controle de etapas
    const id = e.target.id;

    const stepsSections = document.querySelectorAll('.steps');
    const lastStep = stepsSections.length - 1;
    const inputs = stepsSections[0].querySelectorAll('input');
    const title = document.getElementById('formTitle')
    const backButton = document.getElementById('back');
    const fowardButton = document.getElementById('foward');
    let allValid = true;

    if (id == "back") {
        stepsSections[currentStep].style.display = 'none';
        stepsSections[currentStep - 1].style.display = '';

        title.textContent = stepsTitles["step" + (currentStep - 1)]

        currentStep--;
    } else if (id == "foward") {

        if (currentStep == lastStep) {
            document.querySelector('form').submit();
            return;
        }

        inputs.forEach(input => {
            if (input.value == "" && input.closest('.inputGroup').classList.contains('requireDeletion') == false) {
                allValid = false;
                input.style.borderColor = '#ff4d4d8e';
                return;
            } else {
                input.style.borderColor = '';            
            }
        });
        
        if (allValid == true) {
            title.textContent = stepsTitles["step" + (currentStep + 1)]
            stepsSections[currentStep].style.display = 'none';
            stepsSections[currentStep + 1].style.display = '';

            currentStep++;
        }   
    }

    if (currentStep == 0) {
        backButton.setAttribute('disabled', 'true');
    } else {
        backButton.removeAttribute('disabled');
    }

    if (currentStep == lastStep) {
        fowardButton.textContent = 'Finalizar';
    } else {
        fowardButton.textContent = 'Avançar';
    }

}

function verifyFields() { // Função que verifica os campos (se estão vazios/válidos)
    const fowardButton = document.getElementById('foward');
    const addButton = document.getElementById('addLink');

    if (currentStep == 0) {
        const step1Inputs = document.querySelectorAll('#step1 .inputGroup input.required')
        let allowPass = true;
    
        for (let i = 0; i < step1Inputs.length; i++) {
            if (step1Inputs[i].value == "" || step1Inputs[i].classList.contains('atExistente')) {
                allowPass = false;
                break;
            } else {
                allowPass = true;
            }    
        }

        if (allowPass == true) {
            fowardButton.removeAttribute('disabled');
        } else {
            fowardButton.setAttribute('disabled', 'true');
        }
    } else if (currentStep == 2) {
        const step3Inputs = document.querySelectorAll('dialog input.required')
    
        step3Inputs.forEach(stepInput => {
            if (stepInput.value == "") {
                allowPass = false;
                return;
            } else {
                allowPass = true;
            }
        });

        if (allowPass == true) {
            if (selectedEmoji ==  true) {
                
                addButton.removeAttribute('disabled');
                selectedEmoji = false;
            } else {
                addButton.setAttribute('disabled', 'true');
            }
        }
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

function social(inputContainer, currentFiel) { // Função que administra as redes sociais (coloca/remove do objeto)
    const socialInputs = document.querySelectorAll('.inputSocial');
  
    const social = inputContainer.querySelector('label').textContent.toLowerCase();
        
    socials[social] = currentFiel.value;

    if (socials[social] == "") {
        socials[social] = null
    }
}
 
function closeModal() { // Função que fecha o modal de adicionar link personalizado
    const addButton = document.getElementById('addLink');
    const dialog = document.querySelector('dialog');

    const name = dialog.querySelector('#linkName');
    const url = dialog.querySelector('#linkUrl');
    const emoji = dialog.querySelector('#linkEmoji');

    const form = document.querySelector('form');

    form.style.filter = 'blur(0px)';
    
    name.value = "";
    url.value = "";
    emoji.value = "";
    name.style.borderColor = '';
    url.style.borderColor = '';
    emoji.style.borderColor = '';
    
    dialog.style.marginTop = '1000px';

    setTimeout(() => {
        dialog.setAttribute('open', 'false');
        dialog.style.marginTop = '';
    }, 400)

    selectedEmoji = false;
    addButton.setAttribute('disabled', 'true')
}

function openModal() { // Função que abre o modal de adicionar link personalizado
    const form = document.querySelector('form');

    form.style.filter = 'blur(2px)';

    const dialog = document.querySelector('dialog');
    dialog.setAttribute('open', 'true');
    dialog.style.marginTop = '1000px';
    
    setTimeout(() => {
        dialog.style.marginTop = '0px'
    }, 200)
}

function showEmptyLinksMessage() { // Função que verifica se é necessário mostrar que não há links personzalizados ainda
    const nenhumLinksTexts = document.querySelectorAll('.nenhumLinkTexts')    
    
    if (totalCustomLinks > 0) {
        nenhumLinksTexts.forEach(text => text.style.display = 'none')
    } else {
        nenhumLinksTexts.forEach(text => text.style.display = 'block')
    }
}

function addLink() { // Função para adicionar links
    const addButton = document.getElementById("addLink");
    const dialog = document.querySelector('dialog');
    const customLinks = document.getElementById('customLinks');
    const customLinksInput = document.getElementById('customLinksInput')

    let name = dialog.querySelector('#linkName')
    let url = dialog.querySelector('#linkUrl')
    let emoji = dialog.querySelector('#linkEmoji')
    let bio = dialog.querySelector('#linkBio')

    
    if (name.value != "" && url.value != "" && emoji.value != "") {
        const newId = 'id-' + Date.now() + '-' + Math.random().toString(16).slice(2);

        const newLinks = new Link(newId, name.value, url.value, emoji.value, bio.value);
        customLinksArray.push(newLinks)
        let templateLink = document.getElementById('customLinkTemplate');
        let customLink = templateLink.cloneNode(true);
        customLink.dataset.id = newId;
        customLink.style.display = ''

        let linkName = customLink.querySelector('label')
        let linkUrl = customLink.querySelector('input')
        let linkEmoji = customLink.querySelector('span')

        linkName.textContent = name.value;
        linkUrl.value = url.value;
        linkEmoji.textContent = emoji.value;

        customLinks.appendChild(customLink);

        name.value = ""
        url.value = ""
        bio.value = ""
        emoji.value = ""
        name.style.borderColor = '';
        url.style.borderColor = '';
        emoji.style.borderColor = '';
        bio.style.borderColor = '';
        selectedEmoji = false;

        addButton.setAttribute('disabled', 'true')
        removeLinksEvent(customLink);
        closeModal();
        totalCustomLinks++;

        showEmptyLinksMessage();

        customLinksInput.value = JSON.stringify(customLinksArray);
    }
}

function removeLink(event) { // Função para remover links
    const father = event.target.closest('.inputGroup');
    const id = father.dataset.id;

    const linkIndex = customLinksArray.findIndex(l => l.id == id);

    if (linkIndex == -1) {
        console.error('Link não encontrado');
        return;
    }
    
    customLinksArray.splice(linkIndex, 1);
    document.getElementById('customLinksInput').value = JSON.stringify(customLinksArray);

    father.remove();
    totalCustomLinks--;
    showEmptyLinksMessage();
}

async function verifyAt() { // Função que verifica se o arroba digitado já existe
    const atInput = document.getElementById('atInput');
    const at = atInput.value;

    const user = await fetch(`${window.BACKEND_URL}/user/${at}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (user.ok == true) {
        atInput.classList.add('atExistente')
        atInput.style.borderColor = "#FF4D4D";
        alert("Esse @ já existe! Tente outro.")
        verifyFields();
        return;
    } else {
        atInput.classList.remove('atExistente')
        atInput.style.borderColor = "";
        verifyFields();
        return;
    }
}

// =================================================
// 2️⃣ FUNÇÕES QUE CRIAM OS OUVINTES DE EVENTO
// =================================================

function stepsEvents() { // Adiciona os event listeners nos botões de passar e voltar etapas
    const stepsButton = document.querySelectorAll('.stepsButton');

    stepsButton.forEach(btn => {
        btn.addEventListener('click', stepControl);
    })
}

function inputEvents() { // Adiciona os event listeners nos inputs
    const inputs = document.querySelectorAll('input');

    inputs.forEach(input => {
        input.addEventListener('keyup', verifyFields)
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

function socialsEvents() { // Adiciona os event listeners nos inputs de redes sociais
    const socialInputs = document.querySelectorAll('.inputSocial');

    socialInputs.forEach(inputContainer => {
        const inputField = inputContainer.querySelector('input');
        
        inputField.addEventListener('keyup', () => {
            social(inputContainer, inputField);
        });

    });
}

function closeEvent() { // Adiciona os event listeners no botão de fechar modal
    const closeButton = document.getElementById("cancelLink");

    closeButton.addEventListener('click', closeModal);
}

function openEvent() { // Adiciona os event listeners no botão de abrir modal
    const addButton = document.getElementById("openModal");

    addButton.addEventListener('click', openModal)
}

function addLinksEvent() { // Adiciona os event listeners no botão de adicionar link (dentro do modal)
    const addButton = document.getElementById("addLink");
    
    addButton.addEventListener('click', addLink)
}

function removeLinksEvent(targetLink) { // Adiciona os event listeners nos botões de remover links personalizados (depois de criar)
    const removeBtn = targetLink.querySelector('.removeIcon .iconContent')

    removeBtn.addEventListener('click', removeLink);
}

function emojiPickerEvent() { // Adiciona os event listeners no seletor de emojis
    const emojiInput = document.getElementById('linkEmoji');
    const emojiPicker = document.querySelector('emoji-picker')

    emojiPicker.addEventListener('emoji-click', event => {
        emojiInput.value = event.detail.unicode
        selectedEmoji = true;
        verifyFields();
    });
}

function atEvent() { // Adiciona evento no input de arroba, para verificar se o digitado já existe
    const atInput = document.getElementById('atInput');

    atInput.addEventListener('keyup', verifyAt);
}

// Função que junta todos as funções de event listeners
function allEvents() { // Chama todas elas aqui dentro (menos a de remover link, que é chamada sempre que um novo link é criado)
    stepsEvents();
    inputEvents();
    colorsEvents();
    socialsEvents();
    closeEvent();
    openEvent();
    addLinksEvent();
    emojiPickerEvent();
    atEvent();
}

// =================================================
// 3️⃣ FUNÇÃO QUE RODA QUANDO A PÁGINA É CARREGADA
// =================================================

document.addEventListener('DOMContentLoaded', () => {
    reset(); // Chama a função de reset
    animation(); // Chama a função de animação
    
    allEvents(); // Configura todos os event listeners

    const defaultColor = document.querySelector('.color.selected');
    if (defaultColor) {
        document.getElementById('colorInput').value = defaultColor.id;
    }
})