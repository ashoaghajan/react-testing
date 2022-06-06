import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


describe('App', () => {
  const emailError = 'the email you input is invalid';
  const passwordError = 'the password you input must be at least 6 characters long';
  const confirmPassError = 'the passwords do not match';


  const typeIntoForm = ({ email, password, conformPassword }: any) => {
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i); 
    const submitButton = screen.getByRole("button", { name: /submit/i });

    email && userEvent.type(emailInput, email);
    password && userEvent.type(passwordInput, password);
    conformPassword && userEvent.type(confirmPasswordInput, conformPassword);

    return { emailInput, passwordInput, confirmPasswordInput, submitButton };
  }


  beforeEach(() => {
    render(<App />);
  });


  test('form inputs should be initially empty', () => {
    const { emailInput, passwordInput, confirmPasswordInput } = typeIntoForm({});
    expect(emailInput).toHaveValue('');
    expect(passwordInput).toHaveValue('');
    expect(confirmPasswordInput).toHaveValue('');
  });


  describe('user should be able to type', () => {
    it('an email', () => {
      const email = 'selena@gmail.com';
      const { emailInput } = typeIntoForm({ email })
      expect(emailInput).toHaveValue(email);
    });

    it('a password', () => {
      const password = 'password123';
      const { passwordInput } = typeIntoForm({ password });  
      expect(passwordInput).toHaveValue(password);
    });

    it('a confirm password', () => {
      const password = 'password123';
      const { confirmPasswordInput } = typeIntoForm({ conformPassword: password }); 
      expect(confirmPasswordInput).toHaveValue(password);
    });
  });


  describe('should show error', () => {
    let errorElement: any = null;

    it("on invalid email", () => {
      expect(screen.queryByText(new RegExp(emailError, 'i'))).not.toBeInTheDocument();
      const { submitButton } = typeIntoForm({ email: 'selenagmail.com' });
      userEvent.click(submitButton);
      errorElement = screen.queryByText(new RegExp(emailError, 'i'));
    });

    it("if password is less than 6 characters long", () => {
      expect(screen.queryByText(new RegExp(passwordError, 'i'))).not.toBeInTheDocument();
      const { submitButton } = typeIntoForm({ email: 'selena@gmail.com', password: '1234' });
      userEvent.click(submitButton);
      errorElement = screen.queryByText(new RegExp(passwordError, 'i'));
    });

    it("if passwords do not match", () => {
      expect(screen.queryByText(new RegExp(confirmPassError, 'i'))).not.toBeInTheDocument();
      const { submitButton } = typeIntoForm({ email: 'selena@gmail.com', password: '123456', conformPassword: '12345' });
      userEvent.click(submitButton);
      errorElement = screen.queryByText(new RegExp(confirmPassError, 'i'));
    });

    afterEach(() => {
      expect(errorElement).toBeInTheDocument();
    });
  });


  test('no error to be present in case every input is valid', () => {
    const { submitButton } = typeIntoForm({ email: 'selena@gmail.com', password: '123456', conformPassword: '123456' });
    userEvent.click(submitButton);
    expect(screen.queryByText(new RegExp(emailError, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(passwordError, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(confirmPassError, 'i'))).not.toBeInTheDocument();
  });
})
