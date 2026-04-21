"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTheme } from "next-themes";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  return (
    <StyledWrapper className="place-self-center">
      {mounted && (
        <label>
          <input
            className="toggle-checkbox"
            type="checkbox"
            checked={isDark}
            onChange={handleToggle}
            aria-label="Toggle theme"
          />
          <div className="toggle-slot cursor-pointer">
            <div className="sun-icon-wrapper">
              <div
                className="iconify sun-icon"
                data-icon="feather-sun"
                data-inline="false"
              />
            </div>
            <div className="toggle-button" />
            <div className="moon-icon-wrapper">
              <div
                className="iconify moon-icon"
                data-icon="feather-moon"
                data-inline="false"
              />
            </div>
          </div>
        </label>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-flex;
  align-items: center;

  label {
    display: inline-block;
  }

  .toggle-checkbox {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .toggle-slot {
    font-size: 10px;
    position: relative;
    height: 3em;
    width: 6em;
    overflow: hidden;
    border: 0px solid transparent;
    border-radius: 10em;
    background-color: #b5b5b5;
    transition: background-color 250ms;
  }

  .toggle-checkbox:focus-visible ~ .toggle-slot {
    outline: 2px solid hsl(var(--p));
    outline-offset: 2px;
  }

  .toggle-checkbox:checked ~ .toggle-slot {
    background-color: #374151;
  }

  .toggle-button {
    transform: translate(0.3em, 0.25em);
    position: absolute;
    height: 2.5em;
    width: 2.5em;
    border-radius: 50%;
    background-color: #ffeccf;
    box-shadow: inset 0px 0px 0px 0.75em #ffbb52;
    transition:
      background-color 250ms,
      border-color 250ms,
      transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .toggle-button {
    background-color: #485367;
    box-shadow: inset 0px 0px 0px 0.75em white;
    transform: translate(3.2em, 0.25em);
  }

  .sun-icon {
    position: absolute;
    height: 5em;
    width: 5em;
    color: #ffbb52;
  }

  .sun-icon-wrapper {
    position: absolute;
    height: 5em;
    width: 5em;
    opacity: 1;
    transform: translate(1.65em, 2.15em) rotate(15deg);
    transform-origin: 50% 50%;
    transition:
      opacity 150ms,
      transform 500ms cubic-bezier(0.26, 2, 0.46, 0.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .sun-icon-wrapper {
    opacity: 0;
    transform: translate(2.55em, 2.15em) rotate(0deg);
  }

  .moon-icon {
    position: absolute;
    height: 5em;
    width: 5em;
    color: white;
  }

  .moon-icon-wrapper {
    position: absolute;
    height: 5em;
    width: 5em;
    opacity: 0;
    transform: translate(9.5em, 2.15em) rotate(0deg);
    transform-origin: 50% 50%;
    transition:
      opacity 150ms,
      transform 500ms cubic-bezier(0.26, 2.5, 0.46, 0.71);
  }

  .toggle-checkbox:checked ~ .toggle-slot .moon-icon-wrapper {
    opacity: 1;
    transform: translate(1.65em, 2.15em) rotate(-15deg);
  }
`;

export default ThemeSwitcher;
