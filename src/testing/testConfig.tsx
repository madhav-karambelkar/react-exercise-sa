import React from 'react';
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import '@testing-library/jest-dom'
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

type AllProvidersProps = {
  children: ReactNode;
};

type ExtendedRenderOptions = Omit<RenderOptions, "wrapper"> & {
  url?: string;
};

const customRender = (ui: ReactElement, options?: ExtendedRenderOptions) => {
  function AllProviders({ children }: AllProvidersProps) {
    return (
      <MemoryRouter initialEntries={[options?.url ?? "/"]}>
        {children}
      </MemoryRouter>
    );
  }

  return {
    /**
     * I'm exposing the userEvent on te render as per docs recommendation
     * as you can see in this link: https://testing-library.com/docs/user-event/intro
     */
    userEvent: userEvent.setup(),
    ...render(ui, { wrapper: AllProviders, ...options }),
  };
};

// export * from '@testing-library/jest-dom'
export * from "@testing-library/react";

export { customRender as render };