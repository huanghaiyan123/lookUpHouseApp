import { useState, useEffect, useRef } from 'react';
import  { ValueTextConfig } from './useValueTexts';
import useValueTexts from './useValueTexts';

export default function useHoverValue(
  valueText,
   ValueTextConfig,
) {
  const [value, internalSetValue] = useState(null);
  const raf = useRef(null);

  function setValue(val, immediately = false) {
    cancelAnimationFrame(raf.current);
    if (immediately) {
      internalSetValue(val);
      return;
    }
    raf.current = requestAnimationFrame(() => {
      internalSetValue(val);
    });
  }

  const [, firstText] = useValueTexts(value, {
    formatList,
    generateConfig,
    locale,
  });

  function onEnter(date) {
    setValue(date);
  }

  function onLeave(immediately = false) {
    setValue(null, immediately);
  }

  useEffect(() => {
    onLeave(true);
  }, [valueText]);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return [firstText, onEnter, onLeave];
}