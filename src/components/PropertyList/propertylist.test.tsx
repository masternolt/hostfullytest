import { render } from "@testing-library/react";
import { PropertyList } from "./PropertyList";
import { NextUIProvider } from "@nextui-org/react";

it("Render component with initial state", () => {
  const wrapper = render(
    <NextUIProvider>
      <PropertyList />
    </NextUIProvider>
  );

  const allRenderedProperties = wrapper.getAllByTestId("property");
  expect(allRenderedProperties).toHaveLength(4);
});
