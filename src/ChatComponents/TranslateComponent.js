const Component = require('./Component');

const PATTERNS = require('./translations/en.json');

class TranslateComponent extends Component {
    constructor(json = {}) {
        super(json);
        this.translate = json.translate;
        // "with" added from parser
        this.with = [];
    }

    toJson() {
        return {
            translate: this.translate || '',
            with: this.with.map((comp) => comp.toJson()),
            ...super.toJson(),
        };
    }

    toString() {
        let output = PATTERNS[this.translate] || '';
        for (const index in this.with) {
            output = output.replace('%s', this.with[index].toString());
        }
        return this.getFormatter()(output + super.toString());
    }
}

module.exports = TranslateComponent;