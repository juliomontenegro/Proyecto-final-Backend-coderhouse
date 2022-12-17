import { debugLogger } from "../utils.js";

export const sessionController = {
    register: async (req, res) => {
        if (!req.user || !req.user._id) {
            return res.status(400).send({
                status: "error",
                error: "Missing required parameters in request body"
            });
        }

        try {
            const userId = req.user._id;
            debugLogger.info("Register success");

            res.status(200).send({
                status: "success",
                payload: userId
            });
        } catch (error) {
            debugLogger.error("Error in sessionController register method: ", error)
            res.status(500).send({
                status: "error",
                error: "An error ocurred while trying to register the user"
            });
        }
    },
    registerFail: async (req, res) => {
        debugLogger.info("Register failed");
        res.status(401).send({
            status: "error",
            error: "Login failed"
        });
    },
    login: async (req, res) => {
        if (!req.user || !req.user._id) {
            return res.status(400).send({
                status: "error",
                error:"Missing required parameters in request body"
            });
        }

        try {
            const user = {
                name: req.user.name,
                email: req.user.email,
                avatar: req.user.avatar,
                id: req.user._id,
                role: req.user.role||"user",
                idCart: null
            };

            req.session.user = user;
            debugLogger.info("Login success");

            res.status(200).send({
                status: "success",
                payload: user._id
            });
        } catch (error) {
            debugLogger.error("An error ocurred while trying to login the user: ", error);
            res.status(500).send({
                status:"error",
                error:"An error ocurred while trying to login the user"
            });
        }
    },
    loginFail: async (req, res) => {
        debugLogger.info("Login failed");
        res.status(401).send({
            status: "error",
            error: "Login failed"
        });
    },
    
    getCurrent: async (req, res) => {
        try {
            res.status(200).send({ user: req.session.user });
        } catch (error) {
            debugLogger.error("An error ocurred while trying to get the current user: ", error);
            res.status(500).send({
                status: "error",
                error:"An error ocurred while trying to get the current user"
            });
        }
    },
    logout: async (req, res) => {
        try {
            req.session.destroy();
            res.status(200).send({ user: null });
        } catch (error) {
            debugLogger.error("An error ocurred while trying to logout the user: ", error);
            res.status(500).send({
                status: "error",
                error:"An error ocurred while trying to logout the user"
            });
        }
    }
};

