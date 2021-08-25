const chalk = require('chalk');

const COLORS = {
    black: [ 0, 0, 0 ],
    dark_blue: [ 0, 0, 170 ],
    dark_green: [ 0, 170, 0 ],
    dark_aqua: [ 0, 170, 170 ],
    dark_red: [ 170, 0, 0 ],
    dark_purple: [ 170, 0, 170 ],
    gold: [ 255, 170, 0 ],
    gray: [ 170, 170, 170 ],
    dark_gray: [ 85, 85, 85 ],
    blue: [ 85, 85, 255 ],
    green: [ 85, 255, 85 ],
    aqua: [ 85, 255, 255 ],
    red: [ 255, 85, 85 ],
    light_purple: [ 255, 85, 255 ],
    yellow: [ 255, 255, 85 ],
    white: [ 255, 255, 255 ]
};

class Component {

    constructor(json = {}) {
        this.bold = json.bold || false;
        this.italic = json.italic || false;
        this.underlined = json.underlined || false;
        this.strikethrough = json.strikethrough || false;
        this.obfuscated = json.obfuscated || false;
        this.color = json.color || null;
        this.insertion = json.insertion || null;
        this.clickEvent = json.clickEvent || null;
        this.hoverEvent = json.hoverEvent || null;
        // "extra" added from parser
        this.extra = null;
    }

    toJson() {
        const keys = [ 'bold', 'italic', 'underlined', 'strikethrough', 'obfuscated', 'color', 'insertion', 'clickEvent', 'hoverEvent', 'extra' ];
        const output = {};
        for (const index in keys) {
            const key = keys[index];
            if (this[key]) output[key] = this[key];
        }
        return output;
    }

    getColors(formatter) {
        if (this.color && this.color.startsWith('#')) {
            return formatter.hex()
        }
    }

    getFormatter() {
        let formatter = chalk.reset;
        if (this.bold) formatter = formatter.bold;
        if (this.underlined) formatter = formatter.underline;
        if (this.italic) formatter = formatter.italic;
        if (this.strikethrough) formatter = formatter.strikethrough;
        if (this.color) {
            if (this.color.startsWith('#')) {
                formatter = formatter.hex(this.color);
            } else if (COLORS[this.color]) {
                formatter = formatter.rgb(...COLORS[this.color]);
            }
        }
        return formatter;
    }

    toString() {
        if (Array.isArray(this.extra)) {
            return this.extra.map((comp) => comp.toString()).join('');
        }
        return '';
    }
}

module.exports = Component;