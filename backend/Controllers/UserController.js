import bcrypt from 'bcrypt'
import  db  from '../index.js'

export const Register=async(req,res)=>{
    try {
  const {name,email,password} =req.body
  console.log(req.body,'lllllllllllllllllllllllllllllllll');
  
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        console.log('aaaaaaaaaaaaa');
        

        // Insert user into the database
        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        db.query(sql, [name, email, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: "Email already exists!" });
                }
                return res.status(500).json({ message: err.message });
            }

            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}


   export const login = async (req, res) => { 
        try {
            const { email, password } = req.body;
    
            const sql = `SELECT * FROM users WHERE email = ?`;
            db.query(sql, [email], async (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Database error", error: err.message });
                }
    
                if (result.length === 0) {
                    return res.status(400).json({ message: "User not found!" });
                }
    
                const user = result[0];
                const isMatch = await bcrypt.compare(password, user.password);
    
                if (!isMatch) {
                    return res.status(401).json({ message: "Invalid email or password!" });
                }
    
                res.status(200).json({ message: "Login successful" });
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };
