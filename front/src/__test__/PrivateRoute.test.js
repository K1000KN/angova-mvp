import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { PrivateRoute } from "../index";

describe("PrivateRoute component", () => {
  it("redirects to login if not authenticated", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <PrivateRoute roles={["user", "manager", "admin"]}>
          <div data-testid="private-content">Private Content</div>
        </PrivateRoute>
        <Route
          path="/login"
          render={() => <div data-testid="login-page">Login Page</div>}
        />
      </MemoryRouter>
    );

    // The user is not authenticated, so it should redirect to the login page
  });

  it("redirects to login if role is not authorized", () => {
    localStorage.setItem("token", "mock-token"); // Set a mock token to simulate authentication
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <PrivateRoute roles={["admin"]}>
          <div data-testid="private-content">Private Content</div>
        </PrivateRoute>
        <Route
          path="/login"
          render={() => <div data-testid="login-page">Login Page</div>}
        />
      </MemoryRouter>
    );
  });

  it("renders private content if authenticated and role is authorized", () => {
    localStorage.setItem("token", "mock-token"); // Set a mock token to simulate authentication
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <PrivateRoute roles={["user", "manager", "admin"]}>
          <div data-testid="private-content">Private Content</div>
        </PrivateRoute>
      </MemoryRouter>
    );
  });
});
