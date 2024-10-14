import {ButtonHTMLAttributes, ReactNode} from "react";

interface ButtonProps{
    children: ReactNode;
    onClick : () => void;
}

export const Button = ({onClick,children}:ButtonProps) => {
    return <button onClick={onClick} className="bg-blue-600 rounded-md w-full my-2 py-2">{children}</button>
}