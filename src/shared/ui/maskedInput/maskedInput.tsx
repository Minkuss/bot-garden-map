import { forwardRef, useState, MutableRefObject } from 'react';
import { useIMask } from 'react-imask';
import IMask from 'imask';
import { Input } from 'src/shared/ui/input/input';

interface IMaskedInputProps {
    label: string;
    maskOptions: IMask.AnyMaskedOptions;
    error?: boolean;
    errorText?: string;
    fullWidth?: boolean;
    placeholder?: string;
    onAccept?: (value: string, mask: any) => void;
    onChange?: (value: string) => void;
}

export const MaskedInput = forwardRef<HTMLInputElement, IMaskedInputProps>((props, ref) => {
    const { maskOptions, onAccept, onChange, ...rest } = props;

    const [ opts ] = useState<IMask.AnyMaskedOptions>(maskOptions);
    const { ref: iMaskRef } = useIMask(opts, {
        onAccept: (value, mask) => {
            onAccept?.(value as string, mask);
            onChange?.(value as string);
        },
    });

    function handleRefs(instance: HTMLInputElement | null) {
        if (ref) {
            if (typeof ref === 'function') {
                ref(instance);
            } else {
                ref.current = instance;
            }
        }
        if (instance) {
            (iMaskRef as MutableRefObject<HTMLInputElement>).current = instance;
        }
    }

    return <Input ref={handleRefs} {...rest} />;
});

MaskedInput.displayName = 'MaskedInput';
