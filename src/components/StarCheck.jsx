import React from 'react';
import styled from 'styled-components';

const StarCheck = ({ id = 'dummyStar', checked, onChange }) => {
    return (
        <StyledWrapper>
            <div
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    onChange={onChange}
                    defaultChecked={checked}
                    type="checkbox"
                    id={`stared-${id}`}
                />
                <label htmlFor={`stared-${id}`} className="cursor-pointer">
                    <svg viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                </label>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    input[type='checkbox'] {
        display: none;
    }

    label svg {
        width: 24px;
        height: 24px;
        fill: none;
        stroke: var(--border-color);
        stroke-width: 2px;
    }

    input[type='checkbox']:checked + label svg {
        stroke: none;
        fill: #ffc107;
        animation: pop_42 0.5s ease-out;
    }

    @keyframes pop_42 {
        0% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.5);
        }

        100% {
            transform: scale(1);
        }
    }
`;

export default StarCheck;
