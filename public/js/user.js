function animation() {
    const main = document.querySelector('main');
    const body = document.querySelector('body');

    body.style.overflow = 'hidden';
    main.style.opacity = '0';
    main.style.marginTop = '2000px';
    
    setTimeout(() => {
        main.style.transition = 'opacity 2s, margin-top 2s';
        main.style.opacity = '1';
        main.style.marginTop = '';
        
        setTimeout(() => {
            body.style.overflow = ''
        }, 2000)

    }, 400);
}

function socialColors() {
    const gradients = {
        // Extraído das camadas radiais do SVG oficial: amarelo → laranja → rosa → magenta → roxo
        instagram: 'linear-gradient(45deg, #ffcc00 0%, #fe4a05 25%, #ff005f 50%, #fc01d8 75%, #820bff 100%)',

        // Extraído do linearGradient do SVG oficial: navy escuro → azul claro (top → bottom)
        steam: 'linear-gradient(180deg, #111d2e 0%, #051839 21%, #0a1b48 41%, #132e62 58%, #144b7e 74%, #136497 87%, #1387b8 100%)',

        // SVG do TikTok é fill branco puro — gradiente derivado das cores de marca oficiais
        tiktok: 'linear-gradient(135deg, #69C9D0 0%, #ffffff 50%, #EE1D52 100%)'
    };

    const socialButtons = document.querySelectorAll('.socialMedia');
    socialButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
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
        });

        btn.addEventListener('mouseleave', () => {
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
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    animation();
    socialColors();
})