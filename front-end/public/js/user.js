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

function socialColorsEnter(btn) { // Função que coloca cor no ícone e texto da rede social
    const icon = btn.querySelector('i');
    const secondColor = icon.getAttribute('secondColor');
    const color = icon.getAttribute('color');
    const gradientKey = icon.getAttribute('data-gradient');

    icon.setAttribute('color', secondColor);
    icon.setAttribute('secondColor', color);

    if (gradientKey && gradients[gradientKey]) {
        icon.style.opacity = 0;
        icon.style.width = '0%';
        icon.nextElementSibling.style.opacity = 1;
        icon.nextElementSibling.style.width = '31.25px';
        icon.nextElementSibling.style.height = '25px';
        
    } else {
        icon.style.color = secondColor;
    }

    btn.querySelector('p').style.color = secondColor;
    btn.querySelector('p').style.textDecoration = 'underline';
}

function socialColorsOut(btn) { // Função que remove cor no ícone e texto da rede social
    const icon = btn.querySelector('i');
    const secondColor = icon.getAttribute('secondColor');
    const color = icon.getAttribute('color');
    const gradientKey = icon.getAttribute('data-gradient');
    icon.setAttribute('color', secondColor);
    icon.setAttribute('secondColor', color);
    if (gradientKey && gradients[gradientKey]) {
        icon.style.opacity = 1;
        icon.style.width = '';
        icon.nextElementSibling.style.opacity = 0;
        icon.nextElementSibling.style.width = '0%';
        icon.nextElementSibling.style.height = '0';  // ← linha adicionada
    } else {
        icon.style.color = secondColor;
    }
    btn.querySelector('p').style.color = secondColor;
    btn.querySelector('p').style.textDecoration = '';
}

function socialEvents() { // Função que adiciona os event listeners quando colocar ou tirar o mouse de cima da rede social
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

// =================================================
// 3️⃣ FUNÇÃO QUE RODA QUANDO A PÁGINA É CARREGADA
// =================================================

document.addEventListener('DOMContentLoaded', () => {
    reset(); // Chama a função de reset
    animation(); // Chama a função de animação

    socialEvents(); // Configura o event listener de rede social
})