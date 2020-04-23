const router = require("express").Router();
const storage = require("../db/storage");

router.get("/notes", function (req, res) {
    storage
        .getNote()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
    storage
        .addNote(req.body)
        .then((note) => res.json(note))
        .catch(err => res.status(500).json(err));
});

router.delete("/notes/:id", function (req, res) {
    storage
        .removeNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err));
});

module.exports = router;