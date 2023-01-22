import { InputHTMLAttributes } from "react";
import cx from 'classnames'

type Props = {
    label: string;
    name?: string; // uses label if not specified
    className?: string;
    id?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'className' | 'id'>

export default function FormInput({ label, name, className, id, ...inputProps }: Props) {
    const inputName = name || label.replace(/[^a-zA-Z0-9]+/, '-')
    return <label className={cx('formLabel', className)} id={id} htmlFor={inputName}>
        {label} <input name={inputName} className="formInput" {...inputProps} />
    </label>
}