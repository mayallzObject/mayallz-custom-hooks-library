import { renderHook, act } from "@testing-library/react";
import { useToggle } from "../src/useToggle";

describe("useToggle", () => {
  it("should initialize with default value", () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it("should initialize with provided value", () => {
    const { result } = renderHook(() => useToggle(true));

    expect(result.current[0]).toBe(true);
  });

  it("should toggle the value", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);
  });

  it("should set the value", () => {
    const { result } = renderHook(() => useToggle());

    act(() => {
      result.current[2](true);
    });

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[2](false);
    });

    expect(result.current[0]).toBe(false);
  });
});
