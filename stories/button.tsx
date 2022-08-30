import buttonStyle from './button.scss';

type ButtonPropsType = {
    /**
     * What background color to use
     */
    backgroundColor?: string;
    /**
     * Button contents
     */
    label: string;
    /**
     * Optional click handler
     */
    onClick?: () => void;
    /**
     * Is this the principal call to action on the page?
     */
    primary?: boolean;
    /**
     * How large should the button be?
     */
    size?: 'large' | 'medium' | 'small';
};

export function Button(props: ButtonPropsType): JSX.Element {
    const {primary, size = 'medium', backgroundColor, label, onClick} = props;
    const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return (
        <button
            className={[buttonStyle['storybook-button'], buttonStyle[`storybook-button--${size}`], mode].join(' ')}
            onClick={onClick}
            style={{backgroundColor}}
            type="button"
        >
            {label}
        </button>
    );
}
