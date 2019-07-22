class Login {
    constructor() {
        this.body = document.querySelector('body');
        this.main = document.querySelector('main');
        this.header;
        this.loginBox;
    }

    setPage() {
        this.body.insertBefore(this.setHeader(), this.main);
        this.main.appendChild(this.setLoginBox());
    }

    setLoginBox(){
        const loginForm = document.createElement('form');
        const idTextArea = document.createElement('input');
        const pwTextArea = document.createElement('input');
        const button = document.createElement('input');
        loginForm.setAttribute('action','/login');
        loginForm.setAttribute('method','POST');
        idTextArea.setAttribute('name', 'userID');
        idTextArea.setAttribute('type', 'text');
        idTextArea.placeholder = 'Please input your ID';
        pwTextArea.setAttribute('name', 'userPW');
        pwTextArea.setAttribute('type', 'password');
        pwTextArea.placeholder = 'Please input your PW';
        button.setAttribute('type', 'submit');
        button.setAttribute('value', 'Log in');
        loginForm.appendChild(idTextArea);
        loginForm.appendChild(pwTextArea);
        loginForm.appendChild(button);
        return loginForm;
    }

    setHeader() {
        this.header = document.createElement('header');
        const title = document.createElement('div');
        title.innerText = 'Log In';
        this.header.appendChild(title);
        this.header.appendChild(this.setSignUpButton());
        return this.header;
    }

    setSignUpButton() {
        const signUpForm = document.createElement('form');
        signUpForm.setAttribute('action', '/signup');
        signUpForm.setAttribute('method', 'GET');
        const button = document.createElement('input');
        button.setAttribute('type', 'submit');
        button.setAttribute('value', 'Sign Up');
        signUpForm.appendChild(button);
        return signUpForm;
    }
}

const login = new Login();

login.setPage();