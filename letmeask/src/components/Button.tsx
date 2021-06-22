import { ButtonHTMLAttributes } from 'react';
import { useState } from "react";

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {

    const [counter, setCounter] = useState(0)

    return (
        <button className="button" {...props} />
    )
}