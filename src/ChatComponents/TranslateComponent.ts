import Component from './Component';
import translationJson from './translations/en.json';
const PATTERNS : Record<string, string> = translationJson;

export default class TranslateComponent extends Component {

  translate : string;
  with : (Component|string)[];

  constructor(json : any = {}) {
    super(json);
    this.translate = json.translate;
    // "with" added from parser
    this.with = [];
  }

  toJson(): Record<string, any> {
    return {
      translate: this.translate || '',
      with: this.with.map((comp) => typeof comp === 'string' ? comp : comp.toJson()),
      ...super.toJson(),
    };
  }

  toString(): string {
    let output = PATTERNS[this.translate] || '';
    for (const index in this.with) {
      output = output.replace('%s', this.with[index].toString());
    }
    return this.getFormatter()(output + super.toString());
  }
}
