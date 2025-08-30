import { Control, Controller, FieldError } from "react-hook-form";
import { FormValues } from "../models";

interface Props {
    name: keyof FormValues;
    control: Control<FormValues>;
    label: string;
    type?: string;
    error?: FieldError;
}

const InputForm = ({ name, control, label, type, error }: Props) => {
    return (
        <div className="input-form">
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) =>
                    <input id={name} type={type} {...field} className={`form-control ${error ? "is-invalid" : ""}`} />
                }
            />
            <p className="error">
                {error ? error.message : "\u00A0"}
            </p>
        </div>
    )
}

export default InputForm;