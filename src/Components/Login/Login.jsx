    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.auth) {
            navigate('/profile');
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.email === email && storedUser.password === password) {
            storedUser.auth = true;
            localStorage.setItem('user', JSON.stringify(storedUser));
            console.log("User authorized");
            navigate('/profile');
        } else {
            alert('Неверный email или пароль');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        navigate('/registration');
    };
    const handlePage = (e) => {
      e.preventDefault();
      navigate('/');
    }

    return (
        <div className="login">
            <div className="login__nav">
                <button onClick={handlePage}>
                    <img src={Arrow} alt="arrow"/>
                </button>
                <h1>Войдите в систему</h1>
            </div>

            <form className="login__form" onSubmit={handleLogin}>
                <div className="login__form__email">
                    <label htmlFor="email">Почта</label>
                    <input
                        type="email"
                        className="login__form__input"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="login__form__password">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        className="login__form__input"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="login__form__login">
                    <button type="submit" className="login__form__login">
                        Войти
                    </button>
                    <button type="button" className="login__form__reg" onClick={handleRegister}>
                        Регистрация
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
