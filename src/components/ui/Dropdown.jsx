import React from 'react';
import styled from 'styled-components';
import Field from './Field';

const Dropdown = () => {
    return (
        <StyledWrapper>
            <Field>
                <div className="dropdown">
                    <input
                        type="checkbox"
                        name="state-dropdow"
                        id="state-dropdown"
                        className="bg-red-950 sr-only"
                    />
                    <label
                        aria-label="dropdown scrollbar"
                        className="trigger "
                        htmlFor="state-dropdown"
                    ></label>
                    <ul
                        className="list webkit-scrollbar"
                        role="list"
                        dir="auto"
                    >
                        <li
                            className="listitem"
                            role="listitem"
                        >
                            <article className="article">Hover to view scrollbar.</article>
                        </li>

                        <li
                            className="listitem"
                            role="listitem"
                        >
                            <article className="article">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sunt tempora
                                recusandae dolorum.
                            </article>
                        </li>

                        <li
                            className="listitem"
                            role="listitem"
                        >
                            <article className="article">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sunt tempora
                                recusandae dolorum.
                            </article>
                        </li>
                        <li
                            className="listitem"
                            role="listitem"
                        >
                            <article className="article">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sunt tempora
                                recusandae dolorum.
                            </article>
                        </li>
                        <li
                            className="listitem"
                            role="listitem"
                        >
                            <article className="article">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sunt tempora
                                recusandae dolorum.
                            </article>
                        </li>
                        <li
                            className="listitem"
                            role="listitem"
                        >
                            <article className="article">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium, sunt tempora
                                recusandae dolorum.
                            </article>
                        </li>
                    </ul>
                </div>
            </Field>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .dropdown {
        transition: all 0.3s ease !important;
        overflow: hidden;
        position: relative;
        min-height: 28px;
        width: auto;
        inset-inline: auto;
    }

    .dropdown input:where(:checked) ~ .list {
        opacity: 1;
        transform: translateY(-2rem) scale(1);
        transition: all 0.5s ease;
        margin-top: 52px;
        padding-top: 4px;
        margin-bottom: -22px;
    }
    .dropdown input:where(:not(:checked)) ~ .list {
        opacity: 0;
        transform: translateY(3rem);
        margin-top: -100%;
        user-select: none;
        height: 0px;
        max-height: 0px;
        min-height: 0px;
        pointer-events: none;
        transition: all 0.5s ease-out;
    }

    .trigger {
        cursor: pointer;
        list-style: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
        font-weight: 600;
        color: inherit;
        width: 100%;
        display: flex;
        align-items: center;
        flex-flow: row;
        gap: 1rem;
        padding-line: 1rem;
        height: max-content;
        position: relative;
        z-index: 99;
        border-radius: inherit;
    }

    .trigger:before,
    .trigger::after {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .trigger:before {
        content: '›';
        rotate: -90deg;
        width: 17px;
        height: 17px;
        border-radius: 2px;
        font-size: 26px;
        transition: all 350ms ease;
        transition-delay: 85ms;
    }
    .trigger::after {
        content: 'Open Dropdown';
    }

    .dropdown input:where(:checked) + .trigger {
        margin-bottom: 1rem;
    }
    .dropdown input:where(:checked) + .trigger:before {
        rotate: 90deg;
        transition-delay: 0ms;
    }
    .dropdown input:where(:checked) + .trigger::after {
        content: 'Close Dropdown';
    }

    .list {
        height: 100%;
        max-height: 20rem;
        width: calc(100% - calc(var(--w-scrollbar) / 2));
        display: grid;
        grid-auto-flow: row;
        overflow: hidden auto;
        gap: 1rem;
        padding: 0 1rem;
        margin-right: -8px;
        --w-scrollbar: 8px;
    }

    .listitem {
        height: 100%;
        width: calc(100% + calc(calc(var(--w-scrollbar) / 2) + var(--w-scrollbar)));
        list-style: none;
    }

    .webkit-scrollbar::-webkit-scrollbar {
        width: var(--w-scrollbar);
        height: var(--w-scrollbar);
        border-radius: 9999px;
    }
        
    .webkit-scrollbar::-webkit-scrollbar-track {
        background: #0000;
    }
        
    .webkit-scrollbar::-webkit-scrollbar-thumb {
        background: #0000;
        border-radius: 9999px;
    }
    
    .webkit-scrollbar:hover::-webkit-scrollbar-thumb {
        background: #c1c2c5;
    }

    .article {
        padding: 1rem;
        border-radius: 8px;
        font-size: 15px;
        font-weight: 500;
        text-align: justify;
        width: 100%;
        border: 1px solid #c1c2c5;
        display: inline-block;
    }
`;

// const StyledWrapper = styled.div`
//     .dropdown {
//         border: 1px solid #c1c2c5;
//         border-radius: 12px;
//         transition: all 300ms;
//         display: flex;
//         flex-direction: column;
//         min-height: 58px;
//         background-color: var(--background-header);
//         overflow: hidden;
//         position: relative;
//         inset-inline: auto;
//         width: full;
//     }
//     .dropdown input:where(:checked) ~ .list {
//         opacity: 1;
//         transform: translateY(-3rem) scale(1);
//         transition: all 500ms ease;
//         margin-top: 32px;
//         padding-top: 4px;
//         margin-bottom: -32px;
//     }
//     .dropdown input:where(:not(:checked)) ~ .list {
//         opacity: 0;
//         transform: translateY(3rem);
//         margin-top: -100%;
//         user-select: none;
//         height: 0px;
//         max-height: 0px;
//         min-height: 0px;
//         pointer-events: none;
//         transition: all 500ms ease-out;
//     }
//     .trigger {
//         cursor: pointer;
//         list-style: none;
//         -webkit-user-select: none;
//         -moz-user-select: none;
//         user-select: none;
//         font-weight: 600;
//         color: inherit;
//         width: 100%;
//         display: flex;
//         align-items: center;
//         flex-flow: row;
//         gap: 1rem;
//         padding-line: 1rem;
//         height: max-content;
//         position: relative;
//         z-index: 99;
//         border-radius: inherit;
//         background-color: var(--background-header);
//     }
//     .sr-only {
//         position: absolute;
//         width: 1px;
//         height: 1px;
//         padding: 0;
//         margin: -1px;
//         overflow: hidden;
//         clip: rect(0, 0, 0, 0);
//         white-space: nowrap;
//         border-width: 0;
//     }
//     .dropdown input:where(:checked) + .trigger {
//         margin-bottom: 1rem;
//     }
//     .dropdown input:where(:checked) + .trigger:before {
//         rotate: 90deg;
//         transition-delay: 0ms;
//     }
//     .dropdown input:where(:checked) + .trigger::after {
//         content: 'Close Dropdown';
//     }

//     .trigger:before,
//     .trigger::after {
//         position: relative;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//     }
//     .trigger:before {
//         content: '›';
//         rotate: -90deg;
//         width: 17px;
//         height: 17px;
//         color: #262626;
//         border-radius: 2px;
//         font-size: 26px;
//         transition: all 350ms ease;
//         transition-delay: 85ms;
//     }
//     .trigger::after {
//         content: 'Open Dropdown';
//     }
//     .list {
//         height: 100%;
//         max-height: 20rem;
//         width: calc(100% - calc(var(--w-scrollbar) / 2));
//         display: grid;
//         grid-auto-flow: row;
//         overflow: hidden auto;
//         gap: 1rem;
//         padding: 0 1rem;
//         margin-right: -8px;
//         --w-scrollbar: 8px;
//     }
//     .listitem {
//         height: 100%;
//         width: calc(100% + calc(calc(var(--w-scrollbar) / 2) + var(--w-scrollbar)));
//         list-style: none;
//     }
//     .article {
//         padding: 1rem;
//         border-radius: 8px;
//         font-size: 15px;
//         font-weight: 500;
//         text-align: justify;
//         width: 100%;
//         border: 1px solid #c1c2c5;
//         display: inline-block;
//         background-color: white;
//     }

//     .webkit-scrollbar::-webkit-scrollbar {
//         width: var(--w-scrollbar);
//         height: var(--w-scrollbar);
//         border-radius: 9999px;
//     }
//     .webkit-scrollbar::-webkit-scrollbar-track {
//         background: #0000;
//     }
//     .webkit-scrollbar::-webkit-scrollbar-thumb {
//         background: #0000;
//         border-radius: 9999px;
//     }
//     .webkit-scrollbar:hover::-webkit-scrollbar-thumb {
//         background: #c1c2c5;
//     }
// `;

export default Dropdown;
