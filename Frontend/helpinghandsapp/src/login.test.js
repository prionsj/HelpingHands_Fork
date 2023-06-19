import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Login } from "./components/Login.js";
import { MemoryRouter } from 'react-router-dom';

describe("Login Component", () => {
  test("renders login form", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    
    // Überprüfen, ob die Anmeldeformular-Elemente gerendert werden
    expect(screen.getByLabelText("Benutzername")).toBeInTheDocument();
    expect(screen.getByLabelText("Passwort")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anmelden" })).toBeInTheDocument();
  });

  test("shows error popup on incorrect login credentials", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    
    // Simulieren der Eingabe falscher Anmeldedaten
    fireEvent.change(screen.getByLabelText("Benutzername"), {
      target: { value: "incorrect_username" },
    });
    fireEvent.change(screen.getByLabelText("Passwort"), {
      target: { value: "incorrect_password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Anmelden" }));

    // Überprüfen, ob der Fehler-Popup angezeigt wird
    expect(screen.getByText("Benutzername oder Passwort ist inkorrekt")).toBeInTheDocument();
  });

  // Weitere Tests hinzufügen, falls nötig
});



