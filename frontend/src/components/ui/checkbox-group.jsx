import React from 'react';

export function CheckboxGroup({ defaultValue, onValueChange, children }) {
    const [selectedValues, setSelectedValues] = React.useState(defaultValue);

    const handleChange = (event) => {
        const value = event.target.value;
        let updatedValues;
        if (selectedValues.includes(value)) {
            // Si la valeur est déjà sélectionnée, la retirer
            updatedValues = selectedValues.filter(val => val !== value);
        } else {
            // Sinon, l'ajouter
            updatedValues = [...selectedValues, value];
        }
        setSelectedValues(updatedValues);
        onValueChange(updatedValues); // Appeler la fonction de rappel avec les nouvelles valeurs
    };

    return (
        <div>
            {React.Children.map(children, child => {
                // Injecter la fonction de changement dans chaque enfant Checkbox
                return React.cloneElement(child, {
                    onChange: handleChange,
                    checked: selectedValues.includes(child.props.value),
                });
            })}
        </div>
    );
}

export function Checkbox({ value, checked, onChange, children }) {
    return (
        <label>
            <input
                type="checkbox"
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {children}
        </label>
    );
}
