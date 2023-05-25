import axios from "axios";
import { useToast, useNavigation } from "@react-navigation/native";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { AuthScreen } from "./AuthScreen";

jest.mock("axios"); // Mock do módulo axios

describe("AuthScreen", () => {
  test("Realiza login com sucesso", async () => {
    const mockedNavigate = jest.fn(); // Mock da função navigate
    const mockedToastShow = jest.fn(); // Mock da função show do toast

    useToast.mockReturnValue({
      show: mockedToastShow,
    });

    useNavigation.mockReturnValue({
      navigate: mockedNavigate,
    });

    const mockedResponse = {
      data: [
        {
          password: "senha_correta",
        },
      ],
    };

    axios.get.mockResolvedValue(mockedResponse);

    const { getByPlaceholderText, getByText } = render(<AuthScreen />);

    const emailInput = getByPlaceholderText("email");
    const senhaInput = getByPlaceholderText("senha");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "usuario@example.com");
    fireEvent.changeText(senhaInput, "senha_correta");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith("home", {
        email: "usuario@example.com",
      });
      expect(mockedToastShow).toHaveBeenCalledWith({
        placement: "top",
        title: "Login realizado com sucesso.",
      });
    });
  });

  test("Exibe mensagem de senha incorreta", async () => {
    const mockedToastShow = jest.fn();

    useToast.mockReturnValue({
      show: mockedToastShow,
    });

    const mockedResponse = {
      data: [
        {
          password: "senha_correta",
        },
      ],
    };

    axios.get.mockResolvedValue(mockedResponse);

    const { getByPlaceholderText, getByText } = render(<AuthScreen />);

    const emailInput = getByPlaceholderText("email");
    const senhaInput = getByPlaceholderText("senha");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "usuario@example.com");
    fireEvent.changeText(senhaInput, "senha_incorreta");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockedToastShow).toHaveBeenCalledWith({
        placement: "top",
        title: "Senha incorreta - O sistema diverge maiúsculas e minúsculas!",
      });
    });
  });

  test("Exibe mensagem de falha ao logar", async () => {
    const mockedToastShow = jest.fn();

    useToast.mockReturnValue({
      show: mockedToastShow,
    });

    const mockedResponse = {
      data: [],
    };

    axios.get.mockResolvedValue(mockedResponse);

    const { getByPlaceholderText, getByText } = render(<AuthScreen />);

    const emailInput = getByPlaceholderText("email");
    const senhaInput = getByPlaceholderText("senha");
    const loginButton = getByText("Login");

    fireEvent.changeText(emailInput, "usuario@example.com");
    fireEvent.changeText(senhaInput, "senha_correta");
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockedToastShow).toHaveBeenCalledWith({
        placement: "top",
        title: "Falha ao logar.",
      });
    });
  });
});
