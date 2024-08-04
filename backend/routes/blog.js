import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Blogs, validationBlog } from "../schema/blogSchema.js"
import { auth } from "../middleware/auth.js"
const router = express.Router()


router.get("/", auth, async (req, res) => {
    try {
        const { limit, skip } = req.query
        const blogs = await Blogs.find() //.limit(limit).skip((skip - 1) * limit)
        if (!blogs.length) {
            return res.status(400).json({
                msg: "Blog is not defined",
                variant: "warning",
                payload: null
            })
        }
        const total = await Blogs.countDocuments()
        res.status(200).json({
            msg: "All blogs",
            variant: "success",
            payload: blogs,
            total
        })
    } catch {
        res.status(500).json({
            msg: "Server error",
            variant: "error",
            payload: null
        })
    }
})

router.post("/", async (req, res) => {
    try {
        let { error } = validationBlog(req.body)
        if (error) {
            return res.status(400).json({
                msg: error.details[0].message,
                variant: "error",
                payload: null
            })
        }
        const existBlog = await Blogs.exists({ title: req.body.username })
        if (existBlog) {
            return res.status(400).json({
                msg: "Username oldin foydalanilgan",
                variant: "warning",
                payload: null
            })
        }

        req.body.password = await bcrypt.hash(req.body.password, 10)
        const blog = await Blogs.create(req.body)
        res.status(201).json({
            msg: "Blog is created",
            variant: "success",
            payload: blog
        })
    } catch {
        res.status(500).json({
            msg: "Server error",
            variant: "error",
            payload: null
        })
    }

})

router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                msg: "Username and password are required",
                variant: "error",
                payload: null
            });
        }

        const user = await Blogs.findOne({ username });
        if (!user) {
            return res.status(401).json({
                msg: "Invalid username or password",
                variant: "error",
                payload: null
            });
        }

        bcrypt.compare(password, user.password, function (err, response) {
            const token  = jwt.sign({_id: user._id}, "sh@e$r31/0%4")
            if (response) {
                res.status(200).json({
                    msg: "Sign-in successful",
                    variant: "success",
                    payload: {user, token}
                });
            }
            else {
                return res.status(400).json({
                    msg: "Invalid username or password",
                    variant: "error",
                    payload: null
                });
            }

        });

    } catch (error) {
        console.error('Error during sign-in:', error);
        res.status(500).json({
            msg: "Server error",
            variant: "error",
            payload: null
        });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params
        const existBlog = await Blogs.findById(id)
        if (!existBlog) {
            return res.status(400).json({
                msg: "Blog topilmadi",
                variant: "warning",
                payload: null
            })
        }
        const blog = await Blogs.findByIdAndDelete(id, { new: true })

        res.status(200).json({
            msg: "blog is deleted",
            variant: "success",
            payload: blog
        })
    } catch {
        res.status(500).json({
            msg: "Server error",
            variant: "error",
            payload: null
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params

        const blog = await Blogs.findByIdAndUpdate(id, req.body, { new: true })

        res.status(200).json({
            msg: "blog is updated",
            variant: "success",
            payload: blog
        })
    } catch {
        res.status(500).json({
            msg: "Server error",
            variant: "error",
            payload: null
        })
    }
})


export default router