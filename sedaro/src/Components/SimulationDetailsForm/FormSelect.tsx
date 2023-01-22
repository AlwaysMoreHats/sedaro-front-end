import { InputHTMLAttributes } from "react";
import cx from 'classnames'

type Props = {
    label: string;
    name?: string; // uses label if not specified
    className?: string;
    id?: string;
    options: ({ label: string; value: string; } | string)[];
} & Omit<InputHTMLAttributes<HTMLSelectElement>, 'name' | 'className' | 'id'>

export default function FormSelect({ label, name, className, id, options, ...selectProps }: Props) {
    const selectName = name || label.replace(/[^a-zA-Z0-9]+/, '-')
    return <label className={cx('formLabel', className)} id={id} htmlFor={selectName}>
        {label} <select className="formInput formSelect" name={selectName} {...selectProps}>
            {options.map(option => typeof option === "string" ? { label: option, value: option } : option).map(({label, value}) => <option key={value} value={value}>{label}</option>)}
        </select>
    </label>
}