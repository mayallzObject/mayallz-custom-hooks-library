import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../src/useLocalStorage";

describe("useLocalStorage", () => {
  it("should use local storage", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initial"));

    expect(result.current[0]).toBe("initial");

    act(() => {
      result.current[1]("new value");
    });

    expect(result.current[0]).toBe("new value");
    expect(window.localStorage.getItem("key")).toBe(
      JSON.stringify("new value"),
    );
  });
});
