import TextComponent from './TextComponent';
import TranslateComponent from './TranslateComponent';

function fromJson(json : any) {
  if (Array.isArray(json)) {
    return fromJsonArray(json);
  }
  if (typeof json === 'string') {
    return json;
  }
  return fromJsonObject(json);
}

function fromJsonArray(array : any[]): any[] {
  return array.map(fromJson);
}

function fromJsonObject(object : any) {
  let component;
  if ('translate' in object) {
    component = new TranslateComponent(object);
    if (Array.isArray(object.with)) {
      component.with = fromJsonArray(object.with);
    }
  }
  else {
    component = new TextComponent(object);
  }
  if (Array.isArray(object.extra)) component.extra = fromJsonArray(object.extra);
  return component;
}

export default { fromJson };
