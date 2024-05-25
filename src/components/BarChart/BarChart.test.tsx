import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BarChart from "./index";
import fetchMock from "jest-fetch-mock";

jest.mock("highcharts-react-official", () => () => (
  <div data-testid="highcharts-react-mock" />
));

jest.mock("../Spinner", () => () => <div>Loading...</div>);

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("BarChart", () => {
  it("renders the chart after fetching data", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          from: "2024-01-01T00:00Z",
          to: "2024-01-01T00:30Z",
          generationmix: [
            { fuel: "gas", perc: 40 },
            { fuel: "nuclear", perc: 20 },
            { fuel: "wind", perc: 30 },
            { fuel: "solar", perc: 10 },
          ],
        },
      })
    );

    render(<BarChart />);

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(screen.getByTestId("highcharts-react-mock")).toBeInTheDocument();
  });
});
