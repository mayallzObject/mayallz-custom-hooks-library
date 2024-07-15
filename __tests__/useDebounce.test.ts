import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "../src/useDebounce";

jest.useFakeTimers();

describe("useDebounce", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should update the value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      },
    );

    // Update the value
    rerender({ value: "updated", delay: 500 });

    // Value should still be the initial value before the delay
    expect(result.current).toBe("initial");

    // Fast forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should be updated after the delay
    expect(result.current).toBe("updated");
  });

  it("should cancel the timeout if value changes within the delay period", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      },
    );

    // Update the value before the delay
    rerender({ value: "intermediate", delay: 500 });

    // Fast forward time by 250ms
    act(() => {
      jest.advanceTimersByTime(250);
    });

    // Update the value again before the original delay completes
    rerender({ value: "final", delay: 500 });

    // Value should still be the initial value before the delay
    expect(result.current).toBe("initial");

    // Fast forward time by another 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should be the final updated value after the new delay
    expect(result.current).toBe("final");
  });

  it("should handle multiple rapid updates correctly", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      },
    );

    // Rapid updates
    rerender({ value: "update1", delay: 500 });
    rerender({ value: "update2", delay: 500 });
    rerender({ value: "update3", delay: 500 });

    // Value should still be the initial value before the delay
    expect(result.current).toBe("initial");

    // Fast forward time by 500ms
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should be the last updated value after the delay
    expect(result.current).toBe("update3");
  });
});
