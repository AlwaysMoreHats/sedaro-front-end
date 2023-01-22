import { ChangeEvent, useState } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

import "./SimulationDetailsForm.css"

const conversion = {
    ms: (n: number) => n,
    secs: (n: number) => conversion.ms(n * 1000),
    mins: (n: number) => conversion.secs(n * 60),
    hours: (n: number) => conversion.mins(n * 60),
    days: (n: number) => conversion.hours(n * 24)
}

export type FormData = {
    start: number;
    stop: number;
    width: number;
}

type Props = {
    isLoading: boolean;
    onSubmit: (formData: FormData) => void;
}

function onChange<T, E extends HTMLSelectElement | HTMLInputElement>(setData: (value: React.SetStateAction<T>) => void) {
    return (e: ChangeEvent<E>) => { setData(e.target.value as T) }
}

function dateStringToDateTimeInputString(d: string) {
    return new Date(d).toISOString().replace(/Z/, '');
}

export default function SimulationDetailsForm({ isLoading = false, onSubmit }: Props) {
    const [startTime, setStartTime] = useState(dateStringToDateTimeInputString(new Date().toISOString()))
    const [endTime, setEndTime] = useState(dateStringToDateTimeInputString(new Date(Date.now() + conversion.days(1)).toISOString()))
    const [stepSize, setStepSize] = useState(1)
    const [stepUnit, setStepUnit] = useState<keyof typeof conversion>('hours')

    const formData: FormData = {
        start: new Date(startTime).getTime() / conversion.days(1),
        stop: new Date(endTime).getTime() / conversion.days(1),
        width: conversion[stepUnit](stepSize) / conversion.days(1),
    }

    return <form className="simulationForm panel" onSubmit={(e) => {e.stopPropagation(); e.preventDefault(); return false}}>
        <p className="inputRow"><FormInput label="Start" type="datetime-local" value={startTime} onChange={onChange(setStartTime)}/> days</p>
        <p className="inputRow"><FormInput label="End" type="datetime-local" value={endTime} onChange={onChange(setEndTime)} /> days</p>
        <p className="inputRow longRow">
            <FormInput label="Step Size" type="number" value={stepSize} onChange={onChange(setStepSize)} />
            <FormSelect label="Units" options={Object.keys(conversion)} value={stepUnit} onChange={onChange(setStepUnit)}/>
        </p>
        <button type="button" disabled={isLoading || formData.start > formData.stop} className="submitButton primaryButton" onClick={() => onSubmit(formData)}>Simulate</button>
    </form>
}