import shallowEqual from 'shallowequal';
import useMemo from 'rc-util/lib/hooks/useMemo';

import { formatValue } from '../utils/dateUtil';

const ValueTextConfig = {
  formatList: [],
  generateConfig: GenerateConfig,
  locale: Locale,
};

export default function useValueTexts(
  value,
  ValueTextConfig,
) {
  return useMemo(
    () => {
      if (!value) {
        return [[''], ''];
      }

      // We will convert data format back to first format
      let firstValueText = '';
      const fullValueTexts = [];

      for (let i = 0; i < formatList.length; i += 1) {
        const format = formatList[i];
        const formatStr = formatValue(value, { generateConfig, locale, format });
        fullValueTexts.push(formatStr);

        if (i === 0) {
          firstValueText = formatStr;
        }
      }

      return [fullValueTexts, firstValueText];
    },
    [value, formatList],
    (prev, next) => prev[0] !== next[0] || !shallowEqual(prev[1], next[1]),
  );
}