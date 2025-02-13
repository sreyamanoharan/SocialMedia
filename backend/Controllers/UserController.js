import bcrypt from 'bcrypt'
import  db  from '../index.js'

export const Register=async(req,res)=>{
    try {
  const {name,email,password} =req.body
  console.log(req.body,'lllllllllllllllllllllllllllllllll');
  
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);
        console.log('aaaaaaaaaaaaa');
        
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

          console.log(user.id);
          
                res.status(200).json({ message: "Login successful" ,user_id:user.id});
            });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    };



    export const newPosts = (req, res) => {
      try {
        console.log('kkkkkkkkkkkk',req.body);
        
        const { user_id, images, caption } = req.body;
    
        if (!user_id || !caption || !images || !Array.isArray(images)) {
          return res.status(400).json({ message: "Invalid input data" });
        }
    
        const imagesJson = JSON.stringify(images); // Convert images array to JSON
    
        const sql = `INSERT INTO posts (user_id, images, caption) VALUES (?, ?, ?)`;
    
        db.query(sql, [user_id, imagesJson, caption], (err, result) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error", error: err.message });
          }
    
          return res.status(201).json({
            message: "Post added successfully",
            postId: result.insertId,
          });
        });
      } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    };
    

    export const getAllPosts = (req, res) => {
        const sql = `
            SELECT posts.*, users.name AS user_name 
            FROM posts 
            JOIN users ON posts.user_id = users.id
            ORDER BY posts.created_at DESC`; // Ensure posts are ordered by creation time
    
        db.query(sql, (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err.message });
            }
    
            // Ensure 'images' field is parsed from JSON
            const formattedResult = result.map(post => ({
                ...post,
                images: JSON.parse(post.images), // Convert stored JSON string into an array
            }));
             console.log(formattedResult);
             
            return res.status(200).json({ result: formattedResult });
        });
    };
    
