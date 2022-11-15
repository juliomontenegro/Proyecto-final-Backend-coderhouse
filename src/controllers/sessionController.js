import { debugLogger } from "../utils.js";

export const sessionController = {
    register: async (req, res) => {
        try {
            res.send({ status: 'success', payload: req.user._id })
        } catch (e) {
            debugLogger(e);
        }
    },
    registerFail: async (req, res) => {
        try {
        res.send({ status: "error", error: "Login failed" });
        } catch (e) {
            debugLogger(e);
        }
    },
    login: async (req, res) => {
        try {
            req.session.user = {
                name: req.user.name,
                email: req.user.email,
                avatar: req.user.avatar,
                id: req.user._id,
                idCart: null
            }

            debugLogger.info("Login success");
            res.send({ status: "success", payload: req.user._id })  
        } catch (e) {
            debugLogger(e);
        }
    },
    loginFail: async (req, res) => {
        try {
        res.send({ status: "error", error: "Login failed" });
        } catch (e) {
            debugLogger(e);
        }
    },
    getCurrent: async (req, res) => {
        try {
        res.send({ user: req.session.user });
        } catch (e) {
            debugLogger(e);
        }
    },
    getLogout: async (req, res) => {
        try {
        req.session.destroy();
        res.send({ user: null });
        } catch (e) {
            debugLogger(e);
        }
    }
}