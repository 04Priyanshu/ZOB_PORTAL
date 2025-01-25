export const register = async (req, res) => {
    try {
        const { fullname, email, phonenumber, password, role } = req.body;
        if(!fullname || !email || !phonenumber || !password || !role){
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }
            
}

