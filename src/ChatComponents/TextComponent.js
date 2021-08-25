const Component = require('./Component');

class TextComponent extends Component {
    constructor(json = {}) {
        const isStringLitteral = typeof json === 'string';
        super(isStringLitteral ? {} : json);
        this.text = isStringLitteral ? json : (json.text || '');
    }

    toJson() {
        return {
            text: this.text || '',
            ...super.toJson(),
        };
    }

    toString() {
        return this.getFormatter()(this.text) + super.toString();
    }
}
module.exports = TextComponent;