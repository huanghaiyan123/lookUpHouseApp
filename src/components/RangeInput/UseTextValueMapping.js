import * as React from 'react';

export default function useTextValueMapping({
  valueTexts,
  onTextChange,
}) {
  const [text, setInnerText] = React.useState('');
  const valueTextsRef = React.useRef([]);
  valueTextsRef.current = valueTexts;

  function triggerTextChange(value) {
    setInnerText(value);
    onTextChange(value);
  }

  function resetText() {
    setInnerText(valueTextsRef.current[0]);
  }

  React.useEffect(() => {
    if (valueTexts.every(valText => valText !== text)) {
      resetText();
    }
  }, [valueTexts.join('||')]);

  return [text, triggerTextChange, resetText];
}