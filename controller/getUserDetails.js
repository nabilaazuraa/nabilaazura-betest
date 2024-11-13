// controller/getUserDetails.js

const User = require("../database/model/user");

const getUserByAccountNumber = async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber;
        
        const user = await User.findOne({ accountNumber: accountNumber });
        
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: user
        });

    } catch (error) {
        console.error("Error fetching user by account number:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

const getUserByIdentityNumber = async (req, res) => {
    try {
        const identityNumber = req.params.identityNumber;
        
        const user = await User.findOne({ identityNumber: identityNumber });
        
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: user
        });

    } catch (error) {
        console.error("Error fetching user by identity number:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
};

module.exports = {
    getUserByAccountNumber,
    getUserByIdentityNumber
};