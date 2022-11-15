

export const viewController = {
    getHome: async (req, res) => {
        try {
            if (!req.session.user) return res.redirect('/login');
            res.render('home', { user: req.session.user });
        } catch (e) {
            debugLogger(e);
        }
    },
    getRegister: async (req, res) => {
        try {
            if (req.session.user) return res.redirect('/');
            res.render('register');
        } catch (e) {
            debugLogger(e);
        }
    },
    getLogin: async (req, res) => {
        try {
            if (req.session.user) return res.redirect('/');
            res.render('login');
        } catch (e) {
            debugLogger(e);
        }
    },
    getLogout: async (req, res) => {
        try {
            res.render('logout');
        } catch (e) {
            debugLogger(e);
        }
    }
}