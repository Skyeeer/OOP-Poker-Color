document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('colorBtn').addEventListener('click', applyColor);
})
function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

Color.prototype.rgb = () => {
    return `rgb(${this.r},${this.g},${this.b})`;
}

Color.prototype.hex = function () {
    const toHex = c => ('0' + parseInt(c).toString(16)).slice(-2);
    return `#${toHex(this.r)}${toHex(this.g)}${toHex(this.b)}`;
}

Color.prototype.rgba = (alpha) => {
    return `rgba(${this.r},${this.g},${this.b},${alpha})`;
}

function applyColor() {
    const input = document.getElementById('colorInput').value.trim();
    let color;
    try {
        if (input.startsWith('#') || input.startsWith('rgb') || input.startsWith('rgba')) {
            document.body.style.backgroundColor = input;
        } else {
            const [r, g, b] = input.split(',').map(num => parseInt(num, 10));
            color = new Color(r, g, b);
            document.body.style.backgroundColor = color.rgb();
        }
    } catch {
        console.error('Lägg till en äkta färg', error);
    }
}