import React from 'react';
import { styled } from 'styled-components';
import Field from './Field.js';
import ListTask from '../specific/ListTask.js';

interface TaskItem {
    id: string;
    title: string;
    detail: string | null;
    createdAt: Date;
    deadline: Date;
    hasDate: boolean;
    hasTime: boolean;
    starred: boolean;
    isCompleted: boolean;
}

type DropdownProps = {
    tasks: TaskItem[];
    taskId: string;
    handleChecked: (id: string, value: boolean) => void;
};

const Dropdown = ({ tasks, taskId, handleChecked }: DropdownProps) => {
    return (
        <Field>
            <StyledWrapper $tasksLength={tasks.length}>
                <div className="dropdown">
                    <input
                        type="checkbox"
                        name="state-dropdown"
                        id="state-dropdown"
                        className="sr-only"
                    />
                    <label
                        aria-label="dropdown scrollbar"
                        className="trigger"
                        htmlFor="state-dropdown"
                    ></label>
                    <ul
                        className="list webkit-scrollbar"
                        role="list"
                    >
                        {tasks.map((t) => (
                            <li
                                key={t.id}
                                className="listitem animate-fade-in"
                                role="listitem"
                            >
                                <ListTask
                                    checked={t.isCompleted}
                                    stared={t.starred}
                                    id={t.id}
                                    taskId={taskId}
                                    handleChecked={handleChecked}
                                    handleStarred={() => {}}
                                >
                                    {t.title}
                                </ListTask>
                            </li>
                        ))}
                    </ul>
                </div>
            </StyledWrapper>
        </Field>
    );
};

interface StyledWrapperProps {
    $tasksLength: number;
}

const StyledWrapper = styled.div<StyledWrapperProps>`
    .dropdown {
        transition: all 0.3s ease !important;
        overflow: hidden;
        position: relative;
        min-height: 28px;
        width: 100%;
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
        z-index: 40;
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
        content: "Selesai ${(props) => props.$tasksLength}"};
    }

    .dropdown input:where(:checked) + .trigger {
        margin-bottom: 1rem;
    }
    .dropdown input:where(:checked) + .trigger:before {
        rotate: 90deg;
        transition-delay: 100ms;
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
`;

export default Dropdown;
