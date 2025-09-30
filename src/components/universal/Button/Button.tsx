import React from "react";
import Icon from "../Icon/Icon";
import "./Button.css";

interface ButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    icon?: string;
}

const Button: React.FC<ButtonProps> = ({
    className,
    children,
    type = "button",
    icon,
    ...props
}) => {
    return (
        <button
            className={`button${className ? " " + className : ""}`}
            type={type}
            {...props}
        >
            {icon && (
                <>
                    <Icon name={icon} />
                    {children && <span>{children}</span>}
                </>
            )}
            {!icon && children}
        </button>
    );
};

export default Button;
