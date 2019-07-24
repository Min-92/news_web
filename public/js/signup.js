class Signup {
    constructor() {
        this.body = document.querySelector('body');
        this.main = document.querySelector('main');
        this.header;
        this.signupBox;
    }

    setPage() {
        this.body.insertBefore(this.setHeader(), this.main);
        this.main.appendChild(this.setSignupBox());
    }

    setSignupBox(){
        const signupForm = document.createElement('form');
        const idTextArea = document.createElement('input');
        const pwTextArea = document.createElement('input');
        const button = document.createElement('input');
        signupForm.setAttribute('action','/auth/signup');
        signupForm.setAttribute('method','POST');
        idTextArea.setAttribute('name', 'id');
        idTextArea.setAttribute('type', 'text');
        idTextArea.placeholder = 'Please input your ID';
        pwTextArea.setAttribute('name', 'pw');
        pwTextArea.setAttribute('type', 'password');
        pwTextArea.placeholder = 'Please input your PW';
        button.setAttribute('type', 'submit');
        button.setAttribute('value', 'Sign up');
        signupForm.appendChild(idTextArea);
        signupForm.appendChild(pwTextArea);
        signupForm.appendChild(button);
        return signupForm;
    }

    setHeader() {
        this.header = document.createElement('header');
        const title = document.createElement('div');
        title.innerText = 'Sign up';
        this.header.appendChild(title);
        this.header.appendChild(this.setSignUpButton());
        return this.header;
    }

    setSignUpButton() {
        const signUpForm = document.createElement('form');
        signUpForm.setAttribute('action', '/auth/login');
        signUpForm.setAttribute('method', 'GET');
        const button = document.createElement('input');
        button.setAttribute('type', 'submit');
        button.setAttribute('value', 'Log in');
        signUpForm.appendChild(button);
        return signUpForm;
    }
}

const signUp = new Signup();

signUp.setPage();