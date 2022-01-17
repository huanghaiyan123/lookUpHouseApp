import React from 'react';

import PropTypes from 'prop-types'

import styles from './index.module.css'

export function getValue(
    values,
    index,
) {
    return values ? values[index] : null;
}
const InnerRangePicker = () => {
    const [startText, triggerStartTextChange, resetStartText] = useTextValueMapping({
        valueTexts: startValueTexts,
        onTextChange: (newText) => onTextChange(newText, 0),
    });

    const [endText, triggerEndTextChange, resetEndText] = useTextValueMapping({
        valueTexts: endValueTexts,
        onTextChange: (newText) => onTextChange(newText, 1),
    });

    const sharedTextHooksProps = {
        formatList,
        generateConfig,
        locale,
    };

    const [startValueTexts, firstStartValueText] = useValueTexts(
        getValue(selectedValue, 0),
        sharedTextHooksProps,
    );

    const [endValueTexts, firstEndValueText] = useValueTexts(
        getValue(selectedValue, 1),
        sharedTextHooksProps,
    );

    if (pickerRef) {
        pickerRef.current = {
            focus: () => {
                if (startInputRef.current) {
                    startInputRef.current.focus();
                }
            },
            blur: () => {
                if (startInputRef.current) {
                    startInputRef.current.blur();
                }
                if (endInputRef.current) {
                    endInputRef.current.blur();
                }
            },
        };
    }
    const onTextChange = (newText, index) => {
        const inputDate = parseValue(newText, {
            locale,
            formatList,
            generateConfig,
        });

        const disabledFunc = index === 0 ? disabledStartDate : disabledEndDate;

        if (inputDate && !disabledFunc(inputDate)) {
            setSelectedValue(updateValues(selectedValue, inputDate, index));
            setViewDate(inputDate, index);
        }
    };
    return (
        <div>
            <input
                id={id}
                disabled={mergedDisabled[0]}
                value={startHoverValue || startText}
                onChange={(e) => {
                    triggerStartTextChange(e.target.value);
                }}
                placeholder={getValue(placeholder, 0) || ''}
                ref={startInputRef}
                onFocus={ startInputRef.current.focus}
                onBlur={startInputRef.current.blur }
            />
            <span>-</span>
            <input
                disabled={mergedDisabled[1]}
                value={endHoverValue || endText}
                onChange={(e) => {
                    triggerEndTextChange(e.target.value);
                }}
                placeholder={getValue(placeholder, 1) || ''}
                ref={endInputRef}
                onFocus={ endInputRef.current.focus}
                onBlur={endInputRef.current.blur }
            />
        </div>
    )
}

class RangePicker extends React.Component {
    pickerRef = React.createRef();

    focus = () => {
        if (this.pickerRef.current) {
            this.pickerRef.current.focus();
        }
    };

    blur = () => {
        if (this.pickerRef.current) {
            this.pickerRef.current.blur();
        }
    };

    render() {
        return (
            <InnerRangePicker
                {...this.props}
                pickerRef={this.pickerRef}
            />
        );
    }
}

RangeInput.propTypes = {
    children: PropTypes.node.isRequired
};

export default RangeInput;