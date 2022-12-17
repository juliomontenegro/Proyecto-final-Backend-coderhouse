import { debugLogger } from "../utils.js";

export const viewController = {
    getHome: async (req, res) => {
        try {
            if (!req.session.user) return res.redirect('/login');
            if(req.session.user.role === 'admin') return res.redirect('/admin');
            res.render('home', { user: req.session.user });
        } catch (error) {
            debugLogger.error("Error in viewController getHome method: ",error);
            res.status(500).json({ error:"An error occurred while processing your request." });
        }
    },
    getRegister: async (req, res) => {
        try {
            if (req.session.user) return res.redirect('/');
            res.render('register');
        } catch (error) {
            debugLogger.error("Error in viewController getRegister method: ",error);
            res.status(500).json({ error:"An error occurred while processing your request." });
        }
    },
    getLogin: async (req, res) => {
        try {
            if (req.session.user) return res.redirect('/');
           
            res.render('login');
        
        } catch (error) {
            debugLogger.error("Error in viewController getLogin method: ",error);
            res.status(500).json({ error:"An error occurred while processing your request." });
        }
    },
    getAdmin: async (req, res) => {
        try {
            if (!req.session.user) return res.redirect('/login');
            if (req.session.user.role !== "admin") return res.redirect('/');

            res.render('admin', { user: req.session.user });
        } catch (error) {
            debugLogger.error("Error in viewController getAdmin method: ",error);
            res.status(500).json({ error:"An error occurred while processing your request." });
        }
    },

    getAllOrders: async (req, res) => {
        try{
            if (!req.session.user) return res.redirect('/login');
            if (req.session.user.role=== "admin") return res.redirect('/admin');

            res.render('orders', { user: req.session.user });
        } catch (error) {
            debugLogger.error("Error in viewController getOrders method: ",error);
            res.status(500).json({ error:"An error occurred while processing your request." });
        }
    }
}