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

const socialColors = {
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

async function clickUpdater() {
    const at = document.querySelector('.userAt').textContent;

    await fetch(`http://localhost:3000/user/${at}/clicks`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
    });

    updateInfo();
}

async function updateInfo() {
    const ctr = document.getElementById('ctr');
    const clicks = document.getElementById('clicks');

    const at = document.querySelector('.userAt').textContent;

    const response = await fetch(`http://localhost:3000/user/${at}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    });

    const data = await response.json();

    clicks.textContent = data.clicks;
    ctr.textContent = ((data.clicks / data.views) * 100).toFixed(1) +  '%'
}

function clickEvents() {
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

// =================================================
// 3️⃣ FUNÇÃO QUE RODA QUANDO A PÁGINA É CARREGADA
// =================================================

document.addEventListener('DOMContentLoaded', () => {
    reset(); // Chama a função de reset
    animation(); // Chama a função de animação

    socialEvents(); // Configura o event listener de rede social
    clickEvents();
})