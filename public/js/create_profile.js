function passStep(e) {
    const stepsSections = document.querySelectorAll('.steps');
    const inputs = stepsSections[0].querySelectorAll('input');
    const btn = e.target;
    let allValid = true;


    inputs.forEach(input => {
        if (input.value == "") {
            allValid = false;
            input.style.borderColor = '#ff4d4d8e';
            return;
        } else {
            input.style.borderColor = '';            
        }
    });
    
    if (allValid == true) {
        stepsSections[0].style.display = 'none';
        stepsSections[1].style.display = 'block';
    }
}

function selectColor() {
    const colors = document.querySelectorAll('.color');
    const colorInput = document.getElementById('colorInput')

    colors.forEach(color => {
        color.addEventListener('click', () => {
            colors.forEach(color => color.classList.remove('selected'));

            color.classList.add('selected');

            colorInput.value = color.id;
        });
    })
}

document.addEventListener('DOMContentLoaded', () => {
    selectColor();
})