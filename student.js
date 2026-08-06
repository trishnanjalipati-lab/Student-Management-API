const express = require("express")
const router = express.Router()



const students = {
    1: {
        name: "Trishnanjali Pati",
        branch: "Computer Science",
        cgpa: 9.33
    },
    2: {
        name: "Ayush",
        branch: "Computer Science",
        cgpa: 8.7
    },
    3: {
        name: "Rahul Verma",
        branch: "Mechanical",
        cgpa: 8.1
    },
    4: {
        name: "Sneha Patel",
        branch: "Civil",
        cgpa: 9.0
    },
    5: {
        name: "Anant Goyal",
        branch: "Information Technology",
        cgpa: 8.5
    },
    6: {
        name: "Ananya Roy",
        branch: "Electrical",
        cgpa: 9.4
    },
    7: {
        name: "Vikram Nair",
        branch: "Computer Science",
        cgpa: 8.9
    },
    8: {
        name: "Meera Joshi",
        branch: "Artificial Intelligence",
        cgpa: 9.6
    }
};
function time(req, res, next) {
    console.log(Date.now())
    next()
}
function method(req, res, next) {
    console.log(req.method)
    next()
}

function url(req, res, next) {
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl)
    next()

}
router.use(time, method, url)
router.post("/", (req, res) => {
    students[Date.now()] = { name: req.body.name, branch: req.body.branch, cgpa: req.body.cgpa }
    console.log(students)
    res.send("done adding")
})
router.get("/search", (req, res) => {
    const params = req.query
    const student = []
    for (const [key, value] of Object.entries(params)) {


        const values = (Object.values(students))

        values.map((item) => {
            if (item[key].replace(" ", "").toLowerCase() === value.replace(" ", "").toLowerCase()) {
                student.push(item)

            }
        })
    }
    res.send(student)


})
router.get("/", (req, res) => {
    res.status(200).send((students))

})
router.get("/:id", (req, res) => {
    const student = students[req.params.id];

    if (!student) {
        return res.status(404).send("404");
    }
    const details = `ID- ${req.params.id} 
    Name- ${student["name"]}
    Branch- ${student["branch"]}
    CGPA -${student["cgpa"]}`

    res.status(200).send(details);
});
router.delete("/:id", (req, res) => {
    const id = req.params.id
    const student = students[id];

    if (!student) {
        return res.status(404).send("404");
    }
    delete students[id]


    res.send("deleted successfully")
})

module.exports = router