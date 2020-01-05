import React from 'react';
import { render, fireEvent, cleanup } from "@testing-library/react";
import SearchParams from '../SearchParams';


test("SearchParams", async () => {
  const { container, getByTestId, getByText } = render(<SearchParams />);

  const mealDropdown = getByTestId("use-dropdown-meal");
  expect(mealDropdown.children.length).toEqual(3);

});
